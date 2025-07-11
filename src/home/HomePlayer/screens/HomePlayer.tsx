import React from "react";
import { FeaturedSection } from "./sections/FeaturedSection";
import { HomeNavigationSection } from "./sections/HomeNavigationSection";
import { MainContentSection } from "./sections/MainContentSection";
import { MixesForYouSection } from "./sections/MixesForYouSection";
import { NavigationBarSection } from "./sections/NavigationBarSection";
import { PlayerControlsSection } from "./sections/PlayerControlsSection";
import { RecentlyPlayedSection } from "./sections/RecentlyPlayedSection";
import { RecommendationsSection } from "./sections/RecommendationsSection";
import { SongListSection } from "./sections/SongListSection";
import { UserGreetingSection } from "./sections/UserGreetingSection";

export const HomePlayer = (): JSX.Element => {
  const statusBarIcons = [
    {
      type: "time",
      content: "12:00",
      className:
        "absolute top-1.5 left-7 opacity-60 [font-family:'Roboto',Helvetica] font-medium text-white text-sm tracking-[0] leading-[normal] whitespace-nowrap",
    },
    {
      type: "dot",
      className: "absolute w-1 h-1 top-3 left-4 bg-white rounded-sm opacity-50",
    },
    {
      type: "image",
      src: "https://c.animaapp.com/mcn61uqfOT4PgT/img/ellipse-2.svg",
      alt: "Signal strength",
      className: "absolute w-4 h-3 top-2 left-[312px]",
    },
    {
      type: "image",
      src: "https://c.animaapp.com/mcn61uqfOT4PgT/img/vector-1.svg",
      alt: "WiFi",
      className: "absolute w-3 h-3 top-2 left-[292px]",
    },
    {
      type: "image",
      src: "https://c.animaapp.com/mcn61uqfOT4PgT/img/union.svg",
      alt: "Battery",
      className: "absolute w-2 h-3 top-2 left-[336px]",
    },
  ];

  return (
    <main
      className="bg-[#0d0d0d] flex flex-row justify-center w-full"
      data-model-id="1:5281"
    >
      <div className="bg-[#0d0d0d] overflow-hidden w-[360px] h-[800px] relative">
        {/* Status bar */}
        <header className="fixed w-[360px] h-8 top-0 left-0 bg-[#0000001f] backdrop-blur-[2px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(2px)_brightness(100%)]">
          <div className="relative w-[362px] h-6 top-2">
            {statusBarIcons.map((icon, index) =>
              icon.type === "time" ? (
                <div key={`status-${index}`} className={icon.className}>
                  {icon.content}
                </div>
              ) : icon.type === "dot" ? (
                <div key={`status-${index}`} className={icon.className} />
              ) : (
                <img
                  key={`status-${index}`}
                  className={icon.className}
                  alt={icon.alt}
                  src={icon.src}
                />
              ),
            )}
          </div>
        </header>

        {/* Sections in order based on image coordinates */}
        <MixesForYouSection />
        <PlayerControlsSection />
        <UserGreetingSection />
        <MainContentSection />
        <RecentlyPlayedSection />
        <RecommendationsSection />
        <HomeNavigationSection />
        <SongListSection />
        <NavigationBarSection />
        <FeaturedSection />
      </div>
    </main>
  );
};
