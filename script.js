async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    document.getElementById("video").srcObject = stream;
  } catch (err) {
    alert("Camera permission denied");
  }
}

function getLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      document.getElementById("location").innerText =
        "Location: " + lat + ", " + lon;
    },
    () => {
      alert("Location permission denied");
    }
  );
}