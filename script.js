let balicek = [
  { priklad: "3 + 4", vysledek: 7 },
  { priklad: "5 + 2", vysledek: 7 },
  { priklad: "6 - 1", vysledek: 5 },
  { priklad: "2 + 3", vysledek: 5 }
];

let aktualni;

function lizniKartu() {
  if (balicek.length === 0) return;

  aktualni = balicek.pop();
  document.getElementById("aktualni-karta").innerText = aktualni.priklad;
}

document.querySelectorAll(".sloupec").forEach(sloupec => {
  sloupec.addEventListener("click", () => {
    if (!aktualni) return;

    let posledni = sloupec.lastElementChild;

    if (!posledni || posledni.dataset.vysledek == aktualni.vysledek) {
      let karta = document.createElement("div");
      karta.className = "karta";
      karta.innerText = aktualni.priklad;
      karta.dataset.vysledek = aktualni.vysledek;

      sloupec.appendChild(karta);
      aktualni = null;
      document.getElementById("aktualni-karta").innerText = "";
    } else {
      alert("Sem to nepatří!");
    }
  });
});
