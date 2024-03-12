"use client"

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleMap, Autocomplete, useJsApiLoader, Libraries } from '@react-google-maps/api';
import {Trash} from 'lucide-react'
import { Input } from '../ui/input';
import { Slider } from '../ui/slider';

const containerStyle = {
    width: 'auto',
    height: '360px',
    border: "1px solid gray",
    margin: '0px 0px 10px 0px'
};

const center: any = {
    lat: 59.9139,
    lng: 10.7522
};

const libraries: Libraries = ['places'];

const UtforskMap = ({ areaValue, onAreaChange, distance, onDistanceChange, circle, setCircle, handleClearDistance, showCircle }: any) => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyB004Ej8pwXnHAqf3D9rvUOMYiVcobwkHo",
        libraries,
    })


    const [map, setMap] = useState<google.maps.Map | null>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

    const onLoad = useCallback(function callback(map: google.maps.Map) {
        map.setCenter(center);
        map.setZoom(12);

        setMap(map)
        const circleOptions = {
            strokeColor: "green",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "green",
            fillOpacity: 0.2,
            map,
            center: center,
            radius: distance,
            visible: false,
        };

        const mapCircle = new google.maps.Circle(circleOptions);
        setCircle(mapCircle);
    }, [distance])

    const onUnmount = useCallback(function callback(map: google.maps.Map) {
        setMap(null);
    }, []);

    const options: google.maps.MapOptions = {
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
    };

    const handleDistanceChange = (newDistance: number) => {
        onDistanceChange(newDistance);
        circle?.setRadius(newDistance)
    };

    const onPlaceChanged = () => {
        if (autocompleteRef.current !== null) {
            const place = autocompleteRef.current.getPlace();

            if (place && place.geometry && place.geometry.viewport && place.geometry.location) {
                map?.fitBounds(place.geometry.viewport);
                map?.setCenter(place.geometry.location);
                map?.setZoom(12)

                const newLocation = {
                    address: place.formatted_address!!.replace(/, Norway$/, ''),
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng(),
                };

                circle?.setOptions({visible: true})
                circle?.setCenter({lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})

                onAreaChange(newLocation);
            }
        }
    };

    return isLoaded ? (
        <div>
            <Autocomplete
                onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                onPlaceChanged={onPlaceChanged}
                restrictions={{ country: "no" }}
            >
                <Input
                    type="text"
                    className='my-3'
                    value={areaValue.address}
                    onChange={(e) => onAreaChange({ ...areaValue, address: e.target.value })}
                    placeholder="Søk etter område"
                />
            </Autocomplete>
            <div className='relative'>
            <button 
            className='bg-white shadow-md p-2 absolute right-2 top-2 z-50 rounded-md disabled:opacity-50'
            title='Fjern områdesirkel'
            disabled={!showCircle}
            onClick={() => handleClearDistance()}
            ><Trash className={`text-gray-700 ${showCircle ? 'hover:text-black' : 'hover:text-gray-700'}`} /></button>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={options}
            >
                

            </GoogleMap>
            </div>
            <p className='mb-1'>{distance} meter</p>
            

            <Slider
                min={100}
                max={10000}
                step={100}
                value={[distance]}
                className='border-2 border-black rounded-md'
                onValueChange={(e) => handleDistanceChange(e[0])}
            />
        </div>
    ) : <><div className='w-full h-[461.2px] animate-pulse bg-gray-200 mt-3'></div></>;
};

export default UtforskMap;
