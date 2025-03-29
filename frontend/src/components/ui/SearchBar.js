// export default SearchBar;
import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { APILoader } from "https://ajax.googleapis.com/ajax/libs/@googlemaps/extended-component-library/0.6.11/index.min.js";

const SearchBar = ({ placeholder, onPlaceSelected }) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    const loadGoogleMaps = async () => {
      try {
        const apiKey = process.env.REACT_APP_GOOGLE_API_KEY; // Load API key from .env

        // Ensure gmpx-api-loader is on the page
        if (!document.querySelector("gmpx-api-loader")) {
          const loader = document.createElement("gmpx-api-loader");
          loader.setAttribute("key", apiKey);
          loader.setAttribute("libraries", "places");
          document.body.appendChild(loader);
        }

        const { Autocomplete } = await APILoader.importLibrary("places");

        if (inputRef.current) {
          const autocomplete = new Autocomplete(inputRef.current, {
            fields: ["address_components", "geometry", "name"],
            types: ["address"],
            componentRestrictions: { country: "ca" },
          });

          autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (place.geometry) {
              const formattedAddress = place.name || place.formatted_address;
              setValue(formattedAddress);
              onPlaceSelected(formattedAddress);
            } else {
              console.warn("No details available for input:", place.name);
            }
          });
        }
      } catch (error) {
        console.error("Google Maps API failed to load:", error);
      }
    };

    loadGoogleMaps();
  }, []);

  return (
    <div className="flex items-center justify-between gap-2 mb-4">
      <FaSearch className="text-lg text-gray-600" />
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border p-2 w-full rounded"
      />
    </div>
  );
};

export default SearchBar;
