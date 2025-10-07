// ====== OBJEK GLOBAL UNTUK MENYIMPAN HASIL ======
const hasilRevisi = {};

// ====== STYLE UNTUK SALINAN HTML ======
const paragraphStyle = `
  style="font-family: 'Arial', sans-serif;
         text-align: justify;
         text-indent: 40px;
         font-size: 11pt;
         line-height: 1.8;
         margin-top: 6pt;
         margin-bottom: 6pt;"
`;

const listStyle = `
  style="font-family: 'Arial', sans-serif;
         text-align: justify;
         font-size: 11pt;
         line-height: 1.8;
         margin-top: 6pt;
         margin-bottom: 6pt;"
`;

// ====== DATA REFERENSI DIPA ======
const refDipa = [
  { kodeDipa: "641703", kodeBa: "060", kodeEs1: "01", namaSatker: "Polres Bangka", nadineKanwil: "10", nadineKppn: "01", kepalaBa: "Kepala Kepolisian Negara Republik Indonesia RI" },
  { kodeDipa: "123456", kodeBa: "045", kodeEs1: "02", namaSatker: "Polres Pangkal Pinang", nadineKanwil: "10", nadineKppn: "02", kepalaBa: "Kepala Kepolisian Negara Republik Indonesia RI" },
  { kodeDipa: "987654", kodeBa: "090", kodeEs1: "03", namaSatker: "Polres Belitung", nadineKanwil: "10", nadineKppn: "03", kepalaBa: "Kepala Kepolisian Negara Republik Indonesia RI" }
];

// ====== VARIABEL GLOBAL UNTUK PEJABAT ======
const kepalaBpk = "Ketua Badan Pemeriksa Keuangan RI";
const kepalaDja = "Direktorat Jenderal Anggaran";

// ====== EVENT LISTENER SUBMIT ======
document.getElementById("submitBtn").addEventListener("click", () => {
  const kodeDipaInput = document.getElementById("kodeDipaInput").value.trim();
  const noRevisiInput = document.getElementById("noRevisiInput").value.trim();
  const kodeError = document.getElementById("kodeError");
  const revisiError = document.getElementById("revisiError");
  const notif = document.getElementById("notif");
  const result = document.getElementById("result");

  const tujuanSatker = document.getElementById("tujuanSatker");
  const tujuanKppn = document.getElementById("tujuanKppn");
  const tujuanKepalaBa = document.getElementById("tujuanKepalaBa");
  const tujuanKepalaBpk = document.getElementById("tujuanKepalaBpk");
  const tujuanKepalaDja = document.getElementById("tujuanKepalaDja");

  const copyBtn = document.getElementById("copyBtn");
  const copySatkerBtn = document.getElementById("copySatkerBtn");
  const copyKppnBtn = document.getElementById("copyKppnBtn");
  const copyBaBtn = document.getElementById("copyBaBtn");
  const copyBpkBtn = document.getElementById("copyBpkBtn");
  const copyDjaBtn = document.getElementById("copyDjaBtn");
  const copyPengesahanBtn = document.getElementById("copyPengesahan");
  const copyPengantarBtn = document.getElementById("copyPengantar");

  // Reset tampilan
  [kodeError, revisiError, notif].forEach(el => el.textContent = "");
  [result, tujuanSatker, tujuanKppn, tujuanKepalaBa, tujuanKepalaBpk, tujuanKepalaDja]
    .forEach(el => el.textContent = "");

  let hasError = false;

  // Validasi input
  if (!/^\d{6}$/.test(kodeDipaInput)) {
    kodeError.textContent = "Kode DIPA harus terdiri dari 6 digit angka.";
    hasError = true;
  }

  if (!/^\d+$/.test(noRevisiInput) || noRevisiInput < 1 || noRevisiInput > 99) {
    revisiError.textContent = "Nomor revisi harus antara 1–99.";
    hasError = true;
  }

  const record = refDipa.find(r => r.kodeDipa === kodeDipaInput);
  if (!record && /^\d{6}$/.test(kodeDipaInput)) {
    kodeError.textContent = "Kode DIPA tidak ditemukan dalam referensi.";
    hasError = true;
  }

  if (hasError) return;

  // Simpan hasil
  Object.assign(hasilRevisi, {
    kodeDipa: record.kodeDipa,
    noRevisi: noRevisiInput,
    namaSatker: record.namaSatker,
    kodeBa: record.kodeBa,
    kodeEs1: record.kodeEs1,
    nadineKanwil: record.nadineKanwil,
    nadineKppn: record.nadineKppn,
    kepalaBa: record.kepalaBa,
    kepalaBpk,
    kepalaDja,
    teksPerihal: `Pengesahan Revisi Anggaran ke-${noRevisiInput} (${record.kodeBa}.${record.kodeEs1}-${record.kodeDipa})`,
    teksSatker: `KPA Satker ${record.namaSatker} (${record.kodeDipa})`,
    teksKppn: `KPPN.${record.nadineKanwil}${record.nadineKppn}`,
    teksKepalaBa: record.kepalaBa,
    teksKepalaBpk: kepalaBpk,
    teksKepalaDja: kepalaDja
  });

  // Tampilkan hasil
  result.textContent = hasilRevisi.teksPerihal;
  tujuanSatker.textContent = hasilRevisi.teksSatker;
  tujuanKppn.textContent = hasilRevisi.teksKppn;
  tujuanKepalaBa.textContent = hasilRevisi.teksKepalaBa;
  tujuanKepalaBpk.textContent = hasilRevisi.teksKepalaBpk;
  tujuanKepalaDja.textContent = hasilRevisi.teksKepalaDja;
  notif.textContent = "✅ Data berhasil diproses.";

  // Tampilkan semua elemen hasil & tombol
  [
    [result, copyBtn],
    [tujuanSatker, copySatkerBtn],
    [tujuanKppn, copyKppnBtn],
    [tujuanKepalaBa, copyBaBtn],
    [tujuanKepalaBpk, copyBpkBtn],
    [tujuanKepalaDja, copyDjaBtn],
    [copyPengesahanBtn, copyPengantarBtn]
  ].forEach(pair => {
    pair.forEach(el => { if (el) el.style.display = "block"; });
  });
});

// ====== Fungsi Notifikasi Mini ======
function showSmallNotif(targetBtn, message) {
  const oldNotif = targetBtn.nextElementSibling;
  if (oldNotif && oldNotif.classList.contains("small-notif")) oldNotif.remove();

  const smallNotif = document.createElement("p");
  smallNotif.textContent = message;
  smallNotif.className = "small-notif";
  targetBtn.insertAdjacentElement("afterend", smallNotif);

  setTimeout(() => smallNotif.remove(), 3000);
}

// ====== Fungsi Salin ======
function copyText(id, message, e) {
  const teks = document.getElementById(id).textContent;
  if (teks) {
    navigator.clipboard.writeText(teks);
    showSmallNotif(e.target, message);
  }
}

// ====== Fungsi Pengesahan & Pengantar ======
function copyPengesahan(e) {
    if (!hasilRevisi.kodeDipa)
      return alert("Isi data terlebih dahulu dengan menekan Submit.");
  
    const teks = `<p ${paragraphStyle}>
    Sehubungan dengan surat usulan Revisi Anggaran dari KPA Satker Polres Pangkal Pinang (655298)
    nomor B/2404/X/2023 tanggal 13 Oktober 2023 untuk DIPA Petikan Tahun Anggaran 2023 nomor
    SP DIPA-060.01.2.655298/2023 tanggal 30 November 2022 dengan ini disampaikan:
  </p>
  
  <ol ${listStyle}>
    <li ${listStyle}>Usulan Revisi Anggaran telah disahkan dan pangkalan data RKA-K/L DIPA pada Kementerian Keuangan telah diperbaharui.</li>
    <li ${listStyle}>Dengan pengesahan Revisi Anggaran ini Kode Pengaman (<i>Digital Stamp</i>) DIPA Petikan yang digunakan sebagai dasar transaksi tidak berubah/tetap yaitu 2012-2567-0710-4441.</li>
    <li ${listStyle}>Dalam rangka memenuhi kebutuhan administrasi, Kuasa Pengguna Anggaran dan Kepala KPPN agar mengunduh PDF file DIPA Petikan Revisi sebagai dasar untuk mencetak DIPA Petikan Revisi sebagaimana tercantum dalam notifikasi terlampir.</li>
    <li ${listStyle}>Agar seluruh proses dilakukan secara profesional, bersih dari korupsi, dan tidak ada konflik kepentingan, serta tetap menerapkan prinsip kehati-hatian dan berpedoman pada ketentuan perundang-undangan yang berlaku.</li>
  </ol>
  
  <p ${paragraphStyle}>
    Demikian disampaikan, untuk dilaksanakan dengan penuh tanggung jawab.
  </p>`;
  
    // ✅ Buat clipboard rich text (HTML)
    const blob = new Blob([teks], { type: "text/html" });
    const data = [new ClipboardItem({ "text/html": blob })];
  
    navigator.clipboard.write(data)
      .then(() => showSmallNotif(e.target, "✅ Naskah Pengesahan berhasil disalin dalam format Rich Text!"))
      .catch(err => {
        console.error("Clipboard gagal:", err);
        showSmallNotif(e.target, "⚠️ Gagal menyalin. Gunakan browser modern (Chrome/Edge).");
      });
  }

function copyPengantar(e) {
    if (!hasilRevisi.kodeDipa)
      return alert("Isi data terlebih dahulu dengan menekan Submit.");
  
    const teks = `<p ${paragraphStyle}>
    Sehubungan dengan surat usulan revisi anggaran dari ${hasilRevisi.teksSatker} nomor B/145/X/REN.3.2/2023 tanggal 16 Oktober 2023
    untuk DIPA Petikan Tahun Anggaran 2023 nomor SP DIPA-${hasilRevisi.kodeBa}.${hasilRevisi.kodeEs1}.${hasilRevisi.kodeDipa}/2023
    tanggal 30 November 2022, dengan ini kami sampaikan hal-hal sebagai berikut:
  </p>

  <ol ${listStyle}>
    <li ${listStyle}>${hasilRevisi.teksSatker} mengajukan permohonan pengesahan revisi anggaran Tahun Anggaran 2023 yang berupa Revisi Administrasi.</li>

    <li ${listStyle}>Terhadap data dan dokumen pendukung yang diajukan, setelah kami analisis dan disandingkan dengan database yang ada, maka dapat disampaikan hal-hal sebagai berikut:
      <ul ${listStyle}>
        <li><span ${listStyle}>Satker telah melakukan Revisi Anggaran dengan kode: 315 | Pencantuman/Perubahan Rencana Penarikan Dana atau Perkiraan Penerimaan dalam Halaman III DIPA, 325 | Pemutakhiran Data Hasil Revisi POK.</span></li>
        <li><span ${listStyle}><i>Digital Stamp</i> (DS) tidak berubah/tetap yaitu 7762-9750-3500-7487.</span></li>
      </ul>
    </li>

    <li ${listStyle}>Dari hasil analisis tersebut kami merekomendasikan bahwa usulan revisi dimaksud dapat disetujui.</li>

    <li ${listStyle}>Sesuai dengan Pasal 6 Peraturan Menteri Keuangan Nomor 199/PMK.02/2021 tanggal 27 Desember 2021 tentang Tata Cara Revisi Anggaran, kewenangan pengesahan revisi tersebut ada pada Kanwil Ditjen Perbendaharaan.</li>

    <li ${listStyle}>Terlampir net surat revisi anggaran.</li>
  </ol>

  <p ${paragraphStyle}>Demikian disampaikan, mohon penetapan.</p>`;
  
    // ✅ Buat clipboard rich text (HTML)
    const blob = new Blob([teks], { type: "text/html" });
    const data = [new ClipboardItem({ "text/html": blob })];
  
    navigator.clipboard.write(data)
      .then(() => showSmallNotif(e.target, "✅ Nota Pengantar berhasil disalin dalam format Rich Text!"))
      .catch(err => {
        console.error("Clipboard gagal:", err);
        showSmallNotif(e.target, "⚠️ Gagal menyalin. Gunakan browser modern (Chrome/Edge).");
      });
}

// ====== Tombol Salin ======
document.getElementById("copyBtn").addEventListener("click", e =>
  copyText("result", "✅ Perihal naskah berhasil disalin!", e)
);
document.getElementById("copySatkerBtn").addEventListener("click", e =>
  copyText("tujuanSatker", "✅ Tujuan Satker berhasil disalin!", e)
);
document.getElementById("copyKppnBtn").addEventListener("click", e =>
  copyText("tujuanKppn", "✅ Tujuan KPPN berhasil disalin!", e)
);
document.getElementById("copyBaBtn").addEventListener("click", e =>
  copyText("tujuanKepalaBa", "✅ Tujuan Kepala BA berhasil disalin!", e)
);
document.getElementById("copyBpkBtn").addEventListener("click", e =>
  copyText("tujuanKepalaBpk", "✅ Tujuan Kepala BPK berhasil disalin!", e)
);
document.getElementById("copyDjaBtn").addEventListener("click", e =>
  copyText("tujuanKepalaDja", "✅ Tujuan Kepala DJA berhasil disalin!", e)
);
document.getElementById("copyPengesahan").addEventListener("click", copyPengesahan);
document.getElementById("copyPengantar").addEventListener("click", copyPengantar);
