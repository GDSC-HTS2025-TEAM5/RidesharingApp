import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";

const loadGoogleMapsScript = (callback) => {
    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  
    if (!apiKey) {
      console.error("Google Maps API key is missing or undefined!");
      return;
    }
  
    if (window.google && window.google.maps) {
      callback();
      return;
    }
  
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      existingScript.addEventListener("load", callback);
      return;
    }
  
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = callback;
    document.body.appendChild(script);
  };


  const SearchBar = ({ placeholder, onPlaceSelected }) => {
    const inputRef = useRef(null);
    const [value, setValue] = useState("");
  
    useEffect(() => {
        console.log("Using API Key:", process.env.REACT_APP_GOOGLE_API_KEY);

      loadGoogleMapsScript(() => {
        if (!window.google || !window.google.maps) {
          console.error("Google Maps API not loaded");
          return;
        }
  
        if (inputRef.current) {
          const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
            types: ["geocode"],
            componentRestrictions: { country: "CA" },
          });
  
          autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (place && place.formatted_address) {
              setValue(place.formatted_address);
              onPlaceSelected(place.formatted_address);
            }
          });
        }
      });
  
      return () => {
        if (inputRef.current) {
          inputRef.current.removeEventListener("place_changed", () => {});
        }
      };
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