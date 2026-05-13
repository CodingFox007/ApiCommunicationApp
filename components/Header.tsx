"use client"

import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-black text-white px-6 py-4 flex items-center justify-between">
      {/* Title */}
      <h1 className="text-xl font-bold">Pokédex App</h1>

      {/* Navigation */}
      <nav className="flex gap-6 text-sm">
        <Link href="/" className="hover:underline">
          Home
        </Link>

        <Link href="/pokemon/pikachu" className="hover:underline">
          Pokémon
        </Link>

        <Link href="/login" className="hover:underline">
          Login
        </Link>

        <Link href="/dashboard" className="hover:underline">
          Dashboard
        </Link>
      </nav>
    </header>
  )
}