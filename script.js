// Pasang URL Web App Deployment Baru di sini
const API_URL = "https://script.google.com/macros/s/AKfycbxYRW-gJDU56uRJGqz2wGubv_GOwPlLK1YWfSL1H_2Frob5RyJ_TPRv8c_xcF2UrXPL3w/exec";

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

      const params = new URLSearchParams({
        action: "absen",
        namaTeknisi: teknisi,
        tipeAbsen: tipe,
        lokasiGPS: gpsString,
        fotoSelfie: "-"
      });

      // Pengiriman via fetch GET / no-cors agar berjalan mulus dari GitHub Pages
      fetch(`${API_URL}?${params.toString()}`, { mode: 'no-cors' })
        .then(() => {
          alert("Absensi Berhasil Terkirim!");
        })
        .catch(err => {
          console.error(err);
          alert("Gagal mengirim absensi.");
        });
    }, () => {
      alert("Gagal mengambil lokasi GPS. Pastikan izin lokasi/GPS di browser diaktifkan.");
    });
  } else {
    alert("Browser tidak mendukung GPS.");
  }
}

function updateStatusSPK(statusText) {
  const idSPKInput = document.getElementById("inputIDSPK");
  if (!idSPKInput || !idSPKInput.value.trim()) {
    alert("Silakan masukkan ID SPK Pekerjaan terlebih dahulu!");
    return;
  }

  const idSPK = idSPKInput.value.trim();

  sendData({ 
    action: "updateSPK", 
    idSPK: idSPK, 
    statusPekerjaan: statusText 
  });
}

  fetch(`${API_URL}?${params.toString()}`, { mode: 'no-cors' })
    .then(() => {
      alert(`Status SPK [${idSPK}] berhasil diperbarui!`);
    })
    .catch(err => {
      console.error(err);
      alert("Gagal memperbarui SPK.");
    });
}
