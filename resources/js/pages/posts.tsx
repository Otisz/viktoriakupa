import { Head, Link } from "@inertiajs/react";
import { buttonVariants } from "@/components/ui/button";
import PostCard from "@/features/posts/post-card";
import PostsWrapper from "@/features/posts/posts-wrapper";
import AppLayout from "@/layouts/app-layout";
import { cn } from "@/lib/utils";
import type { Pagination, Post, SharedData } from "@/types";

export default function Page(props: SharedData<{ posts: Pagination<Omit<Post, "content">> }>) {
  let imageCount = 0;

  return (
    <AppLayout description="Friss hírek, eredmények és beszámolók a Viktória Kupa Versenysorozat akrobatikus torna versenyeiről.">
      <Head title="Hírek"></Head>
      <main className="container max-w-7xl space-y-10 py-16 md:py-20">
        <h1 className="text-3xl tracking-tight break-words md:text-5xl">Hírek</h1>
        {props.posts.data.length > 0 ? (
          <PostsWrapper className="reveal">
            {props.posts.data.map((post) => (
              <PostCard key={post.slug} post={post} loading={imageCount++ < 9 ? "eager" : "lazy"} />
            ))}
          </PostsWrapper>
        ) : (
          <p className="rounded-2xl border border-dashed bg-card px-6 py-12 text-center text-muted-foreground">
            Még nincsenek megjelent hírek. Nézz vissza hamarosan!
          </p>
        )}
        <div className={cn("flex", [props.posts.prev_page_url ? "justify-between" : "justify-end"])}>
          {props.posts.prev_page_url ? (
            <div className="space-x-4">
              <Link className={buttonVariants({ variant: "outline" })} href={props.posts.path}>
                « Legújabbak
              </Link>
              <Link className={buttonVariants({ variant: "outline" })} href={props.posts.prev_page_url}>
                « Újabbak
              </Link>
            </div>
          ) : null}
          <div>
            {props.posts.next_page_url ? (
              <Link className={buttonVariants({ variant: "outline" })} href={props.posts.next_page_url}>
                Régebbiek »
              </Link>
            ) : null}
          </div>
        </div>
      </main>
    </AppLayout>
  );
}
