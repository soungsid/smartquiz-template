"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative glass-strong rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 gradient-primary opacity-10" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          
          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Start for free today</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
              <span className="text-foreground">Ready to transform your</span>
              <br />
              <span className="gradient-text">learning journey?</span>
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">
              Join thousands of learners who are already using SmartQuiz to master new subjects, ace their exams, and achieve their educational goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="gradient-primary text-primary-foreground border-0 hover:opacity-90 transition-all hover-lift px-8 h-14 text-lg"
                asChild
              >
                <Link href="/catalog">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-border hover:bg-muted/50 transition-all h-14 text-lg bg-transparent"
              >
                View Pricing
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-6">
              No credit card required. Free forever for basic features.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
