document.getElementById("submit").onclick = function (e) {
    e.preventDefault();

    if (document.getElementById("adminpassword").value == "") {
        alert("Adja meg az admin jelszót!");
    }
    else {
        const url = 'http://localhost:8080/api/admin';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "adminpassword": document.getElementById("adminpassword").value,
            })
        })
        .then((response) => response.json())
        .then(json => {
            if (json.message == "ok") {
                document.location = "rents.html";
            }
            else {
                alert(json.message);
            }
        })
        .catch(err => console.log(err));
    }
}