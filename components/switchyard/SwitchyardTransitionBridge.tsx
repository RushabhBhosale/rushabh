"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  type CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react";
import SwitchyardCar from "./SwitchyardCar";

const DRIVE_DURATION = 900;

type CarRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type Transition = {
  phase: "driving" | "arriving";
  style: CSSProperties;
};

export default function SwitchyardTransitionBridge() {
  const router = useRouter();
  const pathname = usePathname();
  const driveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [transition, setTransition] = useState<Transition | null>(null);

  useEffect(() => {
    const launch = (event: Event) => {
      const rect = (event as CustomEvent<CarRect>).detail;
      const targetLeft = window.innerWidth * 0.482 - rect.width / 2;
      const targetTop = window.innerHeight * 0.753 - rect.height / 2;

      document.documentElement.dataset.syOpening = "pending";
      setTransition({
        phase: "driving",
        style: {
          "--switchyard-origin-x": `${rect.left + rect.width / 2}px`,
          "--switchyard-origin-y": `${rect.top + rect.height / 2}px`,
          "--switchyard-car-left": `${rect.left}px`,
          "--switchyard-car-top": `${rect.top}px`,
          "--switchyard-car-width": `${rect.width}px`,
          "--switchyard-car-height": `${rect.height}px`,
          "--switchyard-car-x": `${targetLeft - rect.left}px`,
          "--switchyard-car-y": `${targetTop - rect.top}px`,
        } as CSSProperties,
      });

      driveTimer.current = setTimeout(() => {
        router.push("/switchyard");
      }, DRIVE_DURATION);
    };

    window.addEventListener("switchyard:launch", launch);
    return () => window.removeEventListener("switchyard:launch", launch);
  }, [router]);

  useEffect(() => {
    if (pathname !== "/switchyard" || transition?.phase !== "driving") return;

    let fallbackTimer: ReturnType<typeof setTimeout> | null = null;
    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      setTransition((current) =>
        current ? { ...current, phase: "arriving" } : null,
      );
      revealTimer.current = setTimeout(() => {
        delete document.documentElement.dataset.syOpening;
        setTransition(null);
      }, 560);
    };
    const worldReady = () => requestAnimationFrame(reveal);

    window.addEventListener("switchyard:world-ready", worldReady);
    if (document.querySelector("canvas[data-ready='true']")) worldReady();
    fallbackTimer = setTimeout(reveal, 1600);

    return () => {
      window.removeEventListener("switchyard:world-ready", worldReady);
      if (fallbackTimer) clearTimeout(fallbackTimer);
    };
  }, [pathname, transition?.phase]);

  useEffect(
    () => () => {
      if (driveTimer.current) clearTimeout(driveTimer.current);
      if (revealTimer.current) clearTimeout(revealTimer.current);
    },
    [],
  );

  return transition ? (
    <div
      className="switchyard-launch-overlay"
      data-phase={transition.phase}
      style={transition.style}
      aria-hidden="true"
    >
      <div className="switchyard-launch-wipe" />
      <span className="switchyard-launch-car">
        <SwitchyardCar className="switchyard-launch-car-svg" />
      </span>
    </div>
  ) : null;
}
