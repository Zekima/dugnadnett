import React, { useState, useRef } from "react";
import ReactMapGL from "react-map-gl";
import { Slider } from "@/components/ui/slider";
import "mapbox-gl/dist/mapbox-gl.css";

import { SearchBox } from "@mapbox/search-js-react";

const SearchLocation = () => {
  const mapRef = useRef(null);
  const [value, setValue] = useState("");

  return (
    <div><div className="my-2 mb-4">
      <SearchBox
        placeholder="Søk etter sted eller postkode"
        accessToken={process.env.REACT_APP_MAPBOX_API_KEY as string}
        options={{
          language: "no",
          country: "NO",
          types: "place,postcode"
        }}
        theme={{
          variables: {
            boxShadow: "0",
            unit: "15px",
          },
        }}
        value={value}
        onChange={(e) => setValue(e)}
        map={mapRef.current}
      />
      </div>
      <div className="w-full h-[370px] mb-2 rounded-lg border-2 border-black">
        <ReactMapGL
          ref={mapRef}
          initialViewState={{
            longitude: 10.7522,
            latitude: 59.9139,
            zoom: 11,
          }}
          style={{ borderRadius: 8 }}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
        ></ReactMapGL>
      </div>
      <div className="flex justify-between mt-2 text-sm">
        <p>Avstand</p>
        <p>3 km</p>
      </div>

      <Slider className="mt-3 mb-4 bg-white" />
    </div>
  );
};

export default SearchLocation;
