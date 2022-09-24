const loadEvent = () => {
    const root = document.getElementById('root');

    const getRents = async () => {
        const allRents = await fetch('http://localhost:8080/api/admin/rents');
        return allRents.json()
    }

    const rentCardMaker = (rent) => {
        const rentCardContent = `
        <div class="card mx-4 border border-danger rounded" style="background-color: lightgrey;">
                <div class="card-body d-flex flex-column justify-content-end">
                    <h4 class="card-title">${rent.email}</h4>
                    <p class="card-text">Rendszám: <strong>${rent.lplate}</strong></p>
                    <p class="card-text">Név: <strong>${rent.fname} ${rent.lname}</strong></p>
                    <p class="card-text">Kezdés: <strong>${rent.startdate}</strong></p>
                    <a href="../rents/${rent.email}" class="btn btn-primary">Kezelés</a>
                </div>
            </div>`
    const rentCardDiv = document.createElement("div");
        rentCardDiv.classList.add("card-group");
        rentCardDiv.classList.add("mt-5");
        rentCardDiv.style.backgroundColor = "lightgrey";
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