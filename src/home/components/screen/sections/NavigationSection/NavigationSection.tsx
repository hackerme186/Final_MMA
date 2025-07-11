import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../../../components/ui/carousel";

export const NavigationSection = (): JSX.Element => {
  // Data for featured cards
  const featuredCards = [
    {
      id: 1,
      backgroundImage:
        "https://c.animaapp.com/mce89k0vmPQgyZ/img/unsplash-yrtflrlo2dq.png",
      title: "New",
      subtitle: "English Songs",
    },
    {
      id: 2,
      backgroundImage:
        "https://c.animaapp.com/mce89k0vmPQgyZ/img/unsplash-yrtflrlo2dq-4.png",
      title: "Weekly",
      subtitle: "TOP 20",
    },
    {
      id: 3,
      backgroundImage:
        "https://c.animaapp.com/mce89k0vmPQgyZ/img/unsplash-yrtflrlo2dq-5.png",
      title: "SING ALONG WITH",
      subtitle: "THE CHAINSMOKERS",
    },
    {
      id: 4,
      backgroundImage:
        "https://c.animaapp.com/mce89k0vmPQgyZ/img/unsplash-yrtflrlo2dq-6.png",
      title: "All New from",
      subtitle: "TAMIL TRENDING",
    },
    {
      id: 5,
      backgroundImage:
        "https://c.animaapp.com/mce89k0vmPQgyZ/img/unsplash-yrtflrlo2dq-7.png",
      title: "This Week's",
      subtitle: "EDM Bangers",
    },
  ];

  return (
    <section className="w-full max-w-[362px] py-6">
      <h2 className="mb-4 ml-6 font-medium text-2xl text-[#ffffffbf] font-['Inter',Helvetica]">
        Featuring Today
      </h2>

      <Carousel className="w-full">
        <CarouselContent className="ml-6">
          {featuredCards.map((card) => (
            <CarouselItem key={card.id} className="pl-0 md:basis-[280px]">
              <Card className="w-[280px] h-[140px] rounded-2xl bg-[#ffffff1f] overflow-hidden border-0">
                <CardContent className="p-0 h-full">
                  <div
                    className="relative h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${card.backgroundImage})` }}
                  >
                    <div className="absolute top-[27px] left-4 font-['Inter',Helvetica] font-bold text-[#ffffffbf]">
                      <span className="text-base leading-[0.1px] block">
                        {card.title}
                      </span>
                      <span className="text-2xl leading-7 block">
                        {card.subtitle}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};
