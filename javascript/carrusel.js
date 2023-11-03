const favoritos = {
    funkopops: [
        {
          name: "Funkopop 1",
          description: "Funkopop 1 de 1era Generación.",
          image: "../img/bulbasaurfunko.webp",
        },
        {
          name: "Funkopop 4",
          description: "Funkopop 4 de 1era Generación.",
          image: "../img/charmanderfunko.webp",
        },
        {
          name: "Funkopop 7",
          description: "Funkopop 7 de 1era Generación.",
          image: "../img/squirtlefunko.webp",
        },
      ],
      peluches: [
        {
          name: "Peluches 1",
          description: "Peluche de anime mas vendido 1.",
          image: "../img/peluche-gengar.jpg",
        },
        {
          name: "Peluches 2",
          description: "Peluche de anime mas vendido 2.",
          image: "../img/peluche4.jpg",
        },
        {
          name: "Peluches 3",
          description: "Peluche de anime mas vendido 3.",
          image: "../img/peluche-rengoku.webp",
        },
      ],
      prendas: [
        {
          name: "Prenda 1",
          description: "Prenda de anime mas popular 1.",
          image: "../img/poloanime2.webp",
        },
        {
          name: "Prenda 2",
          description: "Prenda de anime mas popular 2.",
          image: "../img/poloanime 4.webp",
        },
        {
          name: "Prenda 3",
          description: "Prenda de anime mas popular 3.",
          image: "../img/poloanime5.webp",
        },
      ],
      coleccionables: [
        {
          name: "Coleccionable 1",
          description: "Coleccionable mas popular 1.",
          image: "../img/coleccionable4.webp",
        },
        {
          name: "Coleccionable 2",
          description: "Coleccionable mas popular 2.",
          image: "../img/coleccionable5.webp",
        },
        {
          name: "Coleccionable 3",
          description: "Coleccionable mas popular 3.",
          image: "../img/coleccionable2.webp",
        },
      ],
  };
  
  const categoryButtons = document.querySelectorAll(".container-options span");
  const favoritoCarousel = document.getElementById("favorito-carousel");
  
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
  
      const category = button.getAttribute("data-category");
  
      favoritoCarousel.innerHTML = "";
  
      if (favoritos.hasOwnProperty(category)) {
        favoritos[category].forEach((favorito) => {
          const favoritoCard = document.createElement("div");
          favoritoCard.className = "carta-poke";
          favoritoCard.innerHTML = `
            <img src="${favorito.image}" alt="${favorito.name}">
            <h4>${favorito.name}</h4>
            <p>${favorito.description}</p>
            <a class="boton-rojo" href="./pages/productos.html">ver más</a>
          `;
          favoritoCarousel.appendChild(favoritoCard);
        });
      } else {
        console.error(`Categoría "${category}" no encontrada en favoritos.`);
      }
    });
  });
  
  categoryButtons[0].click();
  
  