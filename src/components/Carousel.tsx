import { FormSteps } from "../utils/steps";
import { Stepper } from "./Stepper";

type Props = {
  steps: FormSteps;
  currentStep: number;
  completed: boolean;
};

export function Carousel({ steps, currentStep, completed }: Props) {
  /**
   * TODO: The height is forced by the taller step.
   * Not ideal for a form with different input quantity on each step.
   */

  return (
    <div className="carousel">
      <Stepper currentStep={currentStep} steps={steps.length} />
      <div
        className="carousel__content"
        style={{ transform: `translateX(-${currentStep * 100}%)` }}
      >
        {steps.map((step) => (
          <div key={step.title.trim()} className="carousel__step">
            {step.content}
          </div>
        ))}
        {completed && (
          <div className="carousel__step carousel__step--completed">
            <h2 className="carousel__complete-title">Thank you!</h2>
            <p className="carousel__complete-description">
              Your submission has been received.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
