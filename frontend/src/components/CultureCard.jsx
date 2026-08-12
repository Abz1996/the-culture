export default function CultureCard({ item }) {
  return (
    <article className="card">
      <div className="card-top">
        <h3>{item.name}</h3>
        {item.monthApprox && <span className="tag tag-region">{item.monthApprox}</span>}
      </div>
      <div className="chip-row">
        <span className="chip">{item.category}</span>
        {item.unescoStatus && <span className="chip">UNESCO listed</span>}
      </div>
      <p>{item.description}</p>
    </article>
  );
}
