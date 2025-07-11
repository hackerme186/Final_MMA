import React, { useState } from "react";

export const PlayerControlsSection = (): JSX.Element => {
  const [activeCategory, setActiveCategory] = useState("For you");

  const categories = [
    { id: "for-you", name: "For you" },
    { id: "relax", name: "Relax" },
    { id: "workout", name: "Workout" },
    { id: "travel", name: "Travel" },
    { id: "focus", name: "Focus" },
    { id: "energize", name: "Energize" },
  ];

  return (
    <nav
      className="absolute w-[360px] h-9 top-32 left-0 overflow-hidden overflow-x-scroll"
      aria-label="Content categories"
    >
      <div className="relative w-[588px] h-9 overflow-x-scroll">
        {categories.map((category, index) => {
          const positions = [
            "left-6",
            "left-[118px]",
            "left-[196px]",
            "left-[298px]",
            "left-[382px]",
            "left-[464px]",
          ];

          const isActive = category.name === activeCategory;

          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.name)}
              className={`inline-flex items-center justify-center px-4 py-2 absolute top-0 ${positions[index]} rounded-[25px] ${
                isActive ? "bg-[#ffffff1f]" : ""
              } transition-colors duration-200`}
              aria-current={isActive ? "page" : undefined}
            >
              <span
                className={`relative ${
                  category.name === "For you"
                    ? "w-[58px]"
                    : category.name === "Workout"
                      ? "w-[66px]"
                      : category.name === "Travel"
                        ? "w-12"
                        : category.name === "Energize"
                          ? "w-[68px]"
                          : "w-fit whitespace-nowrap"
                } mt-[-1.00px] [font-family:'Inter',Helvetica] font-medium text-[#ffffff80] text-base tracking-[0] leading-5`}
              >
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
