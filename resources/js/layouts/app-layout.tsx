import { Head, usePage } from "@inertiajs/react";
import type { ReactNode } from "react";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Navbar from "@/components/navbar";
import type { SharedData } from "@/types";

export const DEFAULT_DESCRIPTION =
  "A Viktória Kupa Versenysorozat országos akrobatikus torna verseny fiatal tehetségeknek. Versenynaptár, nevezés, szabályzatok és hírek egy helyen.";

export default function AppLayout({ children, description }: { children: ReactNode; description?: string }) {
  const content = description ?? DEFAULT_DESCRIPTION;
  const { canonicalUrl } = usePage().props as unknown as SharedData;

  return (
    <>
      <Head>
        <link head-key="canonical" rel="canonical" href={canonicalUrl} />
        <meta head-key="og:url" property="og:url" content={canonicalUrl} />
        <meta head-key="description" name="description" content={content} />
        <meta head-key="og:title" property="og:title" content="Viktória Kupa" />
        <meta head-key="og:description" property="og:description" content={content} />
        <meta head-key="og:image" property="og:image" content="https://viktoriakupa.hu/images/logo_vk.png" />
        <meta head-key="og:type" property="og:type" content="website" />
        <meta head-key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta head-key="twitter:title" name="twitter:title" content="Viktória Kupa" />
        <meta head-key="twitter:description" name="twitter:description" content={content} />
        <meta head-key="twitter:image" name="twitter:image" content="https://viktoriakupa.hu/images/logo_vk.png" />
      </Head>
      <div className="flex min-h-dvh flex-col">
        <Header />
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </>
  );
}
