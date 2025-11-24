export interface logro{
    idLogro: number;
    nombre: string;
    descripcion: string;
    dificultad: string;
    rutaImagen: string | null;
    condiciones: string[],
    condicion: Partial<{
      "operaciones_realizadas": number,
      "total": number,
      "tiempo_juego": number,
      "total_bloques": number
    }>
  }