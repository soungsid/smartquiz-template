"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Brain, Menu, X, Sparkles } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 gradient-primary rounded-lg blur-sm opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-card p-2 rounded-lg border border-border">
                <Brain className="w-6 h-6 text-primary" />
              </div>
            </div>
            <span className="text-xl font-bold gradient-text">SmartQuiz</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/catalog" 
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Catalog
            </Link>
            <Link 
              href="/dashboard" 
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Dashboard
            </Link>
            <Link 
              href="#features" 
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Features
            </Link>
            <Link 
              href="#pricing" 
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Pricing
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Log in
            </Button>
            <Button className="gradient-primary text-primary-foreground border-0 hover:opacity-90 transition-opacity">
              <Sparkles className="w-4 h-4 mr-2" />
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link 
                href="/catalog" 
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Catalog
              </Link>
              <Link 
                href="/dashboard" 
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                href="#features" 
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="#pricing" 
                className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground font-medium">Theme</span>
                  <ThemeToggle />
                </div>
                <Button variant="ghost" className="justify-start text-muted-foreground">
                  Log in
                </Button>
                <Button className="gradient-primary text-primary-foreground border-0">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
