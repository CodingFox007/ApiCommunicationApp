"use client"

import { useState } from "react"
import PokemonCard from "../components/PokeCard"

export default function HomePage() {
  const [name, setName] = useState("")
  const [pokemon, setPokemon] = useState<any>(null)
  const [error, setError] = useState("")

  const getPokemon = async () => {
    setError("")
    setPokemon(null)

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
      
      if (!res.ok) {
        throw new Error("Pokemon not found")
      }

      const data = await res.json()
      setPokemon(data)
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Pokémon Search</h1>

      <input
        type="text"
        placeholder="Enter Pokémon name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={getPokemon} style={{ marginLeft: "1rem" }}>
        Search
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {pokemon && <PokemonCard data={pokemon} />}
    </div>
  )
}