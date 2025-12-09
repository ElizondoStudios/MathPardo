import { useEffect, useMemo, useState } from 'react'
import { noVerLogros } from '../store/slices/verLogrosSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import './Logros.css'
import userService from '../services/user-service';
import type { logro } from '../models/logro';

export default function Logros() {
  // Redux
  const dispatch= useDispatch();
  const mostrar= useSelector((state: any) => (state.verLogros.value))
  const logrosReducer= useSelector((state: any) => (state.logros.value))
  const nombreUsuario= userService.getUserName();

  // State
  const [logros, setLogros]= useState<(logro & {completado: boolean})[]>([])

  // Effects
  useEffect(() => {
    setLogros([
      ...logrosReducer.logrosCompletados.map((logro: logro) => ({...logro, completado: true})),
      ...logrosReducer.logrosPorCompletar.map((logro: logro) => ({...logro, completado: false})),
    ])
  }, [logrosReducer])

  // Util
  const renderLogro= (logro: logro & {completado: boolean}) => (
    <div className="col-6 content-center" key={`logro-${logro.idLogro}`}>
      <div className="w-50 d-flex align-items-start justify-content-start flex-column">
        <span className='fs-4'>{logro.nombre}</span>
        {
          logro.dificultad===3 && !logro.completado?
            (<span className='fs-3'>Bloqueado</span>)
          :
            (<span className='fs-3'>{logro.descripcion}</span>)
        }
      </div>
      <div className="w-50 content-center p-4">
        {
          logro.completado?
          (
            <img 
              src={logro.dificultad===1? "/src/assets/mathpardo_logro_facil2.png": logro.dificultad===2? "/src/assets/mathpardo_logro_dificil.png": "/src/assets/mathpardo_logro_secreto.png"} 
              alt="logro"
            />
          ):
          (
            <div className="logro-vacio"></div>
          )
        }
      </div>
    </div>
  )

  // Memoization
  const logrosFaciles= useMemo(() => {
    if(logros.length > 0){
      return logros.filter(logro => (logro.dificultad===1)).map((logro) => (
        renderLogro(logro)
      ))
    }
  }, [logros])
  
  const logrosDificiles= useMemo(() => {
    if(logros.length > 0){
      return logros.filter(logro => (logro.dificultad===2)).map((logro) => (
        renderLogro(logro)
      ))
    }
  }, [logros])
  
  const logrosSecretos= useMemo(() => {
    if(logros.length > 0){
      return logros.filter(logro => (logro.dificultad===3)).map((logro) => (
        renderLogro(logro)
      ))
    }
  }, [logros])

  return (
    <div className={"logros user-select-none " + (mostrar? "d-flex": "d-none")} >
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <img className='pardito-celebrando' src="/src/assets/math_pardo_pardito_celebrando.png" alt="Pardito celebrando" />
          </div>
          <div className="col-6 content-center">
            <h2>🏆 Logros de {nombreUsuario}</h2>
          </div>
          <div className="col-3 d-flex align-items-start justify-content-end">
            <div onClick={() => {dispatch(noVerLogros())}} className='cursor-pointer'>
              <span className="h3 text-light">Regresar &gt;</span>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12 mb-2 separador-dificultad">
            <span className="h3">Fácil:</span>
          </div>
          {logrosFaciles}
        </div>
        <div className="row mt-5">
          <div className="col-12 mb-2 separador-dificultad">
            <span className="h3">Difícil:</span>
          </div>
          {logrosDificiles}
        </div>
        <div className="row mt-5">
          <div className="col-12 mb-2 separador-dificultad">
            <span className="h3">Secreto:</span>
          </div>
          {logrosSecretos}
        </div>
      </div>
    </div>
  )
}
