import { Link, usePage } from "@inertiajs/react";
import { Heart } from "lucide-react";
import FacebookIcon from "@/components/icons/facebook";
import LINKS from "@/data/links";
import type { SharedData } from "@/types";

const linkClassName = "text-ink-foreground/75 text-sm leading-6 transition-colors hover:text-ink-foreground";

export default function Footer() {
  const page = usePage();

  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container max-w-7xl pt-16 pb-8 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col items-center gap-6 text-center lg:col-span-4 lg:items-start lg:text-left">
            <img className="h-20 w-auto" src="/images/logo_vk.png" alt="Viktória Kupa Logo" width={80} height={80} />
            <p className="max-w-xs text-balance text-ink-foreground/75 text-sm leading-6">
              Örülünk, ha az ellenfél jól felkészült, mert így veszteni nem szégyen, de győzni dicsőség!
            </p>
            <a
              href={LINKS.facebook}
              target="_blank"
              rel="noreferrer"
              title="Facebook"
              className="text-ink-foreground/60 transition-colors hover:text-ink-foreground"
            >
              <FacebookIcon className="size-6" />
              <span className="sr-only">Facebook</span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:col-span-8 lg:grid-cols-3">
            <div className="col-span-2 space-y-6">
              <h2 className="text-ink-foreground text-sm leading-6">Tartalmak</h2>
              <div className="grid gap-4 md:grid-cols-2 md:gap-8">
                <ul className="space-y-4">
                  <li>
                    <Link href={LINKS.about_us} className={linkClassName}>
                      Rólunk
                    </Link>
                  </li>
                  <li>
                    <Link href={LINKS.clubs} className={linkClassName}>
                      Egyesületek
                    </Link>
                  </li>
                  {Object.entries((page.props as unknown as SharedData).documentTypes).map(([slug, title]) => (
                    <li key={slug}>
                      <Link href={`/dokumentumok/${slug}`} className={linkClassName}>
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-4">
                  <li>
                    <Link href={LINKS.calendar} className={linkClassName}>
                      Versenynaptár
                    </Link>
                  </li>
                  <li>
                    <Link href={LINKS.news} className={linkClassName}>
                      Hírek
                    </Link>
                  </li>
                  <li>
                    <Link href={LINKS.contact} className={linkClassName}>
                      Kapcsolat
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-span-2 space-y-6 lg:col-span-1">
              <h2 className="text-ink-foreground text-sm leading-6">Bejelentkezés</h2>
              <ul className="space-y-4">
                <li>
                  <a href="http://account.synology.com" className={linkClassName} target="_blank" rel="noreferrer">
                    Tárhely
                  </a>
                </li>
                <li>
                  <a href="/studio" className={linkClassName}>
                    Studio
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 space-y-2 border-ink-foreground/10 border-t pt-8">
          <p className="text-ink-foreground/60 text-xs leading-5">&copy; 2026 Mester Gábor. Minden jog fenntartva.</p>
          <p className="text-ink-foreground/60 text-xs leading-5" lang="en">
            Made with <Heart className="inline size-3.5 fill-current align-[-2px]" role="img" aria-label="love" /> by{" "}
            <a href="https://leventeotta.com" target="_blank" className="hover:underline" rel="noreferrer">
              Levente Otta
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
