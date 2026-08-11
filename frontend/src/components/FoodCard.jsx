function spiceTagClass(level) {
  return "tag tag-spice-" + level.toLowerCase().replace(/\s+/g, "-");
}

export default function FoodCard({ food }) {
  return (
    <article className="card">
      <div className="card-top">
        <h3>{food.name}</h3>
        <span className={spiceTagClass(food.spiceLevel)}>{food.spiceLevel} heat</span>
      </div>
      <div className="chip-row">
        <span className="tag tag-region">{food.region}</span>
        <span className="chip">{food.type}</span>
        {food.vegan && <span className="vegan-dot">● Vegan / fasting-friendly</span>}
      </div>
      <p>{food.description}</p>
      <div className="chip-row">
        {food.keyIngredients.map((ing) => (
          <span className="chip" key={ing}>{ing}</span>
        ))}
      </div>
    </article>
  );
}
