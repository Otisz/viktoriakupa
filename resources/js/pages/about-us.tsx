import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import type { Page as PageType, SharedData } from "@/types";

export default function Page(props: SharedData<{ about: PageType }>) {
  return (
    <AppLayout>
      <Head title={props.about.title}>
        <meta head-key="description" name="description" content={props.about.description ?? props.about.title} />
      </Head>
      <main className="container py-12 max-w-[80ch]">
        <section className="prose">
          {/** biome-ignore lint/security/noDangerouslySetInnerHtml: The content comes from trusted users */}
          <div dangerouslySetInnerHTML={{ __html: props.about.content }} />
        </section>
      </main>
    </AppLayout>
  );
}
