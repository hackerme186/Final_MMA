import { BellIcon } from "lucide-react";
import React from "react";
import { Avatar, AvatarImage } from "../../../../components/ui/avatar";

export const SongRecommendationsSection = (): JSX.Element => {
  return (
    <header className="w-full py-3 px-6 flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <p className="font-light text-[#ffffffbf] text-base leading-5">
          👋 Hi Logan,
        </p>
        <h2 className="text-[#ffffffbf] text-xl leading-6 font-medium">
          Good Evening
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-8 h-8 flex items-center justify-center">
            <BellIcon className="w-[21px] h-[21px] text-white" />
            <div className="absolute w-2 h-2 top-[8px] right-[5px] bg-white rounded-full" />
          </div>
        </div>

        <Avatar className="w-12 h-12">
          <AvatarImage
            src="https://c.animaapp.com/mck01puwUyYbSW/img/unsplash-d2msdujjl2g.png"
            alt="User profile"
            className="object-cover"
          />
        </Avatar>
      </div>
    </header>
  );
};
