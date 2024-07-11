import InfiniteXOX from "./components/InfiniteXOX.jsx";
import Background from "./components/Background/Background.jsx";

function App() {
  return (
    <div className="relative">
      <Background />
      <div className="p-4 h-dvh max-h-dvh overflow-hidden">
        <InfiniteXOX />
      </div>
    </div>
  );
}

export default App;
