type Props = {
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  content: string;
  onClick: () => void;
};

export function Button({ type, disabled, content, onClick }: Props) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="button"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {content}
    </button>
  );
}
