import type { Bloque } from "./bloque.model"

export interface SandboxState {
    bloques : Bloque[],
    valorTotal : number
}