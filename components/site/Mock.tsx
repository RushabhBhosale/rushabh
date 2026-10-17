import { Bluetooth, Bell, CreditCard, FileText, Mic, PhoneOff, User, Video } from "lucide-react";

/* Drawn stand-ins for professional work whose real screens are private. They show the
   shape of the product, never real data: skeleton bars instead of numbers, generic
   labels instead of copy. Everything is sized in container units, like the posters. */
export default function Mock({ name }: { name: "ble" | "care" }) {
  return (
    <span className={`mock mock--${name}`} aria-hidden="true">
      {name === "ble" ? <Ble /> : <Care />}
    </span>
  );
}

const metrics = ["Muscle mass", "BMI", "BMR", "Visceral fat", "Body water"];
const bars = [72, 48, 60, 34, 66];

function Ble() {
  return (
    <>
      <span className="mock__device">
        <span className="mock__pad mock__pad--tl" />
        <span className="mock__pad mock__pad--tr" />
        <span className="mock__pad mock__pad--bl" />
        <span className="mock__pad mock__pad--br" />
        <span className="mock__display" />
        <span className="mock__waves">
          <i />
          <i />
          <i />
        </span>
      </span>

      <span className="mock__phone">
        <span className="mock__screen">
          <span className="mock__status">
            <Bluetooth /> Connected
          </span>
          <span className="mock__heading">Body composition</span>
          <span className="mock__gauge">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" className="mock__track" />
              <circle cx="50" cy="50" r="42" className="mock__arc" pathLength="100" />
            </svg>
            <span className="mock__gauge-label">Body fat</span>
          </span>
          <span className="mock__rows">
            {metrics.map((m, i) => (
              <span key={m} className="mock__row">
                <span>{m}</span>
                <span className="mock__bar" style={{ width: `${bars[i]}%` }} />
              </span>
            ))}
          </span>
          <span className="mock__button">
            <FileText /> Export PDF
          </span>
        </span>
      </span>
    </>
  );
}

function Care() {
  return (
    <>
      <span className="mock__phone">
        <span className="mock__screen">
          <span className="mock__call">
            <span className="mock__avatar">
              <User />
            </span>
            <span className="mock__pip">
              <User />
            </span>
            <span className="mock__controls">
              <i>
                <Mic />
              </i>
              <i className="mock__end">
                <PhoneOff />
              </i>
              <i>
                <Video />
              </i>
            </span>
          </span>
          <span className="mock__heading">Consultation</span>
          <span className="mock__lines">
            <span style={{ width: "86%" }} />
            <span style={{ width: "64%" }} />
            <span style={{ width: "74%" }} />
          </span>
          <span className="mock__button">Continue</span>
        </span>
      </span>

      <span className="mock__chip mock__chip--a">
        <Bell /> Push notification
      </span>
      <span className="mock__chip mock__chip--b">
        <Video /> Video consult
      </span>
      <span className="mock__chip mock__chip--c">
        <CreditCard /> Payment
      </span>
    </>
  );
}
