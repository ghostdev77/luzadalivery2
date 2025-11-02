
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Banner } from "@/lib/types";

export function HeroCarousel({ banners }: { banners: Banner[] }) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section className="w-full container px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {banners.map((banner, index) => (
            <CarouselItem key={index}>
              <Link href={banner.link}>
                <Card className="overflow-hidden rounded-3xl border-none shadow-xl">
                  <CardContent className="relative flex aspect-video items-center justify-center p-0 md:aspect-[2.5/1]">
                    <Image
                      src={banner.imagemURL}
                      alt={banner.titulo}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      data-ai-hint="hero banner image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 md:p-10">
                      <h2 className="font-headline text-3xl font-bold text-white md:text-5xl">
                        {banner.titulo}
                      </h2>
                      <p className="mt-2 max-w-lg text-base text-white/90 md:text-lg">
                        {banner.descricao}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute bottom-5 right-5 hidden md:flex gap-2">
            <CarouselPrevious className="static -translate-x-0 -translate-y-0"/>
            <CarouselNext className="static -translate-x-0 -translate-y-0" />
        </div>
      </Carousel>
    </section>
  );
}
