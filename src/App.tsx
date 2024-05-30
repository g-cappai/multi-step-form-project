import { useState } from "react";
import { validateStep } from "./api/validateStep";
import { Accordion, Button, Carousel, Input } from "./components";
import { useMobileScreenWidth } from "./hooks/useMobileScreenWidth";
import { useForm } from "react-hook-form";

export type FormData = {
  currentStep: number;
  steps: [{ name: string }, { city: string }, { address: string }];
};

function App() {
  const [isFormLoading, setIsFormLoading] = useState(false);
  const isMobile = useMobileScreenWidth();
  const { control, clearErrors, setValue, setError, watch } = useForm<FormData>(
    {
      values: {
        currentStep: 0,
        steps: [{ name: "" }, { city: "" }, { address: "" }],
      },
    }
  );

  const steps = [
    {
      title: "Step 1",
      content: (
        <>
          <Input
            label="Name"
            name="name"
            controller={{ control, name: "steps.0.name" }}
            tabIndex={watch("currentStep") === 0 ? 0 : -1}
          />
        </>
      ),
    },
    {
      title: "Step 2",
      content: (
        <Input
          label="City"
          name="city"
          controller={{ control, name: "steps.1.city" }}
          tabIndex={watch("currentStep") === 1 ? 0 : -1}
        />
      ),
    },
    {
      title: "Step 3",
      content: (
        <Input
          label="Address"
          name="address"
          controller={{ control, name: "steps.2.address" }}
          tabIndex={watch("currentStep") === 2 ? 0 : -1}
        />
      ),
    },
  ];

  const handleNext = async () => {
    setIsFormLoading(true);
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
    } else {
      clearErrors(`steps.${currentStep}` as `steps.0`);
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
          <Carousel currentStep={watch("currentStep")} steps={steps} />
        ) : (
          <Accordion currentStep={watch("currentStep")} steps={steps} />
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
