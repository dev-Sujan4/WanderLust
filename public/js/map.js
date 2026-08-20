

const map = new maplibregl.Map({
  container: "map",

  style: {
    version: 8,

    glyphs:
      "https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf",

    sprite: "https://protomaps.github.io/basemaps-assets/sprites/v4/light",

    sources: {
      protomaps: {
        type: "vector",
        url: `https://tiles.latlng.work/v1/metadata?key=${mapsKey}`,
      },
    },

    layers: basemaps.layers("protomaps", basemaps.namedFlavor("light"), {
      lang: "en",
    }),
  },

  center: [longitude, latitude],
  zoom: 13,
});
new maplibregl.Marker()
    .setLngLat([longitude, latitude])
    .addTo(map);
