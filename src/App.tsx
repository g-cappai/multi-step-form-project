import { Input } from "./components";
import { Carousel } from "./components/Carousel";

function App() {
  return (
    <div>
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
    </div>
  );
}

export default App;
