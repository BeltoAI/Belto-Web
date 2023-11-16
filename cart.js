document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
});

function toggleMenu() {
    var menu = document.getElementById("dropdownMenu");
    var content = document.getElementById("mainContent");
    if (menu.style.left === "0px") {
        menu.style.left = "-250px"; // Slide out the menu
        content.style.marginLeft = "0"; // Reset content margin
    } else {
        menu.style.left = "0px"; // Slide in the menu
        content.style.marginLeft = "250px"; // Move content to the right
    }
}


function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    cartItemsContainer.innerHTML = '';
    let total = 0;

  cart.forEach((item, index) => {
      if (item && !isNaN(item.price) && item.quantity) {
          const itemElement = document.createElement('div');
          itemElement.className = 'cart-item';
          itemElement.innerHTML = `
              <div class="item-details">
                  <span>NFT ${item.nftId}</span> - <span class="item-price">$${item.price}</span>
              </div>
              <div class="quantity-controls">
                  <button onclick="changeQuantity(${index}, -1)">-</button>
                  <span class="item-quantity">${item.quantity}</span>
                  <button onclick="changeQuantity(${index}, 1)">+</button>
              </div>
          `;
          cartItemsContainer.appendChild(itemElement);

          total += item.price * item.quantity;
      }
  });

    cartTotalElement.textContent = total.toFixed(2);
}

function changeQuantity(index, delta) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
        cart[index].quantity += delta;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1); // Remove the item if quantity is 0
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay(); // Update the display
    }
}


const slideBall = document.getElementById('slide-ball');
const buyNowButton = document.getElementById('buy-now-button');

slideBall.addEventListener('dragstart', (e) => {
    e.dataTransfer.setDragImage(new Image(), 0, 0); // Remove default drag image
});

buyNowButton.addEventListener('dragover', (e) => {
    e.preventDefault(); // Allow the drop
    let bounds = buyNowButton.getBoundingClientRect();
    let x = e.clientX - bounds.left - (slideBall.offsetWidth / 2);
    x = Math.max(0, Math.min(x, buyNowButton.offsetWidth - slideBall.offsetWidth));
    slideBall.style.left = x + 'px';
});

buyNowButton.addEventListener('drop', (e) => {
    let bounds = buyNowButton.getBoundingClientRect();
    let endPosition = bounds.width - slideBall.offsetWidth;

    // Check if the ball has reached the end
    if (parseInt(slideBall.style.left, 10) >= endPosition) {
        // Trigger the buying action
        alert('Item bought!');
        // Reset the ball position
        slideBall.style.left = '0px';
    }
});


