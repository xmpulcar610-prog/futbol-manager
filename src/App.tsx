import { useEffect, useState } from "react"
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore"
import { db } from "./firebase"
import type { Jugador } from "./types"
import JugadorForm from "./components/JugadorForm"

function App() {

  const [jugadores, setJugadores] = useState<Jugador[]>([])
  const [cargando, setCargando] = useState(true)
  const [jugadorEditando, setJugadorEditando] = useState<Jugador | null>(null)

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "jugadores"),
      (snapshot) => {

        const datos: Jugador[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Jugador, "id">)
        }))

        setJugadores(datos)
        setCargando(false)
      }
    )

    return () => unsubscribe()
  }, [])

  const eliminarJugador = async (id: string) => {
    await deleteDoc(doc(db, "jugadores", id))
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>⚽ Futbol Manager</h1>

      <JugadorForm
        jugadorEditando={jugadorEditando}
        cancelarEdicion={() => setJugadorEditando(null)}
      />

      <h2>Lista de Jugadores</h2>

      {cargando && <p>Cargando jugadores...</p>}

      {!cargando && jugadores.length === 0 && (
        <p>No hay jugadores todavía</p>
      )}

      {jugadores.map(jugador => (
        <div
          key={jugador.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "6px"
          }}
        >
          <strong>{jugador.nombre}</strong> ({jugador.edad} años)
          <br />
          Posición: {jugador.posicion}
          <br />
          Equipo: {jugador.equipo}
          <br />

          <button
            onClick={() => eliminarJugador(jugador.id!)}
            style={{ marginTop: "5px" }}
          >
            Eliminar
          </button>

          <button
            onClick={() => setJugadorEditando(jugador)}
            style={{ marginLeft: "5px" }}
          >
            Editar
          </button>
        </div>
      ))}
    </div>
  )
}

export default App
