import { useEffect, useState } from "react";
import { api } from "../lib/api.js";
import CultureCard from "../components/CultureCard.jsx";

export default function Culture() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    api
      .culture()
      .then((data) => {
        setItems(data.results);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <section className="section container">
      <div className="section-head">
        <h2>Festivals &amp; Traditions</h2>
        <span className="section-round">{items.length} entries</span>
      </div>
      {status === "loading" && <p className="state-msg">Loading traditions…</p>}
      {status === "error" && (
        <p className="state-msg">Couldn't reach the API. Is the backend running?</p>
      )}
      {status === "ready" && (
        <div className="grid">
          {items.map((item) => (
            <CultureCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
