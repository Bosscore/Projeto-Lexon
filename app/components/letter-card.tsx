"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Volume2 } from 'lucide-react'

interface LetterCardProps {
  letter: string
  association: {
    image: string
    gesture: string
    sound: string | null
    color: string
  }
}

export default function LetterCard({ letter, association }: LetterCardProps) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (association?.sound) {
      const newAudio = new Audio(association.sound)
      setAudio(newAudio)
      return () => {
        newAudio.pause()
      }
    }
  }, [association?.sound])

  const playSound = (e) => {
    e.stopPropagation()
    if (audio) {
      audio.currentTime = 0
      audio.play()
    }
  }

  // Make sure association exists before trying to access its properties
  if (!association) {
    return <div className="w-20 h-20 bg-gray-200 rounded"></div>
  }

  return (
    <Card
      className="w-20 p-2 flex flex-col items-center transition-all hover:shadow-md"
      style={{ backgroundColor: association.color || "#e2e8f0" }}
    >
      <div className="text-xl font-bold mb-1">{letter.toUpperCase()}</div>

      <div className="grid grid-cols-2 gap-1 w-full">
        <div className="aspect-square bg-white rounded overflow-hidden">
          <img
            src={association.image || `/placeholder.svg?height=80&width=80&text=${letter.toUpperCase()}`}
            alt={`Image for letter ${letter}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="aspect-square bg-white rounded overflow-hidden">
          <img
            src={association.gesture || `/placeholder.svg?height=80&width=80&text=Gesture`}
            alt={`Gesture for letter ${letter}`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {association.sound && (
        <button
          onClick={playSound}
          className="mt-1 p-1 rounded-full bg-primary/10 hover:bg-primary/20"
          aria-label={`Play sound for letter ${letter}`}
        >
          <Volume2 size={14} />
        </button>
      )}
    </Card>
  )
}
