const geocode = async (location) => {
  try {
    if (!location || typeof location !== "string" || location.trim() === "") {
      console.warn("Geocode: No valid location provided, using fallback coordinates.");
      return [77.2090, 28.6139];
    }


    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=geojson`,
      {
        headers: {
          "User-Agent": "WanderLustApp/1.0",
        },
      }
    );



    if (!response.ok) {
      return [77.2090, 28.6139];
    }

    const data = await response.json();


    if (!data.features || data.features.length === 0) {

      return [77.2090, 28.6139];
    }

    return data.features[0].geometry.coordinates;
  } catch (err) {
    console.error("GEOCODE ERROR:", err.message);
    return [77.2090, 28.6139];
  }
};

module.exports = geocode;