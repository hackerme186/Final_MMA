import React from "react";
import { AutoRecommendationsSection } from "./section/AutoRecommendationsSection";
import { InQueueSection } from "./section/InQueueSection";
import { NowPlayingSection } from "./section/NowPlayingSection";

export const Queue = (): JSX.Element => {
  // Status bar icons data
  const statusBarIcons = [
    {
      className: "w-3 h-3 top-2 left-[292px]",
      alt: "Vector",
      src: "https://c.animaapp.com/mcn2dkdx7zz39V/img/vector-1.svg",
    },
    {
      className: "w-4 h-3 top-2 left-[312px]",
      alt: "Ellipse",
      src: "https://c.animaapp.com/mcn2dkdx7zz39V/img/ellipse-2.svg",
    },
    {
      className: "w-2 h-3 top-2 left-[336px]",
      alt: "Union",
      src: "https://c.animaapp.com/mcn2dkdx7zz39V/img/union.svg",
    },
  ];

  return (
    <div
      className="bg-[#0d0d0d] flex flex-row justify-center w-full"
      data-model-id="1:4777"
    >
      <div className="bg-[#0d0d0d] overflow-hidden w-[360px] relative">
        {/* Background image with opacity */}
        <div className="w-full h-[72px] top-8 left-0 opacity-25 bg-[url(https://c.animaapp.com/mcn2dkdx7zz39V/img/image-4-1.png)] bg-cover bg-[50%_50%] fixed" />

        {/* Status bar */}
        <header className="fixed w-full h-8 top-0 left-0 bg-[#0000001f] backdrop-blur-[2px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(2px)_brightness(100%)] z-50">
          <div className="relative w-full h-6 top-2">
            <div className="absolute top-1.5 left-7 opacity-60 [font-family:'Roboto',Helvetica] font-medium text-white text-sm tracking-[0] leading-[normal] whitespace-nowrap">
              12:00
            </div>
            <div className="absolute w-1 h-1 top-3 left-4 bg-white rounded-sm opacity-50" />

            {statusBarIcons.map((icon, index) => (
              <img
                key={`status-icon-${index}`}
                className={`absolute ${icon.className}`}
                alt={icon.alt}
                src={icon.src}
              />
            ))}
          </div>
        </header>

        {/* Now Playing Section */}
        <NowPlayingSection />

        {/* In Queue Section */}
        <InQueueSection />

        {/* Auto Recommendations Section */}
        <AutoRecommendationsSection />
      </div>
    </div>
  );
};
