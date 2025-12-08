import React, { useState, useEffect } from 'react'
import './LogrosOverlay.css'
import { useDispatch, useSelector } from 'react-redux'
import type { logro } from '../models/logro';
import { clearNewLogrosCompletados } from '../store/slices/logrosSlice';

const screenTime= 4000

export default function LogrosOverlay() {
  const dispatch= useDispatch();
  const logrosSlice= useSelector((state: any) => state.logros.value);
  const [logroActual, setLogroActual]= useState<logro | null>(null)

  useEffect(() => {
    const newLogros= logrosSlice.newLogrosCompletados
    if(newLogros?.length ===1){
      setLogroActual(newLogros[0])
      setTimeout(() => {
        setLogroActual(null)
        dispatch(clearNewLogrosCompletados())
      }, screenTime)
    }else if(newLogros?.length > 1){
      setLogroActual(newLogros[0])

      newLogros.slice(1).forEach(logro => {
        setTimeout(() => {
          setLogroActual(logro)
        }, screenTime)
      });

      setTimeout(() => {
        dispatch(clearNewLogrosCompletados())
        setLogroActual(null)
      }, newLogros.length*screenTime)
    }
  }, [logrosSlice.newLogrosCompletados])

  return (
    logroActual && (
      <div className='logros-overlay content-center user-select-none'>
        <span className="h1">¡Logro Completado!</span>
        <img 
          src={logroActual.dificultad===1? "/src/assets/mathpardo_logro_facil2.png": logroActual.dificultad===2? "/src/assets/mathpardo_logro_dificil.png": "/src/assets/mathpardo_logro_secreto.png"} 
          alt="logro"
        />
        <span className="h2">
          {logroActual.nombre}
        </span>
      </div>
    )
  )
}
