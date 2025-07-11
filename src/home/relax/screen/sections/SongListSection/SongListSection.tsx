import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
import { ScrollArea, ScrollBar } from "../../../../components/ui/scroll-area";

export const SongListSection = (): JSX.Element => {
  // Data for mixes
  const mixes = [
    {
      id: 1,
      title: "Mix 1",
      artists: "Calvin Harris, Martin Garrix, Dewain Whi...",
      coverUrl: "https://c.animaapp.com/mck01puwUyYbSW/img/album-cover.png",
      badgePosition: "left-[74px]",
    },
    {
      id: 2,
      title: "Mix 2",
      artists: "A R Rahman, Harris Jeyaraj, Yuvan Sha...",
      coverUrl: "https://c.animaapp.com/mck01puwUyYbSW/img/album-cover-2.png",
      badgePosition: "left-[72px]",
    },
    {
      id: 3,
      title: "Mix 3",
      artists: "Maroon 5, Imagine Dragons, Coldplay...",
      coverUrl: "https://c.animaapp.com/mck01puwUyYbSW/img/album-cover-4.png",
      badgePosition: "left-[72px]",
    },
    {
      id: 4,
      title: "High Energy",
      artists: "Mark Ronson, DNCE, Bruno Mars, The C...",
      coverUrl: "https://c.animaapp.com/mck01puwUyYbSW/img/album-cover-1.png",
      badgePosition: "left-8",
    },
    {
      id: 5,
      title: "Happy Vibes",
      artists: "DNCE, Ariana Grande, Justin Bei...",
      coverUrl: "https://c.animaapp.com/mck01puwUyYbSW/img/album-cover-3.png",
      badgePosition: "left-7",
    },
    {
      id: 6,
      title: "Chill Hits",
      artists: "Snow Patrol, The Chainsmokers, Ros...",
      coverUrl: "https://c.animaapp.com/mck01puwUyYbSW/img/album-cover-5.png",
      badgePosition: "left-[49px]",
    },
  ];

  return (
    <section className="w-full max-w-[364px] h-[226px] relative">
      <div className="text-[#ffffff40] text-xs leading-[14px] [font-family:'Inter',Helvetica] font-medium tracking-[0] mb-1 ml-6">
        FOR RELAXING
      </div>

      <h2 className="ml-6 [font-family:'Inter',Helvetica] font-medium text-[#ffffffbf] text-2xl tracking-[0] leading-7 mb-5">
        Mixes for you
      </h2>

      <ScrollArea className="w-[360px] h-[164px]">
        <div className="flex space-x-4 pb-4 pl-6 pr-6 w-[848px]">
          {mixes.map((mix) => (
            <Card
              key={mix.id}
              className="w-[120px] h-[164px] flex-shrink-0 bg-transparent border-0"
            >
              <CardContent className="p-0">
                <div
                  className="w-[120px] h-[120px] bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${mix.coverUrl})` }}
                >
                  <Badge
                    className={`absolute top-24 ${mix.badgePosition} bg-transparent px-2 py-1 rounded [font-family:'Inter',Helvetica] font-bold text-[#ffffffbf] text-xs`}
                  >
                    {mix.title}
                  </Badge>
                </div>
                <p className="mt-[7px] [font-family:'Inter',Helvetica] font-medium text-[#ffffffbf] text-xs tracking-[0] leading-[14px]">
                  {mix.artists}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};
