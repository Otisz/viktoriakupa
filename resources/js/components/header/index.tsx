import { Link } from "@inertiajs/react";

export default function Header() {
  return (
    <header className="bg-primary py-3 text-primary-foreground">
      <div className="container flex max-w-7xl items-center justify-center">
        <Link href="/" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 lg:flex-row">
          <img
            src="/images/logo_matsz.png"
            alt="Magyar Akrobatikus Torna Szakág logo"
            className="order-2 h-14 w-auto md:h-18 lg:order-3"
            width={80}
            height={80}
          />
          <div className="order-3 flex w-full flex-col items-center justify-center text-balance text-center text-primary-foreground tracking-wide lg:order-2 lg:w-auto">
            <p className="text-sm text-primary-foreground/80 md:text-base">Magyar Torna Szövetség</p>
            <p className="text-base text-primary-foreground/90 md:text-lg">Akrobatikus Torna Szakág</p>
            <p className="text-xl md:text-2xl">Viktória Kupa Versenysorozat</p>
          </div>
          <img
            src="/images/logo_vk.png"
            alt="Viktória Kupa logo"
            className="order-1 h-14 w-auto md:h-18"
            width={180}
            height={180}
          />
        </Link>
      </div>
    </header>
  );
}
