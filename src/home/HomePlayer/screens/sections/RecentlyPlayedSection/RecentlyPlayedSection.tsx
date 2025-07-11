import React, { useEffect, useState } from "react";
import { useSupabase } from "../../../../hooks/useSupabase";
import { ScrollArea, ScrollBar } from "../../../components/ui/scroll-area";

export const RecentlyPlayedSection = (): JSX.Element => {
  const { recentlyPlayed, fetchRecentlyPlayed } = useSupabase();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecentlyPlayed = async () => {
      try {
        await fetchRecentlyPlayed();
      } catch (error) {
        console.error('Error loading recently played:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecentlyPlayed();
  }, [fetchRecentlyPlayed]);

  return (
    <div className="absolute w-[362px] h-52 top-0 left-0">
      <h2 className="absolute w-[312px] top-0 left-6 [font-family:'Inter',Helvetica] font-medium text-[#ffffffbf] text-2xl tracking-[0] leading-7">
        Mixes for you
      </h2>

      <ScrollArea className="absolute w-[360px] h-[164px] top-11 left-0">
        <div className="relative w-[848px] h-[164px]">
          {loading ? (
            // Loading state
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`loading-${index}`}
                className={`absolute w-[120px] h-[164px] top-0 ${
                  index === 0
                    ? "left-6"
                    : index === 1
                      ? "left-40"
                      : index === 2
                        ? "left-[296px]"
                        : index === 3
                          ? "left-[432px]"
                          : index === 4
                            ? "left-[568px]"
                            : "left-[704px]"
                }`}
              >
                <div className="w-[120px] h-[120px] bg-gray-700 animate-pulse rounded" />
                <div className="w-[120px] h-4 mt-2 bg-gray-700 animate-pulse rounded" />
              </div>
            ))
          ) : (
            recentlyPlayed.slice(0, 6).map((song, index) => (
              <div
                key={song.id}
                className={`absolute w-[120px] h-[164px] top-0 ${
                  index === 0
                    ? "left-6"
                    : index === 1
                      ? "left-40"
                      : index === 2
                        ? "left-[296px]"
                        : index === 3
                          ? "left-[432px]"
                          : index === 4
                            ? "left-[568px]"
                            : "left-[704px]"
                }`}
              >
                <div className="absolute w-[120px] top-[127px] left-0 [font-family:'Inter',Helvetica] font-medium text-[#ffffffbf] text-xs tracking-[0] leading-[14px]">
                  {song.artist}
                </div>

                <div
                  className="w-[120px] h-[120px] absolute top-0 left-0 bg-cover bg-[50%_50%] rounded"
                  style={{ backgroundImage: `url(${song.cover_url})` }}
                >
                  <div className="inline-flex items-start px-2 py-1 relative top-24 left-8 rounded bg-black bg-opacity-50">
                    <div className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-bold text-[#ffffffbf] text-xs tracking-[0] leading-4 whitespace-nowrap">
                      {song.title}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
