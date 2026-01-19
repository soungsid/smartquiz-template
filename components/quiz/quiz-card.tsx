"use client"

import Link from "next/link"
import { Clock, Users, Star, ArrowRight, BookOpen } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export interface QuizCardProps {
  id: string
  title: string
  description: string
  category: string
  difficulty: "easy" | "medium" | "hard"
  questionCount: number
  duration: number // in minutes
  participants: number
  rating: number
  image?: string
}

const difficultyColors = {
  easy: "bg-success/20 text-success border-success/30",
  medium: "bg-warning/20 text-warning border-warning/30",
  hard: "bg-destructive/20 text-destructive border-destructive/30",
}

const categoryIcons: Record<string, string> = {
  science: "bg-primary/20",
  mathematics: "bg-secondary/20",
  history: "bg-accent/20",
  geography: "bg-success/20",
  literature: "bg-warning/20",
  technology: "bg-primary/20",
  general: "bg-muted",
}

export function QuizCard({
  id,
  title,
  description,
  category,
  difficulty,
  questionCount,
  duration,
  participants,
  rating,
}: QuizCardProps) {
  return (
    <div className="group relative glass rounded-2xl overflow-hidden hover-lift">
      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 glow-primary rounded-2xl" />
      
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${categoryIcons[category.toLowerCase()] || "bg-muted"}`}>
            <BookOpen className="w-6 h-6 text-foreground" />
          </div>
          <Badge className={`${difficultyColors[difficulty]} border capitalize`}>
            {difficulty}
          </Badge>
        </div>

        {/* Content */}
        <div className="mb-4">
          <span className="text-xs font-medium text-primary uppercase tracking-wider">
            {category}
          </span>
          <h3 className="text-xl font-bold text-foreground mt-1 mb-2 group-hover:gradient-text transition-all">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {description}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{questionCount} questions</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration} min</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{participants.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1 text-accent">
              <Star className="w-4 h-4 fill-current" />
              <span>{rating.toFixed(1)}</span>
            </div>
          </div>
          <Button 
            size="sm" 
            className="gradient-primary text-primary-foreground border-0 opacity-0 group-hover:opacity-100 transition-opacity"
            asChild
          >
            <Link href={`/quiz/${id}`}>
              Start
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
