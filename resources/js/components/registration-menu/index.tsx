import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LINKS from "@/data/links";

export const REGISTRATION_LINKS = [
  {
    label: "Ideiglenes nevezés",
    href: LINKS.apply_temp,
    ariaLabel: "Tovább az ideiglenes jelentkezés oldalra (új lap)",
    title: "Ideiglenes jelentkezés Google Forms-on keresztül",
  },
  {
    label: "Végleges nevezés",
    href: LINKS.apply_perma,
    ariaLabel: "Tovább a végleges jelentkezés oldalra (új lap)",
    title: "Végleges jelentkezés Google Forms-on keresztül",
  },
] as const;

export default function RegistrationMenu({ triggerClassName }: { triggerClassName?: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={triggerClassName}>
        Nevezés{" "}
        <ChevronDown
          className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-popup-open:rotate-180"
          aria-hidden="true"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {REGISTRATION_LINKS.map((link) => (
            <DropdownMenuItem
              key={link.href}
              render={
                <a href={link.href} target="_blank" rel="noopener" aria-label={link.ariaLabel} title={link.title} />
              }
            >
              {link.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
