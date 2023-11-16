function toggleMenu() {
    var menu = document.getElementById("dropdownMenu");
    var content = document.getElementById("mainContent");
    var footer = document.querySelector('.site-footer');

    if (menu.style.left === "0px") {
        menu.style.left = "-250px"; // Slide out the menu
        content.style.marginLeft = "0"; // Reset content margin
        footer.style.marginLeft = "0"; // Reset footer margin
    } else {
        menu.style.left = "0px"; // Slide in the menu
        content.style.marginLeft = "250px"; // Move content to the right
        footer.style.marginLeft = "250px"; // Move footer to the right
    }
}






function addToCart(nftId, price) {
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    // Check if the item is already in the cart
    const existingItemIndex = cart.findIndex(item => item.nftId === nftId);
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({ nftId: nftId, price: price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    // Show popup message
    showPopup("Successfully added to shopping cart");
}

// Function to show popup
function showPopup(message) {
    const popup = document.getElementById("popup-message");
    popup.textContent = message;
    popup.style.display = "block";

    // Hide the popup after 3 seconds
    setTimeout(() => {
        popup.style.display = "none";
    }, 3000);
}

function showBio(bioId) {
    document.getElementById(bioId).style.display = 'block';
}

function hideBio(bioId) {
    document.getElementById(bioId).style.display = 'none';
}


