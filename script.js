// 1. Datos de los productos (Actualizados con imágenes)
const productos = [
    { id: 1, nombre: "Laptop Pro", precio: 2500000, img: "https://via.placeholder.com/200x200?text=Laptop+Pro" }, // Reemplazar con URL real
    { id: 2, nombre: "Mouse Gamer", precio: 120000, img: "https://via.placeholder.com/200x200?text=Mouse+Gamer" }, // Reemplazar con URL real
    { id: 3, nombre: "Monitor 4K", precio: 1800000, img: "https://via.placeholder.com/200x200?text=Monitor+4K" }, // Reemplazar con URL real
    { id: 4, nombre: "Teclado Mecánico", precio: 350000, img: "https://via.placeholder.com/200x200?text=Teclado" }  // Reemplazar con URL real
];

// 2. Estado del carrito
let carrito = [];
const productList = document.getElementById('product-list');
const cartCountElement = document.getElementById('cart-count');

// Elementos del Modal
const cartButton = document.getElementById('cart-button');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartItemsUl = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total-price');

// 3. Función para renderizar los productos en la grid "Pro"
function mostrarProductos() {
    productos.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        
        // Estructura de la tarjeta: Imagen + Detalles
        card.innerHTML = `
            <div class="product-image-container">
                <img src="${producto.img}" alt="${producto.nombre}">
            </div>
            <div class="product-details">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio.toLocaleString()}</p>
                <button class="add-to-cart-btn" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
            </div>
        `;
        
        productList.appendChild(card);
    });
}

// 4. Lógica del Carrito
function agregarAlCarrito(productId) {
    const producto = productos.find(p => p.id === productId);
    
    // Verificar si ya está en el carrito
    const itemExistente = carrito.find(item => item.id === productId);
    
    if (itemExistente) {
        itemExistente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    
    actualizarInterfazCarrito();
}

function actualizarInterfazCarrito() {
    // Actualizar el contador del header
    const totalCantidad = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    cartCountElement.innerText = totalCantidad;
    
    // Actualizar el contenido del modal
    renderizarItemsCarrito();
}

function renderizarItemsCarrito() {
    cartItemsUl.innerHTML = '';
    let totalPrecio = 0;
    
    carrito.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('cart-item');
        li.innerHTML = `
            <span>${item.nombre} (x${item.cantidad})</span>
            <span>$${(item.precio * item.cantidad).toLocaleString()}</span>
            <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        `;
        cartItemsUl.appendChild(li);
        totalPrecio += item.precio * item.cantidad;
    });
    
    cartTotalElement.innerText = totalPrecio.toLocaleString();
}

function eliminarDelCarrito(productId) {
    carrito = carrito.filter(item => item.id !== productId);
    actualizarInterfazCarrito();
}

// 5. Lógica del Modal (Abrir/Cerrar)
cartButton.onclick = () => cartModal.style.display = "block";
closeCart.onclick = () => cartModal.style.display = "none";
window.onclick = (event) => {
    if (event.target == cartModal) {
        cartModal.style.display = "none";
    }
}

// Inicializar
mostrarProductos();