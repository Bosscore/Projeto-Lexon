"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import LetterCard from "@/app/components/letter-card"

export default function Home() {
  const [text, setText] = useState("Hello")
  const [letterAssociations, setLetterAssociations] = useState({})

  // Initialize default letter associations
  useEffect(() => {
    const defaultAssociations = {}
    "abcdefghijklmnopqrstuvwxyz".split("").forEach((letter) => {
      defaultAssociations[letter] = {
        image: `/placeholder.svg?height=80&width=80&text=${letter.toUpperCase()}`,
        gesture: `/placeholder.svg?height=80&width=80&text=Gesture`,
        sound: null,
        color: "#e2e8f0",
      }
    })

    // Add some example associations
    defaultAssociations["a"] = {
      image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=150&h=150&fit=crop",
      gesture:
        "https://images.pexels.com/photos/4049096/pexels-photo-4049096.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      sound: "https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3",
      color: "#FFCDD2", // light red
    }

    defaultAssociations["b"] = {
      image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=150&h=150&fit=crop",
      gesture:
        "https://images.pexels.com/photos/4049118/pexels-photo-4049118.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      sound: "https://assets.mixkit.co/active_storage/sfx/213/213-preview.mp3",
      color: "#BBDEFB", // light blue
    }

    defaultAssociations["c"] = {
      image: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=150&h=150&fit=crop",
      gesture:
        "https://images.pexels.com/photos/4049155/pexels-photo-4049155.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      sound: "https://assets.mixkit.co/active_storage/sfx/214/214-preview.mp3",
      color: "#C8E6C9", // light green
    }

    setLetterAssociations(defaultAssociations)
  }, [])

  return (
    <main className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Letter Gesture Tool</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Instructions:</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Type any text in the box below</li>
          <li>Cards will appear below each letter</li>
          <li>Click the sound icon on a card to hear the sound</li>
          <li>This simplified version has pre-loaded examples for A, B, and C</li>
        </ul>
      </div>

      <div className="flex space-x-2 mb-4">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text here..."
          className="text-lg"
        />
        <Button onClick={() => setText("")}>Clear</Button>
      </div>

      <Card className="p-6 bg-white">
        <div className="text-3xl font-medium mb-8 tracking-wide text-center">
          {text.split("").map((char, index) => (
            <span key={index} className="inline-block mx-1 relative">
              {char}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {text.split("").map((char, index) => (
            <div key={index} className="flex flex-col items-center">
              {char.match(/[a-z]/i) ? (
                <LetterCard letter={char.toLowerCase()} association={letterAssociations[char.toLowerCase()]} />
              ) : (
                <div className="w-20 h-20"></div>
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">About This Tool:</h2>
        <p>
          This simplified version comes with pre-loaded examples for the letters A, B, and C. Try typing words with
          these letters to see their associated images, gestures, and sounds.
        </p>
        <p className="mt-2">
          For a full version with customization options for all letters, please refer to the complete tool in our
          conversation.
        </p>
      </div>
    </main>
  )
}

