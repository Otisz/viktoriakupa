import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";
import contributors from "@/data/contributors";
import sponsors from "@/data/sponsors";
import PostCard from "@/features/posts/post-card";
import PostsWrapper from "@/features/posts/posts-wrapper";
import AppLayout from "@/layouts/app-layout";
import type { Post, SharedData } from "@/types";

export default function Page(props: SharedData<{ posts: Post[] }>) {
  return (
    <AppLayout>
      <main>
        <section className="w-full aspect-66/33 md:aspect-96/33 bg-[url('/images/about-us.jpg')] bg-center bg-no-repeat bg-cover" />
        <section className="container mt-16">
          <div className="prose prose-lg mx-auto max-w-[80ch]">
            <h2 className="text-center font-bold text-3xl tracking-tighter sm:text-4xl md:text-5xl">Mottónk</h2>
            <p className="text-center text-balance">
              Örülünk, ha az ellenfél, jól felkészült, mert így veszteni nem szégyen, de győzni dicsőség!
            </p>
          </div>
        </section>
        {props.posts.length > 0 ? (
          <section className="container mt-16">
            <div className="prose prose-lg mx-auto max-w-none">
              <h2 className="text-center font-bold text-3xl tracking-tighter sm:text-4xl md:text-5xl">
                Aktuális híreink
              </h2>
              <PostsWrapper className="not-prose">
                {props.posts.map((post) => (
                  <PostCard key={post.slug} post={post} loading="lazy" />
                ))}
              </PostsWrapper>

              <Link href="/hirek" className="not-prose mt-8 block text-center text-gray-900 text-xl hover:text-primary">
                Korábbi hírek <ArrowRight className="inline-block size-5" />
              </Link>
            </div>
          </section>
        ) : null}
        <section className="container my-16">
          <h2 className="text-center font-bold text-3xl tracking-tighter sm:text-4xl md:text-5xl">Támogatóink</h2>
          <div className="flex gap-8 flex-wrap justify-center mt-16">
            {sponsors.map((sponsor) => (
              <a
                href={sponsor.href}
                key={sponsor.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex flex-col items-center space-y-2 text-center"
              >
                <img
                  className="col-span-2 mx-auto h-32 w-fit rounded object-contain lg:col-span-1"
                  src={sponsor.image}
                  alt={sponsor.name}
                  title={sponsor.name}
                  width={158}
                  height={48}
                />
                <span className="group-hover:text-primary group-hover:underline">{sponsor.name}</span>
              </a>
            ))}
          </div>
        </section>
        <section className="container my-16">
          <h2 className="text-center font-bold text-3xl tracking-tighter sm:text-4xl md:text-5xl">
            Együttműködő partnereink
          </h2>
          <div className="flex flex-wrap gap-8 justify-center mt-16">
            {contributors.map((contributor) => (
              <a
                href={contributor.href}
                key={contributor.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex flex-col items-center space-y-2 text-center"
              >
                <img
                  className="col-span-2 mx-auto h-32 w-fit rounded object-contain lg:col-span-1"
                  src={contributor.image}
                  alt={contributor.name}
                  title={contributor.name}
                  width={158}
                  height={48}
                />
                <span className="group-hover:text-primary group-hover:underline">{contributor.name}</span>
              </a>
            ))}
          </div>
        </section>
      </main>
    </AppLayout>
  );
}
