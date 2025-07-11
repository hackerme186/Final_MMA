import React from "react";
import { Button } from "../../../../components/ui/button";
import { ScrollArea, ScrollBar } from "../../../../components/ui/scroll-area";

export const SongListSection = (): JSX.Element => {
  const newReleases = [
    {
      id: 1,
      title: "Sick Boy",
      image: "https://c.animaapp.com/mcn61uqfOT4PgT/img/image-16.png",
      playIcon: "https://c.animaapp.com/mcn61uqfOT4PgT/img/play-arrow-16.svg",
    },
    {
      id: 2,
      title: "Lonely Toge...",
      image: "https://c.animaapp.com/mcn61uqfOT4PgT/img/image-17.png",
      playIcon: "https://c.animaapp.com/mcn61uqfOT4PgT/img/play-arrow-7.svg",
    },
    {
      id: 3,
      title: "Pay No Mind",
      image: "https://c.animaapp.com/mcn61uqfOT4PgT/img/image-19.png",
      playIcon: "https://c.animaapp.com/mcn61uqfOT4PgT/img/play-arrow-3.svg",
    },
    {
      id: 4,
      title: "#SELFIE",
      image: "https://c.animaapp.com/mcn61uqfOT4PgT/img/image-22.png",
      playIcon: "https://c.animaapp.com/mcn61uqfOT4PgT/img/play-arrow-12.svg",
    },
    {
      id: 5,
      title: "Until You W...",
      image: "https://c.animaapp.com/mcn61uqfOT4PgT/img/image-21.png",
      playIcon: "https://c.animaapp.com/mcn61uqfOT4PgT/img/play-arrow-2.svg",
    },
    {
      id: 6,
      title: "Good Intens...",
      image: "https://c.animaapp.com/mcn61uqfOT4PgT/img/image-23.png",
      playIcon: "https://c.animaapp.com/mcn61uqfOT4PgT/img/play-arrow-15.svg",
    },
    {
      id: 7,
      title: "Remind me ...",
      image: "https://c.animaapp.com/mcn61uqfOT4PgT/img/image-24-1.png",
      playIcon: "https://c.animaapp.com/mcn61uqfOT4PgT/img/play-arrow-8.svg",
    },
    {
      id: 8,
      title: "It Won't Kill ...",
      image: "https://c.animaapp.com/mcn61uqfOT4PgT/img/image-25-1.png",
      playIcon: "https://c.animaapp.com/mcn61uqfOT4PgT/img/play-arrow-10.svg",
    },
  ];

  return (
    <section className="absolute w-[364px] h-[154px] top-[492px] left-0">
      <div className="flex justify-between items-center mb-4 px-6">
        <h2 className="[font-family:'Inter',Helvetica] font-medium text-[#ffffffbf] text-2xl tracking-[0] leading-7 whitespace-nowrap">
          New Releases
        </h2>
        <Button
          variant="ghost"
          className="h-auto p-0 [font-family:'Inter',Helvetica] font-medium text-white text-base tracking-[0] leading-5"
        >
          See more
        </Button>
      </div>

      <ScrollArea className="w-[360px] h-[110px]">
        <div className="flex space-x-4 pl-6 pr-6 w-[800px]">
          {newReleases.map((release) => (
            <div key={release.id} className="w-20 h-[110px] flex flex-col">
              <button
                className="w-20 h-20 relative group cursor-pointer"
                aria-label={`Play ${release.title}`}
              >
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${release.image})` }}
                />
                <img
                  className="absolute w-6 h-6 top-12 left-2 opacity-100 group-hover:opacity-80 transition-opacity"
                  alt="Play"
                  src={release.playIcon}
                />
              </button>
              <p className="w-20 mt-[7px] [font-family:'Inter',Helvetica] font-medium text-[#ffffffbf] text-xs tracking-[0] leading-[14px] truncate">
                {release.title}
              </p>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};
