import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyC7UIZ-MJnpkHJHhXBSSaz6jqC6d-qr7zg",
    authDomain: "smart-greenhouse-7b7bb.firebaseapp.com",
    databaseURL: "https://smart-greenhouse-7b7bb-default-rtdb.firebaseio.com",
    projectId: "smart-greenhouse-7b7bb",
    storageBucket: "smart-greenhouse-7b7bb.appspot.com",
    messagingSenderId: "276175366938",
    appId: "1:276175366938:web:dfc2d374dccf6f9ba25aa3",
    measurementId: "G-4W78W25HYZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const parametros = ref(database, "invernadero/parametros/");

const tempInfo = document.getElementById("temperatura");
const luzInfo = document.getElementById("luz");
const humInfo = document.getElementById("humedad");

onValue(parametros, (snapshot) => {
    const data = snapshot.val();
    const { temperatura, luz, humedad } = data;
    tempInfo.innerText = temperatura+" °C";
    humInfo.innerText = Math.ceil(humedad) + "%";

    if (!luz) {
        luzInfo.innerText = "Con luz solar";
        document.getElementById("img03").classList.remove("night");
    } else {
        luzInfo.innerText = "Sin luz solar";
        document.getElementById("img03").classList.add("night");
    }
});


var $activeSlide = $(".active"),
    $homeSlide = $(".slide"),
    $slideNavPrev = $("#prev"),
    $slideNavNext = $("#next");

function init() {
    TweenMax.set($homeSlide.not($activeSlide), { autoAlpha: 0 });
    TweenMax.set($slideNavPrev, { autoAlpha: 0.2 });
}

init();

function goToNextSlide(slideOut, slideIn, slideInAll) {
    var tl = new TimelineLite(),
        slideOutContent = slideOut.find(".card__content"),
        slideInContent = slideIn.find(".card__content"),
        slideOutImg = slideOut.find(".card__img"),
        slideInImg = slideIn.find(".card__img"),
        index = slideIn.index(),
        size = $homeSlide.length;
    console.log(index);

    if (slideIn.length !== 0) {
        tl.set(slideIn, { autoAlpha: 1, className: "+=active" })
            .set(slideOut, { className: "-=active" })
            .to(
                slideOutContent,
                0.65,
                { y: "+=40px", ease: Power3.easeInOut },
                0
            )
            .to(
                slideOutImg,
                0.65,
                { backgroundPosition: "bottom", ease: Power3.easeInOut },
                0
            )
            .to(slideInAll, 1, { y: "-=100%", ease: Power3.easeInOut }, 0)
            .fromTo(
                slideInContent,
                0.65,
                { y: "-=40px" },
                { y: 0, ease: Power3.easeInOut },
                "-=0.7"
            )
            .fromTo(
                slideInImg,
                0.65,
                { backgroundPosition: "top" },
                { backgroundPosition: "bottom", ease: Power3.easeInOut },
                "-=0.7"
            );
    }

    TweenMax.set($slideNavPrev, { autoAlpha: 1 });

    if (index === size - 1) {
        TweenMax.to($slideNavNext, 0.3, {
            autoAlpha: 0.2,
            ease: Linear.easeNone,
        });
    }
}

$slideNavNext.click(function (e) {
    e.preventDefault();

    var slideOut = $(".slide.active"),
        slideIn = $(".slide.active").next(".slide"),
        slideInAll = $(".slide");

    goToNextSlide(slideOut, slideIn, slideInAll);
});

function goToPreviousSlide(slideOut, slideIn, slideInAll) {
    var tl = new TimelineLite(),
        slideOutContent = slideOut.find(".card__content"),
        slideInContent = slideIn.find(".card__content"),
        slideOutImg = slideOut.find(".card__img"),
        slideInImg = slideIn.find(".card__img"),
        index = slideIn.index(),
        size = $homeSlide.length;

    if (slideIn.length !== 0) {
        tl.set(slideIn, { autoAlpha: 1, className: "+=active" })
            .set(slideOut, { className: "-=active" })
            .to(
                slideOutContent,
                0.65,
                { y: "-=40px", ease: Power3.easeInOut },
                0
            )
            .to(
                slideOutImg,
                0.65,
                { backgroundPosition: "top", ease: Power3.easeInOut },
                0
            )
            .to(slideInAll, 1, { y: "+=100%", ease: Power3.easeInOut }, 0)
            .fromTo(
                slideInContent,
                0.65,
                { y: "+=40px" },
                { y: 0, ease: Power3.easeInOut },
                "-=0.7"
            )
            .fromTo(
                slideInImg,
                0.65,
                { backgroundPosition: "bottom" },
                { backgroundPosition: "top", ease: Power3.easeInOut },
                "-=0.7"
            );
    }

    TweenMax.set($slideNavNext, { autoAlpha: 1 });

    if (index === 0) {
        TweenMax.to($slideNavPrev, 0.3, {
            autoAlpha: 0.2,
            ease: Linear.easeNone,
        });
    }
}

$slideNavPrev.click(function (e) {
    e.preventDefault();

    var slideOut = $(".slide.active"),
        slideIn = $(".slide.active").prev(".slide"),
        slideInAll = $(".slide");

    goToPreviousSlide(slideOut, slideIn, slideInAll);
});
