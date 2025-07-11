import React from "react";
import { Avatar, AvatarImage } from "../../../components/ui/avatar";

export const MixesForYouSection = (): JSX.Element => {
  return (
    <header className="absolute w-[360px] h-16 top-12 left-0 flex items-center justify-between px-6">
      <div className="flex flex-col">
        <p className="[font-family:'Inter',Helvetica] font-light text-[#ffffffbf] text-base tracking-[0] leading-5">
          👋 Hi Logan,
        </p>
        <h1 className="mt-1 [font-family:'Inter',Helvetica] font-medium text-[#ffffffbf] text-xl tracking-[0] leading-6">
          Good Evening
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          aria-label="Notifications"
          className="relative w-8 h-8 flex items-center justify-center"
        >
          <div className="relative w-[21px] h-[21px] bg-[url(https://c.animaapp.com/mcn61uqfOT4PgT/img/subtract.svg)] bg-[100%_100%]">
            <div className="absolute w-2 h-2 top-[3px] left-[13px] bg-white rounded" />
          </div>
        </button>

        <Avatar className="w-12 h-12">
          <AvatarImage
            src="https://c.animaapp.com/mcn61uqfOT4PgT/img/unsplash-d2msdujjl2g.png"
            alt="User profile"
            className="object-cover"
          />
        </Avatar>
      </div>
    </header>
  );
};
