// Initialize the map and set its view to a specific location (New York City)
const map = L.map('map').setView([10.809256, 77.010918], 15);

// Add MapTiler Streets tile layer
const streets = L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=YOUR_MAPTILER_API_KEY', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
}).addTo(map);

// Add MapTiler Satellite tile layer
const satellite = L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=YOUR_MAPTILER_API_KEY', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors & MapTiler',
    maxZoom: 19,
});

// Add a layer control to switch between street and satellite views
const baseMaps = {
    "Streets": streets,
    "Satellite": satellite
};
L.control.layers(baseMaps).addTo(map);

// Initialize a three.js layer on the Leaflet map.
const threeLayer = L.threeJSLayer()
    .addTo(map);

// Add 3D buildings using ThreeJS
function createBuildings() {
    const material = new THREE.MeshStandardMaterial({ color: 0xffa500 });
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    threeLayer.scene.add(mesh);
}
createBuildings();

// Add a tilted view for perspective
const tiltMap = map.tiltMap = function (lat, lng, rotation = 55, zoom = 5) {
    map.setView([lat, lng], zoom);
    map.setRotation(rotation); // degrees (0 to 90)
};
tiltMap(40.7, 4, 7);

// Add a marker for New York
const marker = L.marker([40.7, -74.00]).addTo(map);

// Add a popup to the marker
marker.bindPopup("<b>Hello NYC!</b><br>I am a popup.").openPopup();

// Add a circle
const circle = L.circle([40.708, -74.010], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500,
}).addTo(map);

// Add a polygon
const polygon = L.polygon([
    [40.712, -74.009],
    [40.702, -73.995],
    [40.7, -73.94],
]).addTo(map);
polygon.bindPopup("NYC skyscraper");

// Add pop-ups to polygons
function onMapClick(e) {
    alert(`Clicked ${e.latlng}`);
}
map.on('click', onMapClick);
