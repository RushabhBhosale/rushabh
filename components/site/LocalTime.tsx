"use client";

import { useSyncExternalStore } from "react";

const format = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

const subscribe = (tick: () => void) => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
};
const nowInSeconds = () => Math.floor(Date.now() / 1000);

export default function LocalTime({ seconds = false }: { seconds?: boolean }) {
  // null on the server, so the clock never causes a hydration mismatch.
  const now = useSyncExternalStore(subscribe, nowInSeconds, () => null);

  if (now === null) return <span className="clock">--:--</span>;
  const date = new Date(now * 1000);
  const [h, m, s] = format.format(date).split(":");
  return (
    <time className="clock" dateTime={date.toISOString()}>
      {h}
      <span className="clock__colon">:</span>
      {m}
      {seconds && <span className="dim">:{s}</span>}
    </time>
  );
}
