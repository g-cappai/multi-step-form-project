type Props = {
  steps: { title: string; content: React.ReactElement }[];
  currentStep: number;
};

export function Carousel({ steps, currentStep }: Props) {
  return (
    <div className="carousel">
      <div
        className="carousel__content"
        style={{ transform: `translateX(-${currentStep * 100}%)` }}
      >
        {steps.map((step) => (
          <div className="carousel__step">
            {step.content}
          </div>
        ))}
      </div>
    </div>
  );
}
