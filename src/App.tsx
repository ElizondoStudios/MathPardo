import "./App.css";

import { useEffect, useRef, useState } from "react";

import sandbox from "./matter/sandbox";

import Bloque from "./matter/bloque";
import Sidebar from "./components/Sidebar";
import Pardito from "./components/Pardito";
import Logros from "./components/Logros";

import type { sizes } from "./models/bloque";
import Matter from "matter-js";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import logroService from "./services/logro-service";
import { setTotalBloques } from "./store/slices/totalBloquesSlice";
import LogrosOverlay from "./components/LogrosOverlay";
import { setTotal } from "./store/slices/totalSlice";

const bloquesSize: sizes[] = [1000, 500, 100, 50, 10, 5, 1, 0.5, 0.1];

function App() {
  // Redux
  const total= useSelector((state: any) => state.total.value);
  const operacionesRealizadas= useSelector((state: any) => state.operacionesRealizadas.value);
  const dispatch = useDispatch();

  // State
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

    // Inicializar el slice de logros
    logroService.init()
    dispatch(setTotal(5))

    // Pruebas
    // logroService.clearLogrosCompletados()
  }, []);

  useEffect(() => {
    // Renderizar bloques cuando cambia la suma
    if (matterWorld) {
      console.log(matterWorld);
      // Limpiar sólo los cuerpos dinámicos (no remover constraints como el mouse)
      const allBodies = Matter.Composite.allBodies(matterWorld);
      allBodies.forEach((b) => {
        if (!b.isStatic) {
          Matter.Composite.remove(matterWorld, b);
        }
      });

      let sumaTemp = total;
      let cantidadBloques= 0;

      bloquesSize.forEach((size) => {
        const cantidad = Math.floor(sumaTemp / size);
        sumaTemp = sumaTemp - cantidad * size;

        Array.from({ length: cantidad }, () =>
          {
            cantidadBloques++;
            return (
                new Bloque({
                x: canvasWidth / 2 + (Math.random() - 0.5) * 50,
                y: canvasHeight / 2 + (Math.random() - 0.5) * 50,
                world: matterWorld,
                size: size,
              })
            )
          }
        );
      });

      dispatch(setTotalBloques(cantidadBloques))      
    }

    // Validar logros completados
    logroService.validarLogrosCompletados();
  }, [operacionesRealizadas, total])

  // util
  const formatSuma= (num: number)=> {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <>
      <LogrosOverlay/>
      <Logros></Logros>
      <div className="container-fluid d-flex align-items-center justify-content-center p-0">
        <div id="sandbox">
          <div className="suma"> ={formatSuma(total)}</div>
        </div>
        <Sidebar></Sidebar>
        <Pardito></Pardito>
      </div>
    </>
  );
}

export default App;
