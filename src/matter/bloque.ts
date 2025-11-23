import MatterRectangle from "./rectangle";
import type { sizes } from "../models/bloque";

export default class Bloque extends MatterRectangle {
  constructor(init: {x: number, y: number, world: Matter.World, size: sizes}) {
    const imgWidth= 500;
    const width= Math.max(Math.sqrt((20*20)*init.size)-2*Math.floor(init.size/10), 10);
    const imgName= `Bloque${init.size}.png`;

    super(
      init.x,
      init.y,
      width,
      width,
      {
        render: {
          sprite: { texture: `/src/assets/${imgName}`, xScale: width/imgWidth, yScale: width/imgWidth },
        },
      },
      init.world
    );
  }
}
