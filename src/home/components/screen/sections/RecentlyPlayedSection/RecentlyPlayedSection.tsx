import React from "react";
import { ScrollArea, ScrollBar } from "../../../../components/ui/scroll-area";

export const RecentlyPlayedSection = (): JSX.Element => {
  // Data for mixes that can be mapped over
  const mixes = [
    {
      id: 1,
      title: "Mix 1",
      artists: "Calvin Harris, Martin Garrix, Dewain Whi...",
      coverUrl: "https://c.animaapp.com/mce89k0vmPQgyZ/img/album-cover.png",
      labelPosition: "left-[74px]",
    },
    {
      id: 2,
      title: "Mix 2",
      artists: "A R Rahman, Harris Jeyaraj, Yuvan Sha...",
      coverUrl: "https://c.animaapp.com/mce89k0vmPQgyZ/img/album-cover-2.png",
      labelPosition: "left-[72px]",
    },
    {
      id: 3,
      title: "Mix 3",
      artists: "Maroon 5, Imagine Dragons, Coldplay...",
      coverUrl: "https://c.animaapp.com/mce89k0vmPQgyZ/img/album-cover-4.png",
      labelPosition: "left-[72px]",
    },
    {
      id: 4,
      title: "High Energy",
      artists: "Mark Ronson, DNCE, Bruno Mars, The C...",
      coverUrl: "https://c.animaapp.com/mce89k0vmPQgyZ/img/album-cover-1.png",
      labelPosition: "left-8",
    },
    {
      id: 5,
      title: "Happy Vibes",
      artists: "DNCE, Ariana Grande, Justin Bei...",
      coverUrl: "https://c.animaapp.com/mce89k0vmPQgyZ/img/album-cover-3.png",
      labelPosition: "left-7",
    },
    {
      id: 6,
      title: "Chill Hits",
      artists: "Snow Patrol, The Chainsmokers, Ros...",
      coverUrl: "https://c.animaapp.com/mce89k0vmPQgyZ/img/album-cover-5.png",
      labelPosition: "left-[49px]",
    },
  ];

  return (
    <section className="w-full max-w-[362px]">
      <h2 className="mb-4 px-6 font-medium text-2xl text-[#ffffffbf] font-['Inter',Helvetica] leading-7">
        Mixes for you
      </h2>

      <ScrollArea className="w-full h-[164px]">
        <div className="flex space-x-4 px-6">
          {mixes.map((mix) => (
            <div key={mix.id} className="w-[120px] h-[164px] flex-shrink-0">
              <div
                className="w-[120px] h-[120px] relative bg-cover bg-center"
                style={{ backgroundImage: `url(${mix.coverUrl})` }}
              >
                <div
                  className={`inline-flex items-start px-2 py-1 absolute top-24 ${mix.labelPosition} rounded`}
                >
                  <div className="relative w-fit mt-[-1.00px] font-['Inter',Helvetica] font-bold text-[#ffffffbf] text-xs leading-4 whitespace-nowrap">
                    {mix.title}
                  </div>
                </div>
              </div>
              <p className="mt-[7px] w-[120px] font-['Inter',Helvetica] font-medium text-[#ffffffbf] text-xs leading-[14px]">
                {mix.artists}
              </p>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};
