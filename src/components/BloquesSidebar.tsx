import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sumar } from "../store/slices/totalSlice";
import { sumarTotalBloques } from "../store/slices/totalBloquesSlice";
import { setResultadoUltimaOperacion } from "../store/slices/resultadoUltimaOperacionSlice";
import { setUltimaOperacionRealizada } from "../store/slices/ultimaOperacionSlice";
import { agregarOperacionRealizada } from "../store/slices/operacionesRealizadasSlice";

export default function BloquesSidebar() {
  const dispatch = useDispatch();
  const total= useSelector((state: any) => state.total.value);

  const agregarBloque = (cantidad: number) => {
    dispatch(sumar(cantidad));
    dispatch(sumarTotalBloques(1));
    dispatch(setResultadoUltimaOperacion(`${total+cantidad}`))
    dispatch(setUltimaOperacionRealizada(`${total}+${cantidad}`))
    dispatch(agregarOperacionRealizada())
  };

  return (
    <div className="bloques-sidebar content-center py-2">
      <div
        className="w-50 content-center"
        onClick={() => {
          agregarBloque(5);
        }}
      >
        <img
          className="img-fluid w-50"
          src="/src/assets/Bloque5.png"
          alt="Bloque 5"
        />
      </div>
      <div
        className="w-50 content-center"
        onClick={() => {
          agregarBloque(10);
        }}
      >
        <img
          className="img-fluid"
          src="/src/assets/Bloque10.png"
          alt="Bloque 10"
        />
      </div>
    </div>
  );
}
