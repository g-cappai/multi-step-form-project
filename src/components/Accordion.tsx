type Props = {
  steps: { title: string; content: React.ReactElement }[];
  currentStep: number;
};

export function Accordion({ steps, currentStep }: Props) {
  return (
    <div className="accordion">
      {steps.map((step, index) => (
        <div className="section" key={step.title.trim()}>
          <div
            className={`section__title ${
              index == currentStep ? "section__title--active" : ""
            }`}
          >
            <div
              className={`section__number ${
                index < currentStep ? "section__number--active" : ""
              }`}
            >
              {index + 1}
            </div>
            <span>{step.title} </span>
          </div>
          <div
            className={`section__foldable ${
              index === currentStep ? "section__foldable--open" : ""
            }`}
          >
            <div className="section__content">{step.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
