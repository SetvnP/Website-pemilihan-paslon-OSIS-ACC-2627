
const pilihanContainer = document.querySelector(".pilihan");
const confirmOverlay = document.querySelector("#confirmOverlay");
const confirmMessage = document.querySelector("#confirmMessage");
const cooldownText = document.querySelector("#cooldownText");
const yesBtn = document.querySelector("#yesBtn");
const cancelBtn = document.querySelector("#cancelBtn");

let cooldownTimer = null;
let selectedCandidate = null;
let confirmed = false;

function pilihPaslon(element) {
    // Clicking an already selected candidate opens the popup
    if (element.classList.contains("active")) {
        bukaKonfirmasi(element);
        return;
    }

    // Select a different candidate
    document.querySelectorAll(".paslon-item").forEach(item => {
        item.classList.remove("active");
    });

    element.classList.add("active");
    pilihanContainer.classList.add("has-active");

    selectedCandidate = element;
}

function bukaKonfirmasi(element) {
    selectedCandidate = element;
    confirmed = false;

    const namaPaslon = element.querySelector('.info-card h3').textContent;

    confirmMessage.textContent =
        "Apakah kamu yakin ingin memilih pasangan calon ini? " +
        "Pastikan pilihanmu sudah benar.";

    cooldownText.textContent =
        "Tunggu 3 detik sebelum melanjutkan...";

    yesBtn.disabled = true;
    yesBtn.textContent = "Ya, Pilih";
    cancelBtn.textContent = "Batal";
    yesBtn.style.display = "";

    confirmOverlay.classList.add("show");

    clearTimeout(cooldownTimer);

    // Wait three seconds before enabling confirmation
    let seconds = 3;
    cooldownText.textContent =
        `Tunggu ${seconds} detik sebelum melanjutkan...`;

    cooldownTimer = setInterval(() => {
        seconds--;

        if (seconds > 0) {
            cooldownText.textContent =
                `Tunggu ${seconds} detik sebelum melanjutkan...`;
        } else {
            clearInterval(cooldownTimer);
            cooldownTimer = null;

            cooldownText.textContent =
                "Kamu sekarang dapat mengonfirmasi pilihan.";

            yesBtn.disabled = false;
        }
    }, 1000);
}

function tutupKonfirmasi() {
    confirmOverlay.classList.remove("show");

    clearInterval(cooldownTimer);
    clearTimeout(cooldownTimer);
    cooldownTimer = null;
}

// Cancel button
cancelBtn.addEventListener("click", () => {
    if (confirmed) {
        tutupKonfirmasi();
        return;
    }

    tutupKonfirmasi();
});

// Confirmation button
yesBtn.addEventListener("click", () => {
    if (yesBtn.disabled || !selectedCandidate || confirmed) {
        return;
    }

    confirmed = true;

    clearInterval(cooldownTimer);
    cooldownTimer = null;

    confirmMessage.textContent =
        "Terima kasih! Pilihan kamu telah dikonfirmasi.";

    cooldownText.textContent = "Bentar Yak";

    yesBtn.disabled = true;
    yesBtn.style.display = "none";
    cancelBtn.textContent = "Tutup";

    // Ambil nama paslon yang dipilih
    const namaPaslon = selectedCandidate.querySelector('.info-card h3').textContent;
    const nomorPaslon = Number(namaPaslon.match(/\d+/)[0]);

    // Ambil data siswa yang disimpan saat login
    const namaSiswa = sessionStorage.getItem('namaSiswa');
    const kelasSiswa = sessionStorage.getItem('kelasSiswa');

    if (!namaSiswa || !kelasSiswa) {
        alert("Sesi login tidak ditemukan atau sudah habis. Silakan login ulang.");
        window.location.href = "index.html";
        return;
    }

    // 3. Kirim data ke Google Sheets / Backend
     kirimSuaraKeGoogleSheet(namaSiswa, kelasSiswa, nomorPaslon);
});
    // Fungsi pengiriman ke Google Apps Script
async function kirimSuaraKeGoogleSheet(nama, kelas, pilihan) {
    const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxxPMWrGlPTaSSCAvCT7I4UNA38jJ5gsjeqcT-KQkYN4Jv2HqWJycgtxMqsCePdAU5C/exec"; 

    try {
        const response = await fetch(WEB_APP_URL, {
            method: 'POST',
            redirect: 'follow',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify({
                action: 'vote',
                nama: nama,
                kelas: kelas,
                pilihan: pilihan
            })
        });

        const result = await response.json();
        if (result.status === 'success') {
            sessionStorage.clear();
            window.location.href = "thankyou.html";
        } else {
            alert(result.message || "Gagal mencatat suara.");
            window.location.reload();
        }

    } catch (error) {
        console.error("Gagal mengirim suara:", error);
        alert("Terjadi kesalahan koneksi. Status suara belum dapat dipastikan. Hubungi petugas sebelum mencoba lagi.");
    }
}

// Clicking outside the popup closes it
confirmOverlay.addEventListener("click", event => {
    if (event.target === confirmOverlay) {
        tutupKonfirmasi();
    }
});

// Prevent popup clicks from triggering the outside-click handler
confirmOverlay.addEventListener("click", event => {
    event.stopPropagation();
});

// Clicking outside the selected candidate cancels the selection
document.addEventListener("click", event => {
    if (confirmOverlay.classList.contains("show")) {
        return;
    }

    const activeCandidate = document.querySelector(
        ".paslon-item.active"
    );

    if (!activeCandidate) return;

    if (!activeCandidate.contains(event.target)) {
        activeCandidate.classList.remove("active");
        pilihanContainer.classList.remove("has-active");
        selectedCandidate = null;
    }
});

// Reset the popup button for the next time it opens
confirmOverlay.addEventListener("transitionend", () => {
    if (!confirmOverlay.classList.contains("show")) {
        yesBtn.style.display = "";
    }
});