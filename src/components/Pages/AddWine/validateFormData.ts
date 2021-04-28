import { FormData } from "./FormData";
import {
  LocationValidationMessages,
  ValidationMessages,
} from "./ValidationMessages";

export function validateFormData(formData: FormData): ValidationMessages {
  const missingFieldText = "Missing required field";
  let newErrorMessages: ValidationMessages = {};
  const locationErrorMessages: LocationValidationMessages[] = [];
  // Required fields
  if (!formData.wineName) {
    newErrorMessages = {
      ...newErrorMessages,
      wineName: missingFieldText,
    };
  }

  if (!formData.vineyard?.name) {
    newErrorMessages = {
      ...newErrorMessages,
      vineyard: missingFieldText,
    };
  }

  if (!formData.wineType?.name) {
    newErrorMessages = {
      ...newErrorMessages,
      wineType: missingFieldText,
    };
  }

  if (!formData.region?.name) {
    newErrorMessages = {
      ...newErrorMessages,
      region: missingFieldText,
    };
  }

  if (!formData.vintage) {
    newErrorMessages = {
      ...newErrorMessages,
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
    newErrorMessages = {
      ...newErrorMessages,
      locations: locationErrorMessages,
    };
  }

  return newErrorMessages;
}

export default validateFormData;
