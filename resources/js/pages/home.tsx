import { Link } from "@inertiajs/react";
import { ArrowRight, BookOpen, FileText, Trophy } from "lucide-react";
import RegistrationMenu from "@/components/registration-menu";
import { buttonVariants } from "@/components/ui/button";
import contributors from "@/data/contributors";
import LINKS from "@/data/links";
import sponsors from "@/data/sponsors";
import PostCard from "@/features/posts/post-card";
import AppLayout from "@/layouts/app-layout";
import { cn } from "@/lib/utils";
import type { Post, SharedData } from "@/types";

const MOTTO = "Örülünk, ha az ellenfél jól felkészült, mert így veszteni nem szégyen, de győzni dicsőség!";

const QUICK_LINKS = [
  { slug: "versenykiirasok", summary: "A versenyek részletei és a nevezés feltételei.", icon: FileText },
  { slug: "versenyeredmenyek", summary: "A lezajlott fordulók hivatalos eredményei.", icon: Trophy },
  { slug: "szabalyzatok", summary: "A versenysorozat hivatalos szabályzatai.", icon: BookOpen },
] as const;

export default function Page(props: SharedData<{ posts: Post[] }>) {
  const [featuredPost, ...otherPosts] = props.posts;
  const quickLinks = QUICK_LINKS.filter((link) => link.slug in props.documentTypes);

  return (
    <AppLayout>
      <main>
        <section className="grid bg-primary text-primary-foreground lg:grid-cols-12">
          <img
            src="/images/about-us.jpg"
            alt="A Viktória Kupa versenyzői, edzői és szervezői közös csoportképen a tornateremben"
            className="aspect-66/33 h-full w-full object-cover md:aspect-96/33 lg:order-2 lg:col-span-7 lg:aspect-auto"
            width={960}
            height={330}
            fetchPriority="high"
            decoding="async"
          />
          <div className="flex flex-col justify-center px-4 py-10 lg:col-span-5 lg:py-16 lg:pr-12 lg:pl-[max(1rem,calc((100vw-80rem)/2+1rem))] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700">
            <h1 className="text-balance text-4xl leading-[1.1] tracking-tight md:text-5xl">
              Viktória Kupa Versenysorozat
            </h1>
            <p className="mt-5 max-w-md text-balance text-lg text-primary-foreground/85 leading-relaxed">{MOTTO}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <RegistrationMenu
                triggerClassName={cn(
                  buttonVariants({ size: "xl" }),
                  "group bg-primary-foreground text-primary hover:bg-primary-foreground/90",
                )}
              />
              <Link
                href={LINKS.calendar}
                className={cn(
                  buttonVariants({ size: "xl", variant: "outline" }),
                  "border-primary-foreground/80 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground",
                )}
              >
                Versenynaptár
              </Link>
            </div>
          </div>
        </section>

        {quickLinks.length > 0 ? (
          <nav aria-label="Gyors elérés" className="container max-w-7xl pt-12 md:pt-16">
            <ul className="reveal grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
              {quickLinks.map((link, index) => {
                const isLead = index === 0;

                return (
                  <li key={link.slug} className={cn(isLead ? "sm:col-span-2 lg:col-span-6" : "lg:col-span-3")}>
                    <Link
                      href={`/dokumentumok/${link.slug}`}
                      className={cn(
                        "group flex h-full flex-col justify-between gap-8 rounded-2xl border p-6 transition active:scale-[0.98] motion-reduce:active:scale-100",
                        isLead
                          ? "border-transparent bg-nav text-nav-foreground hover:bg-nav/90 md:p-8"
                          : "bg-card hover:border-accent",
                      )}
                    >
                      <link.icon
                        className={cn("size-7", isLead ? "text-nav-foreground" : "text-secondary")}
                        aria-hidden="true"
                      />
                      <span className="flex flex-col gap-2">
                        <span
                          className={cn(
                            "flex items-center justify-between gap-4",
                            isLead ? "text-2xl md:text-3xl" : "text-xl",
                          )}
                        >
                          {props.documentTypes[link.slug]}
                          <ArrowRight
                            className="size-5 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                            aria-hidden="true"
                          />
                        </span>
                        <span
                          className={cn("text-sm leading-6", isLead ? "text-nav-foreground" : "text-muted-foreground")}
                        >
                          {link.summary}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}

        {featuredPost ? (
          <section className="container max-w-7xl py-16 md:py-24">
            <h2 className="text-3xl tracking-tight md:text-4xl">Aktuális híreink</h2>
            <div className="reveal mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-7">
                <PostCard post={featuredPost} loading="lazy" variant="featured" />
              </div>
              {otherPosts.length > 0 ? (
                <ul className="flex flex-col gap-6 lg:col-span-5">
                  {otherPosts.map((post) => (
                    <li key={post.slug}>
                      <PostCard post={post} loading="lazy" variant="compact" />
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <Link
              href={LINKS.news}
              className="group mt-12 inline-flex items-center gap-2 text-lg text-primary underline-offset-4 hover:underline"
            >
              Korábbi hírek
              <ArrowRight
                className="size-5 transition-transform group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
                aria-hidden="true"
              />
            </Link>
          </section>
        ) : null}

        <section className="border-t bg-card">
          <div className="container max-w-7xl space-y-16 py-16 md:py-24">
            <div className="reveal space-y-8">
              <h2 className="text-3xl tracking-tight md:text-4xl">Támogatóink</h2>
              <ul className="flex flex-wrap items-start gap-x-14 gap-y-10">
                {sponsors.map((sponsor) => (
                  <li key={sponsor.href}>
                    <a
                      href={sponsor.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex w-40 flex-col items-center gap-3 text-center sm:w-48"
                    >
                      <img
                        className="h-24 w-full object-contain transition group-hover:scale-105 motion-reduce:group-hover:scale-100"
                        src={sponsor.image}
                        alt={sponsor.name}
                        width={192}
                        height={96}
                        loading="lazy"
                      />
                      <span className="text-sm group-hover:text-primary group-hover:underline">{sponsor.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal space-y-8 border-t pt-16">
              <h2 className="text-2xl tracking-tight md:text-3xl">Együttműködő partnereink</h2>
              <ul className="flex flex-wrap items-start gap-x-12 gap-y-8">
                {contributors.map((contributor) => (
                  <li key={contributor.name}>
                    <a
                      href={contributor.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex w-36 flex-col items-center gap-2 text-center"
                    >
                      <img
                        className="h-16 w-full object-contain transition group-hover:scale-105 motion-reduce:group-hover:scale-100"
                        src={contributor.image}
                        alt={contributor.name}
                        width={144}
                        height={64}
                        loading="lazy"
                      />
                      <span className="text-muted-foreground text-xs leading-snug group-hover:text-primary group-hover:underline">
                        {contributor.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </AppLayout>
  );
}
