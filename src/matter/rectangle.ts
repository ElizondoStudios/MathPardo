import Matter from "matter-js";
export default class MatterRectangle {
  private body: Matter.Body;
  private world: Matter.World;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    options: Matter.IChamferableBodyDefinition = {},
    World: Matter.World
  ) {
    this.body = Matter.Bodies.rectangle(x, y, width, height, options);
    this.world = World;
    Matter.Composite.add(this.world, this.body);
  }

  getBody(): Matter.Body {
    return this.body;
  }

  setPosition(x: number, y: number): void {
    Matter.Body.setPosition(this.body, { x, y });
  }

  kill(): void {
    Matter.World.remove(this.world, this.body);
  }
}
