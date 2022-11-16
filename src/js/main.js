
const navBtn = document.querySelector(".mobile-nav__btn");
const nav = document.querySelector(".mobile-nav");
const navLinks = document.querySelectorAll(".mobile-nav__link")

navBtn.addEventListener("click", function () {

  nav.classList.toggle("active");
});

navLinks.forEach(link=>{
  link.addEventListener("click",function(){
    nav.classList.remove("active")
  })
})

window.addEventListener('scroll',function(){
  const header = document.querySelector(".header")
  if(window.scrollY > 0){
  header.classList.add("change")
  }
  else{
    header.classList.remove("change")
  }
})



//add scroll animation class

const boxes = document.querySelectorAll(".box");

document.addEventListener("scroll", () => {
  boxes.forEach((box) => {
    const boxTop = box.offsetTop;
    if (boxTop <= window.scrollY + 500) {
      box.classList.add("show");
    } else {
      box.classList.remove("show");
    }
  });
});
