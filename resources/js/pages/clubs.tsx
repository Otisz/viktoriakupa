import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import type { Club, SharedData } from "@/types";

export default function Page(props: SharedData<{ clubs: Club[] }>) {
  return (
    <AppLayout description="A Viktória Kupa Versenysorozatban részt vevő akrobatikus torna egyesületek bemutatása és elérhetőségei.">
      <Head title="Egyesületek"></Head>
      <main className="container max-w-7xl py-16 md:py-20">
        <div className="space-y-8">
          <h1 className="text-3xl tracking-tight break-words md:text-5xl">Egyesületek</h1>
          <div className="max-w-[65ch] space-y-4">
            <p className="text-balance text-2xl text-primary leading-snug md:text-3xl">
              A győzelem csak akkor igazi, ha a legjobbakkal méred össze magad.
            </p>
            <p className="text-lg leading-relaxed">
              Ha szereted az akrobatikát, a kihívást, és azt kívánod, hogy az ellenfeleid is erősek legyenek,{" "}
              <span className="text-primary">akkor ez a Te helyed!</span> Itt a küzdelem tiszta, a siker megérdemelt, az
              eredmény pedig közös dicsőség.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A Viktória Kupa Versenysorozat Akrobatikus Torna egy országos szintű versenysorozat, amelynek fő célja a
              magyar akrobatikus torna tehetségeinek felkutatása és fejlesztése.
            </p>
          </div>
        </div>

        {props.clubs.length > 0 ? (
          <ul className="reveal mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {props.clubs.map((club) => {
              const clubNode = (
                <figure className="flex h-full flex-col items-center gap-4 rounded-2xl border bg-card p-6 transition group-hover:border-accent">
                  <img
                    src={club.image_url}
                    alt={club.name}
                    className="aspect-square h-32 w-auto object-contain transition group-hover:scale-105 motion-reduce:group-hover:scale-100"
                    width={600}
                    height={600}
                    loading="lazy"
                  />
                  <figcaption className="text-balance text-center text-muted-foreground text-sm group-hover:text-primary">
                    {club.name}
                  </figcaption>
                </figure>
              );

              return (
                <li key={club.id}>
                  {club.url ? (
                    <a
                      href={club.url}
                      target="_blank"
                      rel="noopener"
                      className="group block h-full active:scale-[0.98] motion-reduce:active:scale-100"
                    >
                      {clubNode}
                    </a>
                  ) : (
                    clubNode
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-16 rounded-2xl border border-dashed bg-card px-6 py-12 text-center text-muted-foreground">
            Az egyesületek listája hamarosan elérhető lesz.
          </p>
        )}
      </main>
    </AppLayout>
  );
}
