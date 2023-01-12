import Autocomplete from "~/components/Autocomplete";
import type { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const region = form.get("region");
  const wineName = form.get("wine-name");
  console.log(region, wineName);

  return null;
};

export default function AddWine() {
  return (
    <div className="container mx-auto">
      <div className="prose mx-2">
        <h2 className="my-4">Add new wine</h2>
      </div>
      <div className="mx-2 flex flex-wrap gap-2">
        <form method="post">
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
          </div>
          <div className="form-control">
            <label htmlFor="region-input" className="label">
              <span className="label-text">Region</span>
            </label>
            <Autocomplete inputId="region-input" inputName="region" />
          </div>
          <button type="submit" className="btn-primary btn my-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
