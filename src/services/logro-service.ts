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
  async getLogrosPorCompletar(){
    const logros: logro[]= await fetch("/src/scripting/logros.json").then(data => data.json())
    const prevLogrosCompletados: logro[]= this.getLogrosCompletados();
    const logrosPorCompletar= logros.filter(logro => !prevLogrosCompletados.some(l => l.idLogro ===logro.idLogro))
    return logrosPorCompletar;
  },
  showLogrosCompletados(logros: logro[]){
    // logros.forEach(logro => {

    // })
  },
  clearLogrosCompletados(){
    localStorage.setItem("logrosCompletados", "[]")
  },
  async validarLogrosCompletados(){
    const total= store.getState().total.value
    const totalBloques= store.getState().totalBloques.value
    const ultimaOperacion= store.getState().ultimaOperacion.value
    const resultadoUltimaOperacion= store.getState().resultadoUltimaOperacion.value
    const operacionesRealizadas= store.getState().operacionesRealizadas.value

    const prevLogrosCompletados: logro[]= this.getLogrosCompletados();
    const newLogrosCompletados: logro[]=[];
    const logrosPorCompletar= await this.getLogrosPorCompletar()
    
    // Imprimir el estado
    console.log("logrosPorCompletar", logrosPorCompletar)
    console.log("total", total)
    console.log("totalBloques", totalBloques)
    console.log("ultimaOperacion", ultimaOperacion)
    console.log("resultadoUltimaOperacion", resultadoUltimaOperacion)
    console.log("operacionesRealizadas", operacionesRealizadas)

    // Validar que logros ya se completaron
    logrosPorCompletar.forEach((logro) => {
      logro.condiciones.forEach((condicion) => {
        const condicionVal= logro.condicion[condicion]

        switch(condicion){
          case "operaciones_realizadas":
            if(operacionesRealizadas >= (condicionVal as number)){
              newLogrosCompletados.push(logro)
            }
            break;
          case "total":
            if(total >= (condicionVal as number)){
              newLogrosCompletados.push(logro)
            }
            break;
          case "total_bloques":
            if(totalBloques >= (condicionVal as number)){
              newLogrosCompletados.push(logro)
            }
            break;
          case "ultima_operacion":
            const reUltimaOperacion= new RegExp((condicionVal as string));
            if(reUltimaOperacion.test(ultimaOperacion)){
              newLogrosCompletados.push(logro)
            }
            break;
          case "resultado_ultima_operacion":
            const reResultadoUltimaOperacion= new RegExp((condicionVal as string));
            if(reResultadoUltimaOperacion.test(resultadoUltimaOperacion)){
              newLogrosCompletados.push(logro)
            }
            break;
        }
      })
    })

    console.log("Nuevos logros completados", newLogrosCompletados)
    console.log("Prev logros completados", prevLogrosCompletados)
    this.setLogrosCompletados([...prevLogrosCompletados, ...newLogrosCompletados])
  },
}

export default logroService;