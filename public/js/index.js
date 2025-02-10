"use strict";

const el = {
  quote: document.getElementById("quote-content"),
  author: document.getElementById("quote-author"),
  randomBtn: document.getElementById("random-btn")
};

async function getRandomPhoto() {

  try {
    let receivedPhoto = await fetch("/api/random-bg");
    // let data = await receivedPhoto.data;
    console.log(receivedPhoto);
    // el.quote.setAttribute("style",`background-image:url(${data.url.regular}) !important;`)

    // const imgDiv = document.querySelector("main.main.background-img");
    // console.log(imgDiv);

    //imgDiv.computedStyleMap.backgroundImage = `url(${receivedPhoto})`;



  } catch (error) {
    console.log(error);
  }
}

el.randomBtn.addEventListener("click", async () => {
  await getRandomPhoto();
})


