// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Find the product by ID
const product = productsData.products.find(p => p.id === productId);
let priceValue = 0; // Define globally for addToCart access

// Function to update cart item count display

// Render product details
function renderProductDetails() {
    if (!product) {
        document.getElementById('productDetails').innerHTML = '<p>Product not found. Please check the product ID or data.</p>';
        console.error(`Product with ID ${productId} not found in productsData.`);
        return;
    }

    priceValue = parseFloat(product.price.replace('$', '')) || 0; // Set priceValue
    const sizeOptions = product.sizes ? product.sizes.map(size => `<option>${size}</option>`).join('') : '<option>Select Size</option>';

    // No thumbnails – only main image will be shown
    const thumbnails = ''; // Intentionally left empty

    const productHtml = `
        <div class="col-2">
            <img src="${product.imageUrl}" width="100%" id="productImg">
        </div>
        <div class="col-2">
            <p>Home / ${product.category || 'Shoes'}</p>
            <h1>${product.name}</h1>
            <h4>$${priceValue.toFixed(2)}</h4>
            <select id="sizeSelect">
                ${sizeOptions}
            </select>
            <input type="number" id="quantityInput" value="1" min="1">
            <a href="#" class="btn" onclick="addToCart(event); return false;">Add to Cart</a>
            <h3>Product Details <i class="fa fa-indent"></i></h3>
            <br>
            <p>${product.description || 'No description available.'}</p>
        </div>
    `;
    document.getElementById('productDetails').innerHTML = productHtml;
}

// Function to add product to cart
function addToCart(event) {
    event.preventDefault(); // Prevent default anchor behavior
    try {
        const sizeSelect = document.getElementById('sizeSelect');
        const quantityInput = document.getElementById('quantityInput');
        if (!sizeSelect || !quantityInput) {
            throw new Error('DOM elements not found.');
        }

        const size = sizeSelect.value;
        const quantity = parseInt(quantityInput.value);

        if (!size || size === 'Select Size') {
            alert('Please select a size.');
            return;
        }
        if (isNaN(quantity) || quantity < 1) {
            alert('Please enter a valid quantity.');
            return;
        }

        const cartItem = {
            id: product.id,
            name: product.name,
            imageUrl: product.imageUrl,
            price: priceValue,
            quantity: quantity,
            size: size
        };
        console.log('hi')
        let cart = [];
        try {
            const storedCart = localStorage.getItem('cart');
            cart = storedCart ? JSON.parse(storedCart) : [];
        } catch (e) {
            console.warn('localStorage parse failed, using empty cart:', e);
            cart = [];
        }

        const existingItemIndex = cart.findIndex(item => item.id === product.id && item.size === size);
        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push(cartItem);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Cart updated successfully:', cart);
        updateCartCount(); // Update cart count after adding item
        alert('Product added to cart!');
        window.location.href = 'cart.html';
    } catch (error) {
        console.error('Error adding to cart:', error);
        alert('An error occurred while adding to cart. Please try again. Check console for details.');
    }
}

// Function to render stars based on rating
function renderStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += '<i class="fa fa-star"></i>';
        } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
            stars += '<i class="fa fa-star-half-o"></i>';
        } else {
            stars += '<i class="fa fa-star-o"></i>';
        }
    }
    return stars;
}

// Function to render related products (limit to 4) with .pro design
function renderRelatedProducts() {
    const container = document.getElementById('productContainer');
    if (!container) {
        console.error("Error: productContainer element not found.");
        return;
    }
    container.innerHTML = '';
    if (!productsData || !productsData.products || productsData.products.length === 0) {
        container.innerHTML = '<p>No related products available.</p>';
        return;
    }

    // Filter out the current product and take up to 4 related products
    const relatedProducts = productsData.products
        .filter(p => p.id !== productId)
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 4);

    relatedProducts.forEach(product => {
        const priceValue = parseFloat(product.price.replace('$', '')) || 0;
        const productHtml = `
            <div class="pro" onclick="window.location.href='products-details.html?id=${product.id}'">
                <img src="${product.imageUrl}" alt="${product.name}">
                <div class="des">
                    <span>${product.category}</span>
                    <h5>${product.name}</h5>
                    <div class="star">
                        ${renderStars(product.ratings)}
                    </div>
                    <h4>$${priceValue.toFixed(2)}</h4>
                </div>
                <a href="#" class="cart"><i class="fa fa-shopping-cart"></i></a>
            </div>
        `;
        container.innerHTML += productHtml;
    });
    console.log(`Rendered ${relatedProducts.length} related products.`);
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    renderProductDetails();
    renderRelatedProducts();
    updateCartCount(); // Update cart count on page load
});