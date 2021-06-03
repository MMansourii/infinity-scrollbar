const imageContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let photosArray = [];
let ready =false;
let totallImages = 0;
let imagesLoaded = 0;
// Unspalsh API
let count =   5;
const accessKey = '195QDNjXnQSzFEad3bsuNeTtqeizMvlNAGBR55W3nD4';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${accessKey}&count=${count}`;

//check when all of pics loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totallImages){
        ready =true;
        loader.hidden = true;
        count = 15;
    }
}


//Define the function
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key , attributes[key]);
    }
}

//Displaying Photos into DOM 
function displayPhotos(){
    imagesLoaded = 0 ;
    totallImages = photosArray.length ;
    photosArray.forEach( photo => {

        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item,{
            href:photo.links.html,
            terget:'_blank'
        });
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target','_blank');

        //create <img> tag for every image
        const img = document.createElement('img');

        setAttributes(img,{
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        img.addEventListener('load',imageLoaded);
        // img.setAttribute('src',photo.urls.regular);
        // img.setAttribute('alt',photo.alt_description);
        // img.setAttribute('title',photo.alt_description);

        //append <img> to <a> and to img container 
        item.appendChild(img);
        imageContainer.appendChild(item)
    });
}



//Get photos from API
async function getPhotos(){

    try{
        const response  = await fetch(apiUrl);
        photosArray = await response.json();

       displayPhotos();
       
    }catch(error){
        //catch error here
    }
}
//  ON load
getPhotos();

//Check the scroller to add more photos from API
window.addEventListener('scroll', () =>{

    //check bottom scroll
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000  &&  ready){
        ready = false;
       
        getPhotos();
    }

});