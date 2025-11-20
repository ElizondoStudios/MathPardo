import Calculadora from './Calculadora'

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <span className="h4">Calculadora</span>
      <Calculadora />
      <span className="h4">Bloques</span>
      <span className="h4">🏆 Logros</span>
    </div>
  )
}
