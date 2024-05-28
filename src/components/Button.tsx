type Props = {
  disabled: boolean;
  content: string;
  onClick: () => void;
};

export function Button({ disabled, content, onClick }: Props) {
  return (
    <button disabled={disabled} className="button" onClick={onClick}>
      {content}
    </button>
  );
}
