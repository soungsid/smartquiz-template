"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { StatCard } from "@/components/quiz/stat-card"
import { QuizCard, type QuizCardProps } from "@/components/quiz/quiz-card"
import { ProgressRing } from "@/components/ui/progress-ring"
import { Button } from "@/components/ui/button"
import { 
  Trophy, 
  Target, 
  Zap, 
  Clock, 
  TrendingUp,
  Calendar,
  Award,
  Star,
  ChevronRight,
  BookOpen,
  Flame,
  Medal
} from "lucide-react"
import Link from "next/link"

// Sample user data
const userData = {
  name: "Alex Johnson",
  level: 12,
  xp: 2450,
  xpToNextLevel: 3000,
  totalQuizzes: 47,
  correctAnswers: 423,
  totalQuestions: 512,
  currentStreak: 7,
  longestStreak: 14,
  rank: 234,
  badges: [
    { name: "Quiz Master", icon: Trophy, color: "primary" },
    { name: "Speed Demon", icon: Zap, color: "accent" },
    { name: "Perfectionist", icon: Star, color: "warning" },
    { name: "Dedicated", icon: Flame, color: "destructive" },
  ],
  weeklyProgress: [
    { day: "Mon", quizzes: 3, correct: 85 },
    { day: "Tue", quizzes: 2, correct: 78 },
    { day: "Wed", quizzes: 4, correct: 92 },
    { day: "Thu", quizzes: 1, correct: 65 },
    { day: "Fri", quizzes: 5, correct: 88 },
    { day: "Sat", quizzes: 3, correct: 95 },
    { day: "Sun", quizzes: 2, correct: 82 },
  ],
  recentActivity: [
    { quiz: "The Solar System", score: 90, xp: 135, date: "2 hours ago" },
    { quiz: "World Capitals", score: 85, xp: 120, date: "Yesterday" },
    { quiz: "Basic Mathematics", score: 100, xp: 200, date: "2 days ago" },
    { quiz: "Classical Literature", score: 72, xp: 95, date: "3 days ago" },
  ],
}

const recommendedQuizzes: QuizCardProps[] = [
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
]

export default function DashboardPage() {
  const accuracyPercentage = Math.round((userData.correctAnswers / userData.totalQuestions) * 100)
  const levelProgress = Math.round((userData.xp / userData.xpToNextLevel) * 100)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Welcome back, {userData.name}!
                </h1>
                <p className="text-muted-foreground">
                  {"Here's"} your learning progress overview
                </p>
              </div>
              <Button className="gradient-primary text-primary-foreground border-0" asChild>
                <Link href="/catalog">
                  Start New Quiz
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Main grid */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Left column - Profile & Level */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile card */}
              <div className="glass-strong rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
                      {userData.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-xs font-bold text-accent-foreground">
                      {userData.level}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{userData.name}</h2>
                    <p className="text-sm text-muted-foreground">Level {userData.level} Learner</p>
                  </div>
                </div>

                {/* Level progress */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Level Progress</span>
                    <span className="font-medium text-foreground">{userData.xp} / {userData.xpToNextLevel} XP</span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full gradient-primary rounded-full transition-all duration-500"
                      style={{ width: `${levelProgress}%` }}
                    />
                  </div>
                </div>

                {/* Badges */}
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Badges Earned</h3>
                  <div className="flex flex-wrap gap-2">
                    {userData.badges.map((badge) => (
                      <div 
                        key={badge.name}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg glass"
                        title={badge.name}
                      >
                        <badge.icon className={`w-4 h-4 text-${badge.color}`} />
                        <span className="text-xs font-medium text-foreground">{badge.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Streak card */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Current Streak</h3>
                  <Flame className="w-5 h-5 text-destructive" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold gradient-text">{userData.currentStreak}</div>
                  <div className="text-muted-foreground text-sm">
                    days in a row
                    <br />
                    <span className="text-xs">Best: {userData.longestStreak} days</span>
                  </div>
                </div>
                <div className="flex gap-1 mt-4">
                  {[...Array(7)].map((_, i) => (
                    <div 
                      key={i}
                      className={`flex-1 h-2 rounded-full ${
                        i < userData.currentStreak % 7 ? "gradient-primary" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Rank card */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Global Rank</p>
                    <p className="text-3xl font-bold text-foreground">#{userData.rank}</p>
                  </div>
                  <div className="p-3 bg-warning/20 rounded-xl">
                    <Medal className="w-8 h-8 text-warning" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right columns - Stats & Activity */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <StatCard
                  title="Total Quizzes"
                  value={userData.totalQuizzes}
                  icon={BookOpen}
                  variant="primary"
                  trend={{ value: 12, isPositive: true }}
                />
                <StatCard
                  title="Correct Answers"
                  value={userData.correctAnswers}
                  description={`${accuracyPercentage}% accuracy`}
                  icon={Target}
                  variant="success"
                />
                <StatCard
                  title="Total XP"
                  value={userData.xp.toLocaleString()}
                  icon={Zap}
                  variant="accent"
                  trend={{ value: 8, isPositive: true }}
                />
                <StatCard
                  title="Time Spent"
                  value="24h 32m"
                  description="This month"
                  icon={Clock}
                  variant="default"
                />
              </div>

              {/* Weekly progress */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-foreground">Weekly Progress</h3>
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex items-end justify-between gap-2 h-32">
                  {userData.weeklyProgress.map((day) => (
                    <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full gradient-primary rounded-t-lg transition-all duration-300 hover:opacity-80"
                        style={{ height: `${day.correct}%` }}
                      />
                      <span className="text-xs text-muted-foreground">{day.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent activity */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-foreground">Recent Activity</h3>
                  <TrendingUp className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="space-y-4">
                  {userData.recentActivity.map((activity, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted/80 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <ProgressRing 
                          progress={activity.score} 
                          size={48} 
                          strokeWidth={4}
                          variant={activity.score >= 80 ? "success" : activity.score >= 60 ? "warning" : "destructive"}
                        >
                          <span className="text-xs font-bold text-foreground">{activity.score}%</span>
                        </ProgressRing>
                        <div>
                          <p className="font-medium text-foreground">{activity.quiz}</p>
                          <p className="text-xs text-muted-foreground">{activity.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-accent">+{activity.xp} XP</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recommended quizzes */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Recommended For You</h2>
              <Button variant="ghost" className="text-primary" asChild>
                <Link href="/catalog">
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {recommendedQuizzes.map((quiz) => (
                <QuizCard key={quiz.id} {...quiz} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
