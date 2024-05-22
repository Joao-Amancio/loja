let menuOpen = false
let cartTotal = 0
let autoSlideIntervals = []
let isPaused = [false, false, false, false]
const slideIndices = [0, 0, 0, 0] // Mantém o índice atual de cada carrossel

function toggleMenu() {
  const navMenu = document.getElementById("nav-menu")
  const menuIcon = document.querySelector(".menu-icon")
  if (menuOpen) {
    navMenu.classList.remove("show")
    menuIcon.classList.remove("change")
  } else {
    navMenu.classList.add("show")
    menuIcon.classList.add("change")
  }
  menuOpen = !menuOpen
}

function nextSlide(carouselIndex) {
  showSlides(carouselIndex, (slideIndices[carouselIndex] += 1))
}

function prevSlide(carouselIndex) {
  showSlides(carouselIndex, (slideIndices[carouselIndex] -= 1))
}

function showSlides(carouselIndex, n) {
  let i
  const carouselId = "carrossel" + (carouselIndex + 1)
  const slides = document.querySelectorAll(`#${carouselId} .carousel-slide`)
  if (n >= slides.length) {
    slideIndices[carouselIndex] = 0
  }
  if (n < 0) {
    slideIndices[carouselIndex] = slides.length - 1
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none"
  }
  slides[slideIndices[carouselIndex]].style.display = "block"
}

function startAutoSlide(carouselIndex) {
  autoSlideIntervals[carouselIndex] = setInterval(() => {
    nextSlide(carouselIndex)
  }, 3000)
}

function stopAutoSlide(carouselIndex) {
  clearInterval(autoSlideIntervals[carouselIndex])
}

function showCheckout(event) {
  event.preventDefault() // Previne comportamento padrão do link
  const checkoutSection = document.getElementById("checkout")
  checkoutSection.style.display = "block"
  document.getElementById("checkout-link").style.display = "none" // Opcional: Esconder o link após clique
}

function addToCart(price) {
  cartTotal += price
  document.getElementById("total").innerText = cartTotal.toFixed(2)
}

// Inicialização dos carrosséis
document.addEventListener("DOMContentLoaded", () => {
  showSlides(0, 0)
  showSlides(1, 0)
  showSlides(2, 0)
  showSlides(3, 0)
  startAutoSlide(0)
  startAutoSlide(1)
  startAutoSlide(2)
  startAutoSlide(3)

  document.getElementById("carrossel1").addEventListener("mouseenter", () => {
    stopAutoSlide(0)
    isPaused[0] = true
  })

  document.getElementById("carrossel1").addEventListener("mouseleave", () => {
    if (isPaused[0]) {
      startAutoSlide(0)
      isPaused[0] = false
    }
  })

  document.getElementById("carrossel2").addEventListener("mouseenter", () => {
    stopAutoSlide(1)
    isPaused[1] = true
  })

  document.getElementById("carrossel2").addEventListener("mouseleave", () => {
    if (isPaused[1]) {
      startAutoSlide(1)
      isPaused[1] = false
    }
  })

  document.getElementById("carrossel3").addEventListener("mouseenter", () => {
    stopAutoSlide(2)
    isPaused[2] = true
  })

  document.getElementById("carrossel3").addEventListener("mouseleave", () => {
    if (isPaused[2]) {
      startAutoSlide(2)
      isPaused[2] = false
    }
  })

  document.getElementById("carrossel4").addEventListener("mouseenter", () => {
    stopAutoSlide(3)
    isPaused[3] = true
  })

  document.getElementById("carrossel4").addEventListener("mouseleave", () => {
    if (isPaused[3]) {
      startAutoSlide(3)
      isPaused[3] = false
    }
  })
})
