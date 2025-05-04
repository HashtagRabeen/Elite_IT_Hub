import { useEffect, useState } from "react";

function Anjan() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [maxDistance, setMaxDistance] = useState(""); // in km
  const [category, setCategory] = useState("");
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          setError("Unable to retrieve your location");
          console.log("Error", error.message);
          // Handle error here, e.g., show a message to the user
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  }, []);
  
  const formSubmit = async (e) => {
    if (!latitude || !longitude) {
      setError("waiting for location....");
      console.log(error);
      return;
    }

    e.preventDefault();
    try {
      let response = await fetch(
        `https://travelguide-rttu.onrender.com/api/LocationDetection`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            latitude: latitude,
            longitude: longitude,
            category,
            maxDistance,
          }),
        }
      );
      if (response.ok) {
        response = await response.json();
        console.log(response);
        setPlaces(response.nearbyAttractions);
      } else {
        console.log("Failed to fetch data from server");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      <div className="w-[50%] m-auto mt-10 shadow-lg shadow-slate-300 rounded-lg">
        {console.log(latitude, longitude)}
        {console.log(places)}
        {console.log(category)}
        <h1 className="text-4xl font-bold ml-10 text-gray-700">
          Find NearBy Places of current location
        </h1>
        <form
          onSubmit={formSubmit}
          className="flex flex-col space-y-2 mt-7 pl-20"
        >
          <label htmlFor="category">Category:</label>
          <select
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            required
            id="category"
            className="w-50"
          >
            <option value="">Select Category</option>
            <option value="food">Food</option>
            <option value="tourism">Tourism</option>
            <option value="nature">Nature</option>
          </select>
          <label htmlFor="distance">Maximum Distance in KM:</label>
          <input
            onChange={(e) => {
              setMaxDistance(e.target.value);
            }}
            type="number"
            placeholder="Enter maximum distance in km"
            required
            className="border-2 border-black w-96 outline-none rounded-md p-2"
          />
          <button
            type="submit"
            className="py-2 px-4 w-32 ml-20 my-5 rounded-xl bg-orange-400 text-white"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="w-[80%] m-auto mt-5">
        {places.length > 0 ? (
          <div className="w-[90%] flex flex-wrap justify-center gap-5 p-5 m-auto mt-5">
            {places.map((place,index) => {
              return (
                <div key={index} className="h-60 w-[40%] flex justify-center flex-col pl-10 rounded-lg shadow-lg shadow-red-300">
                  <h1 className="font-bold text-xl">{place.name}</h1>
                  <h1>Description: {place.description}</h1>
                  <h1>Category: {place.category}</h1>
                  <h1>Hours: {place.openHours}</h1>
                  <h1>Distance: {place.distanceInKm}</h1>
                </div>
              );
            })}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Anjan;
