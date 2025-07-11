import React from "react";
import { Button } from "../../../../components/ui/button";
import { ScrollArea, ScrollBar } from "../../../../components/ui/scroll-area";

export const MainContentSection = (): JSX.Element => {
  const recentlyPlayedItems = [
    {
      id: 1,
      title: "Inside Out",
      image: "https://c.animaapp.com/mcn61uqfOT4PgT/img/image-4-1.png",
      playIcon: "https://c.animaapp.com/mcn61uqfOT4PgT/img/play-arrow-1.svg",
    },
    {
      id: 2,
      title: "Young",
      image: "https://c.animaapp.com/mcn61uqfOT4PgT/img/image-5.png",
      playIcon: "https://c.animaapp.com/mcn61uqfOT4PgT/img/play-arrow-6.svg",
    },
    {
      id: 3,
      title: "Beach House",
      image: "https://c.animaapp.com/mcn61uqfOT4PgT/img/image-6.png",
      playIcon: "https://c.animaapp.com/mcn61uqfOT4PgT/img/play-arrow-14.svg",
    },
    {
      id: 4,
      title: "Kills You Slo...",
      image: "https://c.animaapp.com/mcn61uqfOT4PgT/img/image-7.png",
      playIcon: "https://c.animaapp.com/mcn61uqfOT4PgT/img/play-arrow-9.svg",
    },
    {
      id: 5,
      title: "Setting Fires",
      image: "https://c.animaapp.com/mcn61uqfOT4PgT/img/image-8.png",
      playIcon: "https://c.animaapp.com/mcn61uqfOT4PgT/img/play-arrow-13.svg",
    },
    {
      id: 6,
      title: "Somebody",
      image: "https://c.animaapp.com/mcn61uqfOT4PgT/img/image-9.png",
      playIcon: "https://c.animaapp.com/mcn61uqfOT4PgT/img/play-arrow-4.svg",
    },
    {
      id: 7,
      title: "Remind me ...",
      image: "https://c.animaapp.com/mcn61uqfOT4PgT/img/image-24-1.png",
      playIcon: "https://c.animaapp.com/mcn61uqfOT4PgT/img/play-arrow-5.svg",
    },
    {
      id: 8,
      title: "It Won't Kill ...",
      image: "https://c.animaapp.com/mcn61uqfOT4PgT/img/image-25-1.png",
      playIcon: "https://c.animaapp.com/mcn61uqfOT4PgT/img/play-arrow.svg",
    },
  ];

  return (
    <section className="absolute w-[364px] h-[154px] top-[396px] left-0">
      <div className="flex justify-between items-center mb-4 px-6">
        <h2 className="[font-family:'Inter',Helvetica] font-medium text-[#ffffffbf] text-2xl tracking-[0] leading-7 whitespace-nowrap">
          Recently Played
        </h2>
        <Button
          variant="link"
          className="h-auto p-0 [font-family:'Inter',Helvetica] font-medium text-white text-base tracking-[0] leading-5"
        >
          See more
        </Button>
      </div>

      <ScrollArea className="w-[360px] h-[110px]">
        <div className="flex space-x-4 pl-6 pr-6 w-[800px]">
          {recentlyPlayedItems.map((item) => (
            <div key={item.id} className="w-20 h-[110px] flex flex-col">
              <button
                className="w-20 h-20 relative group cursor-pointer"
                aria-label={`Play ${item.title}`}
              >
                <div
                  className="w-full h-full bg-cover bg-[50%_50%]"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <img
                  className="absolute w-6 h-6 top-12 left-2"
                  alt="Play"
                  src={item.playIcon}
                />
              </button>
              <p className="w-20 mt-[7px] [font-family:'Inter',Helvetica] font-medium text-[#ffffffbf] text-xs tracking-[0] leading-[14px]">
                {item.title}
              </p>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};
