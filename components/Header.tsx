"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Header() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("loggedIn")
    router.push("/login")
  }

  return (
    <header className="bg-black text-white px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold">Pokédex App</h1>

      <nav className="flex gap-6 items-center text-sm">
        <Link href="/" className="hover:underline">
          Home
        </Link>

        <Link href="/pokemon/pikachu" className="hover:underline">
          Pokémon
        </Link>

        <Link href="/dashboard" className="hover:underline">
          Dashboard
        </Link>

        <Link href="/TeamBuilder" className="hover:underline">
          Team Builder
        </Link>

        <Link href="/login" className="hover:underline">
          Login
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
        >
          Logout
        </button>
      </nav>
    </header>
  )
}