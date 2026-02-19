import { useState, useEffect } from "react"
import { collection, addDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"
import type { Jugador, Posicion } from "../types"

interface Props {
  jugadorEditando: Jugador | null
  cancelarEdicion: () => void
}

export default function JugadorForm({ jugadorEditando, cancelarEdicion }: Props) {

  const [nombre, setNombre] = useState("")
  const [edad, setEdad] = useState<number>(0)
  const [posicion, setPosicion] = useState<Posicion>("Portero")
  const [equipo, setEquipo] = useState("")

  useEffect(() => {
    if (jugadorEditando) {
      setNombre(jugadorEditando.nombre)
      setEdad(jugadorEditando.edad)
      setPosicion(jugadorEditando.posicion)
      setEquipo(jugadorEditando.equipo)
    }
  }, [jugadorEditando])

  const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {

      if (jugadorEditando) {
        const jugadorRef = doc(db, "jugadores", jugadorEditando.id!)

        await updateDoc(jugadorRef, {
          nombre,
          edad,
          posicion,
          equipo
        })

        cancelarEdicion()

      } else {
        await addDoc(collection(db, "jugadores"), {
          nombre,
          edad,
          posicion,
          equipo
        })
      }

      setNombre("")
      setEdad(0)
      setPosicion("Portero")
      setEquipo("")

    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <form onSubmit={manejarEnvio}>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
      />

      <input
        type="number"
        value={edad}
        onChange={(e) => setEdad(Number(e.target.value))}
        placeholder="Edad"
      />

      <select
        value={posicion}
        onChange={(e) => setPosicion(e.target.value as Posicion)}
      >
        <option value="Portero">Portero</option>
        <option value="Defensa">Defensa</option>
        <option value="Centrocampista">Centrocampista</option>
        <option value="Delantero">Delantero</option>
      </select>

      <input
        type="text"
        value={equipo}
        onChange={(e) => setEquipo(e.target.value)}
        placeholder="Equipo"
      />

      <button type="submit">
        {jugadorEditando ? "Actualizar" : "Guardar"}
      </button>

      {jugadorEditando && (
        <button
          type="button"
          onClick={cancelarEdicion}
          style={{ marginLeft: "5px" }}
        >
          Cancelar
        </button>
      )}
    </form>
  )
}
