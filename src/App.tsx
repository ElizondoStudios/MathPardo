import "./App.css";
import { useEffect, useRef } from "react";
import sandbox from "./matter/sandbox";
import Bloque5 from "./matter/bloque5";

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
      const { world } = sandbox(element, width, height);
      const box = new Bloque5(80, 80, world);

      console.log("box", box);
    }
  }, []);

  return (
    <>
      <div id="sandbox"></div>
    </>
  );
}

export default App;
