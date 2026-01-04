let cart = [];

// --- 1. XỬ LÝ NGƯỜI DÙNG ĐĂNG NHẬP ---
document.addEventListener('DOMContentLoaded', () => {
    checkUserLogin();
});

function checkUserLogin() {
    // Lấy tên người dùng hiện tại từ bộ nhớ
    const currentUser = localStorage.getItem('currentUser');
    const userSpan = document.getElementById('username-span');
    const nameInput = document.getElementById('customer-name');

    if (currentUser) {
        // Nếu có người đăng nhập
        userSpan.textContent = currentUser; // Hiển thị trên header

        // Tự động điền tên vào ô thanh toán
        if (nameInput) {
            nameInput.value = currentUser;
        }
    } else {
        userSpan.textContent = "Khách (Chưa đăng nhập)";
    }
}

// --- 2. XỬ LÝ GIỎ HÀNG ---

function addToCart(name, price) {
    cart.push({ name, price });
    updateCartUI();
    // Hiệu ứng mở giỏ hàng ngay khi thêm để khách thấy
    document.querySelector('.cart-sidebar').classList.add('open');
    document.querySelector('.overlay').classList.add('active');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    const cartItems = document.getElementById("cart-items");
    const totalSpan = document.getElementById("total");
    const countSpan = document.getElementById("cart-count");

    cartItems.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<li class="empty-msg" style="text-align:center; color:#999;">Giỏ hàng trống</li>';
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${item.name}</span>
                <div>
                    <b>${item.price.toLocaleString()} đ</b>
                    <button onclick="removeFromCart(${index})" class="remove-item"><i class="fas fa-trash"></i></button>
                </div>
            `;
            cartItems.appendChild(li);
        });
    }

    totalSpan.textContent = total.toLocaleString();
    countSpan.textContent = `(${cart.length})`;
}

// --- 3. ĐÓNG / MỞ GIỎ HÀNG ---
const cartSidebar = document.querySelector('.cart-sidebar');
const overlay = document.querySelector('.overlay');
const toggleBtn = document.getElementById('toggle-cart');
const closeBtn = document.getElementById('close-cart');

toggleBtn.addEventListener('click', () => {
    cartSidebar.classList.add('open');
    overlay.classList.add('active');
});

closeBtn.addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);

function closeCart() {
    cartSidebar.classList.remove('open');
    overlay.classList.remove('active');
}

// --- 4. THANH TOÁN ---
document.getElementById("checkout").addEventListener("click", function () {
    if (cart.length === 0) {
        alert("Giỏ hàng đang trống, vui lòng chọn sản phẩm!");
        return;
    }

    const name = document.getElementById("customer-name").value;
    const phone = document.getElementById("customer-phone").value;
    const address = document.getElementById("customer-address").value;

    if (!name || !phone || !address) {
        alert("Vui lòng nhập đầy đủ thông tin giao hàng!");
        return;
    }

    // Tạo đơn hàng
    const newOrder = {
        customer: name,
        phone: phone,
        address: address,
        items: cart,
        total: document.getElementById("total").textContent,
        date: new Date().toLocaleString()
    };

    // Lưu vào localStorage
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    storedOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(storedOrders));

    alert(`Cảm ơn ${name}! Đơn hàng của bạn đã được đặt thành công.`);

    // Reset giỏ hàng
    cart = [];
    updateCartUI();
    closeCart();

    // Reset form (trừ tên nếu đang đăng nhập)
    const currentUser = localStorage.getItem('currentUser');
    document.getElementById("customer-phone").value = "";
    document.getElementById("customer-address").value = "";
    if (!currentUser) document.getElementById("customer-name").value = "";
});