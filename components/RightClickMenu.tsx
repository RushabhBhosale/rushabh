"use client";

import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuShortcut,
} from "@/components/ui/context-menu";
import { useRouter } from "next/navigation";

export function RightClickMenu({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/Rushabh_Resume.pdf";
    link.download = "Rushabh_Resume.pdf";
    link.click();
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent data-state="open" className="w-52">
        <ContextMenuItem inset onClick={handleDownloadResume}>
          Download Resume
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSub>
          <ContextMenuSubTrigger inset>Open Pages</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem onClick={() => router.push("/about")}>
              About Me
            </ContextMenuItem>
            <ContextMenuItem onClick={() => router.push("/projects")}>
              Projects
            </ContextMenuItem>
            <ContextMenuItem onClick={() => router.push("/travel")}>
              Travel App
            </ContextMenuItem>
            <ContextMenuItem onClick={() => router.push("/inspect")}>
              Inspect Rushabh
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuSeparator />

        <ContextMenuItem inset disabled>
          Inspect Element
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
