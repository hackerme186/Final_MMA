import React from "react";
import { NavigationBarSection } from "./sections/NavigationBarSection";
import { PlaylistSection } from "./sections/PlaylistSection";
import { RelaxationMixesSection } from "./sections/RelaxationMixesSection";
import { SongListSection } from "./sections/SongListSection";
import { SongRecommendationsSection } from "./sections/SongRecommendationsSection";
import { UserGreetingSection } from "./sections/UserGreetingSection";

export const Relax = (): JSX.Element => {
  return (
    <div
      className="bg-[#0d0d0d] flex flex-row justify-center w-full"
      data-model-id="1:555"
    >
      <div className="bg-[#0d0d0d] overflow-hidden w-full max-w-[360px] relative flex flex-col">
        {/* Status bar */}
        <div className="w-full h-8 bg-[#0000001f] backdrop-blur-[2px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(2px)_brightness(100%)] z-10">
          <div className="relative w-full h-6 mt-2">
            <div className="absolute top-1.5 left-7 opacity-60 [font-family:'Roboto',Helvetica] font-medium text-white text-sm tracking-[0] leading-[normal] whitespace-nowrap">
              12:00
            </div>
            <div className="absolute w-1 h-1 top-3 left-4 bg-white rounded-sm opacity-50" />
            <img
              className="absolute w-4 h-3 top-2 right-12"
              alt="Wifi signal"
              src="https://c.animaapp.com/mck01puwUyYbSW/img/ellipse-2.svg"
            />
            <img
              className="absolute w-3 h-3 top-2 right-[68px]"
              alt="Network signal"
              src="https://c.animaapp.com/mck01puwUyYbSW/img/vector-1.svg"
            />
            <img
              className="absolute w-2 h-3 top-2 right-6"
              alt="Battery"
              src="https://c.animaapp.com/mck01puwUyYbSW/img/union.svg"
            />
          </div>
        </div>

        {/* Main content sections in correct order */}
        <SongRecommendationsSection />
        <PlaylistSection />
        <UserGreetingSection />
        <SongListSection />
        <NavigationBarSection />
        <RelaxationMixesSection />
      </div>
    </div>
  );
};
