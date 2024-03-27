// 1. Crear las clases representadas en el diagrama implementando la herencia indicada.

// 2. Crear las instancias de las clases utilizando los datos del formulario.

// 3. Realizar una consulta asíncrona utilizando una función async / await para obtener las
// imágenes correspondientes a los animales.

// 4. Realizar por lo menos una función autoejecutable IIFE.



// 6. Utilizar la manipulación del DOM para mostrar en la tabla los animales registrados con
// el formulario

// 7. Validar que el usuario haya asignado todos los datos del animal antes de que éste sea
// agregado a la tabla.

// 8. Devolver el formulario en un estado inicial luego de registrar a cada animal.

// 9. Programar la interacción del botón de audio, en donde deberás reproducir el sonido
// del animal en el sitio web.

// 10. Mostrar el detalle de cada animal en una ventana modal al ser presionada su imagen.


// Clase Animal y subclases
class Animal {
    constructor(nombre, edad, img, sonido) {
        this.nombre = nombre;
        this.edad = edad;
        this.img = img;
        this.sonido = sonido;
    }

    getNombre() {
        return this.nombre;
    }

    getEdad() {
        return this.edad;
    }

    getImg() {
        return this.img;
    }

    getSonido() {
        return this.sonido;
    }

    setComentarios(comentarios) {
        this.comentarios = comentarios;
    }
}

class Leon extends Animal {
    constructor(nombre, edad, img, sonido) {
        super(nombre, edad, img, sonido);
    }

    reproducirSonido() {
        const audioElement = new Audio(this.sonido);
        audioElement.play();
    }
}

class Lobo extends Animal {
    constructor(nombre, edad, img, sonido) {
        super(nombre, edad, img, sonido);
    }

    reproducirSonido() {
        const audioElement = new Audio(this.sonido);
        audioElement.play();
    }
}

class Oso extends Animal {
    constructor(nombre, edad, img, sonido) {
        super(nombre, edad, img, sonido);
    }

    reproducirSonido() {
        const audioElement = new Audio(this.sonido);
        audioElement.play();
    }
}

class Serpiente extends Animal {
    constructor(nombre, edad, img, sonido) {
        super(nombre, edad, img, sonido);
    }

    reproducirSonido() {
        const audioElement = new Audio(this.sonido);
        audioElement.play();
    }
}

class Aguila extends Animal {
    constructor(nombre, edad, img, sonido) {
        super(nombre, edad, img, sonido);
    }

    reproducirSonido() {
        const audioElement = new Audio(this.sonido);
        audioElement.play();
    }
}

// Función autoejecutable
(() => {
    const $animalInput = $("#animal");
    const $edadInput = $("#edad");
    const $comentariosInput = $("#comentarios");
    const $animalesContainer = $("#animales");
    const $modal = $("#exampleModal");
    const $nombreAnimalModal = $("#nombreAnimalModal");
    const $edadAnimalModal = $("#edadAnimalModal");
    const $imagenAnimalModal = $("#imagenAnimalModal");
    const $preview = $("#preview");

    // Función para mostrar el detalle del animal en el modal
    function mostrarDetallesAnimal(nombre, edad, imgSrc, sonido) {
        $nombreAnimalModal.text(nombre);
        $edadAnimalModal.text(edad);
        if (imgSrc) {
            $imagenAnimalModal.data("src", imgSrc); // Almacenar la ruta de la imagen en los datos del elemento
            $imagenAnimalModal.attr("src", imgSrc); // Establecer la ruta de la imagen directamente en el atributo src
        } else {
            $imagenAnimalModal.attr("src", ""); // Asigna una cadena vacía si imgSrc no está definido
        }
        $imagenAnimalModal.data("sonido", sonido); // Establecer el sonido en los datos del elemento de imagen
        $modal.modal("show");
    }


    // Función para actualizar la vista previa de la imagen según la selección del usuario
    function actualizarVistaPreviaImagen(animal) {
        const imgSrc = animal.img ? `./assets/img/${animal.img}` : ""; // Construir la ruta completa a la imagen
        $preview.html(`<div style="display: flex; justify-content: center; align-items: center; height: 100%;"><img src="${imgSrc}" alt="${animal.nombre}" style="max-width: 100%; max-height: 250px;"></div>`);
    }


    // Función para manejar el evento de clic en el botón de audio dentro del modal
    $modal.on("click", ".btn-audio", function () {
        const sonido = $(this).closest(".modal-content").find("img").data("sonido"); // Obtener el sonido de los datos del elemento de imagen
        reproducirSonido(sonido);
    });

    // Función para crear el elemento HTML de un animal
    function crearElementoAnimal(animal) {
        const animalDiv = document.createElement("div");
        animalDiv.classList.add("col", "col-md-3", "mb-3");
        const imgSrc = animal.img ? `./assets/img/${animal.img}` : ""; // Verificar si animal.img está definido
        const html = `
    <div class="card h-100" data-id="preview" data-sonido="${animal.sonido}">
        <img src="${imgSrc}" class="card-img-top" alt="${animal.nombre}">
        <div class="card-body">
            <h5 class="card-title">${animal.nombre}</h5>
            <p class="card-text">Edad: ${animal.edad}</p>
            <button class="btn btn-primary ver-detalle">Ver Detalle</button>
        </div>
    </div>
`;
        animalDiv.innerHTML = html;
        return animalDiv;
    }

    // Función para mostrar mensajes de error al usuario
    function mostrarError(mensaje) {
        alert(mensaje);
    }

    // Función para reproducir el sonido
    function reproducirSonido(sonido) {
        const audioElement = new Audio(sonido);
        audioElement.play();
    }

    // Función para manejar el evento de clic en el botón de registro
    $("#btnRegistrar").click(async function (event) {
        event.preventDefault();

        const nombreAnimal = $animalInput.val();
        const edadAnimal = $edadInput.val();
        const comentariosAnimal = $comentariosInput.val();

        if (!nombreAnimal || !edadAnimal || !comentariosAnimal) {
            mostrarError("Por favor, complete todos los campos.");
            return;
        }

        const animalData = await obtenerDatosAnimal(nombreAnimal);
        if (!animalData) {
            mostrarError("Error al obtener datos del animal.");
            return;
        }

        const imagen = animalData.imagen;
        const sonido = animalData.sonido;

        let animal;
        switch (nombreAnimal) {
            case "León":
                animal = new Leon(nombreAnimal, edadAnimal, imagen, sonido);
                break;
            case "Lobo":
                animal = new Lobo(nombreAnimal, edadAnimal, imagen, sonido);
                break;
            case "Oso":
                animal = new Oso(nombreAnimal, edadAnimal, imagen, sonido);
                break;
            case "Serpiente":
                animal = new Serpiente(nombreAnimal, edadAnimal, imagen, sonido);
                break;
            case "Águila":
                animal = new Aguila(nombreAnimal, edadAnimal, imagen, sonido);
                break;
            default:
                animal = new Animal(nombreAnimal, edadAnimal, imagen, sonido);
        }

        $animalesContainer.append(crearElementoAnimal(animal));
        $animalInput.val("");
        $edadInput.val("");
        $comentariosInput.val("");
    });

    // Función para manejar el evento de clic en el botón de ver detalle
    $(document).on("click", ".ver-detalle", function () {
        const $animalDiv = $(this).closest(".card");
        const nombre = $animalDiv.find(".card-title").text();
        const edad = $animalDiv.find(".card-text").text().split(": ")[1];
        const imgSrc = $animalDiv.find(".card-img-top").attr("src"); // Obtener la ruta de la imagen
        const sonido = $animalDiv.data("sonido");
        mostrarDetallesAnimal(nombre, edad, imgSrc, sonido);
    });

    // Función para obtener datos del animal de forma asíncrona
    async function obtenerDatosAnimal(nombre) {
        try {
            const response = await fetch("animales1.json");
            if (!response.ok) {
                throw new Error("Error al obtener los datos de los animales.");
            }
            const data = await response.json();
            if (!data || !data.animales || !Array.isArray(data.animales)) {
                throw new Error("El archivo animales.json no tiene el formato esperado.");
            }
            const animalData = data.animales.find(animal => animal.nombre && animal.nombre.toLowerCase() === nombre.toLowerCase());
            if (!animalData) {
                throw new Error(`No se encontró el animal "${nombre}".`);
            }

            // Asegurarse de que animalData contenga la propiedad 'img'
            if (!animalData.img) {
                throw new Error(`La propiedad 'img' no está definida para el animal "${nombre}".`);
            }

            // Devolver el objeto animal encontrado
            return animalData;
        } catch (error) {
            console.error("Error en obtenerDatosAnimal:", error);
            mostrarError("Error al obtener los datos del animal.");
            return null;
        }
    }

    // Manejar el evento de cambio en la selección de animal para actualizar la vista previa de la imagen
    $animalInput.change(async function () {
        const nombreAnimal = $(this).val();
        const animalData = await obtenerDatosAnimal(nombreAnimal);
        if (animalData) {
            actualizarVistaPreviaImagen(animalData);
        }
    });
})();
