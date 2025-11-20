import React from 'react'
import './Calculadora.css'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { sumar } from '../store/slices/sumaSlice';

export default function Calculadora() {
  // Redux
  const suma= useSelector((state: any) => state.suma.value);
  const dispatch = useDispatch();
  // State
  const [valor, setValor]= React.useState(`${suma}`);
  
  return (
    <div className='calculadora'>
      <div className="pantalla">
        {valor}
      </div>
      <div className="boton" id="clear">C</div>
      <div className="boton" id="backspace">←</div>
      <div className="boton" id="1">1</div>
      <div className="boton" id="2">2</div>
      <div className="boton" id="3">3</div>
      <div className="boton" id="plus">+</div>
      <div className="boton" id="4">4</div>
      <div className="boton" id="5">5</div>
      <div className="boton" id="6">6</div>
      <div className="boton" id="minus">-</div>
      <div className="boton" id="7">7</div>
      <div className="boton" id="8">8</div>
      <div className="boton" id="9">9</div>
      <div className="boton" id="multiply">x</div>
      <div className="boton" id="0">0</div>
      <div className="boton" id="equals">=</div>
      <div className="boton" id="divide">÷</div>
    </div>
  )
}
