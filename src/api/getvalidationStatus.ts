type StepPayload = {
  /**
   * The step number that the user is currently on.
   * It's not in use. But in a real-world scenario, you might want to use it to validate the step.
   */
  stepNumber: number;
  values: { [key: string]: string };
};

type StepResponse =
  | { status: "success" }
  | {
      status: "error";
      errors: { [key: string]: string };
    };

export async function getValidationStatus(
  payload: StepPayload
): Promise<StepResponse> {
  /**
   * This function vaidates the form data.
   * Currently, the only validation rule is that every field is required.
   */
  const getErrors = (payload: StepPayload): [string, string][] => {
    return Object.entries(payload.values)
      .filter(([_, value]) => !value)
      .map(([key]) => [key, "This field is required!"]);
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
