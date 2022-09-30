  function submit() {

    const postlplate = new URLSearchParams(window.location.search);
    console.log(postlplate.get("CARID"));
    const url = `http://localhost:8080/api/cars/${postlplate.get("CARID")}`;
    const token = 'Bearer: ' + sessionStorage.token;

    if (
        document.getElementById("useremail").value == "" ||
        document.getElementById("firstname").value == "" ||
        document.getElementById("lastname").value == "" ||
        document.getElementById("startdate").value == "" ||
        document.getElementById("enddate").value == ""
    ) {
        alert("Töltsön ki minden mezőt!");
    }
    else {
        fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-type': 'application/json;charset=utf-8'
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
            let redirect = confirm(json.message);
            if (redirect) {
                window.location = "cars.html"
            }
        })
        .catch(err => console.log(err));
    }
}

