import "./App.css";

import { useEffect, useRef, useState } from "react";

import sandbox from "./matter/sandbox";

import Bloque from "./matter/bloque";
import Sidebar from "./components/Sidebar";
import Pardito from "./components/Pardito";

import type { sizes } from "./models/bloque";
import type Matter from "matter-js";

const bloquesSize: sizes[] = [1000, 500, 100, 50, 10, 5, 1];

function App() {
  // State
  const [suma, setSuma]= useState(2342)
  const [matterWorld, setMatterWorld]= useState<Matter.World>(null)
  const [canvasWidth, setCanvasWidth]= useState(0)
  const [canvasHeight, setCanvasHeight]= useState(0)

  // Refs
  const hasRun = useRef(false);

  // Effects
  useEffect(() => {
    // Para que no se ejecute más de una vez en dev
    if (hasRun.current) return;
    hasRun.current = true;

    const element = document.getElementById("sandbox");
    const width = element.getBoundingClientRect().width;
    const height = element.getBoundingClientRect().height;
    if (element) {
      const { world } = sandbox(element, width, height);
      setMatterWorld(world)
      setCanvasWidth(width)
      setCanvasHeight(height)
    }
  }, []);

  useEffect(() => {
    // Renderizar bloques cuando cambia la suma
    if(matterWorld){
      let sumaTemp= suma;

      bloquesSize.forEach(size => {
        const cantidad= Math.floor(sumaTemp/size);
        sumaTemp= sumaTemp - cantidad*size;

        Array.from({length: cantidad}, () =>
          new Bloque({
            x: canvasWidth/2 + (Math.random()-0.5)*50,
            y: canvasHeight/2 + (Math.random()-0.5)*50,
            world: matterWorld,
            size: size
          })
        );
      })
    }
  }, [suma, matterWorld])

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center p-0">
      <div id="sandbox"></div>
      <Sidebar></Sidebar>
      <Pardito></Pardito>
    </div>
  );
}

export default App;
