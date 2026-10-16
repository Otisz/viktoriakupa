import DesktopMenu from "@/components/navbar/desktop-menu";
import MobileMenu from "@/components/navbar/mobile-menu";

export default function Navbar() {
  return (
    <nav className="h-14 bg-nav text-nav-foreground">
      <div className="container flex h-full gap-8 items-center justify-end lg:justify-center">
        <DesktopMenu />
        <MobileMenu />
      </div>
    </nav>
  );
}
