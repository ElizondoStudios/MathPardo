import type { Dificultad } from "./dificultad.enum"
import type { LogroCondicion } from "./logro-condicion.type"

export interface Logro {
    idLogro : number,
    nombre : string,
    descripcion : string,
    imagenUrl : string,
    dificultad : Dificultad,
    condicion : LogroCondicion
}