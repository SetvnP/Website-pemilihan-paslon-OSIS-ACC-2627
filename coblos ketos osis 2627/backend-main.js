
let selectedCandidate = null;

const overlay = document.querySelector("#candidateOverlay");
const preview = document.querySelector("#candidatePreview");

function pilihPaslon(element) {
    // Clicking the already selected original candidate again
    // does not reopen or change the selection.
    if (selectedCandidate === element) {
        return;
    }

    selectedCandidate = element;

    // Copy the candidate's content into the separate overlay.
    preview.innerHTML = element.innerHTML;

    overlay.classList.add("show");
}

// Clicking outside the preview cancels the selection.
overlay.addEventListener("click", function(event) {
    if (event.target === overlay) {
        tutupPilihan();
    }
});

// Clicking the displayed candidate a second time asks for confirmation.
preview.addEventListener("click", function() {
    const konfirmasi = confirm(
        "Apakah kamu yakin ingin memilih paslon ini? " +
        "Pilihan yang sudah dikonfirmasi tidak dapat diubah."
    );

    if (konfirmasi) {
        alert("Terima kasih! Pilihan kamu telah dikonfirmasi.");
        tutupPilihan();
    }
});

function tutupPilihan() {
    overlay.classList.remove("show");
    preview.innerHTML = "";
    selectedCandidate = null;
}
