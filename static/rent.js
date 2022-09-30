const loadEvent = () => {

    const thisemail = new URLSearchParams(window.location.search);
    console.log(thisemail.get("RENTEMAIL"));
    const url = `http://localhost:8080/api/admin/rents/${thisemail.get("RENTEMAIL")}`
    const root = document.getElementById('root');

    const getRent = async () => {
        const singleRent = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            }
        });
        return singleRent.json();
    }

    const rentCardMaker = (rent) => {
        const rentCardContent = `
        <div class="card-body d-flex flex-column justify-content-end">
        <h4 class="card-title">${rent[0].useremail}</h4>
        <p class="card-text">Rendszám: <strong>${rent[0].lplate}</strong></p>
        <p class="card-text">Név: <strong>${rent[0].firstname} ${rent[0].lastname}</strong></p>
        <p class="card-text">Bérlés kezdete: <strong>${rent[0].startdate}</strong></p>
        <p class="card-text">Bérlés vége: <strong>${rent[0].enddate}</strong></p>
        </div>
        <div class="row mx-auto px-4 my-4 w-100">
            <button class="btn btn-danger btn-lg" onclick="del()"><strong>Törlés</strong></button>
        </div>`
    const rentCardDiv = document.createElement("div");
    const classes = ["card", "mx-4", "mt-4", "border", "border-danger", "rounded"];
        rentCardDiv.classList.add(...classes);
        rentCardDiv.style.backgroundColor = "lightgrey";
        rentCardDiv.innerHTML = rentCardContent;
        root.appendChild(rentCardDiv);
    }

    getRent()
    .then((response) => {
        rentCardMaker(response);
        window.thislplate = response[0].lplate;
    })
    .catch(error => alert(error));
}

window.addEventListener('load', loadEvent);

function del() {
    const delforsure = confirm("Biztosan törli az adott rendelést?");
    if (delforsure) {
        const delurl = `http://localhost:8080/api/admin/rents/${thislplate}`

        fetch(delurl, {
            method: "POST",
        })
        .then((response) => response.json())
        .then(json => console.log(json.message))
        .catch(err => console.log(err));

        window.location = "rents.html";
    }
}
