"use client"

import React, { useState, useRef, useCallback, Suspense } from 'react';
import { GoogleMap, Autocomplete, useJsApiLoader, Libraries, Marker } from '@react-google-maps/api';
import { Input } from '../ui/input';

const containerStyle = {
    width: 'auto',
    height: '360px',
    border: "1px solid gray",
    margin: '0px 0px 10px 0px'
};

const libraries: Libraries = ['places'];

const CreateEditMap = ({ areaValue, onAreaChange, isNew }: any) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyB004Ej8pwXnHAqf3D9rvUOMYiVcobwkHo",
        libraries,
    })

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

    const onLoad = useCallback(function callback(map: google.maps.Map) {
        map.setCenter({lat: areaValue.latitude, lng: areaValue.longitude});

        if (isNew) {
            map.setZoom(10)
        } else{
            map.setZoom(17)
        }

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

    const onPlaceChanged = () => {
        if (autocompleteRef.current !== null) {
            const place = autocompleteRef.current.getPlace();

            if (place && place.geometry && place.geometry.viewport && place.geometry.location) {
                map?.fitBounds(place.geometry.viewport);
                map?.setCenter(place.geometry.location);

                const newLocation = {
                    address: place.formatted_address!!.replace(/, Norway$/, ''),
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng(),
                };

                onAreaChange(newLocation);
            }
        }
    };

    return isLoaded ? (
        <div>
  
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    zoom={10}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    options={options}
                >
<Marker position={{ lat: areaValue.latitude, lng: areaValue.longitude }}/>
                </GoogleMap>

            <Autocomplete
                onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                onPlaceChanged={onPlaceChanged}
                restrictions={{ country: "no" }}
            >
                <Input
                    type="text"
                    value={areaValue.address}
                    onChange={(e) => onAreaChange({ ...areaValue, address: e.target.value })}
                    placeholder="Søk etter område"
                />
            </Autocomplete>
        </div>
    ) : <><div className='w-full h-[410px] animate-pulse bg-gray-200'></div></>;
};

export default CreateEditMap;
