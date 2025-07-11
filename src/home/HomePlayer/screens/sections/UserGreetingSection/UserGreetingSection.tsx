import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { ScrollArea, ScrollBar } from "../../../../components/ui/scroll-area";
import { useSupabase } from "../../../../hooks/useSupabase";
import { Playlist } from "../../../../types";

export const UserGreetingSection = (): JSX.Element => {
  const { user, fetchPublicPlaylists } = useSupabase();
  const [featuredPlaylists, setFeaturedPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedPlaylists = async () => {
      try {
        const result = await fetchPublicPlaylists();
        if (!result.error && result.playlists) {
          setFeaturedPlaylists(result.playlists.slice(0, 5)); // Lấy 5 playlist đầu tiên
        }
      } catch (error) {
        console.error('Error loading featured playlists:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedPlaylists();
  }, [fetchPublicPlaylists]);

  return (
    <div className="absolute w-[362px] h-[184px] top-[188px] left-0">
      <h2 className="absolute w-[186px] top-0 left-6 [font-family:'Inter',Helvetica] font-medium text-[#ffffffbf] text-2xl tracking-[0] leading-7">
        {user ? `Hello, ${user.full_name || user.email.split('@')[0]}!` : 'Welcome!'}
      </h2>

      <ScrollArea className="absolute w-[360px] h-[140px] top-11 left-0">
        <div className="flex space-x-4 px-6 pb-4">
          {loading ? (
            // Loading state
            Array.from({ length: 3 }).map((_, index) => (
              <Card
                key={`loading-${index}`}
                className="w-[280px] h-[140px] shrink-0 bg-[#ffffff1f] rounded-2xl overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="relative h-[140px] bg-gray-700 animate-pulse" />
                </CardContent>
              </Card>
            ))
          ) : (
            featuredPlaylists.map((playlist) => (
              <Card
                key={playlist.id}
                className="w-[280px] h-[140px] shrink-0 bg-[#ffffff1f] rounded-2xl overflow-hidden cursor-pointer"
              >
                <CardContent className="p-0">
                  <div
                    className="relative h-[140px] bg-cover bg-center"
                    style={{
                      backgroundImage: playlist.cover_url 
                        ? `url(${playlist.cover_url})`
                        : 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                    }}
                  >
                    <div className="absolute w-[200px] top-[27px] left-4 [font-family:'Inter',Helvetica] font-bold text-[#ffffffbf] text-base tracking-[0] leading-4">
                      <span className="leading-[0.1px]">{playlist.name}</span>
                      <span className="text-2xl leading-7">
                        {" "}
                        <br />
                      </span>
                      <span className="text-2xl leading-7">
                        {playlist.description || 'Playlist'}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};
