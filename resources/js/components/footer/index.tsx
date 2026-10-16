import { Link, usePage } from "@inertiajs/react";
import FacebookIcon from "@/components/icons/facebook";
import LINKS from "@/data/links";
import type { SharedData } from "@/types";

export default function Footer() {
  const page = usePage();

  return (
    <footer className="bg-gray-900">
      <div className="container pt-16 pb-8 sm:pt-24 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <img className="mx-auto h-24 w-auto" src="/images/logo_vk.png" alt="Viktoria Kupa Logo" />
            <p className="text-center text-balance text-gray-300 text-sm leading-6">
              Örülünk, ha az ellenfél, jól felkészült, mert így veszteni nem szégyen, de győzni dicsőség!
            </p>
            <div className="flex justify-around">
              <Link href={LINKS.facebook} target="_blank" title="Facebook">
                <FacebookIcon className="h-6 w-6 text-gray-500 hover:text-[#4267B2]" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="space-y-8">
              <h3 className="font-semibold text-sm text-white leading-6 col-span-2">Tartalmak</h3>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <ul className="space-y-4">
                  <li>
                    <Link href={LINKS.about_us} className="text-gray-300 text-sm leading-6 hover:text-white">
                      Rólunk
                    </Link>
                  </li>
                  <li>
                    <Link href={LINKS.clubs} className="text-gray-300 text-sm leading-6 hover:text-white">
                      Egyesületek
                    </Link>
                  </li>
                  {Object.entries((page.props as unknown as SharedData).documentTypes).map(([slug, title]) => (
                    <li key={slug}>
                      <Link href={`/dokumentumok/${slug}`} className="text-gray-300 text-sm leading-6 hover:text-white">
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-4">
                  <li>
                    <Link href={LINKS.calendar} className="text-gray-300 text-sm leading-6 hover:text-white">
                      Versenynaptár
                    </Link>
                  </li>
                  <li>
                    <Link href={LINKS.news} className="text-gray-300 text-sm leading-6 hover:text-white">
                      Hírek
                    </Link>
                  </li>
                  <li>
                    <Link href={LINKS.contact} className="text-gray-300 text-sm leading-6 hover:text-white">
                      Kapcsolat
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div className="mt-10 md:mt-0">
                <h3 className="font-semibold text-sm text-white leading-6">Bejelentkezés</h3>
                <ul className="mt-6 space-y-4">
                  <li>
                    <a
                      href="http://account.synology.com"
                      className="text-gray-300 text-sm leading-6 hover:text-white"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Tárhely
                    </a>
                  </li>
                  <li>
                    <a href="/studio" className="text-gray-300 text-sm leading-6 hover:text-white">
                      Studio
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 space-y-2 border-white/10 border-t pt-8 sm:mt-20 lg:mt-24">
          <p className="text-gray-400 text-xs leading-5">&copy; 2026 Mester Gábor. Minden jog fenntartva.</p>
          <p className="text-gray-400 text-xs leading-5" lang="en">
            Made with ❤️ by{" "}
            <a href="https://leventeotta.com" target="_blank" className="hover:underline" rel="noreferrer">
              Levente Otta
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
