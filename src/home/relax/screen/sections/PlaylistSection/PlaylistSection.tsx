import React from "react";
import { ScrollArea, ScrollBar } from "../../../../components/ui/scroll-area";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "../../../../components/ui/toggle-group";

export const PlaylistSection = (): JSX.Element => {
  // Define playlist categories as data to map over
  const playlistCategories = [
    { id: "for-you", label: "For you" },
    { id: "relax", label: "Relax" },
    { id: "workout", label: "Workout" },
    { id: "travel", label: "Travel" },
    { id: "focus", label: "Focus" },
    { id: "energize", label: "Energize" },
  ];

  return (
    <div className="w-full pt-32">
      <ScrollArea className="w-full">
        <div className="pb-4">
          <ToggleGroup
            type="single"
            defaultValue="relax"
            className="flex space-x-2 px-6"
          >
            {playlistCategories.map((category) => (
              <ToggleGroupItem
                key={category.id}
                value={category.id}
                className="px-4 py-2 rounded-[25px] data-[state=on]:bg-[#ffffff1f]"
              >
                <span className="[font-family:'Inter',Helvetica] font-medium text-[#ffffff80] text-base">
                  {category.label}
                </span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
