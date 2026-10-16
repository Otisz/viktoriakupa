/** biome-ignore-all lint/correctness/useUniqueElementIds: static single-instance menu */

import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { FaAlignRight, FaRegCircleXmark } from "react-icons/fa6";
import { SiFacebook } from "react-icons/si";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LINKS from "@/data/links";
import type { SharedData } from "@/types";

export default function MobileMenu() {
  const page = usePage();
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger aria-label="Navigációs menü megnyitása" className="block lg:hidden">
        <FaAlignRight className="h-8 w-8" />
      </SheetTrigger>
      <SheetContent noClose className="w-full border-none bg-background p-0">
        <SheetHeader className="m-4 flex h-20 flex-row divide-x divide-background">
          <SheetTitle className="flex flex-1 items-center px-4 font-bold text-2xl">Menü</SheetTitle>
          <SheetClose
            className="m-0! inline-flex aspect-square h-full items-center justify-center rounded-xl border-2 border-border bg-accent/30 transition-all hover:border-orange-500 hover:bg-accent"
            aria-labelledby="close-navitaion-menu"
          >
            <FaRegCircleXmark className="h-8 w-8" />
            <span className="sr-only" id="close-navitaion-menu">
              Navigációs menü bezárása
            </span>
          </SheetClose>
          <SheetDescription className="sr-only">Navigációs menü</SheetDescription>
        </SheetHeader>
        <div className="h-full space-y-8 overflow-auto pb-32">
          <div className="grid grid-cols-1 divide-y divide-border">
            <Link href={LINKS.news} className="px-8 py-4" onClick={close}>
              Hírek
            </Link>
            <Link href={LINKS.about_us} className="px-8 py-4" onClick={close}>
              Rólunk
            </Link>
            <Link href={LINKS.clubs} className="px-8 py-4" onClick={close}>
              Egyesületek
            </Link>
            <div className="flex flex-col py-4">
              <span className="px-8">Dokumentumok</span>
              {Object.entries((page.props as unknown as SharedData).documentTypes).map(([slug, title]) => (
                <Link
                  key={slug}
                  href={`/dokumentumok/${slug}`}
                  className="px-12 py-2 text-muted-foreground"
                  onClick={close}
                >
                  {title}
                </Link>
              ))}
            </div>
            <Link href={LINKS.calendar} className="px-8 py-4" onClick={close}>
              Versenynaptár
            </Link>
            <Link href={LINKS.contact} className="px-8 py-4" aria-label="Ugrás a kapcsolat oldalra" onClick={close}>
              Kapcsolat
            </Link>
          </div>
          <div className="flex flex-col gap-4 px-8">
            <a
              className={buttonVariants({ size: "lg" })}
              href={LINKS.apply_temp}
              aria-label="Tovább az ideiglenes jelentkezés oldalra (új lap)"
              title="Ideiglenes jelentkezés Google Forms-on keresztül"
            >
              Ideiglenes nevezés
            </a>
            <a
              className={buttonVariants({ size: "lg" })}
              href={LINKS.apply_perma}
              aria-label="Tovább a végleges jelentkezés oldalra (új lap)"
              title="Végleges jelentkezés Google Forms-on keresztül"
            >
              Végleges nevezés
            </a>
          </div>
          <div className="grid grid-cols-1 gap-4 px-8">
            <a
              href={LINKS.facebook}
              target="_blank"
              aria-label="Tekintse meg a Facebook oldalunkat"
              title="Facebook"
              rel="noreferrer"
            >
              <SiFacebook className="mx-auto size-12 fill-[#4267b2]" />
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
