"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

export default function PokemonDetails() {
  const { name } = useParams()

  const [pokemon, setPokemon] = useState<any>(null)
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(true)

  const router = useRouter()

    useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn")

    if (!loggedIn) {
        router.push("/login")
    }
    }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        )
        const data1 = await res1.json()

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
  
        <h1 className="text-4xl font-bold capitalize mb-4 text-black">
          {pokemon.name}
        </h1>

        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="mx-auto w-40 h-40"
        />

        <p className="text-black mt-4 mb-6">
          {description.replace(/\f/g, " ")}
        </p>

        <div className="text-left space-y-2 text-black">
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
          <p>
            <strong>Abilities:</strong>{" "}
            {pokemon.abilities
              .map((a: any) => a.ability.name)
              .join(", ")}
          </p>
          <p>
            <strong>Base Experience:</strong>{" "}
            {pokemon.base_experience}
          </p>
          <p>
            <strong>Stats:</strong>
            <ul className="list-disc list-inside">
              {pokemon.stats.map((s: any) => (
                <li key={s.stat.name}>
                  <strong>{s.stat.name}:</strong> {s.base_stat}
                </li>
              ))}
            </ul>
          </p>
          <p>
            <strong>Moves:</strong>{" "}
            {pokemon.moves
              .slice(0, 5)
                .map((m: any) => m.move.name)
                .join(", ")}{" "}
          </p>
          <p>
            <strong>Held Items:</strong>{" "}
            {pokemon.held_items.length > 0
              ? pokemon.held_items
                    .map((i: any) => i.item.name)
                    .join(", ")
                : "None"}
          </p>
          <p>
            <strong>Game Indices:</strong>{" "}
            {pokemon.game_indices
              .slice(0, 5)
                .map((g: any) => g.version.name)
                .join(", ")}{" "}
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