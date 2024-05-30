import { useMemo, useState } from "react";
import { getValidationStatus } from "./api/getvalidationStatus";
import { Accordion, Button, Carousel, Input } from "./components";
import { useMobileScreenWidth } from "./hooks/useMobileScreenWidth";
import { useForm } from "react-hook-form";

export type FormData = {
  currentStep: number;
  steps: [{ name: string }, { city: string }, { address: string }];
};

const stepsSchema = [
  {
    title: "Step 1",
    inputs: [
      {
        label: "Name",
        name: "steps.0.name",
      },
    ],
  },
  {
    title: "Step 2",
    inputs: [
      {
        label: "City",
        name: "steps.1.city",
      },
    ],
  },
  {
    title: "Step 3",
    inputs: [
      {
        label: "Address",
        name: "steps.2.address",
      },
    ],
  },
];

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

  const formSteps = useMemo(
    () =>
      stepsSchema.map<{ title: string; content: React.ReactElement }>(
        (step) => ({
          ...step,
          content: (
            <>
              {step.inputs.map((input, stepNumber) => (
                <Input
                  label={input.label}
                  controller={{ name: input.name as "steps.0.name", control }}
                  key={input.name}
                  tabIndex={currentStep !== stepNumber ? 0 : -1}
                />
              ))}
            </>
          ),
        })
      ),
    [control, currentStep]
  );

  const validate = async (): Promise<boolean> => {
    const validationData = await getValidationStatus({
      stepNumber: currentStep,
      values: steps[currentStep],
    });

    if (validationData.status === "error") {
      Object.keys(validationData.errors).forEach((key) => {
        setError(`steps.${currentStep}.${key}` as `steps.0.name`, {
          type: "server",
          message:
            validationData.errors[key as keyof typeof validationData.errors],
        });
      });
      return false;
    } else {
      clearErrors(`steps.${currentStep}` as `steps.0`);
      return true;
    }
  };

  const handleNext = async () => {
    setIsFormLoading(true);

    if (await validate()) {
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
