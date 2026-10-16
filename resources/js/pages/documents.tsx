import { Head } from "@inertiajs/react";
import { Download, FileText } from "lucide-react";
import AppLayout from "@/layouts/app-layout";
import type { Document, DocumentType, SharedData } from "@/types";

export default function Page(props: SharedData<{ documentType: DocumentType; documents: Document[] }>) {
  return (
    <AppLayout
      description={`${props.documentType.title}: a Viktória Kupa Versenysorozat letölthető dokumentumai versenyzőknek, edzőknek és egyesületeknek.`}
    >
      <Head title={props.documentType.title}></Head>
      <main className="container max-w-7xl space-y-10 py-16 md:py-20">
        <h1 className="text-3xl tracking-tight break-words md:text-5xl">{props.documentType.title}</h1>
        {props.documents.length > 0 ? (
          <ul className="reveal grid grid-cols-1 gap-4 md:grid-cols-2">
            {props.documents.map((document) => (
              <li key={document.id}>
                <a
                  href={document.file_url}
                  className="group flex h-full items-center gap-4 rounded-2xl border bg-card p-4 transition hover:border-accent active:scale-[0.98] motion-reduce:active:scale-100"
                  target="_blank"
                  aria-label={`${document.title} letöltése`}
                  rel="noreferrer"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted text-primary">
                    <FileText className="size-6" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1 text-lg leading-snug [overflow-wrap:anywhere] group-hover:text-primary">
                    {document.title}
                  </span>
                  <Download
                    className="size-5 shrink-0 text-muted-foreground transition group-hover:translate-y-0.5 group-hover:text-primary motion-reduce:group-hover:translate-y-0"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-2xl border border-dashed bg-card px-6 py-12 text-center text-muted-foreground">
            Ebben a kategóriában még nincs feltöltött dokumentum.
          </p>
        )}
      </main>
    </AppLayout>
  );
}
