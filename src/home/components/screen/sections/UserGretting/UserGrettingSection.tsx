import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { ScrollArea } from "../../../../components/ui/scroll-area";

export const UserGreetingSection = (): JSX.Element => {
  // Playlist data for mapping
  const playlists = [
    {
      title: "GYM PHONK: Aggressive Workout",
      image: "https://c.animaapp.com/mce89k0vmPQgyZ/img/album-cover-11.png",
    },
    {
      title: "SIGMA MALE TIKTOK MUSIC",
      image: "https://c.animaapp.com/mce89k0vmPQgyZ/img/album-cover-13.png",
    },
    {
      title: "Phonk Villain",
      image: "https://c.animaapp.com/mce89k0vmPQgyZ/img/album-cover-15.png",
    },
    {
      title: "Name is Ghost",
      image: "https://c.animaapp.com/mce89k0vmPQgyZ/img/album-cover-12.png",
    },
    {
      title: "Drift Phonk",
      image: "https://c.animaapp.com/mce89k0vmPQgyZ/img/album-cover-14.png",
    },
    {
      title: "Phonklicious: The Most Delicious Pho...",
      image: "https://c.animaapp.com/mce89k0vmPQgyZ/img/image-55-1.png",
    },
  ];

  return (
    <section className="w-full max-w-[364px] h-52 py-0 relative">
      <div className="flex justify-between items-center mb-4 px-6">
        <h2 className="font-medium text-2xl text-[#ffffffbf] [font-family:'Inter',Helvetica] leading-7">
          Top Playlists
        </h2>
        <button className="font-medium text-white text-base [font-family:'Inter',Helvetica] leading-5">
          See more
        </button>
      </div>

      <ScrollArea className="w-full h-[164px]">
        <div className="flex space-x-4 px-6">
          {playlists.map((playlist, index) => (
            <Card
              key={index}
              className="w-[120px] h-[164px] flex-shrink-0 bg-transparent border-none"
            >
              <CardContent className="p-0">
                <img
                  className="w-[120px] h-[120px] object-cover"
                  alt="Album cover"
                  src={playlist.image}
                />
                <p className="w-[120px] mt-[7px] [font-family:'Inter',Helvetica] font-medium text-[#ffffffbf] text-xs text-center leading-[14px]">
                  {playlist.title}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
};
