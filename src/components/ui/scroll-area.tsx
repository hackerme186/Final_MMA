import * as React from "react"
import { ScrollView } from "react-native"
import { cn } from "../../home/home/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollView>,
  React.ComponentPropsWithoutRef<typeof ScrollView>
>(({ className, ...props }, ref) => (
  <ScrollView
    ref={ref}
    className={cn("flex-1", className)}
    showsVerticalScrollIndicator={false}
    {...props}
  />
))
ScrollArea.displayName = "ScrollArea"

export { ScrollArea }
