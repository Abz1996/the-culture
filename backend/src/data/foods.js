// Ethiopian dishes data — descriptive only, no external copyrighted media embedded.
// imageQuery is a suggested search term the frontend/CMS can use to source a licensed photo.
module.exports = [
  {
    id: "doro-wat",
    name: "Doro Wat",
    region: "Amhara",
    type: "Main dish",
    spiceLevel: "High",
    vegan: false,
    description:
      "Ethiopia's celebrated national dish: chicken slow-simmered in a deep berbere and niter kibbeh (spiced butter) sauce, traditionally served with a hard-boiled egg and injera. Often centerpiece of holidays like Timkat and Meskel.",
    keyIngredients: ["Chicken", "Berbere", "Niter kibbeh", "Red onion", "Boiled egg"],
    imageQuery: "doro wat ethiopian chicken stew"
  },
  {
    id: "injera",
    name: "Injera",
    region: "National",
    type: "Staple / Bread",
    spiceLevel: "None",
    vegan: true,
    description:
      "A spongy, slightly sour flatbread made from fermented teff flour. It functions as plate, utensil, and food all at once — stews are scooped up with torn pieces.",
    keyIngredients: ["Teff flour", "Water"],
    imageQuery: "injera ethiopian teff flatbread"
  },
  {
    id: "shiro-wat",
    name: "Shiro Wat",
    region: "National",
    type: "Main dish",
    spiceLevel: "Medium",
    vegan: true,
    description:
      "A smooth, hearty stew of ground chickpeas or broad beans simmered with onion, garlic, and berbere. A staple of fasting (tsom) days and beloved comfort food.",
    keyIngredients: ["Chickpea flour", "Berbere", "Onion", "Garlic", "Oil"],
    imageQuery: "shiro wat ethiopian chickpea stew"
  },
  {
    id: "kitfo",
    name: "Kitfo",
    region: "Gurage",
    type: "Main dish",
    spiceLevel: "Medium-High",
    vegan: false,
    description:
      "Minced raw or lightly warmed beef seasoned with mitmita (chili spice blend) and niter kibbeh, a specialty of the Gurage people, often served with ayib (fresh cheese) and gomen (collard greens).",
    keyIngredients: ["Minced beef", "Mitmita", "Niter kibbeh", "Ayib cheese"],
    imageQuery: "kitfo ethiopian minced beef dish"
  },
  {
    id: "tibs",
    name: "Tibs",
    region: "National",
    type: "Main dish",
    spiceLevel: "Medium",
    vegan: false,
    description:
      "Sautéed cubes of beef, lamb, or goat cooked with onions, peppers, garlic, and rosemary — a versatile dish ranging from mild to fiery, served sizzling on a hot plate.",
    keyIngredients: ["Beef or lamb", "Onion", "Garlic", "Awaze or berbere", "Rosemary"],
    imageQuery: "tibs ethiopian sauteed meat"
  },
  {
    id: "gomen",
    name: "Gomen",
    region: "National",
    type: "Side dish",
    spiceLevel: "Low",
    vegan: true,
    description:
      "Collard greens braised gently with garlic, ginger, and onion — a mild, earthy counterpoint to spicier wats on the injera platter.",
    keyIngredients: ["Collard greens", "Garlic", "Ginger", "Onion"],
    imageQuery: "gomen ethiopian collard greens"
  },
  {
    id: "buna",
    name: "Buna (Coffee Ceremony)",
    region: "National",
    type: "Beverage / Ritual",
    spiceLevel: "None",
    vegan: true,
    description:
      "Ethiopia is the birthplace of coffee. The buna ceremony — roasting green beans over coals, grinding by hand, and brewing in a jebena — is a daily social ritual of hospitality across three rounds: abol, tona, and baraka.",
    keyIngredients: ["Green coffee beans", "Charcoal roasting", "Jebena clay pot"],
    imageQuery: "ethiopian coffee ceremony jebena"
  }
];
