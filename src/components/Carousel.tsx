type Props = {
  steps: { title: string; content: React.ReactElement }[];
  currentStep: number;
};

export function Carousel({ steps, currentStep }: Props) {
  return (
    <div className="mx-auto w-3/5 overflow-hidden rounded-md bg-green-950">
      <div
        className={`flex py-4 transition duration-300 ease-out`}
        style={{ transform: `translateX(-${currentStep * 100}%)` }}
      >
        {steps.map((step) => (
          <div className="min-w-full px-4">
            <h2>{step.title}</h2>
            {step.content}
          </div>
        ))}
      </div>
    </div>
  );
}
