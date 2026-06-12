import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import { Link } from "react-router-dom";
import L from "leaflet";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

// ==============================
// FIX LEAFLET DEFAULT ICON
// ==============================
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ==============================
// FIT ALL PROPERTIES
// ==============================
function FitBounds({ properties }) {
  const map = useMap();

  useEffect(() => {
    const validProperties = properties.filter(
      (p) =>
        Number.isFinite(Number(p?.location?.lat)) &&
        Number.isFinite(Number(p?.location?.lng))
    );

    if (!validProperties.length) return;

    const bounds = L.latLngBounds(
      validProperties.map((p) => [
        Number(p.location.lat),
        Number(p.location.lng),
      ])
    );

    map.fitBounds(bounds, {
      padding: [50, 50],
    });
  }, [properties, map]);

  return null;
}

// ==============================
// FOCUS SELECTED PROPERTY
// ==============================
function ChangeMapView({ selectedProperty }) {
  const map = useMap();

  useEffect(() => {
    if (
      selectedProperty?.location?.lat &&
      selectedProperty?.location?.lng
    ) {
      map.flyTo(
        [
          Number(selectedProperty.location.lat),
          Number(selectedProperty.location.lng),
        ],
        15,
        {
          duration: 1.5,
        }
      );
    }
  }, [selectedProperty, map]);

  return null;
}

// ==============================
// MARKER COMPONENT
// ==============================
function PropertyMarker({
  property,
  selectedProperty,
}) {
  const markerRef = useRef(null);

  const lat = Number(property?.location?.lat);
  const lng = Number(property?.location?.lng);

  useEffect(() => {
    if (
      selectedProperty?._id === property._id &&
      markerRef.current
    ) {
      markerRef.current.openPopup();
    }
  }, [selectedProperty, property]);

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return null;
  }

  // ==============================
  // IMAGE FIX
  // ==============================
  let photoPath = "";

  if (property?.photos?.[0]?.image) {
    photoPath = property.photos[0].image;
  } else if (property?.photos?.[0]?.url) {
    photoPath = property.photos[0].url;
  } else if (typeof property?.photos?.[0] === "string") {
    photoPath = property.photos[0];
  }

  const cleanPath =
    typeof photoPath === "string"
      ? photoPath.replace(/^\/api/, "")
      : "";

  const imageUrl = cleanPath
    ? cleanPath.startsWith("http")
      ? cleanPath
      : `${import.meta.env.VITE_API_URL}${cleanPath}`
    : "https://via.placeholder.com/300x200";

  return (
    <Marker
      ref={markerRef}
      position={[lat, lng]}
    >
      <Popup>
        <div className="w-56">
          <img
            src={imageUrl}
            alt={property?.property?.title}
            className="w-full h-28 object-cover rounded mb-2"
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/300x200";
            }}
          />

          <h3 className="font-semibold text-sm">
            {property?.property?.title}
          </h3>

          <p className="text-xs text-gray-500 mt-1 mb-3">
            {property?.location?.address}
          </p>

          <Link
            to={`/property/${property._id}`}
            className="inline-block bg-[#3c8a8c] text-white text-xs px-3 py-2 rounded hover:bg-[#2f7071]"
          >
            <span className="text-white">
              View Property
            </span>
            
          </Link>
        </div>
      </Popup>
    </Marker>
  );
}

// ==============================
// MAIN MAP
// ==============================
const PropertyMap = ({
  properties = [],
  selectedProperty,
}) => {
  const firstProperty = properties.find(
    (p) =>
      Number.isFinite(Number(p?.location?.lat)) &&
      Number.isFinite(Number(p?.location?.lng))
  );

  const defaultCenter = firstProperty
    ? [
        Number(firstProperty.location.lat),
        Number(firstProperty.location.lng),
      ]
    : [30.3831, -86.4974];

  return (
    <MapContainer
      center={defaultCenter}
      zoom={11}
      scrollWheelZoom={true}
      style={{
        width: "100%",
        height: "100%",
      }}
      className="rounded-xl z-0"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FitBounds properties={properties} />

      <ChangeMapView
        selectedProperty={selectedProperty}
      />

      {properties.map((property) => (
        <PropertyMarker
          key={property._id}
          property={property}
          selectedProperty={selectedProperty}
        />
      ))}
    </MapContainer>
  );
};

export default PropertyMap;