export type Posicion =
  | "Portero"
  | "Defensa"
  | "Centrocampista"
  | "Delantero"

export interface Jugador {
  id?: string
  nombre: string
  edad: number
  posicion: Posicion
  equipo: string
}
