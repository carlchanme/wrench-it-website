import React from 'react'
import Image from 'next/image'

interface LogoProps {
  readonly className?: string
  readonly showText?: boolean
  readonly size?: 'sm' | 'md' | 'lg'
}

export function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  }

  const imageSizes = {
    sm: 32,
    md: 40,
    lg: 48
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
        <Image
          src="/wrench_it_icon.png"
          alt="WrenchIT Logo"
          width={imageSizes[size]}
          height={imageSizes[size]}
          className="w-full h-full object-contain"
          priority
        />
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
