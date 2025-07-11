import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { ScrollArea, ScrollBar } from "../../../../components/ui/scroll-area";
import { useSupabase } from "../../../../hooks/useSupabase";
import { Album } from "../../../../types";

export const FeaturedSection = (): JSX.Element => {
  const { fetchAlbums } = useSupabase();
  const [featuredAlbums, setFeaturedAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const result = await fetchAlbums();
        if (!result.error && result.albums) {
          setFeaturedAlbums(result.albums.slice(0, 6)); // Lấy 6 album đầu tiên
        }
      } catch (error) {
        console.error('Error loading albums:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAlbums();
  }, [fetchAlbums]);

  return (
    <section className="absolute w-[364px] h-[236px] top-[232px] left-0">
      <header className="flex justify-between items-center mb-4 px-6">
        <h2 className="[font-family:'Inter',Helvetica] font-medium text-[#ffffffbf] text-2xl tracking-[0] leading-7">
          From Artists You Follow
        </h2>
        <button className="[font-family:'Inter',Helvetica] font-medium text-white text-base tracking-[0] leading-5">
          See more
        </button>
      </header>

      <ScrollArea className="w-[360px] h-[164px]">
        <div className="flex space-x-4 px-6">
          {loading ? (
            // Loading state
            Array.from({ length: 6 }).map((_, index) => (
              <Card
                key={`loading-${index}`}
                className="w-[120px] h-[164px] flex-shrink-0 bg-transparent border-0"
              >
                <CardContent className="p-0">
                  <div className="w-[120px] h-[120px] bg-gray-700 animate-pulse rounded" />
                  <div className="w-[120px] h-4 mt-[7px] bg-gray-700 animate-pulse rounded" />
                </CardContent>
              </Card>
            ))
          ) : (
            featuredAlbums.map((album) => (
              <Card
                key={album.id}
                className="w-[120px] h-[164px] flex-shrink-0 bg-transparent border-0"
              >
                <CardContent className="p-0">
                  <img
                    className="w-[120px] h-[120px] object-cover rounded"
                    alt={`${album.title} album cover`}
                    src={album.cover_url}
                  />
                  <p className="w-[120px] mt-[7px] [font-family:'Inter',Helvetica] font-medium text-[#ffffffbf] text-xs text-center tracking-[0] leading-[14px]">
                    {album.title}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};
