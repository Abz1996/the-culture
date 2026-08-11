export default function RegionCard({ region }) {
  return (
    <article className="card">
      <div className="card-top">
        <h3>{region.name}</h3>
        <span className="tag tag-region">{region.capital}</span>
      </div>
      <div className="chip-row">
        <span className="chip">{region.language}</span>
      </div>
      <p>{region.highlight}</p>
    </article>
  );
}
