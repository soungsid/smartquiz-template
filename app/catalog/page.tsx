"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { QuizCard, type QuizCardProps } from "@/components/quiz/quiz-card"
import { CategoryBadge } from "@/components/quiz/category-badge"
import { FloatingInput } from "@/components/ui/floating-input"
import { Button } from "@/components/ui/button"
import { Search, Filter, SlidersHorizontal, Grid, List, Sparkles } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Loading from "./loading"

// Sample quiz data
const quizzes: QuizCardProps[] = [
  {
    id: "1",
    title: "The Solar System",
    description: "Test your knowledge about planets, moons, and celestial bodies in our solar system.",
    category: "Science",
    difficulty: "easy",
    questionCount: 15,
    duration: 10,
    participants: 12453,
    rating: 4.8,
  },
  {
    id: "2",
    title: "World War II History",
    description: "Comprehensive quiz covering major events, figures, and outcomes of WWII.",
    category: "History",
    difficulty: "hard",
    questionCount: 25,
    duration: 20,
    participants: 8234,
    rating: 4.6,
  },
  {
    id: "3",
    title: "Basic Mathematics",
    description: "Practice fundamental math concepts including algebra, geometry, and arithmetic.",
    category: "Mathematics",
    difficulty: "easy",
    questionCount: 20,
    duration: 15,
    participants: 15678,
    rating: 4.9,
  },
  {
    id: "4",
    title: "World Capitals",
    description: "How well do you know the capital cities of countries around the world?",
    category: "Geography",
    difficulty: "medium",
    questionCount: 30,
    duration: 15,
    participants: 9876,
    rating: 4.7,
  },
  {
    id: "5",
    title: "Programming Fundamentals",
    description: "Test your understanding of basic programming concepts and logic.",
    category: "Technology",
    difficulty: "medium",
    questionCount: 20,
    duration: 25,
    participants: 7654,
    rating: 4.5,
  },
  {
    id: "6",
    title: "Classical Literature",
    description: "Explore famous works of literature from ancient times to the 19th century.",
    category: "Literature",
    difficulty: "hard",
    questionCount: 18,
    duration: 15,
    participants: 4321,
    rating: 4.4,
  },
  {
    id: "7",
    title: "Human Anatomy",
    description: "Learn about the structure and functions of the human body.",
    category: "Science",
    difficulty: "medium",
    questionCount: 22,
    duration: 18,
    participants: 11234,
    rating: 4.7,
  },
  {
    id: "8",
    title: "Modern Art Movements",
    description: "Discover the major art movements from Impressionism to Contemporary art.",
    category: "Art",
    difficulty: "medium",
    questionCount: 15,
    duration: 12,
    participants: 3456,
    rating: 4.3,
  },
  {
    id: "9",
    title: "Chemical Elements",
    description: "Master the periodic table and properties of chemical elements.",
    category: "Science",
    difficulty: "hard",
    questionCount: 25,
    duration: 20,
    participants: 6789,
    rating: 4.6,
  },
]

const categories = [
  "All",
  "Science",
  "History",
  "Mathematics",
  "Geography",
  "Technology",
  "Literature",
  "Art",
  "Music",
  "Sports",
]

const difficulties = ["All", "Easy", "Medium", "Hard"]

export default function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const searchParams = useSearchParams()

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch = 
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = 
      selectedCategory === "All" || quiz.category === selectedCategory
    const matchesDifficulty = 
      selectedDifficulty === "All" || quiz.difficulty === selectedDifficulty.toLowerCase()
    
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Quiz Catalog</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-balance">
              <span className="text-foreground">Explore Our</span>{" "}
              <span className="gradient-text">Quiz Collection</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from hundreds of quizzes across various subjects and difficulty levels.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-6">
            {/* Search bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search quizzes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-4 bg-input border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "gradient-primary text-primary-foreground"
                      : "glass hover:bg-primary/10 text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Filters row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Difficulty filter */}
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Difficulty:</span>
                <div className="flex gap-1">
                  {difficulties.map((diff) => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                        selectedDifficulty === diff
                          ? "bg-primary/20 text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* View mode toggle */}
              <div className="flex items-center gap-2 glass rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === "grid"
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-all ${
                    viewMode === "list"
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label="List view"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredQuizzes.length}</span> quizzes
            </p>
          </div>

          {/* Quiz Grid */}
          {filteredQuizzes.length > 0 ? (
            <div className={
              viewMode === "grid"
                ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "flex flex-col gap-4"
            }>
              {filteredQuizzes.map((quiz) => (
                <QuizCard key={quiz.id} {...quiz} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="glass-strong rounded-2xl p-12 max-w-md mx-auto">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No quizzes found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filters to find what you&apos;re looking for.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("All")
                    setSelectedDifficulty("All")
                  }}
                  className="gradient-primary text-primary-foreground border-0"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export function Loading() {
  return null
}
