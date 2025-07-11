import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { ScrollArea, ScrollBar } from "../../../components/ui/scroll-area";

export const NavigationBarSection = (): JSX.Element => {
  const playlists = [
    {
      title: "GYM PHONK: Aggressive Workout",
      image: "https://c.animaapp.com/mcn61uqfOT4PgT/img/album-cover-11.png",
      position: "left-6",
    },
    {
      title: "SIGMA MALE TIKTOK MUSIC",
      image: "https://c.animaapp.com/mcn61uqfOT4PgT/img/album-cover-13.png",
      position: "left-40",
    },
    {
      title: "Phonk Villain",
      image: "https://c.animaapp.com/mcn61uqfOT4PgT/img/album-cover-15.png",
      position: "left-[296px]",
    },
    {
      title: "Name is Ghost",
      image: "https://c.animaapp.com/mcn61uqfOT4PgT/img/album-cover-12.png",
      position: "left-[432px]",
    },
    {
      title: "Drift Phonk",
      image: "https://c.animaapp.com/mcn61uqfOT4PgT/img/album-cover-14.png",
      position: "left-[568px]",
    },
    {
      title: "Phonklicious: The Most Delicious Pho...",
      image: "https://c.animaapp.com/mcn61uqfOT4PgT/img/image-55-1.png",
      position: "left-[704px]",
    },
  ];

  return (
    <div className="absolute w-[364px] h-52 top-[670px] left-0">
      <div className="absolute w-36 top-0 left-6 [font-family:'Inter',Helvetica] font-medium text-[#ffffffbf] text-2xl tracking-[0] leading-7">
        Top Playlists
      </div>

      <button className="absolute w-[74px] top-2 left-[262px] [font-family:'Inter',Helvetica] font-medium text-white text-base tracking-[0] leading-5">
        See more
      </button>

      <div className="absolute w-[360px] h-[164px] top-11 left-0 overflow-hidden">
        <ScrollArea className="w-full h-full">
          <div className="relative w-[848px] h-[164px]">
            {playlists.map((playlist, index) => (
              <Card
                key={index}
                className={`absolute w-[120px] h-[164px] top-0 ${playlist.position} bg-transparent border-0`}
              >
                <CardContent className="p-0">
                  <img
                    className="absolute w-[120px] h-[120px] top-0 left-0 object-cover"
                    alt={`Album cover for ${playlist.title}`}
                    src={playlist.image}
                  />
                  <div className="absolute w-[120px] top-[127px] left-0 [font-family:'Inter',Helvetica] font-medium text-[#ffffffbf] text-xs text-center tracking-[0] leading-[14px]">
                    {playlist.title}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};
