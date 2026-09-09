"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import SwitchyardCar from "@/components/switchyard/SwitchyardCar";

export default function SwitchyardCarLink() {
  const router = useRouter();
  const carRef = useRef<HTMLSpanElement>(null);
  const [launching, setLaunching] = useState(false);

  useEffect(() => {
    router.prefetch("/switchyard");
  }, [router]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    event.preventDefault();
    if (launching) return;

    const rect = carRef.current?.getBoundingClientRect();
    if (rect) {
      window.dispatchEvent(
        new CustomEvent("switchyard:launch", {
          detail: {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
          },
        }),
      );
    }

    setLaunching(true);
  };

  return (
    <>
      <Link
        href="/switchyard"
        onClick={handleClick}
        className="switchyard-car-link"
        data-launching={launching ? "true" : "false"}
        aria-label="Enter Rushabh's interactive Switchyard portfolio"
      >
        <svg
          className="switchyard-orbit-copy"
          viewBox="0 0 112 112"
          aria-hidden="true"
        >
          <defs>
            <path
              id="switchyard-orbit-copy-path"
              d="M 56,56 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
            />
          </defs>
          <text>
            <textPath href="#switchyard-orbit-copy-path" startOffset="4%">
              GET INTO · THE SWITCHYARD · GET INTO ·
            </textPath>
          </text>
        </svg>
        <span className="switchyard-car-rest" ref={carRef} aria-hidden="true">
          <SwitchyardCar className="switchyard-mini-car" />
        </span>
      </Link>
    </>
  );
}
