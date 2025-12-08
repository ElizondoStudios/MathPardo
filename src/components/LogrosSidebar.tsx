import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

export default function LogrosSidebar() {
  const logros= useSelector((state: any) => state.logros.value);

  const logrosList= useMemo(() => {
    return(
      logros.logrosPorCompletar.slice(0, 3).map((logro, index) => (
        <li className='fs-4' key={`logro-${index}`}>
          {logro.nombre}
        </li>
      ))
    )
  }, [logros])

  return (
    <div className='logros-sidebar'>
      <ul>
        { logrosList }
      </ul>
    </div>
  )
}
