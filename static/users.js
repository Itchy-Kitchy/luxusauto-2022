document.getElementById("ok").onclick = function (e) {
    e.preventDefault();

    if (
        document.getElementById("newusername").value == "" ||
        document.getElementById("newuserpassword").value == "" ||
        document.getElementById("newuseremail").value == ""
        ) {
        alert("Töltösn ki minden mezőt!");
        } 
    else {
        const url = 'http://localhost:8080/api/users';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "newusername": document.getElementById("newusername").value,
                "newuserpassword": document.getElementById("newuserpassword").value,
                "newuseremail": document.getElementById("newuseremail").value,
            })
        })
        .then((response) => response.json())
        .then(json => alert(json.message))
        .catch(err => console.log(err));
    }   
}