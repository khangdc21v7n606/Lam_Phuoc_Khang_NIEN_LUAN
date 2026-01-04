// --- CẤU HÌNH SLIDER  ---
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
const slideInterval = 5000;

function nextSlide() {
    if (slides.length > 0) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
}
let slideTimer = setInterval(nextSlide, slideInterval);

// --- SCROLL ANIMATION  ---
const observerOptions = { threshold: 0.2 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

const fadeElements = document.querySelectorAll('.section-fade-in');
fadeElements.forEach(el => observer.observe(el));


// --- PHẦN XỬ LÝ ĐĂNG NHẬP / ĐĂNG KÝ / LƯU TRẠNG THÁI ---

// 1. Hàm kiểm tra trạng thái đăng nhập khi tải trang
document.addEventListener('DOMContentLoaded', function () {
    checkLoginStatus();
});

function checkLoginStatus() {
    // Lấy tên người dùng hiện tại từ LocalStorage
    const currentUser = localStorage.getItem('currentUser');
    const navLoginBtn = document.querySelector('.btn-login-nav'); // Nút Đăng Nhập trên menu

    if (currentUser && navLoginBtn) {
        // Nếu ĐÃ đăng nhập
        navLoginBtn.innerHTML = `Xin chào, ${currentUser} <i class="fas fa-sign-out-alt" style="margin-left:5px;"></i>`;
        navLoginBtn.classList.add('logged-in'); // Thêm class để style nếu cần

        // Đổi hành động khi click: Thành Đăng Xuất thay vì mở Modal
        navLoginBtn.onclick = function () {
            logout();
        };
    } else if (navLoginBtn) {
        // Nếu CHƯA đăng nhập
        navLoginBtn.innerText = "Đăng Nhập";
        navLoginBtn.onclick = openLogin; // Quay lại mở modal
    }
}

// 2. Hàm Đăng Xuất
function logout() {
    if (confirm('Bạn có chắc muốn đăng xuất không?')) {
        // Xóa phiên làm việc hiện tại
        localStorage.removeItem('currentUser');
        // Tải lại trang để cập nhật giao diện
        window.location.reload();
    }
}

// 3. Xử lý Form Đăng Nhập (Trong Modal)
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userIn = document.getElementById('loginUser').value;
        const passIn = document.getElementById('loginPass').value;

        // Lấy dữ liệu tài khoản đã đăng ký
        const storedAccount = JSON.parse(localStorage.getItem('userAccount'));

        // Kiểm tra thông tin
        if (storedAccount && userIn === storedAccount.username && passIn === storedAccount.password) {
            alert('Đăng nhập thành công!');

            // LƯU TRẠNG THÁI ĐĂNG NHẬP (Quan trọng)
            localStorage.setItem('currentUser', userIn);

            closeLogin();
            checkLoginStatus(); // Cập nhật giao diện ngay lập tức
        } else {
            alert('Tên đăng nhập hoặc mật khẩu không đúng!');
        }
    });
}

// --- MODAL POPUP ---
function openLogin() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLogin() {
    document.getElementById('loginModal').style.display = 'none';
}

window.onclick = function (event) {
    let modal = document.getElementById('loginModal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}