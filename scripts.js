document.addEventListener('DOMContentLoaded', function() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    const emptyCartButton = document.getElementById('empty-cart');
    const checkoutButton = document.getElementById('checkout');
    let cart = [];

    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        updateCart();
    }

    const buttons = document.querySelectorAll('.product button');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            const price = parseFloat(this.getAttribute('data-price'));
            
            cart.push({ product, price });
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        });
    });

    function updateCart() {
        cartCount.textContent = cart.length;
        cartItems.innerHTML = '';

        let total = 0;
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.textContent = `${item.product} - $${item.price.toFixed(2)}`;
            cartItems.appendChild(itemElement);
            total += item.price;
        });

        totalPrice.textContent = total.toFixed(2);
    }

    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            alert('Proceed to checkout');
        });
    }

    if (emptyCartButton) {
        emptyCartButton.addEventListener('click', function() {
            cart = [];
            localStorage.removeItem('cart');
            updateCart();
        });
    }
});
