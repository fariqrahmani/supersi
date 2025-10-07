document.getElementById("copyBtn").addEventListener("click", () => {
    // Ambil teks dari paragraf, lalu siapkan versi dengan tab di awal paragraf
    const letter = 
  `\tDengan hormat,
  Sehubungan dengan kegiatan yang akan dilaksanakan pada bulan Oktober, kami bermaksud untuk mengundang Bapak/Ibu dalam acara tersebut.
  
  \tDemikian surat ini kami sampaikan. Atas perhatian dan kerja sama Bapak/Ibu, kami ucapkan terima kasih.`;
  
    // Salin ke clipboard
    navigator.clipboard.writeText(letter)
      .then(() => {
        const notif = document.getElementById("notif");
        notif.textContent = "✅ Teks surat berhasil disalin!";
        setTimeout(() => notif.textContent = "", 3000);
      })
      .catch(err => {
        console.error("Gagal menyalin teks: ", err);
      });
  });
  