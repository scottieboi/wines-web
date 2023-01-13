import Autocomplete from "~/components/Autocomplete";
import type { ActionFunction } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import { json } from "@remix-run/node";
import { z } from "zod";

type ActionData = {
  formError?: string;
  fieldErrors?: {
    region: string | undefined;
    wineName: string | undefined;
    vintage: string | undefined;
  };
  fields?: {
    region: string;
    wineName: string;
    vintage: string;
  };
};

const badRequest = (data: ActionData) => json(data, { status: 400 });

const RegionSchema = z.object({
  id: z.number().or(z.null()),
  name: z.string().min(1).trim(),
});
const VintageSchema = z.string().length(4);
const WineNameSchema = z.string().min(1);

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const regionData = form.get("region-data");

  if (typeof regionData !== "string") {
    return badRequest({ formError: "Error saving region data" });
  }

  const region = RegionSchema.safeParse(JSON.parse(regionData));
  const vintage = VintageSchema.safeParse(form.get("vintage"));
  const wineName = WineNameSchema.safeParse(form.get("wine-name"));

  const fieldErrors = {
    region: !region.success ? "Provide valid region" : undefined,
    wineName: !wineName.success ? "Provide valid wine name" : undefined,
    vintage: !vintage.success ? "Provide valid vintage" : undefined,
  };

  if (!region.success || !wineName.success || !vintage.success) {
    return badRequest({ fieldErrors });
  }

  console.log(wineName.data, vintage.data, region.data);

  return null;
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
            <label htmlFor="region-input" className="label">
              <span className="label-text">Region</span>
            </label>
            <Autocomplete inputId="region-input" inputName="region" />
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
