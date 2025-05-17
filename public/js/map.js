mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v12', // style URL
  center: listing.geometry.coordinates, // starting position [lng, lat]
  zoom: 9 // starting zoom
});


console.log(listing.geometry.coordinates);

const marker = new mapboxgl.Marker({ color: '#589fc2'})
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
      new mapboxgl.Popup({offset: 25}).setHTML(
      `<h4>${listing.title}</h4><p><b>Exact location provided after booking</b></p>`))
    .addTo(map);

