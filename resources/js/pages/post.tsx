import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import type { Post, SharedData } from "@/types";

export default function Page(props: SharedData<{ post: Post }>) {
  return (
    <AppLayout>
      <Head title={props.post.title}>
        <meta head-key="description" name="description" content={props.post.description ?? props.post.title} />

        <meta property="og:title" content={`${props.post.title} - ${props.name}`} />
        <meta property="og:description" content={props.post.description ?? props.post.title} />
        <meta property="og:image" content={props.post.featured_image_url} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${props.post.title} - ${props.name}`} />
        <meta name="twitter:description" content={props.post.description ?? props.post.title} />
        <meta name="twitter:image" content={props.post.featured_image_url} />
      </Head>
      <main className="container max-w-[80ch] space-y-8 px-4 pt-8 pb-20">
        <article>
          <header className="flex flex-col">
            <h1 className="mt-6 font-bold text-4xl tracking-tight sm:text-5xl">{props.post.title}</h1>
            <time dateTime={props.post.published_at} className="order-first flex items-center">
              <span className="h-4 w-0.5 rounded-full bg-gray-600" />
              <span className="ml-3 text-base text-gray-600">
                {new Date(props.post.published_at).toLocaleDateString("hu")}
              </span>
            </time>
          </header>
          <div className="prose mt-8 prose-img:rounded-xl prose-a:text-primary prose-img:shadow-sm marker:text-primary">
            <p>{props.post.description}</p>

            <img
              loading="eager"
              decoding="sync"
              src={props.post.featured_image_url}
              alt={props.post.title}
              className="not-prose w-full rounded-xl bg-gray-100 object-cover object-center"
            />

            {/** biome-ignore lint/security/noDangerouslySetInnerHtml: The content comes from trusted users */}
            <div dangerouslySetInnerHTML={{ __html: props.post.content }} />
          </div>
        </article>
      </main>
    </AppLayout>
  );
}
