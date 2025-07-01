// ======= Data pengguna (simulasi hardcoded) =======
const users = {
  admin: '12345',
  user: 'pass'
};

// ======= Fungsi Cookie =======

// Menyimpan cookie
function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; path=/; expires=${expires}`;
}

// Mengambil cookie
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

// Menghapus cookie
function deleteCookie(name) {
  document.cookie = `${name}=; Max-Age=0; path=/;`;
}

// ======= Proses Login =======

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const uname = document.getElementById('username').value.trim();
      const pass = document.getElementById('password').value.trim();

      if (users[uname] && users[uname] === pass) {
        const sessionData = {
          username: uname,
          loginTime: Date.now()
        };

        sessionStorage.setItem('session', JSON.stringify(sessionData));
        setCookie('session_user', uname, 1); // berlaku 1 hari

        window.location.href = 'home.html';
      } else {
        alert('Username atau password salah!');
      }
    });
  }
});

// ======= Cek Session (di halaman home.html) =======

function checkSession() {
  const session = JSON.parse(sessionStorage.getItem('session'));
  const cookieUser = getCookie('session_user');

  if (session && cookieUser && session.username === cookieUser) {
    const welcomeEl = document.getElementById('welcome');
    if (welcomeEl) {
      welcomeEl.innerText = `Halo, ${cookieUser}!`;
    }
  } else {
    alert('Session tidak ditemukan atau kadaluarsa. Silakan login kembali.');
    window.location.href = 'login.html';
  }
}

// ======= Proses Logout =======

function logout() {
  sessionStorage.removeItem('session');
  deleteCookie('session_user');
  window.location.href = 'login.html';
}
