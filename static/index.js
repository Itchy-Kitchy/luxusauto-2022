const loadEvent = () => {
    const url = 'http://localhost:8080/api/allcars';
    const token = 'Bearer: ' + sessionStorage.token;
    const root = document.getElementById('root');

    const getAutos = async () => {
        const allAutos = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': token
            }
        });
        return allAutos.json()
    }

    const autoCardMaker = (car) => {
        const autoCardContent = `
        <img class="card-img-top" src="${car.imageURL}" alt="${car.type}">
        <div class="card-body d-flex flex-column justify-content-end">
            <h4 class="card-title">${car.brand} ${car.type}</h4>
            <p class="card-text">${car.rentprice} Ft/ hó</p>
        </div>`
    const autoCardDiv = document.createElement("div");
    const classes = ["card", "mx-4", "mb-4", "border", "border-secondary", "rounded"];
        autoCardDiv.classList.add(...classes);
        autoCardDiv.style.backgroundColor = "lightgrey";
        autoCardDiv.innerHTML = autoCardContent;
        root.appendChild(autoCardDiv);
    }

    console.log(window.location.href)

    const viewAutos = (data) => {
        data.forEach(element => {
            autoCardMaker(element)
        });
    }

    getAutos().then((response) => viewAutos(response));

}

window.addEventListener('load', loadEvent);
