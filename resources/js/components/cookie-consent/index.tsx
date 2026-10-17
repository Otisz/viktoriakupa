import { usePostHog } from "posthog-js/react";
import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const CookieConsentContext = createContext<{ openSettings: () => void } | null>(null);

export function useCookieConsent() {
  return useContext(CookieConsentContext);
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const posthog = usePostHog();
  const [isBannerOpen, setIsBannerOpen] = useState(false);

  useEffect(() => {
    setIsBannerOpen(posthog.get_explicit_consent_status() === "pending");
  }, [posthog]);

  function accept() {
    posthog.opt_in_capturing();
    setIsBannerOpen(false);
  }

  function decline() {
    posthog.opt_out_capturing();
    setIsBannerOpen(false);
  }

  return (
    <CookieConsentContext value={{ openSettings: () => setIsBannerOpen(true) }}>
      {children}
      {isBannerOpen && (
        <section
          aria-labelledby="cookie-consent-title"
          className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-2xl border bg-card p-6 text-card-foreground shadow-lg"
        >
          <h2 id="cookie-consent-title" className="text-lg">
            Sütik használata
          </h2>
          <p className="mt-2 text-muted-foreground text-sm leading-6">
            Az oldal látogatottságának méréséhez analitikai sütiket (PostHog) használunk. Ezek csak elfogadás után
            kapcsolnak be, a döntés pedig később a lábléc „Sütibeállítások” linkjével módosítható.
          </p>
          <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="outline" onClick={decline}>
              Elutasítom
            </Button>
            <Button onClick={accept}>Elfogadom</Button>
          </div>
        </section>
      )}
    </CookieConsentContext>
  );
}
