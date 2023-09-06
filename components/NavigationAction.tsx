"use client";

import { Plus } from "lucide-react";
import { FC } from "react";
import ToolkitAction from "./ToolkitAction";
import { useModalStore } from "@/hooks/useModalStore";

interface NavigationActionProps {}

const NavigationAction: FC<NavigationActionProps> = ({}) => {
  let { onOpen } = useModalStore();
  return (
    <div>
      <ToolkitAction label="Add a Server" side="right" align="center">
        <button
          className="group flex items-center"
          onClick={() => onOpen("createServer")}
        >
          <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
            <Plus
              className="group-hover:text-white trnasition text-emerald-500"
              size={25}
            />
          </div>
        </button>
      </ToolkitAction>
    </div>
  );
};

export default NavigationAction;
