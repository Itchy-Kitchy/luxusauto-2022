document.getElementById("rental").onclick = function (e) {
    e.preventDefault();

    const lplate = window.location.href.split("/").pop();
    const url = `http://localhost:8080/api/cars/${lplate}`;
    const token = 'Bearer: ' + sessionStorage.token;

    if (
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
                "useremail": sessionStorage.useremail,
                "firstname": document.getElementById("firstname").value,
                "lastname": document.getElementById("lastname").value,
                "startdate": document.getElementById("startdate").value,
                "enddate": document.getElementById("enddate").value
            })
        })
        .then((response) => response.json())
        .then(json => alert(json.message))
        .catch(err => console.log(err));
    }
}