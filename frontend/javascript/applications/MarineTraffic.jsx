import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';


function MarineTraffic() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/analytics/ais/api/')
        .then(response => response.json())
        .then(data => setData(data));
    }, []);
  
    return (
        <div className='p-4'>
            <h2 className='text-center'>Marine Traffic</h2>
            <MapContainer center={[ 55.3781, 3.4360 ]} zoom={5} style={{height:'60vh'}}>
                <TileLayer      
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
        
                {data.map(marker => (
                <Marker position={[marker.latitude, marker.longitude]}>{/* icon={PinIcon}> */}
                    <Popup>
                    <div>
                        <a href={`https://www.vesselfinder.com/vessels/details/${marker.ship_id}`} target="_blank" rel="noopener noreferrer">Ship ID: <b>{marker.ship_id}</b></a>
                        <br />
                        TimeStamp: <b>{marker.timestamp}</b>
                    </div>
                    </Popup>
                </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

ReactDOM.render(<MarineTraffic />, document.getElementById('root'));