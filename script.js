document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector("#yardimTablosu tbody");

  // JSON verisini yükle
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      // Tabloyu doldurma işlemi
      data.forEach(item => {
        const row = document.createElement("tr");

        // Her satıra 'onclick' özelliği ekleyerek detay sayfasına yönlendir
        row.onclick = function() {
          // Detay sayfasına yönlendirirken veri parametreleri ekleyebiliriz
          const detayUrl = `detay.html?id=${item.id}`; // Örnek olarak item.id'yi kullanabilirsiniz.
          window.location.href = detayUrl;  // Kullanıcıyı detay sayfasına yönlendir
        };

        row.innerHTML = `
          <td data-label="Kayıt Tarihi">${item["KAYIT TARİHİ"]}</td>
          <td data-label="Adı Soyadı">${item["ADI-SOYADI"]}</td>
          <td data-label="TC / Yabancı Kimlik No">${item["TC / YABANCI UYRUK KİMLİK NO"]}</td>
          <td data-label="Telefon Numarası">${item["TELEFON NUMARASI"]}</td>
          <td data-label="Uyruğu">${item["UYRUĞU"] || "Bilinmiyor"}</td>
          <td data-label="Adresi">${item["ADRESİ"] || "Belirtilmedi"}</td>
          <td data-label="Aile Durum Özeti">${item["AİLE DURUM ÖZETİ"] || "Belirtilmedi"}</td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error("Veri yüklenirken hata oluştu:", error));
});
