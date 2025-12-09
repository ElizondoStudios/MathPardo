import React, { useState, useEffect, useRef } from 'react'
import './LogrosOverlay.css'
import { useDispatch, useSelector } from 'react-redux'
import type { logro } from '../models/logro';
import { clearNewLogrosCompletados } from '../store/slices/logrosSlice';
import confetti from 'canvas-confetti'

const screenTime= 4000

export default function LogrosOverlay() {
  const dispatch= useDispatch();
  const logrosSlice= useSelector((state: any) => state.logros.value);
  const [logroActual, setLogroActual]= useState<logro | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio('/src/assets/music/achievement.mp3')
      audio.preload = 'auto'
      audioRef.current = audio
    }
  }, [])

  const lanzarConfetti = () => {
    // Play achievement sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(err => console.error('Error playing sound:', err))
    }

    setTimeout(() => {
      if (canvasRef.current) {
        const myConfetti = confetti.create(canvasRef.current, {
          resize: true,
          useWorker: true
        })

        myConfetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
      }
    }, 100)
  }

  useEffect(() => {
    const newLogros= logrosSlice.newLogrosCompletados
    if(newLogros?.length ===1){
      setLogroActual(newLogros[0])
      lanzarConfetti()
      setTimeout(() => {
        setLogroActual(null)
        dispatch(clearNewLogrosCompletados())
      }, screenTime)
    }else if(newLogros?.length > 1){
      setLogroActual(newLogros[0])
      lanzarConfetti()

      newLogros.slice(1).forEach((logro, index) => {
        setTimeout(() => {
          setLogroActual(logro)
          lanzarConfetti()
        }, (index + 1) * screenTime)
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
        <canvas 
          ref={canvasRef}
          width={window.innerWidth}
          height={window.innerHeight}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="h1">¡Logro Completado!</span>
          <img 
            src={logroActual.dificultad===1? "/src/assets/mathpardo_logro_facil2.png": logroActual.dificultad===2? "/src/assets/mathpardo_logro_dificil.png": "/src/assets/mathpardo_logro_secreto.png"} 
            alt="logro"
          />
          <span className="h2">
            {logroActual.nombre}
          </span>
        </div>
      </div>
    )
  )
}
