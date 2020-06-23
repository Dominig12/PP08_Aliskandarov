"use strict"
let slider_menu = document.querySelector(".slider_menu");
let slider_button = document.querySelector(".slider_button");

document.body.addEventListener("click", (event) =>{
    let target = event.target;
    if(!target.matches(".slider_button"))
        return
    if(slider_menu.classList.contains("slider_active"))
        slider_menu.classList.remove("slider_active");
    else
        slider_menu.classList.add("slider_active");
})
document.addEventListener("DOMContentLoaded", function(){
    var scrollbar = document.body.clientWidth - window.innerWidth + 'px';
    console.log(scrollbar);
    document.querySelector('[href="#openModal"]').addEventListener('click',function(){
      document.body.style.overflow = 'hidden';
      document.querySelector('#openModal').style.marginLeft = scrollbar;
    });
    document.querySelector('[href="#close"]').addEventListener('click',function(){
      document.body.style.overflow = 'visible';
      document.querySelector('#openModal').style.marginLeft = '0px';
    });
  });

const playSlider = ()=>{
    let slideItems = document.querySelectorAll(".slide-item"),
        arrowRight = document.getElementById("arrow-right"),
        arrowLeft = document.getElementById("arrow-left");

    const addClass = (item, index, classStyle) => {
        if(item[index] != null)
            item[index].classList.add(classStyle);
    };
    const removeClass = (item, index, classStyle) => {
        if(item[index] != null)
            item[index].classList.remove(classStyle);
    };
    console.log(slideItems);

    let count = 0;

    function animateSlide(change = count){
        let slide1 = document.querySelector(".slide-active-1");
        let slide2 = document.querySelector(".slide-active-2");
        let slide3 = document.querySelector(".slide-active-3");
        if(slide1 != null){
            slide1.classList.remove("slide-active-1");
        }
        if(slide2 != null){
            slide2.classList.remove("slide-active-2");
        }
        if(slide3 != null){
            slide3.classList.remove("slide-active-3");
        }

        if(count >= slideItems.length)
            count = 0;
        if(count < 0)
            count = slideItems.length-1;
        change = count;

        slideItems.forEach(element => {
            if(!element.closest(".slide-notActive"))
                element.classList.add("slide-notActive");
        });
        
        slideItems[change].classList.remove("slide-notActive");
        addClass(slideItems, change, "slide-active-1");
        if(change+1 >= slideItems.length){
            slideItems[change+1-slideItems.length].classList.remove("slide-notActive");
            addClass(slideItems, change+1-slideItems.length, "slide-active-2");
        }
        else{
            slideItems[change+1].classList.remove("slide-notActive");
            addClass(slideItems, change+1, "slide-active-2");
        }
        if(change+2 >= slideItems.length){
            slideItems[change+2-slideItems.length].classList.remove("slide-notActive");
            addClass(slideItems, change+2-slideItems.length, "slide-active-3");
        }
        else{
            slideItems[change+2].classList.remove("slide-notActive");
            addClass(slideItems, change+2, "slide-active-3");
        }
    }
    animateSlide(count);

    document.body.addEventListener("click", (event)=>{
        const target = event.target;
        if(!target.closest(".slide-content"))
            return;
        if(target.matches("#arrow-left"))
            count--;
        if(target.matches("#arrow-right"))
            count++;
        animateSlide(count);
    })

    function autoAnimation(){
        count++;
        animateSlide(count);
    }
    let isAnimate = setInterval(autoAnimation, 3000);

    document.body.addEventListener("mouseover", (event)=>{
        const target = event.target;
        if(!target.closest(".slide-content"))
            return;
        clearInterval(isAnimate);
    })

    document.body.addEventListener("mouseout", (event)=>{
        const target = event.target;
        if(!target.closest(".slide-content"))
            return;
        isAnimate = setInterval(autoAnimation, 3000);
    })

}
playSlider();   