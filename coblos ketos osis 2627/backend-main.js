function pilihPaslon(element) {
    const pilihanContainer = document.querySelector('.pilihan');
    
    // Cek apakah elemen yang diklik sudah aktif sebelumnya
    const isActive = element.classList.contains('active');

    // Hapus kelas 'active' dari semua paslon dan hapus 'has-active' dari container
    document.querySelectorAll('.paslon-item').forEach(item => {
        item.classList.remove('active');
    });
    pilihanContainer.classList.remove('has-active');

    // Jika sebelumnya belum aktif, maka aktifkan yang baru diklik
    if (!isActive) {
        element.classList.add('active');
        pilihanContainer.classList.add('has-active');
    }
}


function pilihPaslon(element) {
    const pilihanContainer = document.querySelector('.pilihan');
    const isActive = element.classList.contains('active');

    // Second click: ask for confirmation
    if (isActive) {
        const konfirmasi = confirm(
            "Apakah kamu yakin ingin memilih paslon ini? Pilihan yang sudah dikonfirmasi tidak dapat diubah."
        );

        if (konfirmasi) {
            alert("Terima kasih! Pilihan kamu telah dikonfirmasi.");
        }

        return;
    }

    // Remove the active state from all candidates
    document.querySelectorAll('.paslon-item').forEach(item => {
        item.classList.remove('active');
    });

    pilihanContainer.classList.remove('has-active');

    // Activate the newly selected candidate
    element.classList.add('active');
    pilihanContainer.classList.add('has-active');
}


document.addEventListener("click", function(event) {
    const pilihanContainer = document.querySelector(".pilihan");
    const activeCandidate = document.querySelector(".paslon-item.active");

    // Do nothing if no candidate is selected
    if (!activeCandidate) return;

    // If the click is outside the selected candidate
    if (!activeCandidate.contains(event.target)) {
        activeCandidate.classList.remove("active");
        pilihanContainer.classList.remove("has-active");
    }
});