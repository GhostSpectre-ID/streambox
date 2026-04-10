export default async function handler(req, res) {
  try {
    const { path } = req.query;

    if (!path) {
      return res.status(400).json({ error: "No path" });
    }

    const url = `https://dramabox.sansekai.my.id/api/${path}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json",
        "Referer": "https://dramabox.sansekai.my.id/",
        "Origin": "https://dramabox.sansekai.my.id"
      }
    });

    const text = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "s-maxage=60");

    // 🔥 DEBUG
    if (!text || text.startsWith("<")) {
      return res.status(500).json({
        error: "API BLOCKED / INVALID RESPONSE",
        raw: text.slice(0, 200)
      });
    }

    return res.status(200).json(JSON.parse(text));

  } catch (err) {
    return res.status(500).json({
      error: "Proxy error",
      message: err.message
    });
  }
}
