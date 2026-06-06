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
  if (aktualni !== null) return;
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
karta.dataset.v = aktualni.vysledek;
karta.draggable = true;

karta.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", JSON.stringify({
    priklad: karta.innerText,
    vysledek: karta.dataset.v
  }));
});

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

  sloupec.addEventListener("dragover", (e) => {
    e.preventDefault(); // umožní drop
  });

  sloupec.addEventListener("drop", (e) => {
    e.preventDefault();

    let data = JSON.parse(e.dataTransfer.getData("text/plain"));
if (!data) return;
``
    let posledni = sloupec.lastElementChild;

    if (!posledni || posledni.dataset.v == data.vysledek) {

      let karta = document.createElement("div");
      karta.className = "karta";
      karta.innerText = data.priklad;
      karta.dataset.v = data.vysledek;

      sloupec.appendChild(karta);

      sloupec.appendChild(karta);

document.getElementById("aktualni-karta").innerHTML =
      document.getElementById("aktualni-karta").innerHTML = "";
aktualni = null;
sloupec.addEventListener("drop", (e) => {
  e.preventDefault();

  let dataText = e.dataTransfer.getData("text/plain");
  if (!dataText) return;

  let data = JSON.parse(dataText);

  // ✅ vždy přidá kartu (bez podmínky)
  let karta = document.createElement("div");
  karta.className = "karta";
  karta.innerText = data.priklad;
  karta.dataset.v = data.vysledek;

  sloupec.appendChild(karta);

  aktualni = null;
  document.getElementById("aktualni-karta").innerHTML = "";
  aktualni = null;
});
  });

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
