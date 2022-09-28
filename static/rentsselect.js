const para = new URLSearchParams();

function nav(x) {
    para.append("RENTEMAIL", x.id);
    location.href = "rent.html?" + para.toString();
    console.log(x.id);
}