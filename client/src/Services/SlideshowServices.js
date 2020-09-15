export default {
    getSlideshowImages : async ()=>{
        const res = await fetch('/slideshow/getImages');
        const data = await res.json();
        return data;
    },
    saveImage : async slideshowImage =>{
        console.log(slideshowImage);
        const res = await fetch('/slideshow/newSlideshowImage', {
            method: "post",
            body: JSON.stringify(slideshowImage),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        return data;
    },
}