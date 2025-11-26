export interface logro{
    idLogro: number;
    nombre: string;
    descripcion: string;
    dificultad: number;
    rutaImagen: string | null;
    condiciones: string[],
    condicion: Partial<{
      "operaciones_realizadas": number,
      "total": number,
      "tiempo_juego": number,
      "total_bloques": number
      "ultima_operacion": string,
      "resultado_ultima_operacion": string
    }>
  }