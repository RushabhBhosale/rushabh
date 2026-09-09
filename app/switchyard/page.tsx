import type { Metadata } from "next";
import Journey from "@/components/switchyard/Journey";

export const metadata: Metadata = {
  title: "Rushabh Bhosale",
  description:
    "Explore Rushabh Bhosale's work through an interactive, game-inspired portfolio journey.",
};

export default function SwitchyardPage() {
  return (
    <div className="switchyard">
      <Journey />
    </div>
  );
}
