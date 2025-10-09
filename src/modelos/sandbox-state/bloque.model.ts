import type { Color } from './color.type'

export interface Bloque {
    coordX : number,
    coordY : number,
    valorMostrado : string,
    valor : number,
    tamanio : number,
    color : Color
}