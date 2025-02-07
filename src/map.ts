import L from 'leaflet';
import 'leaflet-draw';

// Initialize the map and set its view
const map = L.map('map').setView([51.505, -0.09], 13);

// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Initialize the FeatureGroup for drawn layers
const drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

// Add the Leaflet.draw control
const drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems
    },
    draw: {
        polygon: {}, // Default PolygonOptions
        polyline: {}, // Default PolylineOptions
        rectangle: {}, // Default RectangleOptions
        circle: {}, // Default CircleOptions
        marker: {} // Default MarkerOptions
    }
});
map.addControl(drawControl);

// Helper function for registering draw events
function onDrawCreated(
    map: L.Map,
    eventType: string,
    callback: (event: L.DrawEvents.Created) => void
): void {
    map.on(eventType, callback as unknown as L.LeafletEventHandlerFn);
}

// Register the 'draw:created' event to add shapes to the map
onDrawCreated(map, L.Draw.Event.CREATED, (event: L.DrawEvents.Created) => {
    const layer = event.layer; // Access the drawn layer
    drawnItems.addLayer(layer); // Add it to the FeatureGroup
});