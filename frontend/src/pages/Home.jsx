import { Link } from "react-router-dom";
import CoffeeRings from "../components/CoffeeRings.jsx";

export default function Home() {
  return (
    <>
      <section className="hero">
        <CoffeeRings className="hero-rings" />
        <div className="hero-inner">
          <span className="eyebrow">Land of Origins</span>
          <h1>Ethiopia's table, told through food and festival.</h1>
          <p className="lede">
            From the sour tang of injera to the smoke of a demera bonfire, explore the dishes,
            rituals, and regions that make up Ethiopian life — thirteen months of sunshine, one
            plate at a time.
          </p>
          <div className="hero-ctas">
            <Link className="btn btn-primary" to="/foods">Explore the cuisine</Link>
            <Link className="btn btn-ghost" to="/culture">See festivals &amp; traditions</Link>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <h2>Three rounds, like a coffee ceremony</h2>
          <span className="section-round">Abol · Tona · Baraka</span>
        </div>
        <div className="grid">
          <article className="card">
            <h3>Abol — Cuisine</h3>
            <p>
              Seven signature dishes from doro wat to the daily ritual of buna, each with region,
              spice level, and key ingredients.
            </p>
            <Link className="btn btn-ghost" to="/foods">Browse dishes →</Link>
          </article>
          <article className="card">
            <h3>Tona — Culture</h3>
            <p>
              Festivals, rituals, and heritage — Timkat processions, the Meskel bonfire, and the
              Ge'ez calendar that runs its own course.
            </p>
            <Link className="btn btn-ghost" to="/culture">See traditions →</Link>
          </article>
          <article className="card">
            <h3>Baraka — Regions</h3>
            <p>
              A federation of nations and peoples, from the obelisks of Tigray to the walled city
              of Harar.
            </p>
            <Link className="btn btn-ghost" to="/regions">Visit regions →</Link>
          </article>
        </div>
      </section>
    </>
  );
}
