import React from 'react'
import { noVerLogros } from '../store/slices/verLogrosSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import './Logros.css'
import userService from '../services/user-service';

export default function Logros() {
  // Redux
  const dispatch= useDispatch();
  const mostrar= useSelector((state: any) => (state.verLogros.value))
  const nombreUsuario= userService.getUserName();

  return (
    mostrar && (
      <div className='logros'>
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
        </div>
      </div>
    )
  )
}
