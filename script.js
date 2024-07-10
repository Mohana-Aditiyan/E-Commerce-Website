document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {
            id: 1,
            image: 'football.jpg',
            title: 'Football',
            price: 50,
            rating: '⭐4.5 (23 reviews)',
            details: ['Size: 5', 'Material: Leather']
        },
        {
            id: 2,
            image: 'cricket-bat.jpg',
            title: 'Cricket Bat',
            price: 120,
            rating: '⭐4.8 (45 reviews)',
            details: ['Type: Willow', 'Weight: 1.2kg']
        },
        {
            id: 3,
            image: 'school-bag.jpg',
            title: 'School Bag',
            price: 40,
            rating: '⭐4.2 (30 reviews)',
            details: ['Color: Blue', 'Material: Nylon']
        },
        {
            id: 4,
            image: 'laptop.jpg',
            title: 'Laptop',
            price: 800,
            rating: '⭐4.9 (50 reviews)',
            details: ['Processor: Intel i7', 'RAM: 16GB']
        },
        {
            id: 5,
            image: 'smartphone.jpg',
            title: 'Smartphone',
            price: 600,
            rating: '⭐4.7 (40 reviews)',
            details: ['Screen Size: 6.5 inches', 'Storage: 128GB']
        },
        {
            id: 6,
            image: 'fitness-tracker.jpg',
            title: 'Fitness Tracker',
            price: 100,
            rating: '⭐4.3 (35 reviews)',
            details: ['Heart Rate Monitor', 'Step Counter']
        },
        {
            id: 7,
            image: 'camera.jpg',
            title: 'Digital Camera',
            price: 300,
            rating: '⭐4.6 (38 reviews)',
            details: ['Resolution: 20MP', 'Zoom: 5x']
        },
        {
            id: 8,
            image: 'running-shoes.jpg',
            title: 'Running Shoes',
            price: 90,
            rating: '⭐4.5 (22 reviews)',
            details: ['Size: 9', 'Color: Black']
        },
        {
            id: 9,
            image: 'backpack.jpg',
            title: 'Backpack',
            price: 50,
            rating: '⭐4.2 (25 reviews)',
            details: ['Capacity: 20L', 'Waterproof']
        },
        {
            id: 10,
            image: 'headphones.jpg',
            title: 'Headphones',
            price: 80,
            rating: '⭐4.4 (29 reviews)',
            details: ['Wireless', 'Noise Cancelling']
        }
    ];

    // Render product list
    const productList = document.querySelector('.product-list');
    if (productList) {
        products.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');

            const productImage = document.createElement('img');
            productImage.src = product.image;
            productImage.alt = product.title;

            const productTitle = document.createElement('h3');
            productTitle.textContent = product.title;

            const productPrice = document.createElement('p');
            productPrice.textContent = `$${product.price}`;

            const productRating = document.createElement('p');
            productRating.textContent = product.rating;

            const productDetails = document.createElement('ul');
            product.details.forEach(detail => {
                const detailItem = document.createElement('li');
                detailItem.textContent = detail;
                productDetails.appendChild(detailItem);
            });

            const addToCartBtn = document.createElement('button');
            addToCartBtn.textContent = 'Add to Cart';
            addToCartBtn.addEventListener('click', () => addToCart(product.id));

            const compareBtn = document.createElement('button');
            compareBtn.textContent = 'Compare';
            compareBtn.classList.add('compare-btn');
            compareBtn.addEventListener('click', () => addToComparison(product.id));

            productItem.appendChild(productImage);
            productItem.appendChild(productTitle);
            productItem.appendChild(productPrice);
            productItem.appendChild(productRating);
            productItem.appendChild(productDetails);
            productItem.appendChild(addToCartBtn);
            productItem.appendChild(compareBtn);

            productList.appendChild(productItem);
        });
    }

    initializeCart();
});

function addToCart(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    if (cartItems.some(item => item.productId === productId)) {
        alert('This product is already in your cart!');
        return;
    }
    cartItems.push({ productId });
    localStorage.setItem('cart', JSON.stringify(cartItems));
    alert('Product added to cart!');
    renderCartItems(cartItems);
    calculateTotal(cartItems);
}

function addToComparison(productId) {
    let comparisonItems = JSON.parse(localStorage.getItem('comparison')) || [];
    if (comparisonItems.includes(productId)) {
        alert('This product is already in comparison!');
        return;
    }
    comparisonItems.push(productId);
    localStorage.setItem('comparison', JSON.stringify(comparisonItems));
    alert('Product added to comparison!');
}

// Initialize cart items
function initializeCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    renderCartItems(cartItems);
    calculateTotal(cartItems);
}

// Render cart items
function renderCartItems(cartItems) {
    const cartContainer = document.getElementById('cart-items');
    if (cartContainer) {
        cartContainer.innerHTML = '';

        cartItems.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            const product = products.find(p => p.id === item.productId);

            cartItem.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <div class="cart-item-details">
                    <h3>${product.title}</h3>
                    <p>Price: $${product.price}</p>
                </div>
                <button class="delete-btn" onclick="removeItem(${item.productId})">Delete</button>
            `;

            cartContainer.appendChild(cartItem);
        });
    }
}

// Remove item from cart
function removeItem(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems = cartItems.filter(item => item.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    renderCartItems(cartItems);
    calculateTotal(cartItems);
}

// Calculate total amount
function calculateTotal(cartItems) {
    const totalAmount = cartItems.reduce((total, item) => {
        const product = products.find(p => p.id === item.productId);
        return total + product.price;
    }, 0);

    const totalAmountElement = document.getElementById('total-amount');
    if (totalAmountElement) {
        totalAmountElement.textContent = `$${totalAmount}`;
    }
}
