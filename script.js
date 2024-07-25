document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartCountElem = document.getElementById('cart-count');
    const cartItemsElem = document.getElementById('cart-items');
    const totalPriceElem = document.getElementById('total-price');

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productElem = button.parentElement;
            const productName = productElem.getAttribute('data-name');
            const productPrice = parseFloat(productElem.getAttribute('data-price'));

            const cartItem = cart.find(item => item.name === productName);

            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                cart.push({ name: productName, price: productPrice, quantity: 1 });
            }

            updateCart();
        });
    });

    function updateCart() {
        cartCountElem.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartItemsElem.innerHTML = cart.map(item => `
            <li>
                ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
                <button class="increase-quantity" data-name="${item.name}">+</button>
                <button class="decrease-quantity" data-name="${item.name}">-</button>
            </li>
        `).join('');
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalPriceElem.textContent = `Total: $${totalPrice.toFixed(2)}`;

        document.querySelectorAll('.increase-quantity').forEach(button => {
            button.addEventListener('click', () => {
                const productName = button.getAttribute('data-name');
                const cartItem = cart.find(item => item.name === productName);
                if (cartItem) {
                    cartItem.quantity += 1;
                    updateCart();
                }
            });
        });

        document.querySelectorAll('.decrease-quantity').forEach(button => {
            button.addEventListener

