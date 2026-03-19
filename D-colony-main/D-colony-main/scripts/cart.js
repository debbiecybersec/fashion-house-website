// Function to render cart items
function renderCart() {
    try {
        // Check both localStorage and sessionStorage
        let cart = [];
        const storedCart = localStorage.getItem('cart') || sessionStorage.getItem('cart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
        }
        const cartTable = document.getElementById('cartTable');
        const subtotalEl = document.getElementById('subtotal');
        const taxEl = document.getElementById('tax');
        const totalEl = document.getElementById('total');

        // Clear existing rows except header
        while (cartTable.rows.length > 1) {
            cartTable.deleteRow(1);
        }

        if (cart.length === 0) {
            const row = cartTable.insertRow();
            const cell = row.insertCell(0);
            cell.colSpan = 3;
            cell.className = 'empty-cart';
            cell.textContent = 'Your cart is empty.';
        } else {
            let overallSubtotal = 0;
            cart.forEach((item, index) => {
                const row = cartTable.insertRow();
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                const cell3 = row.insertCell(2);
                const itemSubtotal = item.price * item.quantity;
                overallSubtotal += itemSubtotal;

                cell1.innerHTML = `
                    <div class="cart-info">
                        <img src="${item.imageUrl}" alt="${item.name}">
                        <div>
                            <p>${item.name} (Size: ${item.size})</p>
                            <small>Price: $${item.price.toFixed(2)}</small><br>
                            <a href="#" onclick="removeFromCart(${index}); return false;">Remove</a>
                        </div>
                    </div>
                `;
                cell2.innerHTML = `<input type="number" value="${item.quantity}" min="1" oninput="updateQuantity(${index}, this.value)">`;
                cell3.innerHTML = `<span id="subtotal-${index}">$${itemSubtotal.toFixed(2)}</span>`;
            });

            // Calculate and display totals
            const tax = overallSubtotal * 0.1; // 10% tax rate
            const total = overallSubtotal + tax;
            subtotalEl.textContent = `$${overallSubtotal.toFixed(2)}`;
            taxEl.textContent = `$${tax.toFixed(2)}`;
            totalEl.textContent = `$${total.toFixed(2)}`;
        }
        console.log('Cart rendered:', cart); // Debugging
    } catch (error) {
        console.error('Error rendering cart:', error);
        const cartTable = document.getElementById('cartTable');
        while (cartTable.rows.length > 1) {
            cartTable.deleteRow(1);
        }
        const row = cartTable.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 3;
        cell.className = 'empty-cart';
        cell.textContent = 'Error loading cart. Please try again.';
    }
}

// Function to remove item from cart
function removeFromCart(index) {
    try {
        let cart = JSON.parse(localStorage.getItem('cart')) || JSON.parse(sessionStorage.getItem('cart')) || [];
        cart.splice(index, 1);
        // Save back to both storage options
        localStorage.setItem('cart', JSON.stringify(cart));
        sessionStorage.setItem('cart', JSON.stringify(cart));
        console.log('Item removed, new cart:', cart); // Debugging
        renderCart();
    } catch (error) {
        console.error('Error removing item:', error);
        alert('An error occurred while removing the item. Please try again.');
    }
}

// Function to update quantity and subtotal in real-time
function updateQuantity(index, quantity) {
    try {
        let cart = JSON.parse(localStorage.getItem('cart')) || JSON.parse(sessionStorage.getItem('cart')) || [];
        const newQuantity = parseInt(quantity);
        if (isNaN(newQuantity) || newQuantity < 1) {
            cart[index].quantity = 1;
        } else {
            cart[index].quantity = newQuantity;
        }
        // Save back to both storage options
        localStorage.setItem('cart', JSON.stringify(cart));
        sessionStorage.setItem('cart', JSON.stringify(cart));

        // Update the row's subtotal
        const itemSubtotal = cart[index].price * cart[index].quantity;
        document.getElementById(`subtotal-${index}`).textContent = `$${itemSubtotal.toFixed(2)}`;

        // Recalculate and update totals
        let overallSubtotal = 0;
        cart.forEach((item, i) => {
            overallSubtotal += item.price * item.quantity;
        });
        const tax = overallSubtotal * 0.1; // 10% tax rate
        const total = overallSubtotal + tax;
        document.getElementById('subtotal').textContent = `$${overallSubtotal.toFixed(2)}`;
        document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;

        console.log('Quantity updated, new cart:', cart); // Debugging
    } catch (error) {
        console.error('Error updating quantity:', error);
        alert('An error occurred while updating quantity. Please try again.');
    }
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});