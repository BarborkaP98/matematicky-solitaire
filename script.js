let balicek = [];
let aktualni = null;

// náhodné číslo
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// vytvoření balíčku
function generuj() {
  balicek = [];

  let vysledky = [];
  while (vysledky.length < 5) {
    let v = rand(0, 20);
    if (!vysledky.includes(v)) vysledky.push(v);
  }

  vysledky.forEach(v => {
    for (let i = 0; i < 4; i++) {
      let a = rand(0, v);
      let b = v - a;

      balicek.push({
        priklad: a + " + " + b,
        vysledek: v
      });
    }
  });

  balicek.sort(() => Math.random() - 0.5);
}

// líznutí
function lizniKartu() {
  if (balicek.length === 0) {
    document.getElementById("aktualni-karta").innerText = "Konec hry";
    return;
  }

  aktualni = balicek.pop();

  let zona = document.getElementById("aktualni-karta");
  zona.innerHTML = "";

  let karta = document.createElement("div");
  karta.className = "karta";
  karta.innerText = aktualni.priklad;

  // ✅ důležité
  karta.dataset.v = aktualni.vysledek;

  // ✅ zapnutí drag
  karta.draggable = true;

  karta.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({
      priklad: aktualni.priklad,
      vysledek: aktualni.vysledek
    }));
  });

  zona.appendChild(karta);
}
``
// klikání na sloupce
document.querySelectorAll(".sloupec").forEach(sloupec => {
  sloupec.onclick = () => {
    if (!aktualni) return;

    let posledni = sloupec.lastElementChild;

    if (!posledni || posledni.dataset.v == aktualni.vysledek) {

      let div = document.createElement("div");
      div.className = "karta";
      div.innerText = aktualni.priklad;
      div.dataset.v = aktualni.vysledek;

      sloupec.appendChild(div);
      aktualni = null;
      document.getElementById("aktualni-karta").innerText = "";

    } else {
      alert("Špatný tah");
    }
  };
});

generuj();
function zkontroluj() {
  let sloupce = document.querySelectorAll(".sloupec");

  let zprava = "Výsledky:\n";

  sloupce.forEach((sloupec, index) => {
    let karty = sloupec.children;

    if (karty.length === 0) {
      zprava += "Sloupec " + (index + 1) + ": ❌ prázdný\n";
      return;
    }

    let prvniVysledek = karty[0].dataset.v;
    let vseOk = true;

    for (let i = 1; i < karty.length; i++) {
      if (karty[i].dataset.v != prvniVysledek) {
        vseOk = false;
      }
    }

    if (vseOk && karty.length === 4) {
      zprava += "Sloupec " + (index + 1) + ": ✅ " + prvniVysledek + "\n";
    } else if (vseOk) {
      zprava += "Sloupec " + (index + 1) + ": ⚠️ neúplný\n";
    } else {
      zprava += "Sloupec " + (index + 1) + ": ❌ špatně\n";
    }
  });

  alert(zprava);
}
