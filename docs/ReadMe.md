<!-- ====================== Map library choice ======================-->

Map Library Choice

I selected Leaflet (with React-Leaflet) as the mapping library for this project.

Why Leaflet?

Lightweight and easy to integrate with React.

Excellent support for WMS layers, which was required for the assignment.

A mature ecosystem and a large community, making troubleshooting faster.

Flexible enough to render polygons, AOIs, and interactive layers without introducing unnecessary complexity.

Works smoothly with raster imagery such as the provided satellite/drone data.

Alternatives Considered

MapLibre GL: Powerful but heavier and more suited for vector tiles. It would have added complexity without clear benefits for WMS usage.

OpenLayers: Feature-rich and ideal for large geospatial projects, but the API has a steep learning curve, which didn’t fit the limited time.

react-map-gl / Mapbox GL: Optimized for vector maps, not ideal for WMS and would require more setup.

Conclusion: Leaflet provided the best balance between simplicity, performance, and alignment with the assignment needs.

<!-- ====================== Architecture decisions ======================-->

The architecture of this project was primarily shaped by the Figma design, rather than by a predefined technical structure. My goal was to replicate the layout and interactions shown in the UI as closely as possible within the given time and with the limited access I had to the Figma assets.

How the Architecture Was Formed

I built the page structure directly based on the Figma layout, placing panels, toolbars, and the map exactly where they appeared in the design.

Components were divided according to visual and functional sections in the UI, such as:

Sidebar / Tools Panel

AOI Panel

Map container

Top controls

The focus was on mirroring the user flow shown in the design rather than building a complex architecture.

src/
├─ components/
│ ├─ BaseMap.tsx
│ ├─ BaseNavBar.tsx
│ ├─ mapSwitch.tsx
│ ├─ mapView.tsx
│ ├─ ViewNavBar.tsx
├─ screens/
├─ types/
├─
├─ App.tsx

<!-- ====================== Performance considerations ======================-->

Performance Considerations

Even though the current version renders limited data, I designed the map layer logic with future scalability in mind:

Efficient rendering of thousands of markers/polygons using:

memoization

minimized re-renders

grouping and Layer control strategies

Prepared for potential migration to vector tiles if the dataset grows.

Ensured that WMS layers load efficiently and do not block UI rendering.

Architecture allows easy integration of server-side filtering or clustering later.

<!-- ====================== Tradeoffs made ======================-->

Tradeoffs Made

Because of the tight deadline, I had to prioritize core functionality over completeness:

Automated tests were not implemented. I initially planned 2–3 Playwright tests, but with only two days available I focused on delivering a working application that matched the Figma flow.

Pixel perfection was not fully achieved because of restricted Figma access and missing assets/icons.

Some UI elements were simplified to accelerate implementation.

Only essential features were implemented to ensure the assignment was completed on time.

<!-- ====================== Production readiness ======================-->

Production Readiness

For real-world deployment, I would add:

Complete Playwright test coverage (routing, layers, UI interactions).

Error boundaries and improved map loading states.

Server-side data fetching for AOIs, polygons, and configurations.

Environment variable handling with .env schema validation.

Global state reorganization if the feature set grows.

Asset pipeline for handling icons instead of relying on public URLs.

Better accessibility and keyboard navigation.

<!-- ====================== Time spent ======================-->

Time Spent

The assignment took approximately 2 days from start to finish.

Timeline

Nov 27: Received the assignment

Nov 27–29: Implemented map, interaction logic, UI structure, and styling

Nov 29: Documentation, cleanup, and final adjustments

<!-- ====================== NOTES ======================-->

This was a challenging but very rewarding project.

I worked with my beginner-level experience and learned several new concepts during the process, especially around:

WMS layer integration

Managing geospatial state inside React

Debugging map rendering issues

Understanding AOI structures in a mapping context

Throughout the process, I actively sought help and learned from:
Reddit communities, StackOverflow threads, AI tools, and the Leaflet documentation.

This assignment helped me level up significantly in both mapping and frontend problem-solving.
