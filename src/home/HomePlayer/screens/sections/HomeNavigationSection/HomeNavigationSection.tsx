import React from "react";

export const HomeNavigationSection = (): JSX.Element => {
  const navigationItems = [
    {
      id: "home",
      label: "Home",
      icon: "https://c.animaapp.com/mcn61uqfOT4PgT/img/home.png",
      active: true,
      position: "left-12",
    },
    {
      id: "search",
      label: "Search",
      iconWrapper: true,
      icon: "https://c.animaapp.com/mcn61uqfOT4PgT/img/group-2584.png",
      active: false,
      position: "left-[148px]",
    },
    {
      id: "library",
      label: "Your Library",
      icon: "https://c.animaapp.com/mcn61uqfOT4PgT/img/library-music.png",
      active: false,
      position: "left-[248px]",
    },
  ];

  return (
    <nav className="fixed w-[360px] h-[72px] top-[728px] left-0 backdrop-blur-[0.5px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(0.5px)_brightness(100%)] bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,1)_76%)]">
      {navigationItems.map((item) => (
        <div
          key={item.id}
          className={`absolute w-16 h-[72px] top-0 ${item.position}`}
          role="button"
          aria-label={item.label}
          tabIndex={0}
        >
          {item.iconWrapper ? (
            <div className="absolute w-6 h-6 top-3 left-5">
              <img
                className="absolute w-5 h-5 top-0.5 left-0.5"
                alt={item.label}
                src={item.icon}
              />
            </div>
          ) : (
            <img
              className="absolute w-6 h-6 top-3 left-5"
              alt={item.label}
              src={item.icon}
            />
          )}

          <div
            className={`absolute w-16 top-[39px] left-0 [font-family:'Inter',Helvetica] font-bold ${
              item.active ? "text-[#ffffffbf]" : "text-[#ffffff80]"
            } text-[10px] text-center tracking-[0] leading-3`}
          >
            {item.label}
          </div>
        </div>
      ))}
    </nav>
  );
};
