import Calculadora from './Calculadora'
import { useDispatch } from 'react-redux'
import { verLogros } from '../store/slices/verLogrosSlice'

export default function Sidebar() {
  const dispatch= useDispatch();
  
  return (
    <div className='sidebar'>
      <div className='w-100'>
        <span className="h4">Calculadora</span>
        <Calculadora />
      </div>
      <div className='w-100 mt-2'>
        <span className="h4">Bloques</span>
      </div>
      <div className='w-100 mt-2 cursor-pointer' onClick={() => {dispatch(verLogros())}}>
        <span className="h4">🏆 Logros</span>
      </div>
    </div>
  )
}
