const axios = require('axios');
const RAPID_API_KEY = process.env.RAPID_API_KEY;
const RAPID_API_HOST = 'travel-advisor.p.rapidapi.com';

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

    const places = items
      .filter(
        item => item.result_type === 'things_to_do' && item.result_object?.photo?.images?.large?.url
      )
      .slice(0, 10);

    // Fetch descriptions in parallel
    const detailedPlaces = await Promise.all(
      places.map(async item => {
        const location_id = item.result_object.location_id;
        const name = item.result_object.name;
        const imageUrl = item.result_object.photo.images.large.url;

        try {
          const detailRes = await axios.get(`https://${RAPID_API_HOST}/attractions/get-details`, {
            params: { location_id },
            headers: {
              'X-RapidAPI-Key': RAPID_API_KEY,
              'X-RapidAPI-Host': RAPID_API_HOST,
            },
          });

          const description = detailRes.data?.description || null;

          return { title: name, image: imageUrl, description };
        } catch (detailErr) {
          console.warn(`Error fetching details for ${name}:`, detailErr.message);
          return { name, imageUrl, description: null };
        }
      })
    );

    return detailedPlaces;
  } catch (err) {
    console.error('Tripadvisor API error:', err.message);
    return [];
  }
}

module.exports = getTripadvisorPlaces;
