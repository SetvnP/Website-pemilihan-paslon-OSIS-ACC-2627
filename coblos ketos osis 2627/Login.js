// Menangkap elemen tombol login dari HTML Anda
const loginButton = document.querySelector('.masuk');
const namaInput = document.querySelector('.namapengguna');
const kelasSelect = document.getElementById('pilih-kelas');
const passwordInput = document.querySelector('.Password');

loginButton.addEventListener('click', async function(event) {
    event.preventDefault(); // Mencegah form reload

    const inputNama = namaInput.value.trim();
    const inputKelas = kelasSelect.value;
    const inputPassword = passwordInput.value;

    // Validasi sederhana
    if (!inputNama || !inputKelas || !inputPassword) {
        alert('Mohon isi semua data (Nama, Kelas, dan Password)!');
        return;
    }

    loginButton.textContent = "Memverifikasi...";
    loginButton.disabled = true;

    // URL Web App Google Apps Script Anda (Ganti dengan link /exec yang sama)
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxxPMWrGlPTaSSCAvCT7I4UNA38jJ5gsjeqcT-KQkYN4Jv2HqWJycgtxMqsCePdAU5C/exec";

    try {
        // Mengirim data login ke Google Sheets untuk diperiksa
        const response = await fetch("https://script.google.com/macros/s/AKfycbxxPMWrGlPTaSSCAvCT7I4UNA38jJ5gsjeqcT-KQkYN4Jv2HqWJycgtxMqsCePdAU5C/exec", {
            method: 'POST',
            redirect: 'follow',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify({
                action: 'login',
                nama: inputNama,
                kelas: inputKelas,
                password: inputPassword
            })
        });

        const result = await response.json();

        // --- DI SINI ANDA MENARUH KODINGAN TERSEBUT ---
        if (result.status === 'success') {
            // 1. Simpan identitas siswa ke memori browser
            sessionStorage.setItem('namaSiswa', inputNama);
            sessionStorage.setItem('kelasSiswa', inputKelas);
            
            // 2. Pindahkan ke halaman voting
            window.location.href = "maincoblos.html"; 
        } else {
            // Jika password salah atau sudah pernah memilih (token habis)
            alert(result.message);
            loginButton.textContent = "Login";
            loginButton.disabled = false;
        }

    } catch (error) {
        console.error("Gagal login:", error);
        alert("Terjadi kesalahan koneksi ke server.");
        loginButton.textContent = "Login";
        loginButton.disabled = false;
    }

    if (result.status === 'success') {
    sessionStorage.setItem('namaSiswa', inputNama);
    sessionStorage.setItem('kelasSiswa', inputKelas);

    window.location.href = "maincoblos.html";
    }
});