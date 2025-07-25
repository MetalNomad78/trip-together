const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function geminiFetch(req, res) {
  const { prompt } = req.body;
  return await callGeminiApi(prompt);
}

const callGeminiApi = async prompt => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`;

  const headers = {
    'Content-Type': 'application/json',
    'X-goog-api-key': GEMINI_API_KEY,
  };

  const itinerarySchema = {
    type: 'object',
    properties: {
      itinerary_title: {
        type: 'string',
        description: 'A concise title for the travel itinerary.',
      },
      description: {
        type: 'string',
        description: 'A detailed overview of the itinerary.',
      },
      approx_budget_inr: {
        type: 'number',
        description:
          'An approximate budget for the entire trip in Indian Rupees (INR), as a numerical value.',
      },
      category: {
        type: 'string',
        enum: [
          'beach_getaway',
          'mountain_escape',
          'cultural_exploration',
          'wildlife_safari',
          'adventure_sports',
          'spiritual_retreat',
          'desert_expedition',
          'backpacking_adventure',
        ],
        description: 'The category that best describes this itinerary from the predefined list.',
      },
      trip_difficulty: {
        type: 'string',
        enum: ['easy', 'moderate', 'challenging', 'extreme'],
        description: 'The overall difficulty level of the trip.',
      },
      duration_days: {
        type: 'integer',
        description: 'The total duration of the trip in number of days.',
        minimum: 1,
      },
      highlights: {
        type: 'array',
        description: 'A list of key attractions or experiences of the trip.',
        items: {
          type: 'string',
        },
      },
      location: {
        type: 'object',
        description: 'The geographical location of the primary destination.',
        properties: {
          city: {
            type: 'string',
            description: 'The city of the primary destination.',
          },
          state: {
            type: 'string',
            description: 'The state/province of the primary destination.',
          },
          country: {
            type: 'string',
            description: 'The country of the primary destination.',
          },
        },
        required: ['city', 'state'],
      },
      daily_plan: {
        type: 'array',
        description: 'A list of daily activities for the itinerary.',
        items: {
          type: 'object',
          properties: {
            day: {
              type: 'integer',
              description: 'The day number of the itinerary.',
            },
            activities: {
              type: 'array',
              description: 'A list of activities planned for the day.',
              items: {
                type: 'string',
              },
            },
          },
          required: ['day', 'activities'],
        },
      },
    },
    required: [
      'itinerary_title',
      'description',
      'approx_budget_inr',
      'category',
      'trip_difficulty',
      'duration_days',
      'highlights',
      'location',
      'daily_plan',
    ],
  };

  const data = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: itinerarySchema,
    },
  };

  try {
    const response = await axios({
      method: 'POST',
      url: url,
      headers: headers,
      data: data,
    });

    if (
      response.data &&
      response.data.candidates &&
      response.data.candidates.length > 0 &&
      response.data.candidates[0].content &&
      response.data.candidates[0].content.parts &&
      response.data.candidates[0].content.parts.length > 0 &&
      response.data.candidates[0].content.parts[0].text
    ) {
      const jsonStringOutput = response.data.candidates[0].content.parts[0].text;
      console.log('GEMINI RESPONSE', jsonStringOutput);
      try {
        const parsedJson = JSON.parse(jsonStringOutput);
        return parsedJson;
      } catch (parseError) {
        console.error('Error parsing JSON string from Gemini API:', parseError.message);
        return null;
      }
    } else {
      console.warn('Unexpected Gemini API response structure. Returning raw response data.');
      return response.data;
    }
  } catch (error) {
    if (error.response) {
      console.error('Error calling Gemini API:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Error calling Gemini API: No response received', error.request);
    } else {
      console.error('Error calling Gemini API:', error.message);
    }
    return null;
  }
};

module.exports = { geminiFetch, callGeminiApi };
