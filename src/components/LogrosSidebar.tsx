import React, { useEffect, useMemo, useState } from 'react'
import logroService from '../services/logro-service'
import { useSelector } from 'react-redux';
import type { logro } from '../models/logro';

export default function LogrosSidebar() {
  const operacionesRealizadas= useSelector((state: any) => state.operacionesRealizadas.value);
  const [logrosPorCompletar, setLogrosPorCompletar]= useState<logro[]>([])

  useEffect(() => {
    logroService.getLogrosPorCompletar().then((logros) => {
      setLogrosPorCompletar(logros)
    })
  }, [operacionesRealizadas])
  
  return (
    <div className='logros-sidebar'>
      <ul>
        { 
          logrosPorCompletar.slice(0, 3).map((logro, index) => (
            <li className='fs-4' key={`logro-${index}`}>
              {logro.nombre}
            </li>
          ))
        }
      </ul>
    </div>
  )
}
