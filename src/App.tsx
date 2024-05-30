import { validateStep } from "./api/validateStep";
import { Accordion, Carousel, Input } from "./components";
import { Controls } from "./components";
import { useMobileScreenWidth } from "./hooks/useMobileScreenWidth";
import { useForm } from "react-hook-form";

export type FormData = {
  currentStep: number;
  steps: [{ name: string }, { surname: string }, { address: string }];
};

function App() {
  const isMobile = useMobileScreenWidth();
  const { control, clearErrors, setValue, setError, watch } = useForm<FormData>(
    {
      values: {
        currentStep: 0,
        steps: [{ name: "" }, { surname: "" }, { address: "" }],
      },
    }
  );

  const steps = [
    {
      title: "Step 1",
      content: (
        <Input
          label="Name"
          name="name"
          controller={{ control, name: "steps.0.name" }}
        />
      ),
    },
    {
      title: "Step 2",
      content: (
        <Input
          label="Surname"
          name="surname"
          controller={{ control, name: "steps.1.surname" }}
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
        />
      ),
    },
  ];

  const handleNext = async () => {
    const validationData = await validateStep({
      stepNumber: watch("currentStep"),
      values: watch("steps")[watch("currentStep")],
    });

    if (watch("currentStep") === 0) {
      if (validationData.status === "error") {
        setError("steps.0.name", {
          type: "server",
          message: validationData.errors.name,
        });
        return;
      } else {
        clearErrors("steps.0.name");
      }
    }

    if (watch("currentStep") === 1) {
      if (validationData.status === "error") {
        setError("steps.1.surname", {
          type: "server",
          message: validationData.errors.surname,
        });
        return;
      } else {
        clearErrors("steps.1.surname");
      }
    }

    if (watch("currentStep") === 2) {
      if (validationData.status === "error") {
        setError("steps.2.address", {
          type: "server",
          message: validationData.errors.address,
        });
        return;
      } else {
        clearErrors("steps.2.address");
      }
    }

    setValue("currentStep", watch("currentStep") + 1);
  };

  const handleBack = () => {
    setValue("currentStep", watch("currentStep") - 1);
  };

  return (
    <div className="container">
      <div className="form">
        {isMobile ? (
          <Carousel currentStep={watch("currentStep")} steps={steps} />
        ) : (
          <Accordion currentStep={watch("currentStep")} steps={steps} />
        )}
        <Controls
          disableBack={watch("currentStep") == 0}
          disableNext={false}
          onBack={handleBack}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}

export default App;
