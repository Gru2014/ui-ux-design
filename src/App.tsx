import React from "react";
import { ActivityBar, CanvasArea, Container, PropertiesPanel } from "./components";

const App: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <ActivityBar />
      <div className="flex-1 flex">
        <Container />
        <CanvasArea />
        <PropertiesPanel />
      </div>
    </div>
  );
};

export default App;
