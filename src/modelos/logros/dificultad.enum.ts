export const Dificultad = {
    Facil : "Facil",
    Medio : "Medio",
    Dificil : "Dificil",
    Secreto : "Secreto"
} as const;

export type Dificultad = (typeof Dificultad)[keyof typeof Dificultad];