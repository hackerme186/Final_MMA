import React from "react";
import { Avatar, AvatarImage } from "../../../ui/avatar";

export const MixesForYouSection = (): JSX.Element => {
  return (
    <header className="w-full py-3 px-6 flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <div className="font-light text-[#ffffffbf] text-base leading-5">
          👋 Hi Logan,
        </div>
        <div className="font-medium text-[#ffffffbf] text-xl leading-6">
          Good Evening
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-8 h-8 flex items-center justify-center">
          <div className="relative w-[21px] h-[21px] bg-[url(https://c.animaapp.com/mce89k0vmPQgyZ/img/subtract.svg)] bg-[100%_100%]">
            <div className="absolute w-2 h-2 top-[3px] left-[13px] bg-white rounded-full" />
          </div>
        </div>

        <Avatar className="w-12 h-12">
          <AvatarImage
            src="https://c.animaapp.com/mce89k0vmPQgyZ/img/unsplash-d2msdujjl2g.png"
            alt="User profile"
            className="object-cover"
          />
        </Avatar>
      </div>
    </header>
  );
};
