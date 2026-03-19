document.querySelectorAll('#MenuItems a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetPage = this.getAttribute('data-page');

        // Ensure the path is relative to the root
        if (targetPage) {
        const fullPath = location.origin + '/' + targetPage;
        window.location.href = fullPath;
        }
    });
});


var menuItems=document.getElementById("MenuItems");

MenuItems.style.maxHeight="0px";
function menutoggle(){
    if(MenuItems.style.maxHeight == "0px"){
        MenuItems.style.maxHeight="500px";
    }
    else{
        MenuItems.style.maxHeight="0px";
    }
}


// to display cart
function updateCartCount() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + parseInt(item.quantity), 0);

        // Find all elements with id="cartcount"
        const cartLinks = document.querySelectorAll('#cartcount');
        if (cartLinks.length === 0) {
            console.warn('No elements with id="cartcount" found.');
            return;
        }

        cartLinks.forEach(cartLink => {
            // Remove existing badge if any
            const existingBadge = cartLink.querySelector('.cart-badge');
            if (existingBadge) {
                existingBadge.remove();
            }

            // Create and append badge if there are items
            if (totalItems > 0) {
                const badge = document.createElement('span');
                badge.className = 'cart-badge';
                badge.textContent = totalItems;
                badge.style.cssText = `
                    position: absolute;
                    top: -20px;
                    right: -10px;
                    background-color: red;
                    color: white;
                    border-radius: 50%;
                    padding: 2px 8px;
                    font-size: 12px;
                    font-weight: 600;
                `;
                cartLink.style.position = 'relative';
                cartLink.appendChild(badge);
            }
        });
    } catch (error) {
        console.error('Error updating cart count:', error);
    }
}

// Run updateCartCount when the page loads
document.addEventListener('DOMContentLoaded', updateCartCount);