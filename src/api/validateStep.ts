export type StepPayload = {
  stepNumber: number;
  values: { [key: string]: string };
};

export type StepResponse =
  | {
      status: "success";
    }
  | {
      status: "error";
      errors: { [key: string]: string };
    };

export async function validateStep(
  payload: StepPayload
): Promise<StepResponse> {
  const getErrors = (payload: StepPayload): string[][] => {
    return Object.entries(payload.values)
      .map(([key, value]) => {
        if (!value) {
          return [key, "This field is required!"];
        }
      })
      .filter(Boolean) as string[][];
  };

  return new Promise((resolve) => {
    const errors = getErrors(payload);
    setTimeout(() => {
      if (!errors.length) {
        resolve({ status: "success" });
      } else {
        resolve({
          status: "error",
          errors: Object.fromEntries(errors),
        });
      }
    }, 1000);
  });
}
