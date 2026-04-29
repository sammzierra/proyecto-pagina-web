const products = [
    { id: 1, name: "Logitech G502 X Plus", price: 520000, brand: "Logitech", image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500" },
    { id: 2, name: "Razer BlackWidow V4", price: 780000, brand: "Razer", image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500" },
    { id: 3, name: "Samsung Odyssey G9", price: 4500000, brand: "Samsung", image: "https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=500" }
];

let cart = [];

// Formateador de moneda Pesos Colombianos
const money = new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', minimumFractionDigits: 0
});

function renderProducts() {
    const list = document.getElementById('product-list');
    list.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.image}" alt="${p.name}">
            <small style="color:var(--primary); font-weight:bold">${p.brand}</small>
            <h3>${p.name}</h3>
            <p style="margin: 10px 0; font-size: 1.1rem; font-weight:800">${money.format(p.price)}</p>
            <button onclick="addToCart(${p.id})" style="background:var(--primary); color:white; border:none; width:100%; padding:12px; border-radius:12px; cursor:pointer; font-weight:bold">Añadir al carrito</button>
        </div>
    `).join('');
}

function addToCart(id) {
    const p = products.find(x => x.id === id);
    cart.push({...p, cartId: Date.now()});
    updateUI();
    toggleCart(true);
}

function removeFromCart(cartId) {
    cart = cart.filter(i => i.cartId !== cartId);
    updateUI();
}

function updateUI() {
    document.getElementById('cart-count').innerText = cart.length;
    const total = cart.reduce((s, i) => s + i.price, 0);
    const displayTotal = money.format(total);
    
    document.getElementById('cart-total').innerText = displayTotal;
    document.getElementById('final-price').innerText = displayTotal;
    document.getElementById('summary-total-val').innerText = displayTotal;

    const itemsContainer = document.getElementById('cart-items');
    itemsContainer.innerHTML = cart.map(i => `
        <div class="cart-item">
            <img src="${i.image}">
            <div style="flex:1">
                <div style="font-size:0.8rem; font-weight:bold">${i.name}</div>
                <div style="color:var(--primary)">${money.format(i.price)}</div>
            </div>
            <button onclick="removeFromCart(${i.cartId})" style="color:#ff4757; background:none; border:none; cursor:pointer">✕</button>
        </div>
    `).join('');
}

function syncCard() {
    const name = document.getElementById('in-name').value;
    let num = document.getElementById('in-number').value.replace(/\D/g, '');
    const expiry = document.getElementById('in-expiry').value;

    // Formatear con espacios cada 4 números
    let formattedNum = num.match(/.{1,4}/g)?.join(' ') || "";
    document.getElementById('in-number').value = formattedNum;

    document.getElementById('v-name').innerText = name.toUpperCase() || "NOMBRE APELLIDO";
    document.getElementById('v-number').innerText = formattedNum || "#### #### #### ####";
    document.getElementById('v-expiry').innerText = expiry || "MM/YY";

    // Cambio de logo visual en la tarjeta
    const logoV = document.getElementById('card-logo-v');
    if(num.startsWith('4')) logoV.innerText = "VISA";
    else if(num.startsWith('5')) logoV.innerText = "MASTERCARD";
    else logoV.innerText = "CARD";
}

function switchMethod(method) {
    const cardInputs = document.getElementById('card-inputs');
    const cardVisual = document.getElementById('card-wrapper');
    const msg = document.getElementById('alt-methods-msg');

    if(method === 'card') {
        cardInputs.style.display = 'block';
        cardVisual.style.display = 'flex';
        msg.style.display = 'none';
    } else {
        cardInputs.style.display = 'none';
        cardVisual.style.display = 'none';
        msg.style.display = 'block';
        
        let iconUrl = "";
        let text = "";

        if(method === 'nequi') {
            iconUrl = "https://upload.wikimedia.org/wikipedia/commons/f/f3/Logo_Nequi.svg";
            text = "Ingresa tu número celular vinculado a Nequi para procesar el pago.";
        } else if(method === 'transfiya') {
            iconUrl = "https://i.ibb.co/6R0nL1j/transfiya-logo.png";
            text = "Recibirás una solicitud de pago en tu entidad financiera a través de Transfiya.";
        } else {
            iconUrl = "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg";
            text = "Serás redirigido a la ventana segura de PayPal.";
        }

        msg.innerHTML = `
            <div style="padding:25px; text-align:center; background:rgba(255,255,255,0.03); border-radius:15px; border:1px solid #334155">
                <img src="${iconUrl}" style="height:35px; margin-bottom:15px">
                <p style="font-size:0.85rem; color:#94a3b8">${text}</p>
            </div>
        `;
    }
}

function toggleCart(force) {
    const panel = document.getElementById('cart-panel');
    force === true ? panel.classList.add('active') : panel.classList.toggle('active');
}

function showCheckout() {
    if(cart.length === 0) return alert("Tu carrito está vacío");
    document.getElementById('checkout-view').style.display = 'flex';
    document.getElementById('order-summary').innerHTML = cart.map(i => `
        <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size:0.85rem">
            <span>${i.name}</span>
            <span>${money.format(i.price)}</span>
        </div>
    `).join('');
}

function hideCheckout() { document.getElementById('checkout-view').style.display = 'none'; }

document.addEventListener('DOMContentLoaded', renderProducts);