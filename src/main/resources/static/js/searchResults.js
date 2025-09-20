function get() {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    console.log(name)
    return name;
}

const name = get()


fetch('api/v1/hotels/find-by-name?name=' + name).then(res => {
    if (!res.ok) throw new Error();
    return res;
}).then(res => {
    return res.text();
}).then(text => {
    return text ? JSON.parse(text) : null;
})

    .then(hotel => {

    console.log(hotel)
    console.log("Hotel received", hotel)
    const container = document.getElementById("hotels");
    container.innerHTML = "";

    if (hotel == null) {
        console.log("There aren't hotels available.");
        const title = document.createElement("h2");
        title.textContent = "No hotels found."
        container.appendChild(title);
        return;
    }

    const card = document.createElement("article");
    card.className = "hotel-card";

    const title = document.createElement("h2");
    title.textContent = hotel.name;
    title.className = "hotel-title";

    const desc = document.createElement("p");
    desc.textContent = hotel.description || "No description.";
    desc.className = "hotel-description";

    const location = document.createElement("div");
    location.textContent = hotel.location;
    location.className = "hotel-location";

    const link = document.createElement("a");
    link.href = "/hotel.html?id=" + hotel.id;
    link.className = "hotel-link";

    const img = document.createElement("img");
    img.src = "/api/v1/hotels/downloadImage/" + hotel.id;
    console.log("/api/v1/hotels/downloadImage/" + hotel.id)
    img.alt = "Hotel photo";
    img.className = "hotel-image"
    link.appendChild(img)

    link.appendChild(title)
    link.appendChild(desc)
    link.appendChild(location)

    card.appendChild(link);

    container.appendChild(card);


})
    .catch(err => console.error('Failed trying get the hotels:', err));