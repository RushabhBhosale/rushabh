import Journey from "@/components/switchyard/Journey";

// A single persistent stage. Document height supplies only the virtual playhead.
export default function Home() {
  return (
    <div className="switchyard">
      <Journey />
    </div>
  );
}
