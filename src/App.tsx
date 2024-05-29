import { useState } from "react";
import { Accordion, Carousel, Input } from "./components";
import { Controls } from "./components";
import { useMobileScreenWidth } from "./hooks/useMobileScreenWidth";

function App() {
  const [step, setStep] = useState(0);

  const isMobile = useMobileScreenWidth();

  const steps = [
    {
      title: "Step 1",
      content: <Input />,
    },
    {
      title: "Step 2",
      content: <Input />,
    },
    {
      title: "Step 3",
      content: <Input />,
    },
  ];

  const handleNext = () => {
    // Validate the form
    // If the form is invalid proceed
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
