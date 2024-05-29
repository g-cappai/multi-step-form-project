import { useMemo } from "react";

type Props = {
  steps: number;
  currentStep: number;
};

export function Stepper({ steps: stepsAmount, currentStep }: Props) {
  const steps = useMemo(() => new Array(stepsAmount).fill(""), [stepsAmount]);

  return (
    <div className="stepper">
      {steps.map((_, index) => {
        return (
          <div
            key={index}
            className={`step ${currentStep > index ? "step--active" : ""}`}
          >
            <div className="step__number">{index + 1}</div>
          </div>
        );
      })}
    </div>
  );
}
