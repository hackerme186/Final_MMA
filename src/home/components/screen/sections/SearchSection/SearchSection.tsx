import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { ScrollArea, ScrollBar } from "../../../../components/ui/scroll-area";

export const SearchSection = (): JSX.Element => {
  // Data for recently played items
  const recentlyPlayedItems = [
    {
      id: 1,
      title: "Inside Out",
      image: "https://c.animaapp.com/mce89k0vmPQgyZ/img/image-4.png",
      playIcon: "https://c.animaapp.com/mce89k0vmPQgyZ/img/play-arrow-2.svg",
    },
    {
      id: 2,
      title: "Young",
      image: "https://c.animaapp.com/mce89k0vmPQgyZ/img/image-5.png",
      playIcon: "https://c.animaapp.com/mce89k0vmPQgyZ/img/play-arrow-8.svg",
    },
    {
      id: 3,
      title: "Beach House",
      image: "https://c.animaapp.com/mce89k0vmPQgyZ/img/image-6.png",
      playIcon: "https://c.animaapp.com/mce89k0vmPQgyZ/img/play-arrow-1.svg",
    },
    {
      id: 4,
      title: "Kills You Slo...",
      image: "https://c.animaapp.com/mce89k0vmPQgyZ/img/image-7.png",
      playIcon: "https://c.animaapp.com/mce89k0vmPQgyZ/img/play-arrow.svg",
    },
    {
      id: 5,
      title: "Setting Fires",
      image: "https://c.animaapp.com/mce89k0vmPQgyZ/img/image-8.png",
      playIcon: "https://c.animaapp.com/mce89k0vmPQgyZ/img/play-arrow-11.svg",
    },
    {
      id: 6,
      title: "Somebody",
      image: "https://c.animaapp.com/mce89k0vmPQgyZ/img/image-9.png",
      playIcon: "https://c.animaapp.com/mce89k0vmPQgyZ/img/play-arrow-10.svg",
    },
    {
      id: 7,
      title: "Remind me ...",
      image: "https://c.animaapp.com/mce89k0vmPQgyZ/img/image-24-1.png",
      playIcon: "https://c.animaapp.com/mce89k0vmPQgyZ/img/play-arrow-13.svg",
    },
    {
      id: 8,
      title: "It Won't Kill ...",
      image: "https://c.animaapp.com/mce89k0vmPQgyZ/img/image-25-1.png",
      playIcon: "https://c.animaapp.com/mce89k0vmPQgyZ/img/play-arrow-6.svg",
    },
  ];

  return (
    <section className="w-full max-w-[364px] py-4">
      <div className="flex justify-between items-center mb-4 px-6">
        <h2 className="font-medium text-2xl text-[#ffffffbf] font-['Inter',Helvetica] leading-7">
          Recently Played
        </h2>
        <Button
          variant="link"
          className="font-medium text-white text-base font-['Inter',Helvetica] leading-5 p-0 h-auto"
        >
          See more
        </Button>
      </div>

      <ScrollArea className="w-full h-[110px]">
        <div className="flex space-x-4 px-6">
          {recentlyPlayedItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col w-20 h-[110px] flex-shrink-0"
            >
              <Card className="w-20 h-20 relative border-0 rounded-none overflow-hidden">
                <CardContent className="p-0 h-full">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.image})` }}
                  >
                    <img
                      className="absolute w-6 h-6 top-12 left-2"
                      alt="Play button"
                      src={item.playIcon}
                    />
                  </div>
                </CardContent>
              </Card>
              <div className="w-20 mt-3 font-['Inter',Helvetica] font-medium text-[#ffffffbf] text-xs leading-[14px]">
                {item.title}
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};
