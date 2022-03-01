const submitButton = document.querySelector('#submit');
const inputField = document.querySelector("#zip");

function submitHandler() {
    if (inputField.value) {
    //layout change
    //remove hero and title
    const hero = document.querySelector(".hero");
    const title = document.querySelector(".title");
    hero.style.display = "none";
    title.style.display = "none";
    } //else alert to input zip
}

submitButton.addEventListener("click", submitHandler)