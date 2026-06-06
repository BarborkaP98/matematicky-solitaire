let balicek = [];
let aktualni = null;

// funkce pro náhodné číslo
function nahodneCislo(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// vytvoření příkladů
function generujBalicek() {
  balicek = [];

  // 5 různých výsledků
  let vysledky = [];

  while (vysledky.length < 5) {
    let cislo = nahodneCislo(0, 100);
    if (!vysledky.includes(cislo)) {
      vysledky.push(cislo);
    }
  }

  // pro každý výsledek vytvoříme 4 příklady
  vysledky.forEach(vysledek => {
    let pocet = 0;

    while (pocet < 4) {
      let typ = Math.random() < 0.5 ? "plus" : "minus";

      let a, b, priklad;

      if (typ === "plus") {
        a = nahodneCislo(0, vysledek);
        b = vysledek - a;
        priklad = `${a} + ${b}`;
      } else {
        a = nahodneCislo(vysledek, 100);
        b = a - vysledek;
        priklad = `${a} - ${b}`;
      }

      balicek.push({
        priklad: priklad,
        vysledek: vysledek
      });

      pocet++;
    }
  });

  // zamíchání balíčku
  balicek.sort(() => Math.random() - 0.5);
}

// líznutí karty
function lizniKartu() {
  if (balicek.length === 0) {
    document.getElementById("aktualni-karta").innerText = "Konec hry!";
    return;
  }

  aktualni = balicek.pop();
  document.getElementById("aktualni-karta").innerText = aktualni.priklad;
}

// klikání na sloupce
document.querySelectorAll(".sloupec").forEach(sloupec => {
  sloupec.addEventListener("click", () => {
    if (!aktualni) return;

    let karty = sloupec.children;

    // limit 4 karet ve sloupci
    if (karty.length >= 4) {
      alert("Tento sloupec je plný!");
      return;
    }

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
      alert("Musí být stejný výsledek!");
    }
  });
});

// spustí se při načtení stránky
generujBalicek();
