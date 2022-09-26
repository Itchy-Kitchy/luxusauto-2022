document.getElementById("ok").onclick = function (e) {
    e.preventDefault();

    let myusername = document.getElementById("myusername").value;

    if (myusername == "") {
        alert("Adjon meg egy felhasználónevet!")
    }
    else {
        const url = 'http://localhost:8080/api/login';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "myusername" : myusername,
                "myuserpassword": document.getElementById("myuserpassword").value
            })
        })
        .then((response) => {
            let ok = response.ok
            return response.json()    
        })
        .then((json) => {
            sessionStorage.token = json.token;
            sessionStorage.id = json.id;
            if (ok) document.location = "cars.html"
        })
        .catch(err => alert(err));
    }
}