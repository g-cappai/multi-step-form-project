import { Stepper } from "./Stepper";

type Props = {
  steps: { title: string; content: React.ReactElement }[];
  currentStep: number;
};

export function Carousel({ steps, currentStep }: Props) {
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
      </div>
    </div>
  );
}