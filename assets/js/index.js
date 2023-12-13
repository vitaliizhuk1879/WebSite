document.getElementById("recent__btn").onclick = function (event) {
    let elem = document.getElementById("recent__posts");
    elem.classList.toggle("active");
}

document.getElementById("popular__btn").onclick = function (event) {
    let elem = document.getElementById("popular__posts");
    elem.classList.toggle("active");
}

document.getElementById("instagram__btn").onclick = function (event) {
    let elem = document.getElementById("instagram");
    elem.classList.toggle("active__2");
}