import type { logro } from "../models/logro"
import store from "../store/store"

const logroService= {
  getLogrosCompletados(): logro[]{
    return JSON.parse(localStorage.getItem("logrosCompletados")) || []
  },
  setLogrosCompletados(logros: logro[]){
    localStorage.setItem("logrosCompletados", JSON.stringify(logros))
  },
  agregarLogroCompletado(logro: logro){
    const tempLogros= this.getLogrosCompletados();
    localStorage.setItem("logrosCompletados", JSON.stringify([...tempLogros, logro]))
  },
  async validarLogrosCompletados(){
    const total= store.getState().total
    const totalBloques= store.getState().totalBloques
    const ultimaOperacion= store.getState().ultimaOperacion
    const resultadoUltimaOperacion= store.getState().resultadoUltimaOperacion
    const operacionesRealizadas= store.getState().operacionesRealizadas

    const logros: logro[]= await fetch("/src/scripting/logros.json").then(data => data.json())
    const logrosCompletados: logro[]= this.getLogrosCompletados();
    const logrosPorCompletar= logros.filter(logro => !logrosCompletados.some(l => l.idLogro ===logro.idLogro))
    console.log("logrosPorCompletar", logrosPorCompletar)
    console.log("estado", total, totalBloques, ultimaOperacion, resultadoUltimaOperacion, operacionesRealizadas)
  },
}

export default logroService;