"use client"

import * as React from "react"
import { HTMLMotionProps, motion } from "motion/react"
import { cn } from "@/lib/utils"


interface HoverSliderImageProps {
  index: number
  imageUrl: string
}
interface HoverSliderContextValue {
  activeSlide: number
  changeSlide: (index: number) => void
}
function splitText(text: string) {
  const words = text.split(" ").map((word) => word.concat(" "))
  const characters = words.map((word) => word.split("")).flat(1)

  return {
    words,
    characters,
  }
}

const HoverSliderContext = React.createContext<
  HoverSliderContextValue | undefined
>(undefined)
function useHoverSliderContext() {
  const context = React.useContext(HoverSliderContext)
  if (context === undefined) {
    throw new Error(
      "useHoverSliderContext must be used within a HoverSliderProvider"
    )
  }
  return context
}

export const HoverSlider = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ children, className, ...props }, ref) => {
  const [activeSlide, setActiveSlide] = React.useState<number>(0)
  const changeSlide = React.useCallback(
    (index: number) => setActiveSlide(index),
    [setActiveSlide]
  )
  return (
    <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
      <div className={className}>{children}</div>
    </HoverSliderContext.Provider>
  )
})
HoverSlider.displayName = "HoverSlider"

export const TextStaggerHover = React.forwardRef<
  HTMLSpanElement,
  { text: string; index: number; className?: string; style?: React.CSSProperties }
>(({ text, index, className, style }, ref) => {
  const { activeSlide, changeSlide } = useHoverSliderContext()
  const isActive = activeSlide === index

  return (
    <motion.span
      ref={ref}
      className={cn("inline-block", className)}
      style={style}
      animate={{
        y: isActive ? -4 : 0,
        opacity: isActive ? 1 : 0.45,
      }}
      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => changeSlide(index)}
    >
      {text}
    </motion.span>
  )
})
TextStaggerHover.displayName = "TextStaggerHover"

export const clipPathVariants = {
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  },
  hidden: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0px)",
  },
}

export const HoverSliderImageWrap = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "grid overflow-hidden [&>*]:col-start-1 [&>*]:col-end-1 [&>*]:row-start-1 [&>*]:row-end-1 [&>*]:size-full",
        className
      )}
      {...props}
    />
  )
})
HoverSliderImageWrap.displayName = "HoverSliderImageWrap"

export const HoverSliderImage = React.forwardRef<
  HTMLImageElement,
  HTMLMotionProps<"img"> & HoverSliderImageProps
>(({ index, imageUrl, children, className, ...props }, ref) => {
  const { activeSlide } = useHoverSliderContext()
  return (
    <motion.img
      className={cn("inline-block align-middle", className)}
      transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.8 }}
      variants={clipPathVariants}
      animate={activeSlide === index ? "visible" : "hidden"}
      ref={ref}
      {...props}
    />
  )
})
HoverSliderImage.displayName = "HoverSliderImage"

/* ── Inline SVG variant with character animation ── */

function animateSvgCharacters(container: HTMLDivElement): void {
  const svg = container.querySelector("svg")
  if (!svg) return

  const characters = svg.querySelectorAll<SVGGElement>(
    '[id*="character"], [id*="Character"]'
  )
  const secondary = svg.querySelectorAll<SVGGElement>(
    '[id*="Plant"], [id*="Device"], [id*="speech-bubble"], [id*="Android"], [id*="Mug"], [id*="Coffee"], [id*="Chart"], [id*="chart"], [id*="Screens"], [id*="light-bulb"], [id*="box-"]'
  )

  const charAnimations: Keyframe[][] = [
    [
      { transform: "translateX(0px) rotate(0deg)", offset: 0 },
      { transform: "translateX(14px) rotate(3deg)", offset: 0.15 },
      { transform: "translateX(-10px) rotate(-2.5deg)", offset: 0.35 },
      { transform: "translateX(8px) rotate(2deg)", offset: 0.55 },
      { transform: "translateX(-5px) rotate(-1.5deg)", offset: 0.75 },
      { transform: "translateX(2px) rotate(0.5deg)", offset: 0.9 },
      { transform: "translateX(0px) rotate(0deg)", offset: 1 },
    ],
    [
      { transform: "translateY(0px) scaleY(1)", offset: 0 },
      { transform: "translateY(-18px) scaleY(1.03)", offset: 0.12 },
      { transform: "translateY(4px) scaleY(0.97)", offset: 0.28 },
      { transform: "translateY(-12px) scaleY(1.02)", offset: 0.44 },
      { transform: "translateY(3px) scaleY(0.98)", offset: 0.6 },
      { transform: "translateY(-6px) scaleY(1.01)", offset: 0.76 },
      { transform: "translateY(0px) scaleY(1)", offset: 1 },
    ],
    [
      { transform: "rotate(0deg) translateX(0px) translateY(0px)", offset: 0 },
      { transform: "rotate(-4deg) translateX(-12px) translateY(-4px)", offset: 0.2 },
      { transform: "rotate(3deg) translateX(10px) translateY(2px)", offset: 0.45 },
      { transform: "rotate(-2deg) translateX(-6px) translateY(-2px)", offset: 0.65 },
      { transform: "rotate(1.5deg) translateX(4px) translateY(1px)", offset: 0.82 },
      { transform: "rotate(0deg) translateX(0px) translateY(0px)", offset: 1 },
    ],
    [
      { transform: "translateY(0px) scaleX(1) scaleY(1)", offset: 0 },
      { transform: "translateY(3px) scaleX(1.06) scaleY(0.94)", offset: 0.08 },
      { transform: "translateY(-22px) scaleX(0.94) scaleY(1.08)", offset: 0.25 },
      { transform: "translateY(0px) scaleX(1.04) scaleY(0.96)", offset: 0.42 },
      { transform: "translateY(-10px) scaleX(0.97) scaleY(1.04)", offset: 0.58 },
      { transform: "translateY(0px) scaleX(1.02) scaleY(0.98)", offset: 0.74 },
      { transform: "translateY(-4px) scaleX(0.99) scaleY(1.01)", offset: 0.88 },
      { transform: "translateY(0px) scaleX(1) scaleY(1)", offset: 1 },
    ],
    [
      { transform: "translateX(0px) translateY(0px) rotate(0deg)", offset: 0 },
      { transform: "translateX(10px) translateY(-14px) rotate(2deg)", offset: 0.18 },
      { transform: "translateX(-8px) translateY(-4px) rotate(-3deg)", offset: 0.36 },
      { transform: "translateX(12px) translateY(-10px) rotate(2.5deg)", offset: 0.54 },
      { transform: "translateX(-6px) translateY(-2px) rotate(-1.5deg)", offset: 0.72 },
      { transform: "translateX(3px) translateY(-5px) rotate(0.5deg)", offset: 0.88 },
      { transform: "translateX(0px) translateY(0px) rotate(0deg)", offset: 1 },
    ],
  ]

  const secAnimations: Keyframe[][] = [
    [
      { transform: "rotate(0deg)", offset: 0 },
      { transform: "rotate(3deg)", offset: 0.2 },
      { transform: "rotate(-2deg)", offset: 0.5 },
      { transform: "rotate(1.5deg)", offset: 0.75 },
      { transform: "rotate(0deg)", offset: 1 },
    ],
    [
      { transform: "translateY(0px)", offset: 0 },
      { transform: "translateY(-6px)", offset: 0.3 },
      { transform: "translateY(2px)", offset: 0.6 },
      { transform: "translateY(-3px)", offset: 0.8 },
      { transform: "translateY(0px)", offset: 1 },
    ],
    [
      { transform: "scale(1)", offset: 0 },
      { transform: "scale(1.04)", offset: 0.25 },
      { transform: "scale(0.98)", offset: 0.5 },
      { transform: "scale(1.02)", offset: 0.75 },
      { transform: "scale(1)", offset: 1 },
    ],
  ]

  const opts: KeyframeAnimationOptions = {
    duration: 3500,
    easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    fill: "forwards",
  }

  characters.forEach((char, i) => {
    char.animate(charAnimations[i % charAnimations.length], { ...opts, delay: i * 150 })
  })
  secondary.forEach((el, i) => {
    el.animate(secAnimations[i % secAnimations.length], { ...opts, delay: (characters.length + i) * 100 })
  })
}

interface HoverSliderSvgProps {
  index: number
  imageUrl: string
  alt: string
  className?: string
}

export const HoverSliderSvg = React.forwardRef<
  HTMLDivElement,
  HoverSliderSvgProps
>(({ index, imageUrl, alt, className }, ref) => {
  const { activeSlide } = useHoverSliderContext()
  const [svgContent, setSvgContent] = React.useState<string | null>(null)
  const innerRef = React.useRef<HTMLDivElement>(null)
  const prevActive = React.useRef<number>(-1)

  React.useEffect(() => {
    let cancelled = false
    fetch(imageUrl)
      .then((res) => res.text())
      .then((text) => {
        if (!cancelled) setSvgContent(text)
      })
      .catch(() => {})
    return () => { cancelled = true }
  }, [imageUrl])

  // Trigger animation when this slide becomes active
  React.useEffect(() => {
    if (activeSlide === index && prevActive.current !== index && innerRef.current) {
      animateSvgCharacters(innerRef.current)
    }
    prevActive.current = activeSlide
  }, [activeSlide, index])

  const isVisible = activeSlide === index

  if (!svgContent) {
    return (
      <motion.img
        src={imageUrl}
        alt={alt}
        className={cn("inline-block align-middle", className)}
        transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.8 }}
        variants={clipPathVariants}
        animate={isVisible ? "visible" : "hidden"}
      />
    )
  }

  return (
    <motion.div
      ref={(node) => {
        (innerRef as React.MutableRefObject<HTMLDivElement | null>).current = node
        if (typeof ref === "function") ref(node)
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
      }}
      className={cn("inline-block align-middle [&_svg]:w-full [&_svg]:h-auto", className)}
      transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.8 }}
      variants={clipPathVariants}
      animate={isVisible ? "visible" : "hidden"}
      role="img"
      aria-label={alt}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  )
})
HoverSliderSvg.displayName = "HoverSliderSvg"
