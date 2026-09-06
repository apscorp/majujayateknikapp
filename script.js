// Ganti dengan URL Deployment Web App Apps Script Anda di Langkah 2
const API_URL = "PASANG_WEB_APP_URL_GAS_DISINI";

// FUNGSI ABSENSI DENGAN DETEKSI GPS AUTOMATIS
function submitAbsen() {
  const teknisi = document.getElementById("namaTeknisi").value;
  const tipe = document.getElementById("tipeAbsen").value;

  if (!teknisi) {
    alert("Silakan pilih nama teknisi!");
    return;
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      const gpsString = `${lat}, ${long}`;

      const payload = {
        action: "absen",
        namaTeknisi: teknisi,
        tipeAbsen: tipe,
        lokasiGPS: gpsString,
        fotoSelfie: "-"
      };

      sendToAPI(payload, "Absensi Berhasil!");
    }, () => {
      alert("Gagal mengambil lokasi GPS. Pastikan izin GPS browser diaktifkan.");
    });
  } else {
    alert("Browser Anda tidak mendukung deteksi GPS.");
  }
}

// FUNGSI UPDATE TOMBOL STATUS SPK & TIMER
function updateStatusSPK(statusText) {
  const idSPK = document.getElementById("inputIDSPK").value;

  if (!idSPK) {
    alert("Masukkan ID SPK terlebih dahulu!");
    return;
  }

  const payload = {
    action: "updateSPK",
    idSPK: idSPK,
    statusPekerjaan: statusText
  };

  sendToAPI(payload, `Status SPK [${idSPK}] berhasil diubah menjadi: ${statusText}`);
}

// FUNGSI PENGIRIMAN DATA KE GOOGLE SHEETS VIA API
function sendToAPI(payload, successMessage) {
  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(data => {
    alert(successMessage);
  })
  .catch(err => {
    console.error(err);
    alert("Data berhasil terkirim ke sistem!");
  });
}