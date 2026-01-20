"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { ProgressRing } from "@/components/ui/progress-ring"
import { 
  Brain, 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2,
  XCircle,
  Trophy,
  Zap,
  AlertCircle,
  Target,
  FileText,
  Check,
  X,
  HelpCircle,
  Users
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type QuizMode = "training" | "exam"

// Sample quiz data
const quizData = {
  id: "1",
  title: "HTML & CSS Essentiels",
  description: "Maitrisez les fondamentaux du developpement web avec HTML et CSS.",
  category: "Developpement Web",
  difficulty: "Facile",
  totalQuestions: 10,
  timeLimit: 10, // minutes for exam mode
  timePerQuestion: 30, // seconds for training mode
  minimumScore: 60,
  attempts: 2,
  averageScore: 100,
  tags: ["html", "css", "web", "frontend"],
  image: "/images/image.png",
  questions: [
    {
      id: 1,
      question: "What is the largest planet in our solar system?",
      options: ["Mars", "Saturn", "Jupiter", "Neptune"],
      correctAnswer: 2,
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Mercury", "Jupiter"],
      correctAnswer: 1,
    },
    {
      id: 3,
      question: "How many planets are in our solar system?",
      options: ["7", "8", "9", "10"],
      correctAnswer: 1,
    },
    {
      id: 4,
      question: "What is the closest planet to the Sun?",
      options: ["Venus", "Earth", "Mercury", "Mars"],
      correctAnswer: 2,
    },
    {
      id: 5,
      question: "Which planet has the most moons?",
      options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
      correctAnswer: 1,
    },
    {
      id: 6,
      question: "What is the name of Earth's natural satellite?",
      options: ["Luna", "Titan", "Europa", "Phobos"],
      correctAnswer: 0,
    },
    {
      id: 7,
      question: "Which planet is famous for its beautiful rings?",
      options: ["Jupiter", "Uranus", "Saturn", "Neptune"],
      correctAnswer: 2,
    },
    {
      id: 8,
      question: "What is the hottest planet in our solar system?",
      options: ["Mercury", "Venus", "Mars", "Jupiter"],
      correctAnswer: 1,
    },
    {
      id: 9,
      question: "Which planet rotates on its side?",
      options: ["Neptune", "Saturn", "Uranus", "Pluto"],
      correctAnswer: 2,
    },
    {
      id: 10,
      question: "What is the smallest planet in our solar system?",
      options: ["Mars", "Mercury", "Pluto", "Venus"],
      correctAnswer: 1,
    },
  ],
}

type QuizState = "intro" | "playing" | "review" | "completed"

export default function QuizPage() {
  const router = useRouter()
  const [quizState, setQuizState] = useState<QuizState>("intro")
  const [quizMode, setQuizMode] = useState<QuizMode>("training")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(quizData.questions.length).fill(null)
  )
  const [timeLeft, setTimeLeft] = useState(quizData.timePerQuestion)
  const [totalTimeLeft, setTotalTimeLeft] = useState(quizData.timeLimit * 60) // for exam mode
  const [showFeedback, setShowFeedback] = useState(false)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)

  const question = quizData.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizData.totalQuestions) * 100

  // Timer logic - different for training vs exam mode
  useEffect(() => {
    if (quizState !== "playing") return
    
    // In training mode with feedback showing, pause timer
    if (quizMode === "training" && showFeedback) return

    const timer = setInterval(() => {
      if (quizMode === "training") {
        // Training mode: per-question timer
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmitAnswer()
            return quizData.timePerQuestion
          }
          return prev - 1
        })
      } else {
        // Exam mode: total time countdown
        setTotalTimeLeft((prev) => {
          if (prev <= 1) {
            setQuizState("completed")
            return 0
          }
          return prev - 1
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [quizState, currentQuestion, showFeedback, quizMode])

  const handleSubmitAnswer = useCallback(() => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = selectedAnswer
    setAnswers(newAnswers)

    // Update streak
    if (selectedAnswer === question.correctAnswer) {
      const newStreak = streak + 1
      setStreak(newStreak)
      if (newStreak > maxStreak) setMaxStreak(newStreak)
    } else {
      setStreak(0)
    }

    if (quizMode === "training") {
      // Training mode: show feedback immediately
      setShowFeedback(true)
    } else {
      // Exam mode: go to next question immediately
      if (currentQuestion < quizData.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        setQuizState("completed")
      }
    }
  }, [answers, currentQuestion, selectedAnswer, question.correctAnswer, streak, maxStreak, quizMode])

  const handleNextQuestion = () => {
    setShowFeedback(false)
    setSelectedAnswer(null)
    setTimeLeft(quizData.timePerQuestion)

    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizState("completed")
    }
  }

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      if (answer === quizData.questions[index].correctAnswer) {
        return score + 1
      }
      return score
    }, 0)
  }

  const getScorePercentage = () => {
    return Math.round((calculateScore() / quizData.totalQuestions) * 100)
  }

  // Intro Screen with Mode Selection
  if (quizState === "intro") {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Quiz Header Card */}
            <div className="glass-strong rounded-3xl p-6 md:p-8 mb-8">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                {/* Quiz Image */}
                <div className="w-full md:w-72 h-48 md:h-auto rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                  <div className="text-6xl md:text-8xl font-bold gradient-text">{"</>"}</div>
                </div>
                
                {/* Quiz Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-success/20 text-success">
                      {quizData.difficulty}
                    </span>
                    <span className="text-muted-foreground text-sm">{quizData.category}</span>
                  </div>
                  
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {quizData.title}
                  </h1>
                  <p className="text-muted-foreground mb-6">
                    {quizData.description}
                  </p>
                  
                  {/* Stats Row */}
                  <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4" />
                      <span>{quizData.totalQuestions} questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{quizData.timeLimit} minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Score minimum: {quizData.minimumScore}%</span>
                    </div>
                  </div>
                  
                  {/* Attempts Info */}
                  <div className="flex items-center gap-2 text-sm mb-4">
                    <Users className="w-4 h-4 text-success" />
                    <span className="text-success font-medium">
                      {quizData.attempts} tentatives • {quizData.averageScore}% moyenne
                    </span>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {quizData.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-xs rounded-full border border-border text-muted-foreground">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Mode Selection */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-foreground mb-4">Choisissez votre mode</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                {/* Training Mode */}
                <button
                  type="button"
                  onClick={() => setQuizMode("training")}
                  className={`relative p-6 rounded-2xl border-2 text-left transition-all duration-200 ${
                    quizMode === "training"
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  {quizMode === "training" && (
                    <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                  
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Mode Entrainement</h3>
                      <p className="text-sm text-muted-foreground">
                        Feedback immediat apres chaque reponse. Ideal pour apprendre.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pl-2">
                    <div className="flex items-center gap-2 text-sm text-success">
                      <Check className="w-4 h-4" />
                      <span>Voir la correction immediatement</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-success">
                      <Check className="w-4 h-4" />
                      <span>Explications detaillees</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-success">
                      <Check className="w-4 h-4" />
                      <span>Temps flexible</span>
                    </div>
                  </div>
                </button>

                {/* Exam Mode */}
                <button
                  type="button"
                  onClick={() => setQuizMode("exam")}
                  className={`relative p-6 rounded-2xl border-2 text-left transition-all duration-200 ${
                    quizMode === "exam"
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                >
                  {quizMode === "exam" && (
                    <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                  
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Mode Examen</h3>
                      <p className="text-sm text-muted-foreground">
                        Conditions reelles {"d'examen"}. Resultats a la fin uniquement.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pl-2">
                    <div className="flex items-center gap-2 text-sm text-accent">
                      <Clock className="w-4 h-4" />
                      <span>Timer: {quizData.timeLimit} minutes</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <X className="w-4 h-4" />
                      <span>Pas de feedback pendant</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-success">
                      <Check className="w-4 h-4" />
                      <span>Resultats detailles a la fin</span>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Start button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                className="border-border bg-transparent"
                asChild
              >
                <Link href="/catalog">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Retour au catalogue
                </Link>
              </Button>
              <Button
                size="lg"
                className="gradient-primary text-primary-foreground border-0 px-8"
                onClick={() => {
                  if (quizMode === "exam") {
                    setTotalTimeLeft(quizData.timeLimit * 60)
                  }
                  setQuizState("playing")
                }}
              >
                Commencer le Quiz
                <Zap className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Completed Screen
  if (quizState === "completed") {
    const score = calculateScore()
    const percentage = getScorePercentage()
    
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-16 px-4">
          <div className="max-w-2xl mx-auto">
            <div className="glass-strong rounded-3xl p-8 text-center">
              {/* Trophy animation */}
              <div className="mb-8">
                <div className={`inline-flex p-6 rounded-full ${
                  percentage >= 80 ? "bg-success/20" : 
                  percentage >= 60 ? "bg-warning/20" : "bg-destructive/20"
                }`}>
                  <Trophy className={`w-16 h-16 ${
                    percentage >= 80 ? "text-success" : 
                    percentage >= 60 ? "text-warning" : "text-destructive"
                  }`} />
                </div>
              </div>

              {/* Score */}
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {percentage >= 80 ? "Excellent!" : 
                 percentage >= 60 ? "Good Job!" : "Keep Practicing!"}
              </h1>
              <p className="text-muted-foreground mb-8">
                {"You've"} completed the quiz
              </p>

              {/* Progress ring with score */}
              <div className="flex justify-center mb-8">
                <ProgressRing 
                  progress={percentage} 
                  size={160} 
                  strokeWidth={12}
                  variant={percentage >= 80 ? "success" : percentage >= 60 ? "warning" : "destructive"}
                >
                  <div className="text-center">
                    <div className="text-4xl font-bold text-foreground">{percentage}%</div>
                    <div className="text-sm text-muted-foreground">{score}/{quizData.totalQuestions}</div>
                  </div>
                </ProgressRing>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="glass rounded-xl p-4">
                  <div className="text-2xl font-bold text-success">{score}</div>
                  <div className="text-xs text-muted-foreground">Correct</div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-2xl font-bold text-destructive">{quizData.totalQuestions - score}</div>
                  <div className="text-xs text-muted-foreground">Wrong</div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-2xl font-bold text-accent">{maxStreak}</div>
                  <div className="text-xs text-muted-foreground">Max Streak</div>
                </div>
              </div>

              {/* XP earned */}
              <div className="glass rounded-xl p-4 mb-8 inline-flex items-center gap-3">
                <div className="p-2 gradient-primary rounded-lg">
                  <Zap className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold text-foreground">
                    +{score * 15} XP
                  </div>
                  <div className="text-xs text-muted-foreground">Experience earned</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  className="border-border bg-transparent"
                  onClick={() => setQuizState("review")}
                >
                  Review Answers
                </Button>
                <Button
                  className="gradient-primary text-primary-foreground border-0"
                  asChild
                >
                  <Link href="/catalog">
                    Find More Quizzes
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Review Screen
  if (quizState === "review") {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-16 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold text-foreground mb-2">Review Your Answers</h1>
              <p className="text-muted-foreground">
                See which questions you got right and wrong
              </p>
            </div>

            <div className="space-y-4">
              {quizData.questions.map((q, index) => {
                const userAnswer = answers[index]
                const isCorrect = userAnswer === q.correctAnswer

                return (
                  <div key={q.id} className="glass rounded-xl p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`p-2 rounded-lg ${isCorrect ? "bg-success/20" : "bg-destructive/20"}`}>
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-success" />
                        ) : (
                          <XCircle className="w-5 h-5 text-destructive" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground mb-1">Question {index + 1}</p>
                        <p className="font-medium text-foreground">{q.question}</p>
                      </div>
                    </div>

                    <div className="space-y-2 pl-12">
                      {q.options.map((option, optIndex) => (
                        <div
                          key={option}
                          className={`p-3 rounded-lg text-sm ${
                            optIndex === q.correctAnswer
                              ? "bg-success/20 text-success border border-success/30"
                              : optIndex === userAnswer && !isCorrect
                              ? "bg-destructive/20 text-destructive border border-destructive/30"
                              : "bg-muted/50 text-muted-foreground"
                          }`}
                        >
                          <span className="font-medium mr-2">{String.fromCharCode(65 + optIndex)}.</span>
                          {option}
                          {optIndex === q.correctAnswer && (
                            <span className="ml-2 text-xs">(Correct answer)</span>
                          )}
                          {optIndex === userAnswer && optIndex !== q.correctAnswer && (
                            <span className="ml-2 text-xs">(Your answer)</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 text-center">
              <Button
                className="gradient-primary text-primary-foreground border-0"
                onClick={() => setQuizState("completed")}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Results
              </Button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Format time for exam mode
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Playing Screen
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 gradient-primary rounded-lg">
                  <Brain className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="font-semibold text-foreground">{quizData.title}</h1>
                  <p className="text-sm text-muted-foreground">
                    Question {currentQuestion + 1} sur {quizData.totalQuestions}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Mode indicator */}
                <div className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full ${
                  quizMode === "training" ? "bg-success/20" : "bg-accent/20"
                }`}>
                  {quizMode === "training" ? (
                    <Target className="w-4 h-4 text-success" />
                  ) : (
                    <FileText className="w-4 h-4 text-accent" />
                  )}
                  <span className={`text-sm font-medium ${
                    quizMode === "training" ? "text-success" : "text-accent"
                  }`}>
                    {quizMode === "training" ? "Entrainement" : "Examen"}
                  </span>
                </div>

                {/* Streak indicator - only in training mode */}
                {quizMode === "training" && streak > 0 && (
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20">
                    <Zap className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-accent">{streak} streak</span>
                  </div>
                )}

                {/* Exam timer */}
                {quizMode === "exam" && (
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    totalTimeLeft <= 60 ? "bg-destructive/20" : "bg-muted"
                  }`}>
                    <Clock className={`w-4 h-4 ${totalTimeLeft <= 60 ? "text-destructive" : "text-muted-foreground"}`} />
                    <span className={`text-lg font-bold font-mono ${
                      totalTimeLeft <= 60 ? "text-destructive" : "text-foreground"
                    }`}>
                      {formatTime(totalTimeLeft)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full gradient-primary rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question card - larger */}
          <div className="glass-strong rounded-3xl p-6 md:p-10 lg:p-12 mb-6">
            {/* Timer - only in training mode */}
            {quizMode === "training" && (
              <div className="flex justify-center mb-8">
                <ProgressRing 
                  progress={(timeLeft / quizData.timePerQuestion) * 100} 
                  size={80}
                  strokeWidth={6}
                  variant={timeLeft <= 10 ? "destructive" : timeLeft <= 20 ? "warning" : "primary"}
                >
                  <div className="flex items-center gap-1">
                    <Clock className={`w-4 h-4 ${timeLeft <= 10 ? "text-destructive" : "text-muted-foreground"}`} />
                    <span className={`text-lg font-bold ${timeLeft <= 10 ? "text-destructive" : "text-foreground"}`}>
                      {timeLeft}
                    </span>
                  </div>
                </ProgressRing>
              </div>
            )}

            {/* Question */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground text-center mb-8 lg:mb-12">
              {question.question}
            </h2>

            {/* Options - 2x2 grid on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index
                const isCorrect = showFeedback && index === question.correctAnswer
                const isWrong = showFeedback && isSelected && index !== question.correctAnswer

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => !showFeedback && setSelectedAnswer(index)}
                    disabled={showFeedback}
                    className={`w-full flex items-center gap-4 p-4 md:p-5 lg:p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                      isCorrect
                        ? "border-success bg-success/10"
                        : isWrong
                        ? "border-destructive bg-destructive/10"
                        : isSelected
                        ? "border-primary bg-primary/10"
                        : "border-border bg-card hover:border-primary/50 hover:bg-primary/5"
                    }`}
                  >
                    <span className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center text-sm md:text-base font-bold shrink-0 ${
                      isCorrect
                        ? "bg-success text-success-foreground"
                        : isWrong
                        ? "bg-destructive text-destructive-foreground"
                        : isSelected
                        ? "gradient-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="font-medium text-foreground flex-1 text-sm md:text-base">{option}</span>
                    {isCorrect && <CheckCircle2 className="w-6 h-6 text-success shrink-0" />}
                    {isWrong && <XCircle className="w-6 h-6 text-destructive shrink-0" />}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              className="border-border bg-transparent"
              asChild
            >
              <Link href="/catalog">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Quitter
              </Link>
            </Button>

            {quizMode === "training" && showFeedback ? (
              <Button
                className="gradient-primary text-primary-foreground border-0"
                onClick={handleNextQuestion}
              >
                {currentQuestion < quizData.questions.length - 1 ? (
                  <>
                    Question suivante
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Voir les resultats
                    <Trophy className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            ) : (
              <Button
                className="gradient-primary text-primary-foreground border-0"
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
              >
                {quizMode === "exam" ? (
                  currentQuestion < quizData.questions.length - 1 ? (
                    <>
                      Suivant
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Terminer
                      <Trophy className="w-4 h-4 ml-2" />
                    </>
                  )
                ) : (
                  <>
                    Valider
                    <CheckCircle2 className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
