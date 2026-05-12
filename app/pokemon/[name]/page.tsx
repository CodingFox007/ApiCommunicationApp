"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

export default function PokemonDetails() {
  const params = useParams()
  const router = useRouter()
  const name = params.name as string

  const [pokemon, setPokemon] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn")

    if (!loggedIn) {
      router.push("/login")
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      const data = await res.json()
      setPokemon(data)
      setLoading(false)
    }

    fetchData()
  }, [name])

  if (loading) return <p>Loading...</p>

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textTransform: "capitalize" }}>{pokemon.name}</h1>

      <img src={pokemon.sprites.front_default} />

      <p><strong>Height:</strong> {pokemon.height}</p>
      <p><strong>Weight:</strong> {pokemon.weight}</p>
      <p><strong>Base XP:</strong> {pokemon.base_experience}</p>

      <p>
        <strong>Types:</strong>{" "}
        {pokemon.types.map((t: any) => t.type.name).join(", ")}
      </p>

      <audio controls>
        <source
          src={`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`}
          type="audio/ogg"
        />
      </audio>
    </div>
  )
}