"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export default function PokemonDetails() {
  const { name } = useParams()

  const [pokemon, setPokemon] = useState<any>(null)
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Pokémon data
        const res1 = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        )
        const data1 = await res1.json()

        // 2. Species data (description)
        const res2 = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${name}`
        )
        const data2 = await res2.json()

        const flavor = data2.flavor_text_entries.find(
          (entry: any) => entry.language.name === "en"
        )

        setPokemon(data1)
        setDescription(flavor?.flavor_text || "No description available")
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [name])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-red-800 via-purple-800 to-blue-800">
        Loading Pokémon...
      </div>
    )
  }

  if (!pokemon) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gradient-to-br from-red-800 via-purple-800 to-blue-800">
        Pokémon not found
      </div>
    )
  }

  const types: string[] = pokemon.types.map(
    (t: any) => t.type.name
  )

  const typeColors: any = {
    fire: "#EE8130",
    water: "#6390F0",
    grass: "#7AC74C",
    electric: "#F7D02C",
    psychic: "#F95587",
    bug: "#A6B91A",
    normal: "#A8A77A",
  }

  const bg =
    types.length === 1
      ? `linear-gradient(135deg, ${typeColors[types[0]]}, #111)`
      : `linear-gradient(135deg, ${
          typeColors[types[0]] || "#333"
        }, ${typeColors[types[1]] || "#111"})`

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ background: bg }}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-xl w-full text-center">
  
        <h1 className="text-4xl font-bold capitalize mb-4">
          {pokemon.name}
        </h1>

        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="mx-auto w-40 h-40"
        />

        <p className="text-gray-700 mt-4 mb-6">
          {description.replace(/\f/g, " ")}
        </p>

        {/* Stats */}
        <div className="text-left space-y-2">
          <p>
            <strong>Height:</strong> {pokemon.height}
          </p>
          <p>
            <strong>Weight:</strong> {pokemon.weight}
          </p>
          <p>
            <strong>Types:</strong>{" "}
            {types.join(", ")}
          </p>
        </div>

        <audio controls className="mt-6 w-full">
          <source
            src={`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemon.id}.ogg`}
            type="audio/ogg"
          />
        </audio>
      </div>
    </main>
  )
}