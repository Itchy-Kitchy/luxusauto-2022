const loadEvent = () => {

    const thisemail = new URLSearchParams(window.location.search);
    console.log(thisemail.get("RENTEMAIL"));
    const url = `http://localhost:8080/api/admin/rents/${thisemail.get("RENTEMAIL")}`;
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
        const start = new Date(rent[0].startdate).toDateString();
        const end = new Date(rent[0].enddate).toDateString();
        const rentCardContent = `
        <div class="card-body d-flex flex-column justify-content-end">
            <h4 class="card-title text-center mb-3">${rent[0].lplate}</h4>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text"><strong>Email cím:</strong></span>
                </div>
                <input type="email" class="form-control" id="useremail" value="${rent[0].useremail}">
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text"><strong>Vezetéknév:</strong></span>
                </div>
                <input type="text" class="form-control" id="firstname" value="${rent[0].firstname}">
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text"><strong>Keresztnév:</strong></span>
                </div>
                <input type="text" class="form-control" id="lastname" value="${rent[0].lastname}">
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text"><strong>Bérlés kezdete:</strong>${start}</span>
                </div>
                <input type="date" class="form-control" id="startdate">
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text"><strong>Bérlés vége:</strong>${end}</span>
                </div>
                <input type="date" class="form-control" id="enddate">
            </div>
            <div class="row mx-auto px-3 w-100">
                <button class="btn btn-warning btn-lg mb-3" onclick="put()"><strong>Módosítás</strong></button>
                <button class="btn btn-danger btn-lg" onclick="del()"><strong>Törlés</strong></button>
            </div>
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
        thislplate = response[0].lplate;
        console.log("A jelenlegi bérlés a " + thislplate + " rendszámú autóra vonatkozik.")
    })
    .catch(error => alert(error));
}

window.addEventListener('load', loadEvent);

function del() {
    const delforsure = confirm("Biztosan törli az adott rendelést?");
    if (delforsure) {
        const posturl = `http://localhost:8080/api/admin/rents/${thislplate}`;

        fetch(posturl, {
            method: "POST"
        })
        .then(response => {
            const delurl = `http://localhost:8080/api/admin/rents/${thislplate}`;

            fetch(delurl, {
                method: "DELETE"
            })
            .then((response) => response.json())
            .then(json => {
                if (confirm(json.message)) {
                    window.location = "rents.html";
                }
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }
}

function put() {
    const putforsure = confirm("Biztosan végrehajtja a módosításokat?");
    if (putforsure) {
        if (
            document.getElementById("useremail").value == "" ||
            document.getElementById("firstname").value == "" ||
            document.getElementById("lastname").value == "" ||
            document.getElementById("startdate").value == "" ||
            document.getElementById("enddate").value == ""
        ) {
            alert("Ne hagyjon üres mezőket!");
        }
        else {
            const puturl = `http://localhost:8080/api/admin/rents/${thislplate}`;

            fetch (puturl, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json;charset=utf-8"
                },
                body: JSON.stringify({
                    "useremail": document.getElementById("useremail").value,
                    "firstname": document.getElementById("firstname").value,
                    "lastname": document.getElementById("lastname").value,
                    "startdate": document.getElementById("startdate").value,
                    "enddate": document.getElementById("enddate").value
                })
            })
            .then((response) => response.json())
            .then(json => {
                if (confirm(json.message)) {
                    window.location = "rents.html"
                }
            })
            .catch(err => console.log(err));
        }
    }
}
