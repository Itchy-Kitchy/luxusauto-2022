const loadEvent = () => {
    
    const root = document.getElementById('root');
    const url = 'http://localhost:8080/api/admin/rents'

    const getRents = async () => {
        const allRents = await fetch(url);
        return allRents.json()
    }

    const rentCardMaker = (rent) => {
        const rentduration = (new Date(rent.enddate) - new Date(rent.startdate)) / (1000 * 60 * 60 * 24)
        const start = new Date(rent.startdate).toDateString();
        const end = new Date(rent.enddate).toDateString();

        const rentCardContent = `
        <div class="card mx-4 border border-danger rounded" style="background-color: lightgrey;">
            <div class="card-body d-flex flex-column justify-content-end">
                <h4 class="card-title">${rent.useremail}</h4>
                <p class="card-text">Rendszám: <strong>${rent.lplate}</strong></p>
                <p class="card-text">Név: <strong>${rent.firstname} ${rent.lastname}</strong></p>
                <p class="card-text">Bérlés kezdete: <strong>${start}</strong></p>
                <p class="card-text">Bérlés vége: <strong>${end}</strong></p>
                <p class="card-text">Bérlés hossza: <strong>${rentduration} nap</strong></p>
                <button id="${rent.useremail}" class="btn btn-primary" onclick="nav(this)">Kezelés</button>
            </div>
        </div>`
    const rentCardDiv = document.createElement("div");
        rentCardDiv.classList.add("card-group");
        rentCardDiv.classList.add("mt-5");
        rentCardDiv.innerHTML = rentCardContent;
        root.appendChild(rentCardDiv);
    }

    const viewRents = (data) => {
        data.forEach(element => {
            rentCardMaker(element)
        });
    }

    getRents().then((response) => viewRents(response));

}

window.addEventListener('load', loadEvent);