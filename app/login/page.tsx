"use client"

import { useState } from "react"
import { users } from "../../lib/users"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const router = useRouter()

  const handleLogin = () => {
    const match = users.find(
      (u) => u.username === username && u.password === password
    )

    if (match) {
      localStorage.setItem("loggedIn", "true")
      router.push("/dashboard")
    } else {
      setError("Invalid login")
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Login</h1>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>Login</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
}