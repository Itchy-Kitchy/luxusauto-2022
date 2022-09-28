const para = new URLSearchParams();

function nav(x) {
    para.append("CARID", x.id);
    location.href = "car.html?" + para.toString();
    console.log(x.id);
}