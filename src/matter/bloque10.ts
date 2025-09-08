import MatterRectangle from "./rectangle";

export default class Bloque10 extends MatterRectangle {
  constructor(x: number, y: number, world: Matter.World) {
    super(
      x,
      y,
      70,
      70,
      {
        render: {
          sprite: { texture: "/src/assets/10.png", xScale: 0.7, yScale: 0.7 },
        },
      },
      world
    );
  }
}
