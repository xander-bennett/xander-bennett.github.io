// emailjs service id
// service_d3r4vgk

// emailjs template id
// template_up0j5ww

// emailjs public key
// iYB2CYCn4UXWbLH-T

let isModalOpen = false;
let contrastToggle = false;
const scaleFactor = 1/20


function moveBackground(event) {
  const shapes = document.querySelectorAll(".shape");
  const x = event.clientX * scaleFactor;
  const y = event.clientY * scaleFactor;
  
  for (let i = 0; i < shapes.length; i++) {
    const isOdd = i % 2 === 0;
    console.log(isOdd)
    const boolInt = isOdd ? 1 : -1;
    shapes[i].style.transform = `translate(${x* boolInt}px, ${y*boolInt}px)`
  }
}

function toggleContrast() {
  contrastToggle = !contrastToggle;
  if (contrastToggle) {
    document.body.classList += " dark-theme"
  }
  else {
    document.body.classList.remove("dark-theme")
  }
  
}

function contact(event) {
  event.preventDefault();
  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");
  loading.classList += " modal__overlay--visible";
  emailjs
    .sendForm(
      "service_d3r4vgk",
      "template_up0j5ww",
      event.target,
      "iYB2CYCn4UXWbLH-T"
    )
    .then(() => {
      loading.classList.remove("modal__overlay--visible");
      success.classList += " modal__overlay--visible";
      console.log("SUCCESS!");
    })
    .catch(() => {
      loading.classList.remove("modal__overlay--visible");
      alert(
        "My email service is being a bratty teenager. Please contact me directly at xanderwbennett@gmail.com."
      );
    });
}
function toggleModal() {
  if (isModalOpen) {
    isModalOpen = false;
    return document.body.classList.remove("modal--open");
  }
  isModalOpen = true;
  document.body.classList += " modal--open";
}
