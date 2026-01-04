document.addEventListener('DOMContentLoaded', function () {
    const regForm = document.getElementById('regForm');

    if (regForm) {
        regForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Lấy giá trị
            const username = document.getElementById('regUser').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const password = document.getElementById('regPass').value;

            // Validate cơ bản
            if (password.length < 6) {
                alert('Mật khẩu phải có ít nhất 6 ký tự!');
                return;
            }

            // Dữ liệu tài khoản (Database)
            const userData = {
                username: username,
                email: email,
                password: password
            };

            // 1. Lưu thông tin tài khoản (Để sau này đăng nhập lại check)
            localStorage.setItem('userAccount', JSON.stringify(userData));

            // 2. Tự động Đăng nhập luôn (Lưu phiên làm việc hiện tại)
            localStorage.setItem('currentUser', username);

            alert('Đăng ký thành công! Đang chuyển hướng về trang chủ...');

            // 3. Quay về trang chủ
            window.location.href = 'file:///D:/BaiTap/Nien-Luan/Cay-Canh/CayCanh.html';
        });
    }
});