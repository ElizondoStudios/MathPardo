import React from 'react'
import './Calculadora.css'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setTotal } from '../store/slices/totalSlice';
import { agregarOperacionRealizada } from '../store/slices/operacionesRealizadasSlice';
import { setUltimaOperacionRealizada } from '../store/slices/ultimaOperacionSlice';
import { setResultadoUltimaOperacion } from '../store/slices/resultadoUltimaOperacionSlice';

const operadores= '+-*/=';
const numeros= '0123456789';

export default function Calculadora() {
  // Redux
  const total= useSelector((state: any) => state.total.value);
  const ultimaOperacion= useSelector((state: any) => state.ultimaOperacion.value);
  const dispatch = useDispatch();
  
  // State
  const [expresion, setExpresion]= React.useState("");

  // Effects
  React.useEffect(() => {
    setExpresion(`${total}`);
  }, [total, ultimaOperacion]);
  
  // Util
  const sePuedeInsertarOperador= () => {
    return !operadores.includes(expresion.at(-1));
  }

  const calcularResultado= () => {
    try {
      // Usar eval es peligroso, pero para este caso de uso simple y controlado está bien
      if(operadores.includes(expresion.at(-1))) return; // Evitar evaluar si termina en operador
      if(expresion.length === 0) return;

      const resultado = eval(expresion);
      dispatch(setTotal(resultado.toFixed(2)));
      dispatch(agregarOperacionRealizada())
      dispatch(setUltimaOperacionRealizada(expresion))
      dispatch(setResultadoUltimaOperacion(resultado))
    } catch (error) {
      console.error("Error al calcular el resultado:", error);
      setExpresion("Error");
    }
  }

  return (
    <div className='calculadora'>
      <div className="pantalla">
        {expresion}
      </div>
      <div className="boton" onClick={() => setExpresion(`${total}`)} id="clear">C</div>
      <div className="boton" onClick={() => setExpresion(expresion.slice(0, -1))} id="backspace">←</div>
      <div className="boton" onClick={() => setExpresion(`${expresion}1`)} id="1">1</div>
      <div className="boton" onClick={() => setExpresion(`${expresion}2`)} id="2">2</div>
      <div className="boton" onClick={() => setExpresion(`${expresion}3`)} id="3">3</div>
      <div className="boton" onClick={() => sePuedeInsertarOperador() && setExpresion(`${expresion}+`)} id="plus">+</div>
      <div className="boton" onClick={() => setExpresion(`${expresion}4`)} id="4">4</div>
      <div className="boton" onClick={() => setExpresion(`${expresion}5`)} id="5">5</div>
      <div className="boton" onClick={() => setExpresion(`${expresion}6`)} id="6">6</div>
      <div className="boton" onClick={() => sePuedeInsertarOperador() && setExpresion(`${expresion}-`)} id="minus">-</div>
      <div className="boton" onClick={() => setExpresion(`${expresion}7`)} id="7">7</div>
      <div className="boton" onClick={() => setExpresion(`${expresion}8`)} id="8">8</div>
      <div className="boton" onClick={() => setExpresion(`${expresion}9`)} id="9">9</div>
      <div className="boton" onClick={() => sePuedeInsertarOperador() && setExpresion(`${expresion}*`)} id="multiply">x</div>
      <div className="boton" onClick={() => setExpresion(`${expresion}0`)} id="0">0</div>
      <div className="boton" onClick={() => calcularResultado()} id="equals">=</div>
      <div className="boton" onClick={() => sePuedeInsertarOperador() && setExpresion(`${expresion}/`)} id="divide">÷</div>
    </div>
  )
}
