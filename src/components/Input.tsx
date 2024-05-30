import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

type InputProps<T extends FieldValues> = {
  label: string;
  name: string;
  tabIndex?: number;
} & { controller: UseControllerProps<T> };

export function Input<T extends FieldValues>({
  label,
  name,
  controller,
  tabIndex,
}: InputProps<T>) {
  const { field, fieldState } = useController(controller);
  return (
    <div className="input">
      <label className="input__label" htmlFor={name}>
        {label}
      </label>
      <input
        tabIndex={tabIndex}
        className={`input__field ${
          fieldState.invalid ? "input__field--invalid" : ""
        }`}
        name={name}
        type="text"
        value={field.value}
        onChange={(e) => field.onChange(e.target.value)}
      />
      {fieldState.invalid && (
        <div className="input__error" role="alert">
          {fieldState.error?.message}
        </div>
      )}
    </div>
  );
}
