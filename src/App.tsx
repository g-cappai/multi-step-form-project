import { useState } from "react";
import { Accordion, Carousel, Input } from "./components";
import { Controls } from "./components";
import { useMobileScreenWidth } from "./hooks/useMobileScreenWidth";
import { validateStep } from "./api/validateStep";

type InputValue = {
  value: string;
  errorMessage?: string;
};

function App() {
  const [step, setStep] = useState(0);

  const isMobile = useMobileScreenWidth();

  const [stepOne, setStepOne] = useState<{
    name: InputValue;
  }>({
    name: {
      value: "",
    },
  });

  const [stepTwo, setStepTwo] = useState<{
    surname: InputValue;
  }>({
    surname: {
      value: "",
    },
  });

  const [stepThree, setStepThree] = useState<{
    address: InputValue;
  }>({
    address: {
      value: "",
    },
  });

  const steps = [
    {
      title: "Step 1",
      content: (
        <Input
          label="Name"
          name="name"
          value={stepOne.name.value}
          errorMessage={stepOne.name.errorMessage}
          onChange={(value) =>
            setStepOne((c) => ({ name: { ...c.name, value } }))
          }
        />
      ),
    },
    {
      title: "Step 2",
      content: (
        <Input
          label="Surname"
          name="surname"
          value={stepTwo.surname.value}
          errorMessage={stepTwo.surname.errorMessage}
          onChange={(value) =>
            setStepTwo((c) => ({ surname: { ...c.surname, value } }))
          }
        />
      ),
    },
    {
      title: "Step 3",
      content: (
        <Input
          label="Address"
          name="address"
          value={stepThree.address.value}
          errorMessage={stepThree.address.errorMessage}
          onChange={(value) =>
            setStepThree((c) => ({ address: { ...c.address, value } }))
          }
        />
      ),
    },
  ];

  const handleNext = async () => {
    const stepValidation = await validateStep(
      step === 0
        ? {
            stepNumber: 0,
            values: [
              {
                inputName: "name",
                inputValue: stepOne.name.value,
              },
            ],
          }
        : step === 1
        ? {
            stepNumber: 1,
            values: [
              {
                inputName: "surname",
                inputValue: stepTwo.surname.value,
              },
            ],
          }
        : {
            stepNumber: 2,
            values: [
              {
                inputName: "address",
                inputValue: stepThree.address.value,
              },
            ],
          }
    );

    if (stepValidation.status === "error") {
      if (step === 0) {
        setStepOne((c) => ({
          name: {
            ...c.name,
            errorMessage: stepValidation.values[0].errorMessage,
          },
        }));
      } else if (step === 1) {
        setStepTwo((c) => ({
          surname: {
            ...c.surname,
            errorMessage: stepValidation.values[0].errorMessage,
          },
        }));
      } else {
        setStepThree((c) => ({
          address: {
            ...c.address,
            errorMessage: stepValidation.values[0].errorMessage,
          },
        }));
      }

      return;
    }

    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="container">
      <div className="form">
        {isMobile ? (
          <Carousel currentStep={step} steps={steps} />
        ) : (
          <Accordion currentStep={step} steps={steps} />
        )}
        <Controls
          disableBack={step == 0}
          disableNext={false}
          onBack={handleBack}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}

export default App;
