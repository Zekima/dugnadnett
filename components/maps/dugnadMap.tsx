"use client"

import React, { useState, useRef, useCallback, Suspense } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Libraries } from '@react-google-maps/api';

const containerStyle = {
    width: 'auto',
    height: '360px',
    border: "1px solid gray",
    margin: '0px 0px 10px 0px'
};

const libraries: Libraries = ['places'];

const DugnadMap = ({ latitude, longitude }: any) => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyB004Ej8pwXnHAqf3D9rvUOMYiVcobwkHo",
        libraries,
    })

    const center = {
        lat: latitude,
        lng: longitude
    };

    const [map, setMap] = useState<google.maps.Map | null>(null);

    const onLoad = useCallback(function callback(map: google.maps.Map) {
        map.setCenter(center);
        map.setZoom(14);

        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map: google.maps.Map) {
        setMap(null);
    }, []);

    const options: google.maps.MapOptions = {
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
    };

    return isLoaded ? (
        <div>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    options={options}
                >
                    <Marker
                        position={{ lat: latitude, lng: longitude }}
                    />

                </GoogleMap>
        </div>
    ) : <><div className='w-full h-[360px] animate-pulse bg-gray-200'></div></>;
};

export default DugnadMap;
