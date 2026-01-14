
import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Make sure CSS is loaded

// Helper for marker colors
const getMarkerColor = (lvl) => {
    switch (lvl) {
        case '여유': return '#22c55e'; // Green
        case '보통': return '#eab308'; // Yellow
        case '약간 붐빔': return '#f97316'; // Orange
        case '붐빔': return '#ef4444'; // Red
        default: return '#64748b'; // Grey
    }
};

const MapComponent = ({ data, onSelect, selectedId }) => {
    return (
        <MapContainer
            center={[37.5665, 126.9780]}
            zoom={11}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {data.map((loc) => {
                if (!loc.lat || !loc.lng) return null;

                const isSelected = selectedId === loc.AREA_NM; // Consistent ID usage

                return (
                    <CircleMarker
                        key={loc.AREA_CD || loc.AREA_NM}
                        center={[loc.lat, loc.lng]}
                        radius={isSelected ? 12 : 8}
                        pathOptions={{
                            color: 'white',
                            weight: isSelected ? 3 : 1,
                            fillColor: getMarkerColor(loc.AREA_CONGEST_LVL),
                            fillOpacity: 0.8
                        }}
                        eventHandlers={{
                            click: () => onSelect(loc),
                        }}
                    >
                        <Popup>
                            <strong>{loc.AREA_NM}</strong><br />
                            {loc.AREA_CONGEST_LVL}
                        </Popup>
                    </CircleMarker>
                );
            })}
        </MapContainer>
    );
};

export default MapComponent;
