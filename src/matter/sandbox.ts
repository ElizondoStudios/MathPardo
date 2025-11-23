import Matter from "matter-js";

export default function sandbox(
  element: HTMLElement,
  width: number,
  height: number
) {
  const wallWidth = 1024;

  Matter.use("matter-wrap");

  var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composite = Matter.Composite,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Bodies = Matter.Bodies;

  // Engine
  var engine = Engine.create(),
    world = engine.world;

  engine.positionIterations = 60;
  engine.velocityIterations = 60;
  engine.constraintIterations = 60;
  engine.gravity.y = 1;

  // Renderer
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
      background: "transparent",
    },
  });

  Render.run(render);

  // Runner
  var runner = Runner.create();
  Runner.run(runner, engine);

  // Suelo
  Composite.add(world, [
    Bodies.rectangle(width / 2, height + wallWidth / 2 - 10, width, wallWidth, {
      isStatic: true,
      render: { fillStyle: "#CAE6E9" },
      friction: 0.1,
      frictionAir: 0.01,
      restitution: 0.3
    }),
  ]);

  // Paredes
  Composite.add(world, [
    Bodies.rectangle(-wallWidth / 2 + 15, height / 2, wallWidth, height, {
      isStatic: true,
      render: { fillStyle: "#CAE6E9" },
      friction: 0.1,
      frictionAir: 0.01,
      restitution: 0.3
    }),
    Bodies.rectangle(width + wallWidth / 2 - 15, height / 2, wallWidth, height, {
      isStatic: true,
      render: { fillStyle: "#CAE6E9" },
      friction: 0.1,
      frictionAir: 0.01,
      restitution: 0.3
    }),
  ]);

  // Mouse Control
  var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 1,
        render: {
          visible: false,
        },
      },
    });

  Composite.add(world, mouseConstraint);

  // Sincronizar el mouse con el render
  render.mouse = mouse;

  // Soltar objeto si el mouse sale del canvas o si hay un mouseup global
  render.canvas.addEventListener("mouseleave", () => {
    // forzamos la liberación de cualquier cuerpo sujeto por la constraint
    if (mouseConstraint && mouseConstraint.constraint) {
      (mouseConstraint.constraint as any).bodyB = null;
      (mouseConstraint.constraint as any).pointB = null;
    }
    // resetear estado interno del mouse (uso de any para evitar errores de typings)
    (mouse as any).button = -1;
  });

  // también aseguramos soltar al recibir mouseup fuera del canvas
  window.addEventListener("mouseup", () => {
    if (mouseConstraint && mouseConstraint.constraint) {
      (mouseConstraint.constraint as any).bodyB = null;
      (mouseConstraint.constraint as any).pointB = null;
    }
  });

  // Acomodar el viewport
  Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: width, y: height },
  });

  // Matter wrap
  var allBodies = Composite.allBodies(world);

  for (var i = 0; i < allBodies.length; i += 1) {
    allBodies[i].plugin.wrap = {
      min: { x: render.bounds.min.x - 100, y: render.bounds.min.y },
      max: { x: render.bounds.max.x + 100, y: render.bounds.max.y },
    };
  }

  // Contexto para MatterTools.Demo
  return {
    engine: engine,
    runner: runner,
    render: render,
    canvas: render.canvas,
    world: world,
    stop: function () {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
    },
  };
}
