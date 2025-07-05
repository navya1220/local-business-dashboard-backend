const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

const headlineTemplates = [
  "Why {name} is {location}'s Sweetest Spot in 2025",
  "{name}: The Buzz of {location}'s Business Scene!",
  "Top Reasons {name} is Trending in {location}",
  "Experience the Best of {location} at {name}",
  "{name} – A Rising Star in {location}"
];

function generateHeadline(name, location) {
  const template = headlineTemplates[Math.floor(Math.random() * headlineTemplates.length)];
  return template.replace("{name}", name).replace("{location}", location);
}

app.post("/business-data", (req, res) => {
  const { name, location } = req.body;
  if (!name || !location) return res.status(400).json({ error: "Missing name or location" });

  res.json({
    rating: (4 + Math.random()).toFixed(1),
    reviews: Math.floor(50 + Math.random() * 450),
    headline: generateHeadline(name, location)
  });
});

app.get("/regenerate-headline", (req, res) => {
  const { name, location } = req.query;
  if (!name || !location) return res.status(400).json({ error: "Missing name or location" });

  res.json({
    headline: generateHeadline(name, location)
  });
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
