import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

// 21.038419631821572, 105.78324722545909
mapboxgl.accessToken =
  "pk.eyJ1IjoiZG9pa290aW5oOTkiLCJhIjoiY2w5ZWUzNHlyMDA5ZjN1cDNxNjR4N2IzayJ9.JMKgva-IkrHjUJ2FIJAk8A";

const Map = () => {
  const mapContainerRef = useRef(null);
  const [locate, setLocate] = useState([105.78324722545909, 21.038419631821572]);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: locate,
      zoom: 15,
    });

    // Create default markers
    new mapboxgl.Marker().setLngLat(locate).addTo(map)

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Clean up on unmount
    return () => map.remove();
  }, []);

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map;
