import Autocomplete from "~/components/Autocomplete";
import type { ActionArgs } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import { json } from "@remix-run/node";
import { z } from "zod";
import { badRequest } from "~/utils/request.server";

const AutocompleteSchema = z.object({
  id: z.string().or(z.null()),
  name: z.string().min(1).trim(),
});
const VintageSchema = z.string().length(4);
const WineNameSchema = z.string().min(1);

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const regionData = form.get("region-data");
  const vineyardData = form.get("vineyard-data");
  const wineTypeData = form.get("wine-type-data");

  if (typeof regionData !== "string") {
    return badRequest({
      fieldErrors: null,
      formError: "Error saving region data",
    });
  }

  if (typeof vineyardData !== "string") {
    return badRequest({
      fieldErrors: null,
      formError: "Error saving vineyard data",
    });
  }

  if (typeof wineTypeData !== "string") {
    return badRequest({
      fieldErrors: null,
      formError: "Error saving wine type data",
    });
  }

  const region = AutocompleteSchema.safeParse(JSON.parse(regionData));
  const vineyard = AutocompleteSchema.safeParse(JSON.parse(vineyardData));
  const wineType = AutocompleteSchema.safeParse(JSON.parse(wineTypeData));
  const vintage = VintageSchema.safeParse(form.get("vintage"));
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
    return badRequest({ fieldErrors, formError: null });
  }
  const data = {
    wineName: wineName.data,
    vintage: vintage.data,
    region: region.data,
    wineType: wineType.data,
    vineyard: vineyard.data,
  };

  console.log(data);

  return json({ data, formError: null, fieldErrors: null });
};

export default function AddWine() {
  const actionData = useActionData<typeof action>();
  const transition = useTransition();

  return (
    <div className="container mx-auto">
      <div className="prose mx-2">
        <h2 className="my-4">Add new wine</h2>
      </div>

      <Form method="post">
        <div className="mx-2 flex flex-wrap gap-2">
          <div className="form-control">
            <label htmlFor="wine-name-input" className="label">
              <span className="label-text">Wine name</span>
            </label>
            <input
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
        <div className="mx-2">
          <button
            type="submit"
            className={`btn-primary btn ${
              transition.state === "submitting" ? "btn-disabled" : ""
            } my-4`}
          >
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
}
