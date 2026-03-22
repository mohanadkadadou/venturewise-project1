import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default leaflet marker icons in Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const ZONE_COLORS: Record<string, string> = {
  retail: "#f59e0b",
  restaurant: "#10b981",
  business: "#3b82f6",
  market: "#8b5cf6",
  mixed: "#f97316",
};

const ZONE_LABELS: Record<string, string> = {
  retail: "🛍️ Retail",
  restaurant: "🍽️ F&B",
  business: "🏢 Business",
  market: "🏪 Market",
  mixed: "🏙️ Mixed",
};

export interface MapZone {
  name: string;
  type: string;
  lat: number;
  lng: number;
  description: string;
}

interface Props {
  cityLat: number;
  cityLng: number;
  cityName: string;
  zones: MapZone[];
}

function createZoneIcon(type: string) {
  const color = ZONE_COLORS[type] || "#6b7280";
  return L.divIcon({
    className: "",
    html: `<div style="
      background:${color};
      width:14px;height:14px;border-radius:50%;
      border:3px solid white;
      box-shadow:0 2px 8px rgba(0,0,0,0.4);
    "></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -10],
  });
}

export function LocationMap({ cityLat, cityLng, cityName, zones }: Props) {
  if (typeof window === "undefined") return null;

  return (
    <div className="rounded-xl overflow-hidden border border-border" style={{ height: 360 }}>
      <MapContainer
        center={[cityLat, cityLng]}
        zoom={13}
        style={{ height: "100%", width: "100%", background: "hsl(var(--secondary))" }}
        zoomControl={true}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* City center marker */}
        <Circle
          center={[cityLat, cityLng]}
          radius={800}
          pathOptions={{ color: "hsl(var(--primary))", fillColor: "hsl(var(--primary))", fillOpacity: 0.05, weight: 1, dashArray: "4 4" }}
        />

        {/* Commercial zone markers */}
        {zones.map((zone, i) => (
          <Marker
            key={i}
            position={[zone.lat, zone.lng]}
            icon={createZoneIcon(zone.type)}
          >
            <Popup>
              <div style={{ maxWidth: 220, fontFamily: "sans-serif" }}>
                <div style={{ fontWeight: "bold", fontSize: 13, marginBottom: 4 }}>
                  {ZONE_LABELS[zone.type] || zone.type} — {zone.name}
                </div>
                <div style={{ fontSize: 12, color: "#555" }}>{zone.description}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
