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
// add click event on every color item to set main color and add active class 
colorItems.forEach((item) => {
    item.addEventListener('click', (evt) => {
        const colorOption = evt.target.dataset.color;
        document.documentElement.style.setProperty('--main-color', colorOption);
        localStorage.setItem('mainColor',colorOption);
        colorItems.forEach( (item) => {
            item.classList.remove('active');
        })
        evt.target.classList.add('active');
    });
})
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
}, 1000);
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

// start popup box on every gallery img click

let galleryImgs = document.querySelectorAll('.gallery img')

galleryImgs.forEach((img) => {
    img.addEventListener('click', () => {

        // create overlay 
        let overlay = document.createElement('div');
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);

        // create popup box element
        let popupBox = document.createElement('div');
        popupBox.className = "popup-box";

        // create popup header
        let popupHeader = document.createElement('h4');
        popupHeader.textContent = img.alt;
        popupHeader.className = "popup-header";

        // append popup header
        popupBox.appendChild(popupHeader);

        // create popup img element
        let popImage = document.createElement('img');
        popImage.className = "popup-img"
        
        // define img source
        popImage.src = img.src;

        // append image to popup box
        popupBox.appendChild(popImage);

        // create popup close button
        let popupClose = document.createElement('i');
        popupClose.className = "popup-close fas fa-times-circle"
       
        // append popup close button
        popupBox.appendChild(popupClose);

        // append popup box to document 
        document.body.appendChild(popupBox);

        let closeButton = document.querySelector('.popup-close')
        closeButton.addEventListener('click', () => {
            document.querySelector('.popup-box').remove();
            document.querySelector('.popup-overlay').remove();
        })
    })
})

//  nav bullets on the right to scroll into view sections on click
const bullets = document.querySelectorAll('.nav-bullets .bullet');
const links = document.querySelectorAll('.landing .links li a');

// create function to scroll header nav bar links and nav-bullets
function scrollHtmlLinks(myLinks) {
    myLinks.forEach( (myLink) => {
        myLink.addEventListener('click', (ev) => {
            ev.preventDefault();
            document.querySelector('.'+ myLink.dataset.section).scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
}

// scroll nav-bullets 
scrollHtmlLinks(bullets);

// scroll nav bar links
scrollHtmlLinks(links);

// settings box nav bullets display 
const bulletsButtons = document.querySelectorAll('.settings-container .bullets-settings .button');
const navBullets = document.querySelector('.nav-bullets');
let navStatus = localStorage.getItem('navStatus');
if (navStatus != null) {
    if (navStatus === 'true') {
        bulletsButtons.forEach( (button) => {
            if (button.dataset.bullets == 'yes') {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        })
        navBullets.style.display = "block";
    } else {
        bulletsButtons.forEach( (button) => {
            if (button.dataset.bullets == 'yes') {
                button.classList.remove('active');
            } else {
                button.classList.add('active');
            }
        })
        navBullets.style.display = "none";
    }
} 

bulletsButtons.forEach( (button) => {
    button.addEventListener('click', (e) => {
        if (e.target.dataset.bullets === 'yes') {
            navBullets.style.display = "block";
            button.classList.add('active');
            bulletsButtons[1].classList.remove('active');
            localStorage.setItem('navStatus', 'true');
        } else {
            navBullets.style.display = "none";
            button.classList.add('active');
            bulletsButtons[0].classList.remove('active');
            localStorage.setItem('navStatus', 'false');
        }
    })
})

// reset button
document.querySelector('#reset-button').addEventListener('click', () => {
    localStorage.clear();
    window.location.reload();
})

