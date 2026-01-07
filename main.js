let cart = [];
const cartModal = document.getElementById('cart-modal');

// Add to Cart Function
document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.parentElement;
        const item = {
            name: card.getAttribute('data-name'),
            price: parseInt(card.getAttribute('data-price')),
            qty: 1
        };
        cart.push(item);
        updateCartUI();
        alert(item.name + " added to bag!");
    });
});

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('final-price').innerText = total;
}

function toggleCart() {
    cartModal.style.display = cartModal.style.display === 'flex' ? 'none' : 'flex';
}

// WhatsApp Integration with Secret Keyword for Bot
document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const total = document.getElementById('final-price').innerText;

    // Format the item list for the message
    let itemDetails = cart.map(item => `- ${item.name} (x${item.qty})`).join('%0A');

    // 1. SET YOUR NUMBER HERE (Include country code, no + sign)
    const businessNumber = "+919814056258"; 

    // 2. THE SECRET KEYWORD (This triggers your Android Bot)
    const secretKeyword = "OR2011";

    // 3. Create the Message
    // We put the secretKeyword first so the bot sees it immediately
    const message = `*${secretKeyword}*%0A%0A` +
                    `*Customer:* ${name}%0A` +
                    `*Address:* ${address}%0A` +
                    `*Contact:* ${phone}%0A%0A` +
                    `*Items Ordered:*%0A${itemDetails}%0A%0A` +
                    `*Total Amount:* ₹${total}`;

    // 4. Generate the Link
    const whatsappURL = `https://wa.me/${businessNumber}?text=${message}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank').focus();
});