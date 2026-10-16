import { Head } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";

export default function Page() {
  return (
    <AppLayout>
      <Head title="Kapcsolat"></Head>
      <main className="container space-y-8 px-4 pt-8 pb-20">
        <h1 className="text-5xl">Kapcsolat</h1>
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Telefon - Mester Gábor Viktória Kupa versenysorozat képviselő</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Telefon:{" "}
                <a className="text-primary hover:underline" href="tel:+36 20 311 1919">
                  +36 20 311 1919
                </a>
              </p>
              <p className="mt-4">
                Email:{" "}
                <a className="text-primary hover:underline" href="mailto:akrobatikustornakupa@gmail.com">
                  akrobatikustornakupa@gmail.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </AppLayout>
  );
}
