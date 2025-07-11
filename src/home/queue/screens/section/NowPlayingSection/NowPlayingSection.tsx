import { ChevronDownIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const NowPlayingSection = (): JSX.Element => {
  return (
    <Card className="w-full h-[72px] bg-[#0000001f] backdrop-blur-[2px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(2px)_brightness(100%)] rounded-none border-none">
      <CardContent className="p-0 relative flex items-center h-full">
        <div className="absolute top-4 left-4">
          <ChevronDownIcon className="w-10 h-10 text-white" />
        </div>

        <div className="ml-20 flex flex-col">
          <span className="font-normal text-[#ffffff80] text-[10px] leading-3">
            Now Playing:
          </span>

          <span className="font-medium text-[#ffffffbf] text-base leading-5 mt-2">
            &quot;Inside Out&quot; - The Chainsmokers
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
