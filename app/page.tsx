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

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-900 via-purple-900 to-blue-900 flex flex-col items-center px-4 py-10">
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
      <a href="/TeamBuilder" className="mt-8 text-lg text-gray-200 hover:text-gray-400 transition">
        Go to Team Builder
      </a>
    </main>
  )
}