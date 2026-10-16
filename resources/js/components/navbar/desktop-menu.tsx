import { Link, usePage } from "@inertiajs/react";
import { ChevronDown } from "lucide-react";
import RegistrationMenu from "@/components/registration-menu";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import LINKS from "@/data/links";
import { cn } from "@/lib/utils";
import type { SharedData } from "@/types";

export default function DesktopMenu() {
  const page = usePage();

  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href={LINKS.news} />}>
            Hírek
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href={LINKS.about_us} />}>
            Rólunk
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href={LINKS.clubs} />}>
            Egyesületek
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger className={navigationMenuTriggerStyle()}>
              Dokumentumok{" "}
              <ChevronDown
                className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-popup-open:rotate-180"
                aria-hidden="true"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                {Object.entries((page.props as unknown as SharedData).documentTypes).map(([slug, title]) => (
                  <DropdownMenuItem key={slug} render={<Link href={`/dokumentumok/${slug}`} />}>
                    {title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href={LINKS.calendar} />}>
            Versenynaptár
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href={LINKS.contact} />}>
            Kapcsolat
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <RegistrationMenu
            triggerClassName={cn(navigationMenuTriggerStyle(), buttonVariants(), "ml-2 hover:bg-primary/90")}
          />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
