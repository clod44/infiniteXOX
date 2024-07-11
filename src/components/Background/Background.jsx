import P5Canvas from "./P5Canvas";

function Background() {
  return (
    <div className="absolute inset-0 -z-50" id="canvas-container">
      <P5Canvas />
    </div>
  );
}

export default Background;
