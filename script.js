let url = "https://api.jikan.moe/v4/anime?q=";

let btn = document.querySelector("button");
btn.addEventListener("click", async () => {
    let input = document.querySelector("#input").value;
    let animeDetails = await getAnime(input);
    getAnimeData(animeDetails);
    document.querySelector("body").style.backgroundColor = "#0f0e0e";
    document.querySelector("body").style.backgroundImage = "none"
});

function getAnimeData(animedata) {
    let title = document.querySelector(".card");
    title.innerHTML = ""; 

    for (const item of animedata) {
        // Elements
        let li = document.createElement("li");
        let heading = document.createElement("h3");
        let url = document.createElement("a");
        let image = document.createElement("img");
        let rank = document.createElement("p");
        let summary = document.createElement("p");
        let dot = document.createElement("span");

        // Title
        heading.innerText = `${item.title} ~ (${item.year || "N/A"})`;

        // Rank
        rank.innerText = `Rank - ${item.rank || "N/A"}`;

        // Image
        image.setAttribute("src", item.images.jpg.image_url);

        // Link
        url.setAttribute("href", item.url);
        url.setAttribute("target", "_blank");
        url.innerText = "Click here for detail";

        // Dots for read more
        dot.innerText = " ...Read More";
        dot.style.color = "#03a9f4";
        dot.style.cursor = "pointer";

        // Synopsis handling with if-else
        if (item.synopsis) {
            if (item.synopsis.length > 120) {
                summary.textContent = item.synopsis.slice(0, 120);
                summary.appendChild(dot);
            } else {
                summary.textContent = item.synopsis;
            }
        } else {
            summary.textContent = "No description available.";
        }

        // Expand text on dot click
        dot.addEventListener("click", () => {
            summary.innerText = item.synopsis; 
        });

        // Append elements in li
        li.appendChild(image);
        li.appendChild(heading);
        li.appendChild(rank);
        li.appendChild(summary);
        li.appendChild(url);

        title.appendChild(li);
    }
}

async function getAnime(anime) {
    try {
        let res = await axios.get(url + anime);
        let data = res.data.data;
        return data;
    } catch (error) {
        console.log("ERROR - ", error);
    }
}
