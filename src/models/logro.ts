type condicion= "operaciones_realizadas" | "total" | "total_bloques" | "ultima_operacion" |  "resultado_ultima_operacion"

export interface logro{
    idLogro: number;
    nombre: string;
    descripcion: string;
    dificultad: number;
    rutaImagen: string | null;
    condiciones: condicion[],
    condicion: Partial<{
      "operaciones_realizadas": number,
      "total": number,
      "total_bloques": number
      "ultima_operacion": string,
      "resultado_ultima_operacion": string
    }>
  }