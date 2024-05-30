type InputSchema = { label: string; name: string };

type StepSchema = {
  title: string;
  inputs: InputSchema[];
};

const stepsData = [
  { title: "Step 1", fields: ["name"] },
  { title: "Step 2", fields: ["city"] },
  { title: "Step 3", fields: ["address"] },
];

export const stepsSchema: StepSchema[] = stepsData.map((step, index) => ({
  title: step.title,
  inputs: step.fields.map((field) => ({
    label: `${field.charAt(0).toUpperCase()}${field.slice(1)}`,
    name: `steps.${index}.${field}`,
  })),
}));
