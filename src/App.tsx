import "./App.css";
import { useEffect, useRef } from "react";
import sandbox from "./matter/sandbox";
import Bloque5 from "./matter/bloque5";
import Bloque10 from "./matter/bloque10";

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
      new Bloque5(width / 2, 0, world);
      new Bloque5(width / 2, 0, world);
      new Bloque5(width / 2, 0, world);
      new Bloque10(width / 2 + 60, 0, world);
      new Bloque10(width / 2 + 60, 0, world);
      new Bloque10(width / 2 + 60, 0, world);
    }
  }, []);

  return (
    <>
      <div id="sandbox"></div>
    </>
  );
}

export default App;
