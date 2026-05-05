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
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
      )

      if (!res.ok) {
        throw new Error("Pokémon not found")
      }

      const data = await res.json()
      setPokemon(data)
    } catch (err: any) {
      setError(err.message)
    }
  }

  const typeColors: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
}

const darkenColor = (hex: string, amount: number) => {
  let col = hex.replace("#", "")
  let num = parseInt(col, 16)

  let r = Math.max(0, (num >> 16) - amount)
  let g = Math.max(0, ((num >> 8) & 0x00ff) - amount)
  let b = Math.max(0, (num & 0x0000ff) - amount)

  return `rgb(${r}, ${g}, ${b})`
}

  return (
    <main
  className="min-h-screen flex flex-col items-center px-4 py-10 transition-all duration-500"
  style={ pokemon ? (() => {
          const types = pokemon.types.map((t: any) => t.type.name)

          if (types.length === 1) {
            const color = typeColors[types[0]]

            return {
              background: `linear-gradient(to bottom right, ${color}, ${darkenColor(
                color,
                80
              )})`,
            }
          }

          return {
            background: `linear-gradient(to bottom right, ${
              typeColors[types[0]]
            }, ${typeColors[types[1]]})`,
          }
        })()
      : {
          background:
            "linear-gradient(to bottom right, #7f1d1d, #4c1d95, #1e3a8a)",
        }
  }
>
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-900">
          Pokémon Search
        </h1>

        <p className="text-center text-gray-700 mb-8">
          Search for any Pokémon by name
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter Pokémon name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-400 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          <button
            onClick={getPokemon}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Search
          </button>
        </div>

        {error && (
          <p className="text-red-700 text-center font-semibold mb-4">
            {error}
          </p>
        )}

        {pokemon && (
          <div className="mt-6">
            <PokemonCard data={pokemon} />
          </div>
        )}
      </div>
      <a href="/TeamBuilder" className="mt-8 text-lg text-gray-200 hover:text-blac transition">
        Go to Team Builder
      </a>
    </main>
  )
}