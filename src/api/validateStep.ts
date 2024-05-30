export type StepPayload = {
  stepNumber: number;
  values: { name: string } | { surname: string } | { address: string };
};

export type StepResponse =
  | {
      status: "success";
    }
  | {
      status: "error";
      errors: {
        name?: string;
        surname?: string;
        address?: string;
      };
    };

export async function validateStep(
  payload: StepPayload
): Promise<StepResponse> {
  const isStepValid = (payload: StepPayload) => {
    if (payload.stepNumber === 0) {
      return (payload.values as { name: string }).name === "Mario";
    }

    if (payload.stepNumber === 1) {
      return (payload.values as { surname: string }).surname === "Rossi";
    }

    if (payload.stepNumber === 2) {
      return (payload.values as { address: string }).address === "Via Roma, 1";
    }

    return false;
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      if (isStepValid(payload)) {
        resolve({ status: "success" });
      } else {
        resolve({
          status: "error",
          errors: {
            name: payload.stepNumber === 0 ? "Invalid name" : undefined,
            surname: payload.stepNumber === 1 ? "Invalid surname" : undefined,
            address: payload.stepNumber === 2 ? "Invalid address" : undefined,
          },
        });
      }
    }, 1000);
  });
}
