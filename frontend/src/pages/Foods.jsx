import { useEffect, useMemo, useState } from "react";
import { api } from "../lib/api.js";
import FoodCard from "../components/FoodCard.jsx";

export default function Foods() {
  const [foods, setFoods] = useState([]);
  const [status, setStatus] = useState("loading");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    api
      .foods()
      .then((data) => {
        setFoods(data.results);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  const regions = useMemo(
    () => ["all", ...new Set(foods.map((f) => f.region))],
    [foods]
  );

  const visible = filter === "all" ? foods : foods.filter((f) => f.region === filter);

  return (
    <section className="section container">
      <div className="section-head">
        <h2>Ethiopian Cuisine</h2>
        <span className="section-round">{visible.length} dishes</span>
      </div>

      {status === "ready" && (
        <div className="filter-row">
          {regions.map((r) => (
            <button
              key={r}
              className={`filter-btn ${filter === r ? "active" : ""}`}
              onClick={() => setFilter(r)}
            >
              {r === "all" ? "All regions" : r}
            </button>
          ))}
        </div>
      )}

      {status === "loading" && <p className="state-msg">Loading dishes…</p>}
      {status === "error" && (
        <p className="state-msg">Couldn't reach the API. Is the backend running?</p>
      )}
      {status === "ready" && (
        <div className="grid">
          {visible.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      )}
    </section>
  );
}
