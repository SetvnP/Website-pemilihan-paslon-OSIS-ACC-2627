const loginButton = document.querySelector('.masuk');
const namaInput = document.querySelector('.namapengguna');
const kelasSelect = document.getElementById('pilih-kelas');
const passwordInput = document.querySelector('.Password');

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxxPMWrGlPTaSSCAvCT7I4UNA38jJ5gsjeqcT-KQkYN4Jv2HqWJycgtxMqsCePdAU5C/exec";

function closeCredits() {
    document.getElementById("creditsOverlay").classList.remove("show");

    loginButton.textContent = "Login";
    loginButton.disabled = false;
}

loginButton.addEventListener('click', async function(event) {
    event.preventDefault(); // Mencegah form reload

    const inputNama = namaInput.value.trim();
    const inputKelas = kelasSelect.value;
    const inputPassword = passwordInput.value;

    if (!inputNama || !inputKelas || !inputPassword) {
        alert('Mohon isi semua data (Nama, Kelas, dan Password)!');
        return;
    }

    const isCredits =
    inputNama.trim().toLowerCase() === "credit" &&
    inputKelas.trim() === "12.5" &&
    inputPassword.trim() === "191026";

    if (isCredits) {
        document.getElementById("creditsOverlay").classList.add("show");
        return;
    }

    loginButton.textContent = "Memverifikasi...";
    loginButton.disabled = true;

    try {
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

        if (result.status === 'success') {
            sessionStorage.setItem('namaSiswa', inputNama);
            sessionStorage.setItem('kelasSiswa', inputKelas);
            
            window.location.href = "maincoblos.html"; 
        } else {
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