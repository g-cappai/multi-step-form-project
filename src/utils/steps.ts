export type FormSteps = { title: string; content: React.ReactElement }[];

type InputSchema = { label: string; name: string };

type StepSchema = {
  title: string;
  inputs: InputSchema[];
};

export const stepsData = [
  { title: "Step 1", fields: ["name"] },
  { title: "Step 2", fields: ["city"] },
  { title: "Step 3", fields: ["address"] },
] as const;

export const stepsSchema: StepSchema[] = stepsData.map((step, index) => ({
  title: step.title,
  inputs: step.fields.map((field) => ({
    label: `${field.charAt(0).toUpperCase()}${field.slice(1)}`,
    name: `steps.${index}.${field}`,
  })),
}));

export const stepsInitialValues = stepsData.map((step) =>
  step.fields.reduce<Record<string, string>>(
    (acc, field) => ({ ...acc, [field]: "" }),
    {}
  )
);

export const getFormSteps = (
  renderStep: (step: StepSchema, stepNumber: number) => React.ReactElement
): FormSteps =>
  stepsSchema.map<{ title: string; content: React.ReactElement }>(
    (step, stepNumber) => ({
      ...step,
      content: renderStep(step, stepNumber),
    })
  );
