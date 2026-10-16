import { Head } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { PROSE_CLASS_NAME } from "@/lib/prose";
import type { Page as PageType, SharedData } from "@/types";

export default function Page(props: SharedData<{ about: PageType }>) {
  return (
    <AppLayout description={props.about.description ?? props.about.title}>
      <Head title={props.about.title}></Head>
      <main className="container max-w-[80ch] py-16 md:py-20">
        <section className={PROSE_CLASS_NAME}>
          {/** biome-ignore lint/security/noDangerouslySetInnerHtml: The content comes from trusted users */}
          <div dangerouslySetInnerHTML={{ __html: props.about.content }} />
        </section>
      </main>
    </AppLayout>
  );
}
