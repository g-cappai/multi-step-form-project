import { Button } from "./Button";

type Props = {
  disableBack: boolean;
  disableNext: boolean;
  onBack: () => void;
  onNext: () => void;
};

export function Controls({ disableBack, disableNext, onBack, onNext }: Props) {
  return (
    <div className="controls">
      <Button disabled={disableBack} content="Back" onClick={onBack} />
      <Button disabled={disableNext} content="Next" onClick={onNext} />
    </div>
  );
}
