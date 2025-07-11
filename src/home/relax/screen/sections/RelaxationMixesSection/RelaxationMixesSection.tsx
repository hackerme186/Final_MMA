import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { ScrollArea, ScrollBar } from "../../../../components/ui/scroll-area";

export const RelaxationMixesSection = (): JSX.Element => {
  // Data for playlists to enable mapping
  const playlists = [
    {
      title: "GYM PHONK: Aggressive Workout",
      image: "https://c.animaapp.com/mck01puwUyYbSW/img/album-cover-6.png",
    },
    {
      title: "SIGMA MALE TIKTOK MUSIC",
      image: "https://c.animaapp.com/mck01puwUyYbSW/img/album-cover-8.png",
    },
    {
      title: "Phonk Villain",
      image: "https://c.animaapp.com/mck01puwUyYbSW/img/album-cover-10.png",
    },
    {
      title: "Name is Ghost",
      image: "https://c.animaapp.com/mck01puwUyYbSW/img/album-cover-7.png",
    },
    {
      title: "Drift Phonk",
      image: "https://c.animaapp.com/mck01puwUyYbSW/img/album-cover-9.png",
    },
    {
      title: "Phonklicious: The Most Delicious Pho...",
      image: "https://c.animaapp.com/mck01puwUyYbSW/img/image-55.png",
    },
  ];

  return (
    <section className="w-full max-w-[364px] h-52 py-0 mt-6">
      <div className="flex justify-between items-center mb-4 px-6">
        <h2 className="font-medium text-2xl text-[#ffffffbf] font-['Inter',Helvetica] leading-7">
          Playlists
        </h2>
        <button className="font-medium text-base text-white font-['Inter',Helvetica] leading-5">
          See more
        </button>
      </div>

      <ScrollArea className="w-full h-[164px]">
        <div className="flex space-x-4 px-6 pb-4">
          {playlists.map((playlist, index) => (
            <Card
              key={index}
              className="w-[120px] h-[164px] flex-shrink-0 bg-transparent border-0"
            >
              <CardContent className="p-0">
                <img
                  className="w-[120px] h-[120px] object-cover"
                  alt={`Album cover for ${playlist.title}`}
                  src={playlist.image}
                />
                <div className="w-[120px] mt-[7px] font-['Inter',Helvetica] font-medium text-[#ffffffbf] text-xs text-center leading-[14px]">
                  {playlist.title}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};
