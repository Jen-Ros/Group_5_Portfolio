export default async function handler(req, res) {
  // Enable CORS for all origins
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Fallback quotes list
  const fallbackQuotes = [
    { content: "Keep going, everything you need will come to you at the perfect time.", author: "Unknown" },
    { content: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
    { content: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { content: "Happiness depends upon ourselves.", author: "Aristotle" },
    { content: "Act as if what you do makes a difference. It does.", author: "William James" }
  ];

  try {
    const response = await fetch("https://fakezenquotes.io/api/random");
    if (!response.ok) throw new Error(`API failed: ${response.status}`);
    const data = await response.json();
    const quote = data[0];

    res.status(200).json({
      content: quote.q,
      author: quote.a
    });
  } catch (error) {
    console.error("Quote API failed:", error.message);

    // Pick a random fallback quote
    const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];

    res.status(200).json(randomQuote);
  }
}
