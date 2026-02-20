const statusText = document.getElementById("status");

const params = new URLSearchParams(window.location.search);
const token = params.get("id");

if (!token) {
    statusText.innerText = "Invalid or missing link ❌";
} else {
    fetch("https://test2-1o72.onrender.com/visit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ token: token })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "sent") {
            statusText.innerText = "Connected successfully ✔️";
        } else {
            statusText.innerText = "Invalid session ❌";
        }
    })
    .catch(error => {
        statusText.innerText = "Server not responding ⚠️";
    });
}
