import { Head } from "@inertiajs/react";
import { useEffect, useRef } from "react";
import AppLayout from "@/layouts/app-layout";
import type { Page as PageType, SharedData } from "@/types";

export default function Page(props: SharedData<{ calendar: PageType }>) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { content } = props.calendar;

  useEffect(() => {
    if (!content) {
      return;
    }

    contentRef.current?.querySelectorAll("table").forEach((table) => {
      const [headerRow, ...rows] = Array.from(table.rows);
      const labels = Array.from(headerRow?.cells ?? []).map((cell) => {
        const text = cell.textContent?.trim() ?? "";
        return text.charAt(0).toLocaleUpperCase("hu") + text.slice(1);
      });

      for (const row of rows) {
        Array.from(row.cells).forEach((cell, index) => {
          cell.dataset.label = labels[index] ?? "";
        });
      }
    });
  }, [content]);

  return (
    <AppLayout description={props.calendar.description ?? props.calendar.title}>
      <Head title={props.calendar.title}></Head>
      <main className="container max-w-7xl space-y-10 py-16 md:py-20">
        <h1 className="max-w-[24ch] text-balance text-3xl tracking-tight break-words md:text-5xl">
          {props.calendar.title}
        </h1>
        <div
          ref={contentRef}
          className="calendar-content reveal"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: The content comes from trusted users
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </main>
    </AppLayout>
  );
}
