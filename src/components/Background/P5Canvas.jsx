import * as React from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";

function sketch(p5) {
  const getCanvasSize = () => {
    const canvasContainer = document.getElementById("canvas-container");
    return {
      width: canvasContainer.clientWidth,
      height: canvasContainer.clientHeight,
    };
  };
  let stars = [];
  p5.setup = () => {
    const { width, height } = getCanvasSize();
    p5.createCanvas(width, height);
  };

  let t = 0.0;
  function generateStar() {
    stars.push({
      x: p5.random(-p5.width, p5.width) * 3,
      y: p5.random(-p5.height, p5.height) * 3,
      z: 25,
      pz: 25,
    });
  }
  p5.draw = () => {
    p5.clear();
    t += p5.deltaTime;
    if (t > 0.1) {
      t = 0;
      generateStar();
    }
    updateStars();
    showStars();
  };

  function updateStars() {
    stars.forEach((star) => {
      star.pz = star.z;
      star.z -= 0.01 * p5.deltaTime;

      if (star.z < 0) {
        //remove it
        stars = stars.filter((s) => s !== star);
      }
    });
  }
  function showStars() {
    stars.forEach((star) => {
      const x = star.x / star.z + p5.width * 0.5;
      const y = star.y / star.z + p5.height * 0.5;
      const px = star.x / star.pz + p5.width * 0.5;
      const py = star.y / star.pz + p5.height * 0.5;

      p5.stroke(255 - star.z * 10);
      const depthFactor = 1 - star.z / 25.0;
      p5.strokeWeight(depthFactor * depthFactor * 10);
      p5.line(px, py, x, y);
    });
  }

  p5.windowResized = () => {
    const { width, height } = getCanvasSize();
    p5.resizeCanvas(width, height);
  };
}

function P5Canvas() {
  return <ReactP5Wrapper sketch={sketch} />;
}

export default P5Canvas;
