import MatterRectangle from "./rectangle";

export default class Bloque5 extends MatterRectangle {
  constructor(x: number, y: number, world: Matter.World) {
    super(x, y, 50, 50, { render: { fillStyle: "red" } }, world);
  }
}
