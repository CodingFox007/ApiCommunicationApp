"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn")

    if (!loggedIn) {
      router.push("/login")
    } else {
      setAllowed(true)
    }
  }, [])

  if (!allowed) {
    return <p>Loading...</p>
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <p>This page is protected 👮</p>
      //lil cop to protect the page
    </div>
  )
}