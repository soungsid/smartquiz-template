"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ className, type, label, error, id, ...props }, ref) => {
    const inputId = id || React.useId()
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)

    return (
      <div className="relative">
        <input
          type={type}
          id={inputId}
          className={cn(
            "peer w-full h-14 px-4 pt-5 pb-2 bg-input border border-border rounded-xl text-foreground placeholder-transparent transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
            "hover:border-primary/50",
            error && "border-destructive focus:ring-destructive focus:border-destructive",
            className
          )}
          placeholder={label}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false)
            setHasValue(!!e.target.value)
          }}
          onChange={(e) => setHasValue(!!e.target.value)}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            "absolute left-4 transition-all duration-200 pointer-events-none",
            "text-muted-foreground",
            (isFocused || hasValue || props.value)
              ? "top-2 text-xs text-primary"
              : "top-1/2 -translate-y-1/2 text-sm",
            error && (isFocused || hasValue) && "text-destructive"
          )}
        >
          {label}
        </label>
        {error && (
          <p className="mt-1 text-xs text-destructive">{error}</p>
        )}
      </div>
    )
  }
)
FloatingInput.displayName = "FloatingInput"

export { FloatingInput }
