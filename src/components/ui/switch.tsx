import * as React from "react"
import { Pressable, View } from "react-native"
import { cn } from "../../home/home/lib/utils"

interface SwitchProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

const Switch = React.forwardRef<React.ElementRef<typeof View>, SwitchProps>(
  ({ checked = false, onCheckedChange, disabled = false, className, ...props }, ref) => {
    return (
      <Pressable
        ref={ref}
        role="switch"
        aria-checked={checked}
        data-disabled={disabled}
        className={cn(
          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
          className
        )}
        onPress={() => onCheckedChange?.(!checked)}
        disabled={disabled}
        {...props}
      >
        <View
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
          )}
          data-state={checked ? "checked" : "unchecked"}
        />
      </Pressable>
    )
  }
)
Switch.displayName = "Switch"

export { Switch }

