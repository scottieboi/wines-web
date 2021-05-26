import { SaveWineRequest } from "../../../api/apiRequests";
import { FormData } from "./FormData";
import {
  LocationValidationMessages,
  ValidationMessages,
} from "./ValidationMessages";

export function validateFormData(
  formData: FormData
): {
  errors: ValidationMessages;
  validatedModel: SaveWineRequest | null;
} {
  const missingFieldText = "Missing required field";
  let errors: ValidationMessages = {};
  const locationErrorMessages: LocationValidationMessages[] = [];
  // Required fields
  if (!formData.wineName) {
    errors = {
      ...errors,
      wineName: missingFieldText,
    };
  }

  if (!formData.vineyard?.name) {
    errors = {
      ...errors,
      vineyard: missingFieldText,
    };
  }

  if (!formData.wineType?.name) {
    errors = {
      ...errors,
      wineType: missingFieldText,
    };
  }

  if (!formData.region?.name) {
    errors = {
      ...errors,
      region: missingFieldText,
    };
  }

  if (!formData.vintage) {
    errors = {
      ...errors,
      vintage: missingFieldText,
    };
  }

  // ___ check all locations ___
  formData.locations.forEach((location, index) => {
    if (!location.boxno) {
      locationErrorMessages[index] = {
        ...locationErrorMessages[index],
        boxno: missingFieldText,
      };
    }

    if (!location.qty) {
      locationErrorMessages[index] = {
        ...locationErrorMessages[index],
        qty: missingFieldText,
      };
    }
  });

  if (locationErrorMessages.length > 0) {
    errors = {
      ...errors,
      locations: locationErrorMessages,
    };
  }

  let validatedModel: SaveWineRequest | null = null;

  // ___ when no errors, contruct the reqest model ___
  if (Object.keys(errors).length === 0) {
    validatedModel = {
      wineName: formData.wineName,
      vineyard: formData.vineyard?.name ?? "",
      wineType: formData.wineType?.name ?? "",
      region: formData.region?.name ?? "",
      vintage: formData.vintage === "" ? 0 : formData.vintage,
      locations: formData.locations.map((l) => ({
        boxNo: l.boxno === "" ? NaN : l.boxno,
        qty: l.qty === "" ? NaN : l.qty,
      })),
    };
  }

  return {
    errors,
    validatedModel,
  };
}

export default validateFormData;
