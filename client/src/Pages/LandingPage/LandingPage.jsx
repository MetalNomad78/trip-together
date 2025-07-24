import React, { useState } from 'react';
import DynamicVideos from '../../components/dynamicVideos/DynamicVideos';
import AboutTT from '../../components/AboutTT/AboutTT';
import './LandingPage.css';
import CategoryCard from '../../components/categoryCard/categoryCard';

const Landing = ({ setShowLogin }) => {
  const [category, setCategory] = useState("All");
      const categories = [
    // { title: "Beach Getaway", image: "/images/beach.jpg", description: "Relax on sunny beaches." },
    // { title: "Mountain Escape", image: "/images/mountain.jpg", description: "Breathe in the mountain air." },
    // { title: "Historical Sites", image: "/images/history.jpg", description: "Walk through history." },
    // { title: "Adventure Sports", image: "/images/adventure.jpg", description: "Thrill and adrenaline." },

        {
            "name": "Laxman Temple",
            "address": "Laxman Temple",
            "city": "Sirpur",
            "state": "Chhattisgarh",
            "country": "India",
            "lat": 21.35314055,
            "lon": 82.18672654666695,
            "categories": [
                "religion",
                "religion.place_of_worship",
                "religion.place_of_worship.hinduism",
                "tourism",
                "tourism.sights",
                "tourism.sights.memorial",
                "tourism.sights.memorial.monument",
                "tourism.sights.place_of_worship"
            ],
            "image": "https://pixabay.com/get/g909d0316d1051b2835ba6ae72fd6b7a77954906f065f8baa96859e22b40eeda411f04ae53a9f5c0615e6202497a93448f3767455ee332124a0dcf9dc18f03528_640.jpg"
        },
        {
            "name": "Janjgir Vishnu temple",
            "address": "Janjgir Vishnu temple",
            "city": "Janjgir",
            "state": "Chhattisgarh",
            "country": "India",
            "lat": 22.005934,
            "lon": 82.5722363741939,
            "categories": [
                "building",
                "building.historic",
                "tourism",
                "tourism.sights",
                "tourism.sights.memorial",
                "tourism.sights.memorial.monument",
                "tourism.sights.place_of_worship.temple"
            ],
            "image": "https://pixabay.com/get/g9a3fdcc48a2320e38efa0f360cf2c57484d85e61ef99fdbe8d1bee5f30001b5d0ba13d2dee806a9db54aa48e763e5bf8_640.jpg"
        },
        {
            "name": "Madku Dweep",
            "address": "Madku Dweep",
            "city": "Mungeli",
            "state": "Chhattisgarh",
            "country": "India",
            "lat": 21.83878645,
            "lon": 81.9496388561111,
            "categories": [
                "access",
                "access.yes",
                "tourism",
                "tourism.attraction",
                "tourism.sights",
                "tourism.sights.archaeological_site"
            ]
        },
        {
            "name": "Ratanpur Fort",
            "address": "Ratanpur Fort",
            "city": "Ratanpur",
            "state": "Chhattisgarh",
            "country": "India",
            "lat": 22.2845558,
            "lon": 82.16731871793823,
            "categories": [
                "access",
                "access.yes",
                "tourism",
                "tourism.sights",
                "tourism.sights.fort"
            ],
            "image": "https://pixabay.com/get/ga30e4dc9e52b909389bfa13c9538a5708db1b7bd581220c2aab7238dab111101225e4e7d51a29440c7bf346258de2dd34bdb60a4fc73359f1b2b157f02398dc3_640.jpg"
        },
        {
            "name": "Bhima Kichak",
            "address": "Bhima Kichak",
            "city": "Malhar",
            "state": "Chhattisgarh",
            "country": "India",
            "lat": 21.893000100000002,
            "lon": 82.27777890897435,
            "categories": [
                "tourism",
                "tourism.sights",
                "tourism.sights.ruines"
            ],
            "image": "https://pixabay.com/get/gf78b0ecf78139b6dd04d3414db1a735c034fd4ec3cff4ad0b0db314743a0d5c799b9dc0582a86dfa225a0d611406322556933b88a28a195e1ede01a08ef3f521_640.jpg"
        },
        {
            "name": "Patalesvara Mahadev Temple",
            "address": "Patalesvara Mahadev Temple",
            "city": "Malhar",
            "state": "Chhattisgarh",
            "country": "India",
            "lat": 21.895482649999998,
            "lon": 82.28006626245053,
            "categories": [
                "tourism",
                "tourism.sights",
                "tourism.sights.ruines"
            ],
            "image": "https://pixabay.com/get/g7a208ed6a3d2ca5166cfa2e62b7f1cbd0566e2062578ed751056ff10013862e4d239e4fef8cf7fe581434bf506e27c8b36e95e14858529696aa496cca7ad4fbf_640.jpg"
        },
        {
            "name": "Malhar Fort",
            "address": "Malhar Fort",
            "city": "Malhar",
            "state": "Chhattisgarh",
            "country": "India",
            "lat": 21.89783825,
            "lon": 82.27701114824646,
            "categories": [
                "tourism",
                "tourism.sights",
                "tourism.sights.fort"
            ],
            "image": "https://pixabay.com/get/g6ea040673fcdf19f990f9f8b6876262e011c0ee6c799dd32a10f22b67705c8f23f0767073a1e0cb09d2a727cce8daf9d241511565dadb13bcfcb66745750dc7b_640.jpg"
        },
        {
            "name": "Kotagarh Fort",
            "address": "Kotagarh Fort",
            "city": "",
            "state": "Chhattisgarh",
            "country": "India",
            "lat": 22.0502683,
            "lon": 82.43434733778625,
            "categories": [
                "tourism",
                "tourism.sights",
                "tourism.sights.fort"
            ],
            "image": "https://pixabay.com/get/gefa517e1299ff1543134befc4d668917c0770ef87104e805125211987592c4d1cd235638b24d2411a8e3c24d76a761b5cecb5876e259587627c96983e331d15a_640.jpg"
        },
        {
            "name": "Kotmi Fort",
            "address": "Kotmi Fort",
            "city": "",
            "state": "Chhattisgarh",
            "country": "India",
            "lat": 22.028809,
            "lon": 82.34225717877663,
            "categories": [
                "tourism",
                "tourism.sights",
                "tourism.sights.fort"
            ],
            "image": "https://pixabay.com/get/gbf66f8156ca655a99b81582f222c20d8410277a25a563beba6715e40f68ebb2a8fae48a958ba50eaf41d1f108d00d343c5010beaa9207a134768d20ac5b71d23_640.jpg"
        },
        {
            "name": "Kashigarh Fort",
            "address": "Kashigarh Fort",
            "city": "Bawanbadi",
            "state": "Chhattisgarh",
            "country": "India",
            "lat": 21.852609049999998,
            "lon": 82.78481712312238,
            "categories": [
                "tourism",
                "tourism.sights",
                "tourism.sights.fort"
            ],
            "image": "https://pixabay.com/get/g26ef52510e8613c522f32c84ff1fbf1dca6628ab4233bf3abfb66b481a8a7c494eddaec0cb870ee1755076f4627d139728b2b7535611656c11bfa4e6642b6387_640.jpg"
        }
    
  ]


  return (
    <div className="landing-page">
      <DynamicVideos setShowLogin={setShowLogin} />
      <div className="landing-content">
        <AboutTT />


              <section className="categories-section">
        <h2 className="section-title">Most Visited Places</h2>
        <div className="categories-grid">
          {categories.map((category, idx) => (
            <CategoryCard key={idx} data={category} />
          ))}
        </div>
      </section>
      </div>
    </div>
  );
};

export default Landing;