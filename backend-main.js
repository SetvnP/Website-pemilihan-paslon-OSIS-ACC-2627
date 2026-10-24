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