import { HeartIcon, MoreVerticalIcon, PlayIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { ScrollArea, ScrollBar } from "../../../../components/ui/scroll-area";

// Playlist data structure
interface Song {
  image: string;
  title: string;
  artist: string;
}

interface Playlist {
  id: string;
  cover: string;
  title: string;
  songCount: string;
  songs: Song[];
}

export const UserGreetingSection = (): JSX.Element => {
  // Playlist data
  const playlists: Playlist[] = [
    {
      id: "peace",
      cover: "https://c.animaapp.com/mck01puwUyYbSW/img/rectangle-7-2.png",
      title: "Peace",
      songCount: "22 songs",
      songs: [
        {
          image: "https://c.animaapp.com/mck01puwUyYbSW/img/image-4-2.png",
          title: "Weightless",
          artist: "Marconi Union",
        },
        {
          image: "https://c.animaapp.com/mck01puwUyYbSW/img/image-5-2.png",
          title: "Nothing It Can",
          artist: "Helios",
        },
        {
          image: "https://c.animaapp.com/mck01puwUyYbSW/img/image-6-2.png",
          title: "Small Memory",
          artist: "Jon Hopkins - Insides",
        },
        {
          image: "https://c.animaapp.com/mck01puwUyYbSW/img/image-7-2.png",
          title: "Close To Home",
          artist: "Lyle Mays",
        },
      ],
    },
    {
      id: "gentle-acoustic",
      cover: "https://c.animaapp.com/mck01puwUyYbSW/img/rectangle-7-1.png",
      title: "Gentle Acoustic In...",
      songCount: "60 songs",
      songs: [
        {
          image: "https://c.animaapp.com/mck01puwUyYbSW/img/image-4-1.png",
          title: "Pillars",
          artist: "Bill Laurance - Affinity",
        },
        {
          image: "https://c.animaapp.com/mck01puwUyYbSW/img/image-5-1.png",
          title: "Light",
          artist: "Analog Heart",
        },
        {
          image: "https://c.animaapp.com/mck01puwUyYbSW/img/image-6-1.png",
          title: "Inglenook",
          artist: "Ken Verheecke - heartcall m...",
        },
        {
          image: "https://c.animaapp.com/mck01puwUyYbSW/img/image-7-1.png",
          title: "Sunshine",
          artist: "Cillian O'Mara",
        },
      ],
    },
    {
      id: "electronic-dreams",
      cover: "https://c.animaapp.com/mck01puwUyYbSW/img/rectangle-7.png",
      title: "Electronic Dreams",
      songCount: "60 songs",
      songs: [
        {
          image: "https://c.animaapp.com/mck01puwUyYbSW/img/image-4.png",
          title: "Each Day",
          artist: "Alex Baker & Harmless Night",
        },
        {
          image: "https://c.animaapp.com/mck01puwUyYbSW/img/image-5.png",
          title: "It's Not Far",
          artist: "After Milo & morningtime",
        },
        {
          image: "https://c.animaapp.com/mck01puwUyYbSW/img/image-6.png",
          title: "She Said",
          artist: "Trinix - Big Jet Plane",
        },
        {
          image: "https://c.animaapp.com/mck01puwUyYbSW/img/image-7.png",
          title: "Runaway",
          artist: "Alex Lustig",
        },
      ],
    },
  ];

  return (
    <section className="w-full max-w-[362px] py-4">
      <h2 className="text-2xl font-medium text-[#ffffffbf] mb-4 px-6">
        Today&apos;s Refreshing Song-Recommendations
      </h2>

      <ScrollArea className="w-full h-[408px]">
        <div className="flex space-x-4 px-6 pb-2">
          {playlists.map((playlist) => (
            <Card
              key={playlist.id}
              className="w-72 h-[408px] shrink-0 rounded-lg bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0.12)_90%)] border-0"
            >
              <CardHeader className="p-0">
                <div className="relative">
                  <img
                    className="w-[106px] h-[106px] object-cover m-4"
                    alt={playlist.title}
                    src={playlist.cover}
                  />

                  <div className="absolute top-[15px] left-[138px]">
                    <CardTitle className="text-xl font-bold text-[#ffffffbf]">
                      {playlist.title}
                    </CardTitle>
                    <p className="text-xs font-medium text-[#ffffff80] mt-2">
                      {playlist.songCount}
                    </p>
                  </div>

                  <div className="absolute top-[82px] left-[232px]">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-10 h-10 p-0 bg-transparent hover:bg-transparent"
                    >
                      <PlayIcon className="w-10 h-10 text-white" />
                    </Button>
                  </div>

                  <div className="absolute top-[98px] left-[138px] flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-6 h-6 p-0 bg-transparent hover:bg-transparent"
                    >
                      <HeartIcon className="w-6 h-6 text-white" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-6 h-6 p-0 bg-transparent hover:bg-transparent"
                    >
                      <MoreVerticalIcon className="w-6 h-6 text-white" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                {playlist.songs.map((song, index) => (
                  <div
                    key={`${playlist.id}-song-${index}`}
                    className="w-full h-12 flex items-center justify-between px-4 mt-6"
                  >
                    <div className="flex items-center">
                      <img
                        className="w-8 h-8 object-cover"
                        alt={song.title}
                        src={song.image}
                      />
                      <div className="ml-2">
                        <p className="text-xs font-medium text-white leading-[14px]">
                          {song.title}
                        </p>
                        <p className="text-xs font-medium text-[#ffffff80] leading-[14px]">
                          {song.artist}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-6 h-6 p-0 bg-transparent hover:bg-transparent"
                    >
                      <MoreVerticalIcon className="w-6 h-6 text-white" />
                    </Button>
                  </div>
                ))}

                <div className="flex justify-end mt-6 mr-4">
                  <Button
                    variant="secondary"
                    className="rounded-full px-3 py-2 h-auto bg-[#ffffffbf] hover:bg-[#ffffffdf] text-black"
                  >
                    <span className="text-xs font-medium">See All</span>
                  </Button>
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
