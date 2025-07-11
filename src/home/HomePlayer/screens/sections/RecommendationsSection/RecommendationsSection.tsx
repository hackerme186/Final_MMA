import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const RecommendationsSection = (): JSX.Element => {
  const currentTrack = {
    title: "Inside Out",
    artists: "The Chainsmokers, Charlee",
    coverArt: "https://c.animaapp.com/mcn61uqfOT4PgT/img/image-4-1.png",
    playIcon: "https://c.animaapp.com/mcn61uqfOT4PgT/img/play-arrow-11.svg",
    progressLine: "https://c.animaapp.com/mcn61uqfOT4PgT/img/line-1.svg",
    progressIndicator: "https://c.animaapp.com/mcn61uqfOT4PgT/img/line-2.svg",
  };

  return (
    <div className="fixed w-[360px] h-20 top-[648px] left-0 backdrop-blur-[10px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(10px)_brightness(100%)]">
      <Card className="relative h-20 overflow-hidden shadow-[0px_-4px_4px_#00000040] bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.4)_100%)] rounded-none border-0">
        <CardContent className="p-0">
          <div className="absolute w-[236px] h-12 top-3 left-6">
            <img
              className="w-12 h-12 object-cover absolute top-0 left-0 rounded-sm"
              alt={`${currentTrack.title} album cover`}
              src={currentTrack.coverArt}
            />

            <div className="absolute w-44 top-0 left-14 [font-family:'Inter',Helvetica] font-medium text-white text-xs tracking-[0] leading-[14px]">
              {currentTrack.title}
            </div>

            <div className="absolute w-44 top-[18px] left-14 [font-family:'Inter',Helvetica] font-medium text-[#ffffff80] text-xs tracking-[0] leading-[14px]">
              {currentTrack.artists}
            </div>
          </div>

          <button
            className="absolute w-12 h-12 top-3 left-[292px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full"
            aria-label="Play Inside Out by The Chainsmokers and Charlee"
          >
            <img className="w-12 h-12" alt="Play" src={currentTrack.playIcon} />
          </button>

          <div className="absolute w-[312px] h-px top-20 left-6 bg-[url(https://c.animaapp.com/mcn61uqfOT4PgT/img/line-1.svg)] bg-[100%_100%]">
            <img
              className="absolute w-12 h-px top-0 left-0"
              alt="Progress indicator"
              src={currentTrack.progressIndicator}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
