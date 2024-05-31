import { FormSteps } from "../utils/steps";

type Props = {
  steps: FormSteps;
  currentStep: number;
  completed: boolean;
};

export function Accordion({ steps, currentStep, completed }: Props) {
  return (
    <div className="accordion">
      {steps.map((step, index) => (
        <div className="section" key={step.title.trim()}>
          <div
            className={`section__title ${
              index == currentStep ? "section__title--done" : ""
            }`}
          >
            <div
              className={`section__number ${
                index < currentStep
                  ? "section__number--done"
                  : index === currentStep
                  ? "section__number--active"
                  : ""
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
      {completed && (
        <div className="section section--completed">
          <h2 className="section__completed-title">Thank you!</h2>
          <p className="section__completed-description">
            Your submission has been received.
          </p>
        </div>
      )}
    </div>
  );
}
