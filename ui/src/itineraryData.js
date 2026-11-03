// City-specific high-definition curated guides
export const CITY_SPOTLIGHTS = {
  tokyo: {
    heroTag: 'Electric Metropolis & Ancient Shrines',
    topAttractions: [
      { name: 'Sensō-ji Temple', note: 'Tokyo’s oldest, most revered Buddhist temple in Asakusa' },
      { name: 'Meiji Jingu Shrine', note: 'Tranquil forested shrine dedicated to Emperor Meiji' },
      { name: 'teamLab Planets', note: 'World-famous immersive digital art installation' },
      { name: 'Shibuya Sky & Crossing', note: 'Iconic panoramic rooftop and world’s busiest intersection' }
    ],
    topEateries: [
      { name: 'Ichiran Shibuya', note: 'Legendary individual booth Tonkotsu ramen' },
      { name: 'Tsukiji Sushiko', note: 'Ultra-fresh morning sushi near the historic market' },
      { name: 'Omoide Yokocho Izakayas', note: 'Smoky, atmospheric alleyway yakitori and craft drinks' }
    ],
    days: [
      {
        day: 1,
        title: 'Historic Asakusa & Neon Shinjuku',
        morning: 'Begin at Sensō-ji temple. Stroll down Nakamise-dori for warm melonpan and authentic matcha sweets.',
        afternoon: 'Cruise the Sumida River water bus or browse cutting-edge electronics and anime culture in Akihabara.',
        evening: 'Head to Shinjuku. Watch sunset over the megalopolis from the Tokyo Metropolitan Govt Building observation deck.',
        diningTip: 'Dine at Ichiran or sample yakitori in the vintage alleyways of Omoide Yokocho.',
        weatherNote: 'Metro transit makes moving around comfortable rain or shine.'
      },
      {
        day: 2,
        title: 'Harajuku Fashion, Meiji Woods & Shibuya Crossing',
        morning: 'Peaceful stroll beneath towering cedar trees at Meiji Jingu, followed by trendy youth culture on Takeshita Street.',
        afternoon: 'Wander tree-lined Omotesando boulevard and experience the interactive digital water exhibits at teamLab Planets.',
        evening: 'Stand in the center of Shibuya Crossing at dusk and gaze across the city lights from Shibuya Sky rooftop.',
        diningTip: 'Try savoury Okonomiyaki (cabbage pancakes) or authentic Wagyu Sukiyaki.',
        weatherNote: 'Ideal for walking; keep a light jacket for breezy high-floor observation decks.'
      },
      {
        day: 3,
        title: 'Imperial Palace Gardens & Ginza Luxury',
        morning: 'Tour the tranquil Imperial Palace East Gardens and stone Nijubashi bridges.',
        afternoon: 'Café-hop in glamorous Ginza; visit Ginza Six rooftop garden and artisan stationery house Itoya.',
        evening: 'Farewell sunset dinner overlooking Tokyo Tower from Roppongi Hills.',
        diningTip: 'High-end Kaiseki tasting dinner or fresh conveyor belt sushi in Ginza.',
        weatherNote: 'Pack comfortable walking shoes — expect 15,000+ steps.'
      }
    ]
  },
  paris: {
    heroTag: 'Art, Architecture & Bohemian Cafés',
    topAttractions: [
      { name: 'The Louvre (Denon Wing)', note: 'Masterpieces: Mona Lisa, Winged Victory, Venus de Milo' },
      { name: 'Sainte-Chapelle', note: 'Breathtaking 13th-century Gothic royal stained glass' },
      { name: 'Sacré-Cœur Basilica', note: 'Hilltop views over all of Paris from Montmartre' },
      { name: 'Musée d’Orsay', note: 'Impressionist treasures by Monet, Van Gogh, and Renoir' }
    ],
    topEateries: [
      { name: 'Café de Flore', note: 'Historic existentialist café in Saint-Germain-des-Prés' },
      { name: 'Bouillon Chartier', note: 'Grand belle époque dining serving classic French fare at honest prices' },
      { name: 'Le Comptoir du Relais', note: 'Acclaimed Parisian bistro with artisanal charcuterie and duck confit' }
    ],
    days: [
      {
        day: 1,
        title: 'The Latin Quarter, Sainte-Chapelle & The Seine',
        morning: 'Café crème and croissants in Saint-Germain, followed by the towering stained glass of Sainte-Chapelle on Île de la Cité.',
        afternoon: 'Explore the Louvre Museum; stroll along the riverside Bouquinistes (antique bookstalls).',
        evening: 'Sunset walk through Tuileries Gardens to Place de la Concorde, followed by a romantic Seine river cruise.',
        diningTip: 'Traditional Beef Bourguignon or French Onion Soup at Bouillon Chartier.',
        weatherNote: 'Carry a compact umbrella for sudden Parisian showers.'
      },
      {
        day: 2,
        title: 'Montmartre Artists & Eiffel Tower Illumination',
        morning: 'Funicular up to Sacré-Cœur for postcard city views; browse easel painters in Place du Tertre.',
        afternoon: 'Discover impressionist masterworks at Musée d’Orsay, housed in an opulent Beaux-Arts train station.',
        evening: 'Golden hour at Trocadéro terrace watching the Eiffel Tower sparkle on the hour.',
        diningTip: 'Savory buckwheat Galettes in Montmartre, followed by artisan macarons.',
        weatherNote: 'Montmartre has steep cobblestone steps; wear flat supportive footwear.'
      },
      {
        day: 3,
        title: 'Le Marais Aristocratic Mansions & Palaces',
        morning: 'Wander the arcaded courtyards of Place des Vosges and the Victor Hugo house in Le Marais.',
        afternoon: 'Relax by the Medici Fountain in Luxembourg Gardens; window shop boutique perfume and fashion ateliers.',
        evening: 'Farewell bistro dinner with fine Bordeaux wine overlooking the Seine.',
        diningTip: 'Artisan cheese board with warm baguette and fresh tarte tatin.',
        weatherNote: 'Cool evening breezes along the river.'
      }
    ]
  },
  'new york': {
    heroTag: 'Skyline Icons, Broadway & Green Spaces',
    topAttractions: [
      { name: 'The High Line & Hudson Yards', note: 'Elevated railway park with skyline and river views' },
      { name: 'Central Park (Bethesda Terrace)', note: 'Heart of Manhattan’s green oasis' },
      { name: 'The Metropolitan Museum of Art (The Met)', note: 'Over 5,000 years of global art and rooftop garden' },
      { name: 'Brooklyn Bridge & DUMBO', note: 'Iconic suspension bridge walk and waterfront views' }
    ],
    topEateries: [
      { name: 'Katz’s Delicatessen', note: 'Legendary hand-carved pastrami on rye since 1888' },
      { name: 'Grimaldi’s or Joe’s Pizza', note: 'Classic New York coal-fired thin-crust slices' },
      { name: 'Time Out Market DUMBO', note: 'Curated food hall overlooking Lower Manhattan skyline' }
    ],
    days: [
      {
        day: 1,
        title: 'Midtown Landmarks, High Line & Broadway',
        morning: 'Chelsea breakfast bagel, then walk the landscaped High Line to Hudson Yards and the Vessel.',
        afternoon: 'Browse modern masters at MoMA and marvel at the Art Deco grandeur of Rockefeller Center.',
        evening: 'Top of the Rock observation deck at sunset, followed by a world-class Broadway theater performance.',
        diningTip: 'Pastrami sandwich at Katz’s or a quick slice at Joe’s Pizza in Greenwich Village.',
        weatherNote: 'Midtown avenues create wind tunnels; dress in layers.'
      },
      {
        day: 2,
        title: 'Historic Lower Manhattan & Brooklyn Crossing',
        morning: 'Pay tribute at the 9/11 Memorial & Oculus; see the Charging Bull on Wall Street and views of Lady Liberty.',
        afternoon: 'Walk across the iconic Brooklyn Bridge; take photos between the brick warehouses of DUMBO.',
        evening: 'Sunset drinks at Brooklyn Bridge Park with dinner overlooking the illuminated Manhattan bridge.',
        diningTip: 'Coal-fired pizza at Grimaldi’s in Brooklyn.',
        weatherNote: 'Breezes on the bridge are always noticeably cooler than on city streets.'
      },
      {
        day: 3,
        title: 'Central Park, World-Class Museums & Jazz',
        morning: 'Walk Central Park past Bow Bridge, Bethesda Terrace, and Strawberry Fields.',
        afternoon: 'Explore The Met (Metropolitan Museum of Art) including the Temple of Dendur.',
        evening: 'Dinner in Greenwich Village followed by live jazz at Blue Note or Village Vanguard.',
        diningTip: 'Handmade Italian pasta in the West Village or dim sum in Chinatown.',
        weatherNote: 'Central Park covers 843 acres; rent a bike if short on time.'
      }
    ]
  }
};

/**
 * Intelligent Itinerary Synthesizer
 * Merges curated data OR dynamically injected live Nominatim places & restaurants!
 */
export function generateItinerary(destination, currentTemp, weatherDesc, rainProb, liveAttractions = [], liveRestaurants = []) {
  const key = destination.name.toLowerCase().trim();
  
  if (CITY_SPOTLIGHTS[key]) {
    return CITY_SPOTLIGHTS[key];
  }

  // Use live discovered attractions if available, or smart fallbacks
  const topSights = liveAttractions.length > 0
    ? liveAttractions
    : [
        { name: `${destination.name} Historic Old Town`, note: 'Centuries-old civic center, architecture & pedestrian alleys' },
        { name: `${destination.name} Central Museum & Gallery`, note: 'Premier cultural repository showcasing regional heritage' },
        { name: `${destination.name} Panoramic Overlook`, note: 'Elevated viewpoint with 360-degree views of the valley and skyline' },
        { name: `${destination.name} Botanical Reserve`, note: 'Scenic open parklands and serene landscape walks' }
      ];

  // Use live discovered restaurants if available, or regional dining highlights
  const topEats = liveRestaurants.length > 0
    ? liveRestaurants
    : [
        { name: `Historic Taverns of ${destination.name}`, note: 'Traditional family-owned bistros serving regional delicacies' },
        { name: `Central Marketplace & Food Hall`, note: 'Bustling artisanal stalls with freshly prepared street delicacies' },
        { name: `Terrace Promenade Bistro`, note: 'Scenic outdoor dining with regional wines, craft beverages and desserts' }
      ];

  const sight1 = topSights[0]?.name || `${destination.name} Main Square`;
  const sight2 = topSights[1]?.name || `${destination.name} Heritage Quarter`;
  const sight3 = topSights[2]?.name || `${destination.name} Overlook`;
  const sight4 = topSights[3]?.name || `${destination.name} Promenade`;

  const eat1 = topEats[0]?.name || `Local Tavern in ${destination.name}`;
  const eat2 = topEats[1]?.name || `Old Town Eatery`;
  const eat3 = topEats[2]?.name || `Panoramic Sunset Restaurant`;

  const isRainy = rainProb > 30 || (weatherDesc && weatherDesc.toLowerCase().includes('rain'));
  const isCold = currentTemp < 10;
  const isHot = currentTemp > 28;

  const weatherAdvice = isRainy
    ? `Rain expected (${rainProb}% prob.) — prioritised indoor halls at ${sight2}.`
    : isCold
    ? `Chilly climate (${Math.round(currentTemp)}°C) — thermal layers recommended for outdoor walking.`
    : isHot
    ? `Warm conditions (${Math.round(currentTemp)}°C) — midday visits focused in shaded sights.`
    : `Mild pleasant weather (${Math.round(currentTemp)}°C) — ideal conditions for outdoor exploration.`;

  return {
    heroTag: `Curated Heritage, Real Sights & Gastronomy in ${destination.country || destination.name}`,
    topAttractions: topSights.slice(0, 4),
    topEateries: topEats.slice(0, 3),
    days: [
      {
        day: 1,
        title: `Arrival & Historic Core: ${sight1}`,
        morning: `Check into central accommodation. Take an orientation walk around ${sight1} and the surrounding heritage quarter.`,
        afternoon: isRainy
          ? `Head indoors to explore ${sight2} and nearby artisanal coffee houses to stay dry.`
          : `Stroll through the open plazas around ${sight2}, photographing landmark monuments and architecture.`,
        evening: `Sunset walk along the primary boulevard. Book an authentic dinner table at ${eat1}.`,
        diningTip: `At ${eat1}, ask for the local specialty of ${destination.country || 'the region'} and local beverages.`,
        weatherNote: weatherAdvice
      },
      {
        day: 2,
        title: `Iconic Highlights & Culture: ${sight3}`,
        morning: `Early morning excursion to ${sight3} before midday crowds arrive for clean panoramic photos.`,
        afternoon: isRainy
          ? `Discover covered bazaars and indoor exhibitions near ${sight2}.`
          : `Explore the gardens and open viewpoints surrounding ${sight4}.`,
        evening: `Relaxed twilight dinner experience at ${eat2}, followed by an evening stroll through the illuminated district.`,
        diningTip: `Sample artisanal street appetizers and fresh regional delicacies at ${eat2}.`,
        weatherNote: 'Pre-book landmark admission tickets online to bypass ticket booth queues.'
      },
      {
        day: 3,
        title: `Scenic Wandering & Sunset Departure`,
        morning: `Relaxed breakfast at a nearby terrace café. Stroll through artisan quarters and local craft workshops.`,
        afternoon: `Shop for authentic regional souvenirs, spices, or handicrafts. Take a final walk through ${sight4}.`,
        evening: `Farewell sunset feast at ${eat3} overlooking the city before departure transit.`,
        diningTip: `Treat yourself to regional desserts and vacuum-packed culinary souvenirs at ${eat3}.`,
        weatherNote: 'Leave room in your luggage for local handicrafts and verify departure transit times.'
      }
    ]
  };
}
