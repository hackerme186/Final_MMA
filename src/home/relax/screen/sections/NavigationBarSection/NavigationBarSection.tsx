import { HomeIcon } from "lucide-react";
import React from "react";

export const NavigationBarSection = (): JSX.Element => {
  // Navigation items data for easy mapping
  const navigationItems = [
    {
      icon: <HomeIcon className="w-6 h-6" />,
      label: "Home",
      position: "left-12",
      isActive: true,
    },
    {
      icon: (
        <img
          className="w-5 h-5 absolute top-0.5 left-0.5"
          alt="Search"
          src="https://c.animaapp.com/mck01puwUyYbSW/img/group-2584.png"
        />
      ),
      label: "Search",
      position: "left-[148px]",
      isActive: false,
    },
    {
      icon: (
        <img
          className="w-6 h-6"
          alt="Library music"
          src="https://c.animaapp.com/mck01puwUyYbSW/img/library-music.png"
        />
      ),
      label: "Your Library",
      position: "left-[248px]",
      isActive: false,
    },
  ];

  return (
    <nav className="fixed w-full h-[72px] bottom-0 left-0 backdrop-blur-[0.5px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(0.5px)_brightness(100%)] bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,1)_76%)]">
      {navigationItems.map((item, index) => (
        <div
          key={index}
          className={`absolute w-16 h-[72px] top-0 ${item.position}`}
        >
          <div className="absolute w-6 h-6 top-3 left-5">{item.icon}</div>
          <div
            className={`absolute w-16 top-[39px] left-0 font-bold text-[10px] text-center leading-3 [font-family:'Inter',Helvetica] tracking-[0] ${item.isActive ? "text-[#ffffffbf]" : "text-[#ffffff80]"}`}
          >
            {item.label}
          </div>
        </div>
      ))}
    </nav>
  );
};
