"use client"

import { 
  Brain, 
  Trophy, 
  BarChart3, 
  Users, 
  Zap, 
  Shield,
  Sparkles,
  Target
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Smart Learning",
    description: "AI-powered adaptive quizzes that adjust to your skill level in real-time for optimal learning.",
    color: "primary"
  },
  {
    icon: Trophy,
    title: "Achievements & Badges",
    description: "Earn rewards, unlock achievements, and showcase your expertise with collectible badges.",
    color: "accent"
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Detailed analytics and insights to monitor your learning journey and identify areas to improve.",
    color: "secondary"
  },
  {
    icon: Users,
    title: "Compete & Collaborate",
    description: "Challenge friends, join study groups, and climb the global leaderboard.",
    color: "primary"
  },
  {
    icon: Zap,
    title: "Quick Quizzes",
    description: "Short, focused quiz sessions perfect for busy schedules. Learn in just 5 minutes a day.",
    color: "accent"
  },
  {
    icon: Shield,
    title: "Verified Content",
    description: "Expert-curated questions reviewed by educators for accuracy and relevance.",
    color: "secondary"
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Powerful Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            <span className="text-foreground">Everything you need to</span>
            <br />
            <span className="gradient-text">master any subject</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Our platform combines cutting-edge technology with proven learning methods to deliver an unmatched educational experience.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative glass rounded-2xl p-6 hover-lift cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                feature.color === "primary" ? "glow-primary" : 
                feature.color === "accent" ? "glow-accent" : ""
              }`} />
              
              <div className="relative">
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl mb-4 ${
                  feature.color === "primary" ? "gradient-primary" :
                  feature.color === "accent" ? "bg-accent/20" :
                  "bg-secondary/20"
                }`}>
                  <feature.icon className={`w-6 h-6 ${
                    feature.color === "primary" ? "text-primary-foreground" :
                    feature.color === "accent" ? "text-accent" :
                    "text-secondary"
                  }`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: "50K+", label: "Active Learners", icon: Users },
            { value: "1M+", label: "Quizzes Completed", icon: Target },
            { value: "500+", label: "Quiz Categories", icon: Brain },
            { value: "98%", label: "Satisfaction Rate", icon: Trophy },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-6 glass rounded-2xl">
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
