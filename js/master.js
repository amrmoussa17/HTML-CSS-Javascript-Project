// make settings box appear on settings icon click
const settingsIcon = document.querySelector(".settings-container .icon");
const iconBox = document.querySelector(".settings-container .icon-box");
const settingsBox = document.querySelector(".settings-container"); 
iconBox.addEventListener('click', () => {
    settingsBox.classList.toggle('open');
    settingsIcon.classList.toggle('fa-spin');
})
// color box settings
const mainColor = localStorage.getItem('mainColor');
colorBox = document.querySelector(".color-settings .colors-list");
colorItems = document.querySelectorAll(".color-settings .colors-list li")
// check local storage to check if main-color is set to value
if (mainColor != null) {
    //set root value main color to be main-color's local storage value
    document.documentElement.style.setProperty('--main-color', mainColor);
    // loop over every Li to remove active class and then add active class to the li whose data-color value  equals to local storage main color
    colorItems.forEach( (item) => {
        item.classList.remove('active');
        if (item.dataset.color === mainColor) {
            item.classList.add('active');
        }
    })
}
colorBox.addEventListener('click', (evt) => {
    const colorOption = evt.target.dataset.color;
    document.documentElement.style.setProperty('--main-color', colorOption);
    localStorage.setItem('mainColor',colorOption);
    colorItems.forEach( (item) => {
        item.classList.remove('active');
    })
    evt.target.classList.add('active');
});

/* 
    settings box setting random background option
*/ 
let backgroundInterval;
const backgroundButtons = document.querySelectorAll('.background-settings .button')
//setting random background images for landing section
const landingSection = document.querySelector('.landing');
const imgsArray = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"];
// randomize function with web api method setInterval to apply passed function every 10 secs
const randomize =  function() {
    backgroundInterval = setInterval( () => { 
    // create random number based on imgs array
    const randomNumber =  Math.floor( Math.random() * imgsArray.length);
    // change background img
    landingSection.style.cssText = `background-image: url(/imgs/${imgsArray[randomNumber]})`
}, 10000);
};
// check local storage
let backgroundRandom = localStorage.getItem('backgroundRandom');
if (backgroundRandom != null) {
    //remove active from both buttons
    backgroundButtons.forEach((ele) => {
        ele.classList.remove('active');
    });
    // add active class to which button according to backgroundRandom local storage value
    if (backgroundRandom === "true") {
        randomize();
        backgroundButtons.forEach((ele) => {
            if (ele.dataset.background === 'yes') {
                ele.classList.add('active');
            }
        });
    } else {
        backgroundButtons.forEach((ele) => {
            if (ele.dataset.background === 'no') {
                ele.classList.add('active');
            }
        });
        clearInterval(backgroundInterval);
    }
} else {
    randomize();
}
// adds click event on background buttons
backgroundButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        backgroundButtons.forEach((ele) => {
            ele.classList.remove('active');
        });
        button.classList.add('active');
        if (button.dataset.background === "yes") {
            localStorage.setItem('backgroundRandom','true');
            randomize();
        }
        else {
            localStorage.setItem('backgroundRandom','false');
            clearInterval(backgroundInterval);
        }
    })
});

/* start skills */

const skillsProgress = document.querySelectorAll(".skills .progress-bar span")
skillsProgress.forEach((span) => {
    span.style.setProperty('width', span.dataset.prog);
})

