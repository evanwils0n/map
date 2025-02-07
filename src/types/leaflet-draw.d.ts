// Remove or comment out this section
import 'leaflet';
import 'leaflet-draw';

declare module 'leaflet' {
    namespace DrawEvents {
        interface Created extends LeafletEvent {
            // layer: Layer; // This conflicts with the existing type definition
            layerType: string;
        }
    }
}