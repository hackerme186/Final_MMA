import { MoreVerticalIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Switch } from "../../../../components/ui/switch";

export const AutoRecommendationsSection = (): JSX.Element => {
  // Song recommendation data
  const recommendations = [
    {
      id: 1,
      title: "Thunder",
      artist: "Imagine Dragons - Summer",
      image: "https://c.animaapp.com/mcn2dkdx7zz39V/img/image-14.png",
    },
    {
      id: 2,
      title: "High On Life",
      artist: "Martin Garrix, Bonn - High On",
      image: "https://c.animaapp.com/mcn2dkdx7zz39V/img/image-12.png",
    },
    {
      id: 3,
      title: "FRIENDS",
      artist: "Marshmello, Anne-Marie",
      image: "https://c.animaapp.com/mcn2dkdx7zz39V/img/image-13.png",
    },
    {
      id: 4,
      title: "Carry On",
      artist: "Kygo, Rita Ora - Detective Pikachu",
      image: "https://c.animaapp.com/mcn2dkdx7zz39V/img/image-15.png",
    },
  ];

  return (
    <Card className="w-full max-w-[362px]">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-xl text-[#ffffffbf] [font-family:'Inter',Helvetica]">
            Auto-recommendations
          </h2>
          <Switch defaultChecked />
        </div>

        <div className="flex flex-col gap-4">
          {recommendations.map((song) => (
            <div key={song.id} className="flex items-center h-12">
              <div className="flex items-center flex-1">
                <div className="relative h-8 w-8 mr-2.5">
                  <img
                    className="object-cover w-8 h-8"
                    alt={`${song.title} album cover`}
                    src={song.image}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="[font-family:'Inter',Helvetica] font-medium text-white text-xs leading-[14px]">
                    {song.title}
                  </span>
                  <span className="[font-family:'Inter',Helvetica] font-medium text-[#ffffff80] text-xs leading-[14px]">
                    {song.artist}
                  </span>
                </div>
              </div>
              <button className="p-1">
                <MoreVerticalIcon className="w-6 h-6 text-white" />
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
