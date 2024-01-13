document.getElementById("recent__btn").onclick = function () {
    let elem = document.getElementById("recent__posts");
    elem.classList.toggle("inactive");
}

document.getElementById("popular__btn").onclick = function () {
    let elem = document.getElementById("popular__posts");
    elem.classList.toggle("inactive");
}

document.getElementById("instagram__btn").onclick = function () {
    let elem = document.getElementById("instagram");
    elem.classList.toggle("inactive__2");
}