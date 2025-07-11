import React from "react";
import { Button } from "../../../ui/button";
import { ScrollArea, ScrollBar } from "../../../ui/scroll-area";

export const LibrarySection = (): JSX.Element => {
  // Data for new releases
  const newReleases = [
    {
      id: 1,
      title: "Sick Boy",
      image: "https://c.animaapp.com/mce89k0vmPQgyZ/img/image-16.png",
      playIcon: "https://c.animaapp.com/mce89k0vmPQgyZ/img/play-arrow-9.svg",
    },
    {
      id: 2,
      title: "Lonely Toge...",
      image: "https://c.animaapp.com/mce89k0vmPQgyZ/img/image-17.png",
      playIcon: "https://c.animaapp.com/mce89k0vmPQgyZ/img/play-arrow-12.svg",
    },
    {
      id: 3,
      title: "Pay No Mind",
      image: "https://c.animaapp.com/mce89k0vmPQgyZ/img/image-19.png",
      playIcon: "https://c.animaapp.com/mce89k0vmPQgyZ/img/play-arrow-14.svg",
    },
    {
      id: 4,
      title: "#SELFIE",
      image: "https://c.animaapp.com/mce89k0vmPQgyZ/img/image-22.png",
      playIcon: "https://c.animaapp.com/mce89k0vmPQgyZ/img/play-arrow-4.svg",
    },
    {
      id: 5,
      title: "Until You W...",
      image: "https://c.animaapp.com/mce89k0vmPQgyZ/img/image-21.png",
      playIcon: "https://c.animaapp.com/mce89k0vmPQgyZ/img/play-arrow-7.svg",
    },
    {
      id: 6,
      title: "Good Intens...",
      image: "https://c.animaapp.com/mce89k0vmPQgyZ/img/image-23.png",
      playIcon: "https://c.animaapp.com/mce89k0vmPQgyZ/img/play-arrow-5.svg",
    },
    {
      id: 7,
      title: "Remind me ...",
      image: "https://c.animaapp.com/mce89k0vmPQgyZ/img/image-24-1.png",
      playIcon: "https://c.animaapp.com/mce89k0vmPQgyZ/img/play-arrow-15.svg",
    },
    {
      id: 8,
      title: "It Won't Kill ...",
      image: "https://c.animaapp.com/mce89k0vmPQgyZ/img/image-25-1.png",
      playIcon: "https://c.animaapp.com/mce89k0vmPQgyZ/img/play-arrow-3.svg",
    },
  ];

  return (
    <section className="w-full max-w-[364px] h-[154px] relative">
      <div className="flex justify-between items-center mb-4 px-6">
        <h2 className="font-medium text-2xl text-[#ffffffbf] [font-family:'Inter',Helvetica] leading-7">
          New Releases
        </h2>
        <Button
          variant="link"
          className="text-white font-medium text-base [font-family:'Inter',Helvetica] p-0 h-auto leading-5"
        >
          See more
        </Button>
      </div>

      <ScrollArea className="w-full h-[110px]">
        <div className="flex space-x-4 px-6 pb-2">
          {newReleases.map((release) => (
            <div
              key={release.id}
              className="flex flex-col w-20 h-[110px] flex-shrink-0"
            >
              <div
                className="relative w-20 h-20 bg-cover bg-center cursor-pointer"
                style={{ backgroundImage: `url(${release.image})` }}
              >
                <img
                  className="absolute w-6 h-6 top-12 left-2"
                  alt="Play button"
                  src={release.playIcon}
                />
              </div>
              <div className="w-20 mt-[7px] [font-family:'Inter',Helvetica] font-medium text-[#ffffffbf] text-xs leading-[14px]">
                {release.title}
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};
