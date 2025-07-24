const axios = require("axios");

async function getImageFromText(req, res) {
  const { text } = req.body;
  if (!text) throw new Error("Text query is required");

  const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
  const API_URL = "https://pixabay.com/api/";

  try {
    const response = await axios.get(API_URL, {
      params: {
        key: PIXABAY_API_KEY,
        q: text,
        image_type: "photo",
        safesearch: true,
        per_page: 3,
      },
    });

    const hits = response.data.hits;
    if (!hits || hits.length === 0) throw new Error("No image found");

    return hits[0].webformatURL;
  } catch (error) {
    console.error("Pixabay fetch error:", error.message);
    throw error;
  }
}

module.exports = getImageFromText;
