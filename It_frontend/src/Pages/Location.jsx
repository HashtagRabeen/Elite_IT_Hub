import { useEffect } from "react";

function Location() {
  const gotLocation = (position) => {
    console.log(position);
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
  };
  const failedToGet = (error) => {
    console.log("Failed to get location", error.message);
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(gotLocation, failedToGet);
  }, []);

  return (
    <div>
      <h1>hello</h1>
    </div>
  );
}

export default Location;
