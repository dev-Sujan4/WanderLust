const geocode = async (location) => {
    const response = await fetch(
        `https://api.latlng.work/api?q=${encodeURIComponent(location)}`,
        {
            headers: {
                "X-Api-Key": process.env.SERVER_KEY
            }
        }
    );

    const data = await response.json();

    return data.features[0].geometry.coordinates;
};

module.exports = geocode;