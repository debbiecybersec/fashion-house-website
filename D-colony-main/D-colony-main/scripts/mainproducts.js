  // Function to render stars based on rating
function renderStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Function to render products
function renderProducts(products) {
    const container = document.getElementById('productContainer');
    if (!container) {
        console.error("Error: productContainer element not found in the DOM.");
        document.body.innerHTML += '<div class="error-message">Error: Product container not found. Please check the HTML structure.</div>';
        return;
    }
    container.innerHTML = '';
    if (!products || products.length === 0) {
        console.warn("No products to display.");
        container.innerHTML = '<div class="error-message">No products available.</div>';
        return;
    }
    products.forEach(product => {
        try {
            const priceValue = parseFloat(product.price.replace('$', '')) || 0;
            const productHtml = `
                <div class="pro" onclick="window.location.href='products-details.html?id=${product.id}'">
                    <img src="${product.imageUrl}" alt="${product.name || 'Product Image'}">
                    <div class="des">
                        <span>${product.brand || "D|Colony"}</span>
                        <h5>${product.name || 'Unnamed Product'}</h5>
                        <div class="star">
                        ${renderStars(product.ratings || 0)}
                        </div>
                        <h4>$${priceValue.toFixed(2)}</h4>
                    </div>
                    <a href="pages/products-details.html?id=${product.id}"><i class="fas fa-shopping-cart cart"></i></a>
                </div>
            `;
            container.innerHTML += productHtml;
        } catch (error) {
            console.error(`Error rendering product ${product.id}:`, error);
        }
    });
    console.log(`Rendered ${products.length} products.`);
}


function createProductCard(product) {
  return `
    <div class="pro" onclick="window.location.href='products-details.html?id=${product.id}'">
      <img src="${product.imageUrl}" alt="${product.name || 'Product Image'}">
      <div class="des">
        <span>${product.brand || "D|Colony"}</span>
        <h5>${product.name || 'Unnamed Product'}</h5>
        <div class="star">
           ${renderStars(product.ratings || 0)}
        </div>
        <h4>$${priceValue.toFixed(2)}</h4>
      </div>
      <a href="products-details.html?id=${product.id}"><i class="fas fa-shopping-cart cart"></i></a>
    </div>
  `;
}


// Function to sort products
function sortProducts() {
    const sortBy = document.getElementById('sortSelect').value;
    if (!productsData || !productsData.products) {
        console.error("Error: productsData is not defined or invalid.");
        return;
    }
    let sortedProducts = [...productsData.products];

    if (sortBy === 'price') {
        sortedProducts.sort((a, b) => 
            parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''))
        );
    } else if (sortBy === 'popularity') {
        sortedProducts.sort((a, b) => b.popularity - a.popularity);
    } else if (sortBy === 'rating') {
        sortedProducts.sort((a, b) => b.ratings - a.ratings);
    } else if (sortBy === 'sale') {
        sortedProducts = sortedProducts.filter(product => product.onSale);
    }

    renderProducts(sortedProducts);
}

// Wait for DOM to load before rendering
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded, rendering products...");
    if (!productsData || !productsData.products) {
        console.error("Error: productsData is not defined.");
        document.getElementById('productContainer').innerHTML = '<div class="error-message">Error: Product data is missing.</div>';
        return;
    }
    renderProducts(productsData.products);
});

// Toggle menu function
var menuItems = document.getElementById("MenuItems");
menuItems.style.maxHeight = "0px";
function menutoggle() {
    if (menuItems.style.maxHeight === "0px") {
        menuItems.style.maxHeight = "200px";
    } else {
        menuItems.style.maxHeight = "0px";
    }
}