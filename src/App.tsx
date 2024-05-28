import { Carousel, Input, Stepper } from "./components";

function App() {
  return (
    <div className="form">
      <Stepper currentStep={1} steps={3}/>
      <Carousel
        currentStep={1}
        steps={[
          {
            title: "Step 1",
            content: <Input />,
          },
          {
            title: "Step 2",
            content: <Input />,
          },
          {
            title: "Step 3",
            content: <Input />,
          },
        ]}
      />
      <div className="form__controls">Controls</div>

    </div>
  );
}

export default App;
