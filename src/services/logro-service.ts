import type { logro } from "../models/logro"
import { clearNewLogrosCompletados, setLogrosCompletados, setLogrosPorCompletar, setNewLogrosCompletados } from "../store/slices/logrosSlice"
import store from "../store/store"

const getLogrosPorCompletar= async () => {
  const logros: logro[]= await fetch("/src/scripting/logros.json").then(data => data.json())
  const prevLogrosCompletados: logro[]= JSON.parse(localStorage.getItem("logrosCompletados")) || []
  const logrosPorCompletar= logros.filter(logro => !prevLogrosCompletados.some(l => l.idLogro ===logro.idLogro))
  return logrosPorCompletar;
}

const getLogrosCompletados= () => {
  return JSON.parse(localStorage.getItem("logrosCompletados")) || []
}

const logroService= {
  // Init
  async init(){
    const logrosCompletados= getLogrosCompletados()
    const logrosPorCompletar= await getLogrosPorCompletar()
    store.dispatch(setLogrosCompletados(logrosCompletados))
    store.dispatch(setLogrosPorCompletar(logrosPorCompletar))
  },
  // Completados
  setLogrosCompletados(logros: logro[]){
    store.dispatch(setLogrosCompletados(logros))
    localStorage.setItem("logrosCompletados", JSON.stringify(logros))
  },
  clearLogrosCompletados(){
    store.dispatch(setLogrosCompletados([]))
    localStorage.setItem("logrosCompletados", "[]")
  },
  async validarLogrosCompletados(){
    const total= store.getState().total.value
    const totalBloques= store.getState().totalBloques.value
    const ultimaOperacion= store.getState().ultimaOperacion.value
    const resultadoUltimaOperacion= store.getState().resultadoUltimaOperacion.value
    const operacionesRealizadas= store.getState().operacionesRealizadas.value
    store.dispatch(clearNewLogrosCompletados())

    const prevLogrosCompletados: logro[]= getLogrosCompletados();
    const newLogrosCompletados: logro[]=[];
    const logrosPorCompletar= await getLogrosPorCompletar()
    
    // Imprimir el estado
    // console.log("logrosPorCompletar", logrosPorCompletar)
    // console.log("total", total)
    // console.log("totalBloques", totalBloques)
    // console.log("ultimaOperacion", ultimaOperacion)
    // console.log("resultadoUltimaOperacion", resultadoUltimaOperacion)
    // console.log("operacionesRealizadas", operacionesRealizadas)

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

    this.setLogrosCompletados([...prevLogrosCompletados, ...newLogrosCompletados])
    store.dispatch(setNewLogrosCompletados(newLogrosCompletados))
  },
}

export default logroService;