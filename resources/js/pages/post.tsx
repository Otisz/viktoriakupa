import { Head, Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";
import LINKS from "@/data/links";
import AppLayout from "@/layouts/app-layout";
import { PROSE_CLASS_NAME } from "@/lib/prose";
import { cn } from "@/lib/utils";
import type { Post, SharedData } from "@/types";

export default function Page(props: SharedData<{ post: Post }>) {
  return (
    <AppLayout description={props.post.description ?? props.post.title}>
      <Head title={props.post.title}>
        <meta head-key="og:title" property="og:title" content={`${props.post.title} - ${props.name}`} />
        <meta head-key="og:image" property="og:image" content={props.post.featured_image_url} />
        <meta head-key="twitter:title" name="twitter:title" content={`${props.post.title} - ${props.name}`} />
        <meta head-key="twitter:image" name="twitter:image" content={props.post.featured_image_url} />
      </Head>
      <main className="container max-w-[80ch] py-16 md:py-20">
        <article>
          <header className="flex flex-col">
            <h1 className="mt-4 text-balance text-3xl leading-[1.1] tracking-tight break-words md:text-5xl">
              {props.post.title}
            </h1>
            <time dateTime={props.post.published_at} className="order-first flex items-center">
              <span className="h-4 w-0.5 rounded-full bg-accent" />
              <span className="ml-3 text-base text-muted-foreground">
                {new Date(props.post.published_at).toLocaleDateString("hu")}
              </span>
            </time>
            {props.post.description ? (
              <p className="mt-6 max-w-[65ch] text-pretty text-muted-foreground text-xl leading-relaxed">
                {props.post.description}
              </p>
            ) : null}
          </header>

          <img
            loading="eager"
            decoding="async"
            fetchPriority="high"
            src={props.post.featured_image_url}
            alt={props.post.title}
            className="mx-auto mt-10 block h-auto max-h-[75dvh] w-auto max-w-full rounded-2xl bg-muted"
          />

          <div
            className={cn(PROSE_CLASS_NAME, "mt-10")}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: The content comes from trusted users
            dangerouslySetInnerHTML={{ __html: props.post.content }}
          />
        </article>

        <Link
          href={LINKS.news}
          className="group mt-16 inline-flex items-center gap-2 text-lg text-primary underline-offset-4 hover:underline"
        >
          Korábbi hírek
          <ArrowRight
            className="size-5 transition-transform group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
            aria-hidden="true"
          />
        </Link>
      </main>
    </AppLayout>
  );
}
