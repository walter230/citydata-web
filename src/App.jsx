
import React, { useEffect, useState } from 'react';
import { supabase } from './services/supabaseClient';
import { SEOUL_LOCATIONS } from './data/locations';
import MapComponent from './components/MapContainer';
import Dashboard from './components/Dashboard';
import './index.css';

function App() {
  const [data, setData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLive, setIsLive] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    let dbData = [];
    let fetchSuccess = false;

    try {
      // Fetch recent data sorted by created_at
      const { data, error: dbError } = await supabase
        .from('seoul_city_data')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(2000);

      if (dbError) throw dbError;

      if (data && data.length > 0) {
        dbData = data;
        fetchSuccess = true;
        console.log(`Successfully fetched ${data.length} rows from Supabase.`);
      } else {
        console.log('Supabase returned 0 rows or connection issue.');
      }

      // Clear error if success
      setError(null);

    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
    }

    // Deduplicate: Keep only the first occurrence (latest) for each AREA_NM
    const latestMap = new Map();
    dbData.forEach(rawItem => {
      // Normalize keys to Uppercase to handle Supabase/Postgres lowercase return
      const item = {};
      Object.keys(rawItem).forEach(key => {
        item[key.toUpperCase()] = rawItem[key];
      });

      if (item.AREA_NM && !latestMap.has(item.AREA_NM)) {
        latestMap.set(item.AREA_NM, item);
      }
    });

    let matchedCount = 0;

    // Merge Static Locations with DB data
    const mergedData = Object.entries(SEOUL_LOCATIONS).map(([limit_area_nm, coords]) => {
      const dbItem = latestMap.get(limit_area_nm);

      const isReal = !!dbItem;
      if (isReal) matchedCount++;

      return {
        AREA_NM: limit_area_nm,
        // Default state if no data (MapComponent renders default/grey)
        AREA_CONGEST_LVL: dbItem ? dbItem.AREA_CONGEST_LVL : '데이터 없음',
        AREA_CONGEST_MSG: dbItem ? dbItem.AREA_CONGEST_MSG : '현재 데이터가 없습니다.',
        LIVE_PPLTN_STTS: dbItem ? dbItem.LIVE_PPLTN_STTS : '-',
        PPLTN_TIME: dbItem ? dbItem.PPLTN_TIME : null,

        // Spread dbItem if exists to populate other fields (rates, etc)
        // If dbItem is undefined, spreading it does nothing
        ...(dbItem || {}),

        lat: coords.lat,
        lng: coords.lng,
        isReal: isReal
      };
    });

    // Set global live status based on whether we actually MATCHED any live data to our known locations
    // This fixes the issue where DB returns rows but they don't match our locations, resulting in grey spots but "LIVE DATA" status
    setIsLive(fetchSuccess && matchedCount > 0);

    setData(mergedData);

    // Update selected location if it exists
    if (selectedLocation) {
      const updatedSelected = mergedData.find(d => d.AREA_NM === selectedLocation.AREA_NM);
      if (updatedSelected) setSelectedLocation(updatedSelected);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();

    // Optional: Poll every 60 seconds
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="app-container">
      {error && (
        <div style={{
          position: 'absolute',
          top: 10, left: '50%', transform: 'translateX(-50%)',
          zIndex: 2000, background: 'red', color: 'white', padding: '10px 20px', borderRadius: 8
        }}>
          Error: {error}
        </div>
      )}

      {/* Data Source Indicator */}
      <div style={{
        position: 'absolute',
        top: 20, left: 20,
        zIndex: 1500,
        background: 'white',
        padding: '8px 16px',
        borderRadius: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontWeight: '600',
        fontSize: '0.9rem',
        color: '#1e293b'
      }}>
        <div style={{
          width: '10px', height: '10px', borderRadius: '50%',
          backgroundColor: isLive ? '#22c55e' : '#94a3b8'
        }}></div>
        {isLive ? 'LIVE DATA' : 'NO DATA'}
      </div>

      <div className="map-wrapper">
        <MapComponent
          data={data}
          onSelect={setSelectedLocation}
          selectedId={selectedLocation ? selectedLocation.AREA_NM : null}
        />

        {/* Loading indicator */}
        {loading && data.length === 0 && (
          <div className="loading-overlay">
            Loading SEOUL Data...
          </div>
        )}
      </div>

      <Dashboard data={selectedLocation} />
    </div>
  );
}

export default App;
