import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { Pressable } from "react-native"
import { cn } from "../../home/home/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable> &
    VariantProps<typeof toggleVariants> & {
      pressed?: boolean
    }
>(({ className, variant, size, pressed = false, ...props }, ref) => (
  <Pressable
    ref={ref}
    className={cn(toggleVariants({ variant, size }), className)}
    data-state={pressed ? "on" : "off"}
    {...props}
  />
))

Toggle.displayName = "Toggle"

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  React.ComponentPropsWithoutRef<typeof Pressable>
>(({ className, ...props }, ref) => (
  <Pressable
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))

ToggleGroup.displayName = "ToggleGroup"

export { Toggle, ToggleGroup, toggleVariants }

