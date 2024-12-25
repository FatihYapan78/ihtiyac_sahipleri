document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector("#yardimTablosu tbody");
  
    fetch("data.json")
      .then(response => response.json())
      .then(data => {
        // Tabloyu doldurma işlemi
        data.forEach(item => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td data-label="Ad Soyad">${item.adSoyad}</td>
            <td data-label="TC">${item.tc}</td>
            <td data-label="Telefon">${item.telefon}</td>
            <td data-label="Adres">${item.adres}</td>
            <td data-label="Yapılan Yardımlar">${item.yapilanYardimlar.join(", ")}</td>
          `;
          tableBody.appendChild(row);
        });
      })
      .catch(error => console.error("Veri yüklenirken hata oluştu:", error));
  });
  
  // Filtreleme fonksiyonu
  function filtrele() {
    const aramaKutusu = document.getElementById("arama").value.toLowerCase();
    const satirlar = document.querySelectorAll("#yardimTablosu tbody tr");
  
    satirlar.forEach(row => {
      const adSoyad = row.querySelector("td[data-label='Ad Soyad']").textContent.toLowerCase();
      
      // Eğer isim arama kutusundaki metni içeriyorsa, satır gösterilsin
      if (adSoyad.includes(aramaKutusu)) {
        row.style.display = "";
      } else {
        row.style.display = "none"; // Eşleşmiyorsa satır gizlensin
      }
    });
  }
  