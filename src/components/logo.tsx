import React from 'react'

interface LogoProps {
  className?: string
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  }

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  }

  return (
    <div className={`flex items-center space-x-2 transition-all duration-200 hover:scale-105 ${className}`}>
      {/* WrenchIT Logo Icon */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Gear background circle */}
          <circle
            cx="50"
            cy="50"
            r="22"
            fill="currentColor"
            className="text-gray-800 dark:text-gray-200"
          />
          
          {/* Gear teeth */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <g key={i} transform={`translate(50, 50) rotate(${angle})`}>
              <rect
                x="-2"
                y="-26"
                width="4"
                height="6"
                fill="currentColor"
                className="text-gray-800 dark:text-gray-200"
              />
            </g>
          ))}
          
          {/* Inner gear hole */}
          <circle
            cx="50"
            cy="50"
            r="12"
            fill="currentColor"
            className="text-background"
          />

          {/* Wrench */}
          <g transform="translate(50, 50)">
            {/* Wrench handle */}
            <rect
              x="2"
              y="-1.5"
              width="16"
              height="3"
              rx="1.5"
              fill="currentColor"
              className="text-gray-800 dark:text-gray-200"
              transform="rotate(45)"
            />
            {/* Wrench head opening */}
            <g transform="rotate(45)">
              <path
                d="M 18 -2 L 22 -2 L 22 -4 L 24 -4 L 24 4 L 22 4 L 22 2 L 18 2 Z"
                fill="currentColor"
                className="text-gray-800 dark:text-gray-200"
              />
            </g>
          </g>
        </svg>
      </div>

      {/* Company Name */}
      {showText && (
        <div className="flex items-baseline">
          <span className={`font-bold text-gray-800 dark:text-gray-200 ${textSizeClasses[size]}`}>
            WRENCH
          </span>
          <span className={`font-bold text-primary ml-0 ${textSizeClasses[size]}`}>
            IT
          </span>
          <span className="text-sm text-muted-foreground ml-1 font-medium">
            software house
          </span>
        </div>
      )}
    </div>
  )
}
