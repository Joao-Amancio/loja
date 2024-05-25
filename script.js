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

function handleTouchStart(event, carouselIndex) {
  const firstTouch = event.touches[0]
  xDown[carouselIndex] = firstTouch.clientX
  yDown[carouselIndex] = firstTouch.clientY
  stopAutoSlide(carouselIndex) // Pausa o auto deslizamento ao tocar
}

function handleTouchMove(event, carouselIndex) {
  if (!xDown[carouselIndex] || !yDown[carouselIndex]) {
    return
  }

  const xUp = event.touches[0].clientX
  const yUp = event.touches[0].clientY

  const xDiff = xDown[carouselIndex] - xUp
  const yDiff = yDown[carouselIndex] - yUp

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      nextSlide(carouselIndex)
    } else {
      prevSlide(carouselIndex)
    }
  }

  xDown[carouselIndex] = null
  yDown[carouselIndex] = null
}

function handleTouchEnd(event, carouselIndex) {
  startAutoSlide(carouselIndex) // Retoma o auto deslizamento ao terminar o toque
}

// Inicialização dos carrosséis
const xDown = [null, null, null, null]
const yDown = [null, null, null, null]

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

  // Adiciona eventos de toque para cada carrossel
  document
    .getElementById("carrossel1")
    .addEventListener("touchstart", (event) => {
      handleTouchStart(event, 0)
    })
  document
    .getElementById("carrossel1")
    .addEventListener("touchmove", (event) => {
      handleTouchMove(event, 0)
    })
  document
    .getElementById("carrossel1")
    .addEventListener("touchend", (event) => {
      handleTouchEnd(event, 0)
    })

  document
    .getElementById("carrossel2")
    .addEventListener("touchstart", (event) => {
      handleTouchStart(event, 1)
    })
  document
    .getElementById("carrossel2")
    .addEventListener("touchmove", (event) => {
      handleTouchMove(event, 1)
    })
  document
    .getElementById("carrossel2")
    .addEventListener("touchend", (event) => {
      handleTouchEnd(event, 1)
    })

  document
    .getElementById("carrossel3")
    .addEventListener("touchstart", (event) => {
      handleTouchStart(event, 2)
    })
  document
    .getElementById("carrossel3")
    .addEventListener("touchmove", (event) => {
      handleTouchMove(event, 2)
    })
  document
    .getElementById("carrossel3")
    .addEventListener("touchend", (event) => {
      handleTouchEnd(event, 2)
    })

  document
    .getElementById("carrossel4")
    .addEventListener("touchstart", (event) => {
      handleTouchStart(event, 3)
    })
  document
    .getElementById("carrossel4")
    .addEventListener("touchmove", (event) => {
      handleTouchMove(event, 3)
    })
  document
    .getElementById("carrossel4")
    .addEventListener("touchend", (event) => {
      handleTouchEnd(event, 3)
    })
})

// JavaScript para exibir a seta quando o usuário rolar para o final da página
document.addEventListener("scroll", function () {
  const scrollTopButton = document.getElementById("back-to-top")
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    scrollTopButton.style.display = "block"
  } else {
    scrollTopButton.style.display = "none"
  }
})

// JavaScript para rolar suavemente para o topo ao clicar na seta
document.getElementById("back-to-top").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

////////////////////////////////

let products = []

function login() {
  const username = document.getElementById("username").value
  const password = document.getElementById("password").value

  // Simulação de autenticação
  if (username === "lojista" && password === "senha123") {
    document.querySelector(".login-form").classList.add("hidden")
    document.querySelector(".admin-panel").classList.remove("hidden")
  } else {
    alert("Usuário ou senha incorretos")
  }
}

function addProduct() {
  const name = document.getElementById("product-name").value
  const price = document.getElementById("product-price").value
  const description = document.getElementById("product-description").value
  const imageInput = document.getElementById("product-image")
  const image = imageInput.files[0]
    ? URL.createObjectURL(imageInput.files[0])
    : ""

  if (name && price && description && image) {
    const product = {
      name: name,
      price: parseFloat(price).toFixed(2),
      description: description,
      image: image,
    }

    products.push(product)
    displayProducts()
    clearForm()
  } else {
    alert("Preencha todos os campos")
  }
}

function clearForm() {
  document.getElementById("product-name").value = ""
  document.getElementById("product-price").value = ""
  document.getElementById("product-description").value = ""
  document.getElementById("product-image").value = ""
}

function displayProducts() {
  const productList = document.getElementById("product-list")
  const productDisplay = document.getElementById("product-display")
  productList.innerHTML = ""
  productDisplay.innerHTML = ""

  products.forEach((product, index) => {
    productList.innerHTML += `
                <div class="product-item">
                    <div>
                        <h3>${product.name}</h3>
                        <p>Preço: R$ ${product.price}</p>
                        <p>${product.description}</p>
                    </div>
                    <button onclick="deleteProduct(${index})">Remover</button>
                </div>
            `

    productDisplay.innerHTML += `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>Preço: R$ ${product.price}</p>
                    <p>${product.description}</p>
                    <button onclick="addToCart(${product.price})">Adicionar ao Carrinho</button>
                </div>
            `
  })
}

function deleteProduct(index) {
  products.splice(index, 1)
  displayProducts()
}

function addToCart(price) {
  // Lógica para adicionar ao carrinho
}

// Adicionando evento de clique ao link "Lojista"
document.getElementById("admin-link").addEventListener("click", function () {
  document.querySelector(".admin-panel").classList.add("hidden")
  document.querySelector(".login-form").classList.remove("hidden")
})

// Fechar menu ao clicar em qualquer item
document.querySelectorAll(".menu a").forEach((item) => {
  item.addEventListener("click", function () {
    if (menuOpen) {
      toggleMenu()
    }
  })
})

// Fechar menu ao clicar fora dele em dispositivos móveis
document.addEventListener("click", function (event) {
  const isClickInside = document.querySelector("header").contains(event.target)

  if (!isClickInside && menuOpen) {
    toggleMenu()
  }
})

// Função para abrir/fechar o menu
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

// Atualiza os slides do carrossel
const updatedSlides = document.querySelectorAll(
  `#${carouselId} .carousel-slide`
)
slideIndices[carouselIndex] = 0
for (let i = 0; i < updatedSlides.length; i++) {
  if (i === slideIndices[carouselIndex]) {
    updatedSlides[i].style.display = "block"
  } else {
    updatedSlides[i].style.display = "none"
  }
}

// Adicionando produto ao carrossel selecionado
function addProduct() {
  const name = document.getElementById("product-name").value
  const price = document.getElementById("product-price").value
  const description = document.getElementById("product-description").value
  const imageInput = document.getElementById("product-image")
  const image = imageInput.files[0]
    ? URL.createObjectURL(imageInput.files[0])
    : ""
  const carouselIndex = document.getElementById("carousel-select").value - 1

  if (name && price && description && image) {
    const product = {
      name: name,
      price: parseFloat(price).toFixed(2),
      description: description,
      image: image,
      carouselIndex: carouselIndex, // Salva também o índice do carrossel
    }

    products.push(product)
    localStorage.setItem("products", JSON.stringify(products)) // Salvar os produtos no armazenamento local
    displayProducts(carouselIndex, product)
    clearForm()
  } else {
    alert("Preencha todos os campos")
  }
}

// Carregar produtos salvos do armazenamento local
function loadProducts() {
  const savedProducts = localStorage.getItem("products")
  if (savedProducts) {
    products = JSON.parse(savedProducts)
    products.forEach((product, index) => {
      displayProducts(index % 4, product) // Exibir produtos nos carrosseis
    })
  }
}

// Chamada para carregar produtos ao carregar a página
window.addEventListener("load", function () {
  loadProducts()
})

// Exibição dos produtos no carrossel selecionado
/*
function displayProducts(carouselIndex, product) {
  const carousel = document.getElementById(`carrossel${carouselIndex + 1}`)

  const newSlide = document.createElement("div")
  newSlide.classList.add("carousel-slide")
  newSlide.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Preço: R$ ${product.price}</p>
        <p>${product.description}</p>
        <button onclick="deleteProduct(${
          products.length - 1
        }, ${carouselIndex})">Remover</button>
    `

  carousel.appendChild(newSlide)
} */

// Exibição dos produtos no carrossel selecionado
function displayProducts(carouselIndex, product) {
  const carousel = document.getElementById(`carrossel${carouselIndex + 1}`)

  const newSlide = document.createElement("div")
  newSlide.classList.add("carousel-slide")

  const imageContainer = document.createElement("div")
  imageContainer.classList.add("image-container")

  const newImage = new Image()
  newImage.src = product.image
  newImage.alt = product.name
  newImage.classList.add("product-image") // Adiciona a classe para aplicar estilos

  imageContainer.appendChild(newImage)
  newSlide.appendChild(imageContainer)

  const newTitle = document.createElement("h3")
  newTitle.textContent = product.name
  newSlide.appendChild(newTitle)

  const newPrice = document.createElement("p")
  newPrice.textContent = `Preço: R$ ${product.price}`
  newSlide.appendChild(newPrice)

  const newDescription = document.createElement("p")
  newDescription.textContent = product.description
  newSlide.appendChild(newDescription)

  const deleteButton = document.createElement("button")
  deleteButton.textContent = "Remover"
  deleteButton.addEventListener("click", function () {
    deleteProduct(products.indexOf(product), carouselIndex)
  })
  newSlide.appendChild(deleteButton)

  carousel.appendChild(newSlide)
}
