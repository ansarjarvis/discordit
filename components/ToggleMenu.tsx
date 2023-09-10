import { FC } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "./ui/Button";
import SidebarNavigation from "./SidebarNavigation";
import ServerSidebar from "./ServerSidebar";

interface ToggleMenuProps {
  serverId: string;
}

const ToggleMenu: FC<ToggleMenuProps> = ({ serverId }: ToggleMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 flex gap-0">
        <div className="w-[72px]">
          <SidebarNavigation />
        </div>
        <ServerSidebar serverId={serverId} />
      </SheetContent>
    </Sheet>
  );
};

export default ToggleMenu;
