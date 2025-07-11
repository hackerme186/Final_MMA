import {
    CheckCircleIcon,
    DownloadIcon,
    GripVerticalIcon,
    MoreVerticalIcon,
    StarIcon,
  } from "lucide-react";
  import React from "react";
  import { Card, CardContent } from "../../../../components/ui/card";
  
  // Song data for mapping
  const queueSongs = [
    {
      id: 1,
      title: "Inside Out",
      artist: "The Chainsmokers, Char...",
      image: "https://c.animaapp.com/mcn2dkdx7zz39V/img/image-4-1.png",
      isPlaying: true,
      isDownloaded: true,
    },
    {
      id: 2,
      title: "Young",
      artist: "The Chainsmokers",
      image: "https://c.animaapp.com/mcn2dkdx7zz39V/img/image-5.png",
      isPlaying: false,
      isDownloaded: false,
    },
    {
      id: 3,
      title: "Beach House",
      artist: "The Chainsmokers - Sick",
      image: "https://c.animaapp.com/mcn2dkdx7zz39V/img/image-6.png",
      isPlaying: false,
      isDownloaded: false,
    },
    {
      id: 4,
      title: "Kills You Slowly",
      artist: "The Chainsmokers -",
      image: "https://c.animaapp.com/mcn2dkdx7zz39V/img/image-7.png",
      isPlaying: false,
      isDownloaded: false,
    },
    {
      id: 5,
      title: "Setting Fires",
      artist: "The Chainsmokers, XYLO -",
      image: "https://c.animaapp.com/mcn2dkdx7zz39V/img/image-8.png",
      isPlaying: false,
      isDownloaded: false,
    },
    {
      id: 6,
      title: "Somebody",
      artist: "The Chainsmokers, Drew",
      image: "https://c.animaapp.com/mcn2dkdx7zz39V/img/image-9.png",
      isPlaying: false,
      isDownloaded: false,
    },
    {
      id: 7,
      title: "New York City",
      artist: "The Chainsmokers -",
      image: "https://c.animaapp.com/mcn2dkdx7zz39V/img/image-10.png",
      isPlaying: false,
      isDownloaded: true,
    },
  ];
  
  export const InQueueSection = (): JSX.Element => {
    return (
      <Card className="w-full max-w-[362px]">
        <CardContent className="p-0">
          <h2 className="px-6 pt-6 pb-4 font-bold text-xl text-[#ffffffbf] font-['Inter',Helvetica]">
            In Queue
          </h2>
  
          <div className="flex flex-col">
            {queueSongs.map((song) => (
              <div
                key={song.id}
                className="flex items-center h-12 px-4 py-2 relative"
              >
                <GripVerticalIcon className="w-6 h-6 text-white opacity-60" />
  
                <div className="flex ml-2">
                  <img
                    className="w-8 h-8 object-cover"
                    alt={`${song.title} album art`}
                    src={song.image}
                  />
  
                  <div className="ml-2">
                    <div className="font-['Inter',Helvetica] font-medium text-white text-xs leading-[14px]">
                      {song.title}
                    </div>
                    <div className="font-['Inter',Helvetica] font-medium text-[#ffffff80] text-xs leading-[14px]">
                      {song.artist}
                    </div>
                  </div>
                </div>
  
                <div className="ml-auto flex items-center gap-2">
                  {song.id === 1 && (
                    <StarIcon className="w-6 h-6 text-white opacity-60" />
                  )}
  
                  {song.isPlaying || song.isDownloaded ? (
                    <CheckCircleIcon className="w-6 h-6 text-white opacity-60" />
                  ) : (
                    <DownloadIcon className="w-6 h-6 text-white opacity-60" />
                  )}
  
                  <MoreVerticalIcon className="w-6 h-6 text-white opacity-60" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };
  