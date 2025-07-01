import React from "react";
import { ScrollArea, ScrollBar } from "../../../../components/ui/scroll-area";

export const NewReleasesSection = (): JSX.Element => {
  // Define categories data for mapping
  const categories = [
    { id: "for-you", name: "For you", selected: true },
    { id: "relax", name: "Relax", selected: false },
    { id: "workout", name: "Workout", selected: false },
    { id: "travel", name: "Travel", selected: false },
    { id: "focus", name: "Focus", selected: false },
    { id: "energize", name: "Energize", selected: false },
  ];

  return (
    <div className="w-full mt-32">
      <ScrollArea className="w-full h-9">
        <div className="flex space-x-2 pb-3">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`inline-flex items-center justify-center px-4 py-2 rounded-[25px] ${
                category.selected ? "bg-[#ffffff1f]" : ""
              }`}
            >
              <span className="[font-family:'Inter',Helvetica] font-medium text-[#ffffff80] text-base leading-5 whitespace-nowrap">
                {category.name}
              </span>
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
