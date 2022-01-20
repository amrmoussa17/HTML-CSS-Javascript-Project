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

