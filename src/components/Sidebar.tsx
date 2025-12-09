import Calculadora from './Calculadora'
import LogrosSidebar from './LogrosSidebar';
import { useDispatch } from 'react-redux'
import { verLogros } from '../store/slices/verLogrosSlice'
import BloquesSidebar from './BloquesSidebar';

export default function Sidebar() {
  const dispatch= useDispatch();
  
  return (
    <div className='sidebar user-select-none'>
      <div className='w-100'>
        <span className="h3">Calculadora</span>
        <Calculadora />
      </div>
      <div className='w-100 mt-2'>
        <span className="h3">Bloques</span>
        <BloquesSidebar/>
      </div>
      <div className='w-100 mt-2 cursor-pointer' onClick={() => {dispatch(verLogros())}}>
        <span className="h3">🏆 Logros</span>
        <LogrosSidebar/>
      </div>
    </div>
  )
}
