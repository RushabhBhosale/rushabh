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
  const resumePath = "/Rushabh%20Resume.pdf";

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = resumePath;
    link.download = "Rushabh Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            <ContextMenuItem onClick={() => router.push("/rushabh-bhosale")}>
              Rushabh Bhosale
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => router.push("/tools/site-inspector")}
            >
              Site Inspector Tool
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
