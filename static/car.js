const loadEvent = () => {
    const lplate = window.location.href.split("/").pop();
    const url = `http://localhost:8080/api/cars/${lplate}`;
    const token = 'Bearer: ' + sessionStorage.token;
    const root = document.getElementById('root');
    
    const getAuto = async () => {
        const singleAuto = await fetch(url, {
            method: 'GET',
            headers: {'Authorization': token}
        });
        return singleAuto.json()
    }

    const autoCardMaker = (car) => {
        const autoCardContent = `
        <img class="card-img-top" src="${car.imageURL}" alt="${car.type}">
        <div class="card-body d-flex flex-column justify-content-end">
            <h4 class="card-title">${car.year} <strong>${car.brand} ${car.type}</strong></h4>
            <p class="card-text text-primary">${car.rentprice} Ft/ hó</p>
            <hr>
            <h5 class="card-text text-center">Adatok</h5>
            <p class="card-text">Motor: ${car.power} Hp ${car.engine}</p>
            <p class="card-text">Meghajtás: ${car.drive}</p>
            <p class="card-text">Szín: ${car.color}</p>
            <hr>
            <h5 class="card-text text-center">Bérlés</h5>
            <form>
                <div class="row">
                    <div class="form-group col-md-6">
                        <label for="fname">Vezetéknév:</label>
                        <input type="text" name="fname" class="form-control" id="firstname">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="lname">Keresztnév:</label>
                        <input type="text" name="lname" class="form-control" id="lastname">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-6">
                        <label for="startdate">Bérlési időszak kezdete:</label>
                        <input type="date" name="startdate" class="form-control" id="startdate">
                    </div>
                    <div class="form-group col-md-6">
                        <label for="startdate">Bérlési időszak kezdete:</label>
                        <input type="date" name="startdate" class="form-control" id="enddate">
                    </div>
                </div>
                <div class="row mx-auto">
                    <button type="submit" class="btn btn-success btn-lg mt-4" id="rental"><strong>Bérelem!</strong></button>
                </div>
            </form>
        </div>`
    const autoCardDiv = document.createElement("div");
    const classes = ["card", "mx-4", "my-4", "border", "border-secondary", "rounded"];
        autoCardDiv.classList.add(...classes);
        autoCardDiv.style.backgroundColor = "lightgrey";
        autoCardDiv.innerHTML = autoCardContent;
        root.appendChild(autoCardDiv);
    }

    console.log(window.location.href)

    const viewAuto = (data) => {
        data.forEach(element => {
            autoCardMaker(element)
        });
    }

    getAuto()
    .then((response) => viewAuto(response))
    .catch(error => alert(error));

}

window.addEventListener('load', loadEvent);
