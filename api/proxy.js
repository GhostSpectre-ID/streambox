export default async function handler(req, res) {
  try {
    const { path } = req.query;

    if (!path) {
      return res.status(400).json({ error: "No path" });
    }

    const url = `https://dramabox.sansekai.my.id/api/${path}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const text = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "s-maxage=60");

    try {
      return res.status(200).json(JSON.parse(text));
    } catch {
      return res.status(200).send(text);
    }

  } catch (err) {
    return res.status(500).json({ error: "Proxy error" });
  }
}
