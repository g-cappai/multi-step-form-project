import { useMemo, useState } from "react";
import { getValidationStatus } from "./api/getvalidationStatus";
import { Accordion, Button, Carousel, Input } from "./components";
import { useMobileScreenWidth } from "./hooks/useMobileScreenWidth";
import { useForm } from "react-hook-form";
import { stepsSchema } from "./schemas/steps.schema";

type FormData = {
  currentStep: number;
  steps: [{ name: string }, { city: string }, { address: string }];
};

export type FormSteps = { title: string; content: React.ReactElement }[];

function App() {
  const isMobile = useMobileScreenWidth();
  const [isFormLoading, setIsFormLoading] = useState(false);
  const { control, clearErrors, setValue, setError, watch } = useForm<FormData>(
    {
      values: {
        currentStep: 0,
        steps: [{ name: "" }, { city: "" }, { address: "" }],
      },
    }
  );
  const [currentStep, steps] = watch(["currentStep", "steps"]);

  const formSteps: FormSteps = useMemo(
    () =>
      stepsSchema.map<{ title: string; content: React.ReactElement }>(
        (step, stepNumber) => ({
          ...step,
          content: (
            <>
              {step.inputs.map((input) => (
                <Input
                  label={input.label}
                  controller={{ name: input.name as "steps.0.name", control }}
                  key={input.name}
                  tabIndex={currentStep === stepNumber ? 0 : -1}
                />
              ))}
            </>
          ),
        })
      ),
    [control, currentStep]
  );

  const handleErrors = (
    errors: Record<string, string>,
    currentStep: number
  ) => {
    Object.keys(errors).forEach((key) => {
      setError(`steps.${currentStep}.${key}` as `steps.0.name`, {
        type: "server",
        message: errors[key],
      });
    });
  };

  const validate = async (): Promise<boolean> => {
    const validationData = await getValidationStatus({
      stepNumber: currentStep,
      values: steps[currentStep],
    });

    if (validationData.status === "error") {
      handleErrors(validationData.errors, currentStep);
      return false;
    } else {
      clearErrors(`steps.${currentStep}` as `steps.0`);
      return true;
    }
  };

  const handleNext = async () => {
    setIsFormLoading(true);
    const isValid = await validate();

    if (isValid) {
      setValue("currentStep", currentStep + 1);
    }

    setIsFormLoading(false);
  };

  const handleBack = () => {
    setValue("currentStep", currentStep - 1);
  };

  return (
    <div className="container">
      <form className="form" id="form">
        {isMobile ? (
          <Carousel
            currentStep={currentStep}
            steps={formSteps}
            completed={currentStep === 3}
          />
        ) : (
          <Accordion
            currentStep={currentStep}
            steps={formSteps}
            completed={currentStep === 3}
          />
        )}
        <div className="controls">
          <Button
            type="button"
            disabled={[0, 3].includes(currentStep) || isFormLoading}
            content="Back"
            onClick={handleBack}
          />
          {isFormLoading && <div className="spinner"></div>}
          <Button
            type="submit"
            disabled={currentStep === 3 || isFormLoading}
            content="Next"
            onClick={handleNext}
          />
        </div>
      </form>
    </div>
  );
}

export default App;
