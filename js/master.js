// make settings box appear on settings icon click
const settingsIcon = document.querySelector(".settings-container .icon");
const iconBox = document.querySelector(".settings-container .icon-box");
const settingsBox = document.querySelector(".settings-container"); 
iconBox.addEventListener('click', () => {
    settingsBox.classList.toggle('open');
    settingsIcon.classList.toggle('fa-spin');
})
// color box settings
colorBox = document.querySelector(".color-settings .colors-list");
colorItems = document.querySelectorAll(".color-settings .colors-list li")
colorBox.addEventListener('click', (evt) => {
    const colorOption = evt.target.dataset.color;
    document.documentElement.style.setProperty('--main-color', colorOption);
    colorItems.forEach( (item) => {
        item.classList.remove('active');
    })
    evt.target.classList.add('active');
});

// setting random background images for landing section
const landingSection = document.querySelector('.landing');
const imgsArray = ["01.jpg","02.jpg","03.jpg","04.jpg","05.jpg"];
// web api method setInterval to apply passed function every 10 secs
setInterval( () => { 
    // create random number based on imgs array
    const randomNumber =  Math.floor( Math.random() * imgsArray.length);
    // change background img
    landingSection.style.cssText = `background-image: url(/imgs/${imgsArray[randomNumber]})`
}, 10000)

