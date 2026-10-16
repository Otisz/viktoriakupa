import { Link } from "@inertiajs/react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import type { Post } from "@/types";

type Props = Readonly<{
  post: Omit<Post, "content">;
  loading: ComponentProps<"img">["loading"];
  variant?: "default" | "featured" | "compact";
}>;

export default function PostCard({ post, loading, variant = "default" }: Props) {
  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";

  return (
    <Link href={`/hirek/${post.slug}`} className="group block rounded-2xl">
      <article className={cn("flex flex-col gap-4", isCompact && "flex-row items-center gap-4 sm:gap-5")}>
        <div
          className={cn(
            "aspect-video w-full overflow-hidden rounded-2xl bg-muted",
            isCompact && "aspect-4/3 w-28 shrink-0 sm:w-36",
          )}
        >
          <img
            loading={loading}
            decoding="async"
            src={post.featured_image_url}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
            width={1280}
            height={720}
          />
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <time dateTime={post.published_at} className="text-muted-foreground text-sm">
            {new Date(post.published_at).toLocaleDateString("hu")}
          </time>
          <h2
            className={cn(
              "text-pretty text-lg leading-snug decoration-2 decoration-secondary underline-offset-4 group-hover:underline",
              isFeatured && "text-2xl md:text-3xl",
              isCompact && "line-clamp-3 text-base",
            )}
          >
            {post.title}
          </h2>
          {!isCompact && "description" in post && post.description ? (
            <p
              className={cn(
                "line-clamp-3 max-w-[65ch] text-muted-foreground text-sm leading-6",
                isFeatured && "text-base leading-relaxed",
              )}
            >
              {post.description}
            </p>
          ) : null}
        </div>
      </article>
    </Link>
  );
}
