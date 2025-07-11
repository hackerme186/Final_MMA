import * as React from "react"
import { View } from "react-native"
import { cn } from "../../home/home/lib/utils"

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    )}
    {...props}
  />
))

ToggleGroup.displayName = "ToggleGroup"

export { ToggleGroup }
