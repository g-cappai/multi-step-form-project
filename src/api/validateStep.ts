export type StepPayload = {
  stepNumber: number;
  values: {
    inputName: string;
    inputValue: string;
  }[];
};

export type StepResponse =
  | {
      status: "success";
    }
  | {
      status: "error";
      values: {
        inputName: string;
        errorMessage: string;
      }[];
    };

export async function validateStep(
  payload: StepPayload
): Promise<StepResponse> {
  const isStepValid = (payload: StepPayload) => {
    if (payload.stepNumber === 0) {
      return payload.values[0].inputValue === "step1";
    }

    if (payload.stepNumber === 0) {
      return payload.values[0].inputValue === "step2";
    }

    if (payload.stepNumber === 0) {
      return payload.values[0].inputValue === "step3";
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
          values: [
            {
              inputName: payload.values[0].inputName,
              errorMessage: "Invalid step",
            },
          ],
        });
      }
    }, 1000);
  });
}
