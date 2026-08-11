import { useEffect, useState } from "react";
import { api } from "../lib/api.js";
import RegionCard from "../components/RegionCard.jsx";

export default function Regions() {
  const [regions, setRegions] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    api
      .regions()
      .then((data) => {
        setRegions(data.results);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <section className="section container">
      <div className="section-head">
        <h2>Regions &amp; Peoples</h2>
        <span className="section-round">{regions.length} regions</span>
      </div>
      {status === "loading" && <p className="state-msg">Loading regions…</p>}
      {status === "error" && (
        <p className="state-msg">Couldn't reach the API. Is the backend running?</p>
      )}
      {status === "ready" && (
        <div className="grid">
          {regions.map((region) => (
            <RegionCard key={region.id} region={region} />
          ))}
        </div>
      )}
    </section>
  );
}
