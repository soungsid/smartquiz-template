"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, CheckCircle2, Zap, Trophy, Brain } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-3xl" />
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-foreground">
                The future of learning is here
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              <span className="text-foreground">Learn Smarter,</span>
              <br />
              <span className="gradient-text">Quiz Better</span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed text-pretty">
              Transform your knowledge with interactive quizzes designed to make learning engaging, effective, and fun. Track your progress and compete with others.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button 
                size="lg" 
                className="gradient-primary text-primary-foreground border-0 hover:opacity-90 transition-all hover-lift px-8 h-14 text-lg"
                asChild
              >
                <Link href="/catalog">
                  Start Learning Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-border hover:bg-muted/50 transition-all h-14 text-lg group bg-transparent"
              >
                <Play className="w-5 h-5 mr-2 text-primary group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            {/* Social proof */}
            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-background gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <span className="font-bold text-foreground">10,000+</span>
                <span className="text-muted-foreground"> learners already enrolled</span>
              </div>
            </div>
          </div>

          {/* Right content - Interactive preview */}
          <div className="relative">
            {/* Main card */}
            <div className="relative glass-strong rounded-2xl p-6 hover-lift glow-primary">
              {/* Quiz preview header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 gradient-primary rounded-lg">
                    <Brain className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Science Quiz</h3>
                    <p className="text-sm text-muted-foreground">Question 3 of 10</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-accent">+150 XP</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-muted rounded-full mb-6 overflow-hidden">
                <div className="h-full gradient-primary rounded-full w-[30%] transition-all duration-500" />
              </div>

              {/* Question */}
              <div className="mb-6">
                <p className="text-lg font-medium text-foreground mb-4">
                  What is the chemical symbol for gold?
                </p>
                
                {/* Answer options */}
                <div className="space-y-3">
                  {[
                    { label: "A", text: "Ag", correct: false },
                    { label: "B", text: "Au", correct: true },
                    { label: "C", text: "Go", correct: false },
                    { label: "D", text: "Gd", correct: false },
                  ].map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
                        option.correct
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-card hover:border-primary/50 hover:bg-primary/5 text-foreground"
                      }`}
                    >
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                        option.correct
                          ? "gradient-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {option.label}
                      </span>
                      <span className="font-medium">{option.text}</span>
                      {option.correct && (
                        <CheckCircle2 className="w-5 h-5 text-primary ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-8 h-8 rounded-full border-2 border-accent flex items-center justify-center">
                    <span className="text-xs font-bold text-accent">45</span>
                  </div>
                  <span className="text-sm">seconds left</span>
                </div>
                <Button className="gradient-primary text-primary-foreground border-0">
                  Next Question
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Floating achievement card */}
            <div className="absolute -top-4 -right-4 glass rounded-xl p-4 animate-bounce delay-500">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <Trophy className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">New Achievement!</p>
                  <p className="text-xs text-muted-foreground">Quiz Master Level 2</p>
                </div>
              </div>
            </div>

            {/* Floating streak card */}
            <div className="absolute -bottom-4 -left-4 glass rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">7 Day Streak!</p>
                  <p className="text-xs text-muted-foreground">Keep it going!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
