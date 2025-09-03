import "./App.css";
import Matter from "matter-js";
import { useEffect, useRef } from "react";

function sandbox(element: HTMLElement, width: number, height: number) {
  const wallWidth = 20;

  Matter.use("matter-wrap");

  var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composite = Matter.Composite,
    Composites = Matter.Composites,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Bodies = Matter.Bodies;

  // create engine
  var engine = Engine.create(),
    world = engine.world;

  // create renderer
  var render = Render.create({
    element: element,
    engine: engine,
    bounds: {
      min: { x: 0, y: 0 },
      max: { x: width, y: height },
    },
    options: {
      width: width,
      height: height,
      showAngleIndicator: false,
      wireframes: false,
      background: "#fff",
    },
  });

  Render.run(render);

  // create runner
  var runner = Runner.create();
  Runner.run(runner, engine);

  // Suelo
  Composite.add(world, [
    Bodies.rectangle(width / 2, height - wallWidth / 2, width, wallWidth, {
      isStatic: true,
      render: { fillStyle: "#1e1e1e" },
    }),
  ]);

  // Paredes
  Composite.add(world, [
    Bodies.rectangle(wallWidth / 2, height / 2, wallWidth, height, {
      isStatic: true,
      render: { fillStyle: "#1e1e1e" },
    }),
    Bodies.rectangle(width - wallWidth / 2, height / 2, wallWidth, height, {
      isStatic: true,
      render: { fillStyle: "#1e1e1e" },
    }),
  ]);

  var stack = Composites.stack(100, 0, 10, 8, 10, 10, function (x, y) {
    return Bodies.circle(x, y, Common.random(15, 30));
  });

  Composite.add(world, [
    stack,
    Bodies.polygon(200, 460, 3, 60),
    Bodies.polygon(400, 460, 5, 60),
    Bodies.rectangle(600, 460, 80, 80),
  ]);

  // add mouse control
  var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

  Composite.add(world, mouseConstraint);

  // keep the mouse in sync with rendering
  render.mouse = mouse;

  // fit the render viewport to the scene
  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: width, y: height },
  });

  // wrapping using matter-wrap plugin
  var allBodies = Composite.allBodies(world);

  for (var i = 0; i < allBodies.length; i += 1) {
    allBodies[i].plugin.wrap = {
      min: { x: render.bounds.min.x - 100, y: render.bounds.min.y },
      max: { x: render.bounds.max.x + 100, y: render.bounds.max.y },
    };
  }

  // context for MatterTools.Demo
  return {
    engine: engine,
    runner: runner,
    render: render,
    canvas: render.canvas,
    stop: function () {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
    },
  };
}

function App() {
  const hasRun = useRef(false);
  useEffect(() => {
    // Para que no se ejecute más de una vez en dev
    if (hasRun.current) return;
    hasRun.current = true;

    const element = document.getElementById("sandbox");
    const width = element.getBoundingClientRect().width;
    const height = element.getBoundingClientRect().height;
    if (element) {
      sandbox(element, width, height);
    }
  }, []);

  return (
    <>
      <div id="sandbox"></div>
    </>
  );
}

export default App;
