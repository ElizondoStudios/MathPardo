import { LogroCompletado } from "./logros/logro-completado.model"
import { SandboxState } from "./sandbox-state/sandbox-state.model"

export interface UsuarioInfo {
    nombre : string,
    usuario : string,
    fechaNacimiento? : Date,
    progreso : LogroCompletado[],
    sandboxState : SandboxState
}