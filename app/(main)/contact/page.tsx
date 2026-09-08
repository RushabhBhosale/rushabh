export const metadata = { title: "Contact — Rushabh Bhosale" };
export default function ContactPage() {
  return (
    <div className="switchyard archive-page section-pad">
      <div className="section-line mono">
        <span>DIRECT LINE / MUMBAI, INDIA</span>
      </div>
      <div className="editorial-heading">
        <h1>
          Let’s find
          <br />
          <em>the next route.</em>
        </h1>
        <p>
          Work opportunities, collaborations, and conversations about things
          worth building.
        </p>
      </div>
      <div className="direct-contact">
        <a href="mailto:bhosalerushabh0@gmail.com">
          <span className="mono">EMAIL</span>
          <span>bhosalerushabh0@gmail.com ↗</span>
        </a>
        <a href="tel:+919137996317">
          <span className="mono">PHONE</span>
          <span>+91 91379 96317 ↗</span>
        </a>
        <a href="https://wa.me/919137996317?text=Hey%20Rushabh%2C%20I%20just%20checked%20out%20your%20portfolio.%20I%27d%20love%20to%20connect.">
          <span className="mono">WHATSAPP</span>
          <span>Start a conversation ↗</span>
        </a>
      </div>
    </div>
  );
}
