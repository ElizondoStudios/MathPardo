import type { logro } from "../models/logro"

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
    const logros: logro[]= await fetch("/src/scripting/logros.json").then(data => data.json())
    const logrosCompletados: logro[]= this.getLogrosCompletados();
    const logrosPorCompletar= logros.filter(logro => !logrosCompletados.some(l => l.idLogro ===logro.idLogro))
    console.log("logrosPorCompletar", logrosPorCompletar)
  },
}

export default logroService;