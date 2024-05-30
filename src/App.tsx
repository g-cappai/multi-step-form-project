import { useMemo, useState } from "react";
import { validateStep } from "./api/validateStep";
import { Accordion, Button, Carousel, Input } from "./components";
import { useMobileScreenWidth } from "./hooks/useMobileScreenWidth";
import { useForm } from "react-hook-form";

export type FormData = {
  currentStep: number;
  steps: [{ name: string }, { city: string }, { address: string }];
};

const steps = [
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

  const formSteps = useMemo(
    () =>
      steps.map<{ title: string; content: React.ReactElement }>((step) => ({
        title: step.title,
        content: (
          <>
            {step.inputs.map((input) => (
              <Input
                label={input.label}
                controller={{ name: input.name as "steps.0.name", control }}
              />
            ))}
          </>
        ),
      })),
    [control]
  );

  const validate = async (): Promise<boolean> => {
    const [currentStep, steps] = watch(["currentStep", "steps"]);

    const validationData = await validateStep({
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
      setValue("currentStep", watch("currentStep") + 1);
    }

    setIsFormLoading(false);
  };

  const handleBack = () => {
    setValue("currentStep", watch("currentStep") - 1);
  };

  return (
    <div className="container">
      <form className="form" id="form">
        {isMobile ? (
          <Carousel currentStep={watch("currentStep")} steps={formSteps} />
        ) : (
          <Accordion currentStep={watch("currentStep")} steps={formSteps} />
        )}
        <div className="controls">
          <Button
            disabled={watch("currentStep") == 0 || isFormLoading}
            content="Back"
            onClick={handleBack}
          />
          <Button
            disabled={isFormLoading}
            content="Next"
            onClick={handleNext}
          />
        </div>
      </form>
    </div>
  );
}

export default App;
