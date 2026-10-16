import { Head } from "@inertiajs/react";
import { Mail, Phone } from "lucide-react";
import AppLayout from "@/layouts/app-layout";

const CONTACT_ROWS = [
  { label: "Telefon", value: "+36 20 311 1919", href: "tel:+36 20 311 1919", icon: Phone },
  {
    label: "Email",
    value: "akrobatikustornakupa@gmail.com",
    href: "mailto:akrobatikustornakupa@gmail.com",
    icon: Mail,
  },
] as const;

export default function Page() {
  return (
    <AppLayout description="Kérdésed van a Viktória Kupa Versenysorozattal kapcsolatban? Itt találod a szervező telefonszámát és e-mail címét.">
      <Head title="Kapcsolat"></Head>
      <main className="container max-w-3xl space-y-10 py-16 md:py-20">
        <div className="space-y-4">
          <h1 className="text-3xl tracking-tight break-words md:text-5xl">Kapcsolat</h1>
          <div>
            <p className="text-xl">Mester Gábor</p>
            <p className="text-muted-foreground">Viktória Kupa versenysorozat képviselő</p>
          </div>
        </div>
        <ul className="grid grid-cols-1 gap-4">
          {CONTACT_ROWS.map((row) => (
            <li key={row.label}>
              <a
                href={row.href}
                className="group flex items-center gap-5 rounded-2xl border bg-card p-5 transition hover:border-accent active:scale-[0.98] motion-reduce:active:scale-100 md:p-6"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <row.icon className="size-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-muted-foreground text-sm">{row.label}</span>
                  <span className="block text-lg [overflow-wrap:anywhere] text-primary group-hover:underline md:text-xl">
                    {row.value}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </main>
    </AppLayout>
  );
}
