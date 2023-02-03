import Autocomplete from "~/components/Autocomplete";
import type { ActionArgs } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import { json } from "@remix-run/node";
import { z } from "zod";
import { useCallback, useEffect, useRef, useState } from "react";

import { badRequest } from "~/utils/request.server";
import Alert from "~/components/Alert";
import { isString } from "~/utils/validation.server";
import { db } from "~/utils/db.server";
import { requireUserId } from "~/utils/session.server";
import {
  getRegionSubQuery,
  getVineyardSubQuery,
  getWineTypeSubQuery,
} from "~/utils/queries.server";

const AutocompleteSchema = z.object({
  id: z.string().or(z.null()),
  name: z.string().min(1).trim(),
});
const VintageSchema = z.number().int().min(1000).max(2999);
const WineNameSchema = z.string().min(1);

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const regionData = form.get("region-data");
  const vineyardData = form.get("vineyard-data");
  const wineTypeData = form.get("wine-type-data");
  const vintageData = form.get("vintage");

  if (
    !isString(regionData) ||
    !isString(vineyardData) ||
    !isString(wineTypeData) ||
    !isString(vintageData)
  ) {
    return badRequest({
      fieldErrors: null,
      successMessage: null,
      formError: "Error saving data",
    });
  }

  const region = AutocompleteSchema.safeParse(JSON.parse(regionData));
  const vineyard = AutocompleteSchema.safeParse(JSON.parse(vineyardData));
  const wineType = AutocompleteSchema.safeParse(JSON.parse(wineTypeData));
  const vintage = VintageSchema.safeParse(Number.parseFloat(vintageData));
  const wineName = WineNameSchema.safeParse(form.get("wine-name"));

  const fieldErrors = {
    region: !region.success ? "Provide valid region" : undefined,
    wineName: !wineName.success ? "Provide valid wine name" : undefined,
    vintage: !vintage.success ? "Provide valid vintage" : undefined,
    vineyard: !vineyard.success ? "Provide valid vineyard" : undefined,
    wineType: !wineType.success ? "Provide valid wine type" : undefined,
  };

  if (
    !region.success ||
    !wineName.success ||
    !vintage.success ||
    !vineyard.success ||
    !wineType.success
  ) {
    return badRequest({ fieldErrors, successMessage: null, formError: null });
  }

  const userId = await requireUserId(request);

  try {
    await db.winelist.create({
      data: {
        winename: wineName.data,
        vintage: vintage.data,
        user: {
          connect: { id: userId },
        },
        region: getRegionSubQuery(region.data, userId),
        vineyard: getVineyardSubQuery(vineyard.data, userId),
        winetype: getWineTypeSubQuery(wineType.data, userId),
      },
      include: {
        region: true,
        vineyard: true,
        winetype: true,
      },
    });
  } catch (e) {
    return badRequest({
      fieldErrors: null,
      successMessage: null,
      formError: "Error saving data",
    });
  }

  return json({
    successMessage: "Added wine!",
    formError: null,
    fieldErrors: null,
  });
};

export default function AddWine() {
  const actionData = useActionData<typeof action>();
  const transition = useTransition();

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  let formRef = useRef<HTMLFormElement>(null);
  let firstFieldRef = useRef<HTMLInputElement>(null);

  // When successful submission and transition to loading state,
  // then reset the form and show the alert.
  useEffect(() => {
    if (actionData?.successMessage && transition.state === "loading") {
      setAlertMessage(actionData?.successMessage);
      formRef.current?.reset();
      firstFieldRef.current?.focus();
    }
  }, [actionData?.successMessage, transition.state]);

  const deactivateAlert = useCallback(() => {
    setAlertMessage(null);
  }, []);

  return (
    <div className="container mx-auto">
      <div className="mx-2">
        <h2 className="font-3xl my-4 font-bold leading-tight text-gray-900">
          Add new wine
        </h2>

        <Form ref={formRef} replace method="post">
          <div className="mx-2 flex flex-wrap gap-2">
            <div className="form-control">
              <label htmlFor="wine-name-input" className="label">
                <span className="label-text">Wine name</span>
              </label>
              <input
                ref={firstFieldRef}
                type="text"
                id="wine-name-input"
                name="wine-name"
                className="input-bordered input"
              />
              {actionData?.fieldErrors?.wineName && (
                <div className="my-2" role="alert" id="wine-name-error">
                  {actionData.fieldErrors.wineName}
                </div>
              )}
            </div>
            <div className="form-control">
              <label htmlFor="vineyard-input" className="label">
                <span className="label-text">Vineyard</span>
              </label>
              <Autocomplete
                inputId="vineyard-input"
                inputName="vineyard"
                apiUrl="/api/vineyards"
              />
              {actionData?.fieldErrors?.vineyard && (
                <div className="my-2" role="alert" id="vineyard-error">
                  {actionData.fieldErrors.vineyard}
                </div>
              )}
            </div>
            <div className="form-control">
              <label htmlFor="wine-type-input" className="label">
                <span className="label-text">Wine Type</span>
              </label>
              <Autocomplete
                inputId="wine-type-input"
                inputName="wine-type"
                apiUrl="/api/wine-types"
              />
              {actionData?.fieldErrors?.wineType && (
                <div className="my-2" role="alert" id="region-error">
                  {actionData.fieldErrors.wineType}
                </div>
              )}
            </div>
            <div className="form-control">
              <label htmlFor="region-input" className="label">
                <span className="label-text">Region</span>
              </label>
              <Autocomplete
                inputId="region-input"
                inputName="region"
                apiUrl="/api/regions"
              />
              {actionData?.fieldErrors?.region && (
                <div className="my-2" role="alert" id="region-error">
                  {actionData.fieldErrors.region}
                </div>
              )}
            </div>
            <div className="form-control">
              <label htmlFor="vintage-input" className="label">
                <span className="label-text">Vintage</span>
              </label>
              <input
                type="text"
                id="vintage-input"
                name="vintage"
                className="input-bordered input"
              />
              {actionData?.fieldErrors?.vintage && (
                <div className="my-2" role="alert" id="vintage-error">
                  {actionData.fieldErrors.vintage}
                </div>
              )}
            </div>
          </div>
          {actionData?.formError && (
            <div className="my-2" role="alert" id="vintage-error">
              {actionData.formError}
            </div>
          )}
          <button
            type="submit"
            className={`btn-primary btn ${
              transition.state === "submitting" ? "btn-disabled" : ""
            } my-4`}
          >
            Submit
          </button>
          {alertMessage && (
            <Alert message={alertMessage} onTimeout={deactivateAlert} />
          )}
        </Form>
      </div>
    </div>
  );
}
