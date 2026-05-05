"use client"

import { useState } from "react"
import PokemonCard from "@/components/PokeCard"

export default function TeamBuilderPage() {
  const [team, setTeam] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [pokemon, setPokemon] = useState<any>(null)
  const [error, setError] = useState("")

  const searchPokemon = async () => {
    setError("")
    setPokemon(null)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_POKE_API}/pokemon/${search.toLowerCase()}`
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

  const addToTeam = (poke: any) => {
    if (team.length >= 6) return

    // prevent duplicates
    if (team.find((p) => p.id === poke.id)) return

    setTeam([...team, poke])
    setPokemon(null)
    setSearch("")
  }

  const removeFromTeam = (index: number) => {
    const updated = [...team]
    updated.splice(index, 1)
    setTeam(updated)
  }

  return (
    <main className="min-h-screen p-8 bg-gray-50 text-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Pokémon Team Builder
      </h1>

      {/* SEARCH */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 max-w-xl mx-auto">
        <input
          className="border border-gray-400 p-2 rounded w-full text-gray-900"
          placeholder="Search Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={searchPokemon}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          Search
        </button>
      </div>

      {error && (
        <p className="text-red-600 text-center font-medium mb-4">
          {error}
        </p>
      )}

      {/* SEARCH RESULT */}
      {pokemon && (
        <div className="flex flex-col items-center mb-8">
          <PokemonCard data={pokemon} />

          <button
            onClick={() => addToTeam(pokemon)}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
          >
            Add to Team
          </button>
        </div>
      )}

      {/* TEAM SECTION */}
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Your Team (Max 6)
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {team.map((p, i) => (
          <div key={i} className="relative">
            <PokemonCard data={p} />

            <button
              onClick={() => removeFromTeam(i)}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded"
            >
              X
            </button>
          </div>
        ))}
      </div>

      {/* EMPTY SLOT INFO */}
      <p className="text-center mt-6 text-gray-600">
        Slots remaining: {6 - team.length}
      </p>
    </main>
  )
}