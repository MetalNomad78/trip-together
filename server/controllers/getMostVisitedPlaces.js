const axios = require('axios');

const RAPID_API_KEY = process.env.RAPID_API_KEY;
const RAPID_API_HOST = 'travel-advisor.p.rapidapi.com';


async function fetchWikipediaDescription(title) {
  try {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    const res = await axios.get(url);
    return res.data.extract || null;
  } catch (err) {
    console.warn(`Wikipedia fallback failed for ${title}: ${err.message}`);
    return null;
  }
}

async function getTripadvisorPlaces(req, res) {
  const { query } = req.body;

  const searchOptions = {
    method: 'GET',
    url: `https://${RAPID_API_HOST}/locations/search`,
    params: {
      query,
      limit: '30',
      offset: '0',
      units: 'km',
      currency: 'INR',
      sort: 'relevance',
      lang: 'en_US',
    },
    headers: {
      'X-RapidAPI-Key': RAPID_API_KEY,
      'X-RapidAPI-Host': RAPID_API_HOST,
    },
  };

  try {
    const searchRes = await axios.request(searchOptions);
    const items = searchRes.data.data;

    // Filter out low-quality items
    const blacklist = /tour|taxi|driver|car|mall|planner|travel|agency|holidays|private/i;
    const filtered = items
      .filter(
        item =>
          item.result_type === 'things_to_do' &&
          item.result_object?.photo?.images?.large?.url &&
          !blacklist.test(item.result_object.name)
      )
      .slice(0, 20); // buffer for failures

    const results = [];

    for (const item of filtered) {
      const location_id = item.result_object.location_id;
      const title = item.result_object.name;
      const image = item.result_object.photo.images.large.url;

      let description = null;

      try {
        const detailRes = await axios.get(`https://${RAPID_API_HOST}/attractions/get-details`, {
          params: { location_id },
          headers: {
            'X-RapidAPI-Key': RAPID_API_KEY,
            'X-RapidAPI-Host': RAPID_API_HOST,
          },
        });

        description = detailRes.data?.description || null;
      } catch (detailErr) {
        console.warn(`Tripadvisor detail fetch failed for ${title}: ${detailErr.message}`);
      }

      // Fallback to Wikipedia if description is still null and name is valid
      if (!description && !blacklist.test(title)) {
        description = await fetchWikipediaDescription(title);
      }

      results.push({ title, image, description });

      if (results.length === 10) break;

    }

    return results;
  } catch (err) {
    console.error('Tripadvisor API error:', err.message);
    return [];
  }
}

module.exports = getTripadvisorPlaces;
