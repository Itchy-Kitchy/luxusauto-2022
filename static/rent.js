const loadEvent = () => {
    const root = document.getElementById('root');
    const email = window.location.href.split("/").pop();

    const getRent = async () => {
        const singleRent = await fetch(`http://localhost:8080/api/admin/rents/${email}`);
        return singleRent.json()
    }

    const rentCardMaker = (rent) => {
        const rentCardContent = `
        <div class="card-body d-flex flex-column justify-content-end">
        <h4 class="card-title">${rent.email}</h4>
        <p class="card-text">Rendszám: <strong>${rent.lplate}</strong></p>
        <p class="card-text">Név: <strong>${rent.fname} ${rent.lname}</strong></p>
        <p class="card-text">Kezdés: <strong>${rent.startdate}</strong></p>
    </div>
    <div class="row mx-auto">
        <form class="mb-2" action="http://localhost:8080/rents/${rent.email}" method="post">
            <button type="submit" class="btn btn-danger btn-lg mt-4"><strong>Törlés</strong></button>
        </form>
    </div>`
    const rentCardDiv = document.createElement("div");
    const classes = ["card", "mx-4", "mt-4", "border", "border-danger", "rounded"];
        rentCardDiv.classList.add(...classes);
        rentCardDiv.style.backgroundColor = "lightgrey";
        rentCardDiv.innerHTML = rentCardContent;
        root.appendChild(rentCardDiv);
    }

    getRent().then((response) => rentCardMaker(response));
}

window.addEventListener('load', loadEvent);
