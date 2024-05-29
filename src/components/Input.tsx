type InputProps = {
  label: string;
  name: string;
  value: string;
  errorMessage?: string;
  onChange: (value: string) => void;
};

export function Input({
  label,
  name,
  value,
  errorMessage,
  onChange,
}: InputProps) {
  const hasError = Boolean(errorMessage);

  return (
    <div className="input">
      <label className="input__label" htmlFor={name}>
        {label}
      </label>
      <input
        className="input__field"
        name={name}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {hasError && (
        <div className="input__error" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
