let balicek = [];
let aktualni = null;
let tazenaKarta = null;

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

// ✅ vytvoří kartu (jedno místo = méně chyb)
function vytvorKartu(text, vysledek) {
  let karta = document.createElement("div");
  karta.className = "karta";
  karta.innerText = text;

  karta.dataset.v = vysledek;
  karta.draggable = true;

  karta.addEventListener("dragstart", (e) => {
    tazenaKarta = karta;

    e.dataTransfer.setData("text/plain", JSON.stringify({
      priklad: karta.innerText,
      vysledek: karta.dataset.v
    }));
  });

  return karta;
}

// ✅ líznutí
function lizniKartu() {
  if (balicek.length === 0) {
    document.getElementById("aktualni-karta").innerText = "Konec hry";
    return;
  }

  aktualni = balicek.pop();

  let zona = document.getElementById("aktualni-karta");
  zona.innerHTML = "";

  let karta = vytvorKartu(aktualni.priklad, aktualni.vysledek);
  zona.appendChild(karta);
}

// ✅ drop do sloupců
document.querySelectorAll(".sloupec").forEach(sloupec => {

  sloupec.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  sloupec.addEventListener("drop", (e) => {
    e.preventDefault();

    let dataText = e.dataTransfer.getData("text/plain");
    if (!dataText) return;

    let data = JSON.parse(dataText);

    let novaKarta = vytvorKartu(data.priklad, data.vysledek);
    sloupec.appendChild(novaKarta);

    // ✅ smaže původní AŽ po úspěšném dropu
    if (tazenaKarta) {
      tazenaKarta.remove();
      tazenaKarta = null;
    }

    // ✅ vyčistí střed
    aktualni = null;
    document.getElementById("aktualni-karta").innerHTML = "";
  });

});

// ✅ kontrola
function zkontroluj() {
  let sloupce = document.querySelectorAll(".sloupec");
  let zprava = "Výsledky:\n";

  sloupce.forEach((sloupec, index) => {
    let karty = sloupec.children;

    if (karty.length === 0) {
      zprava += "Sloupec " + (index + 1) + ": ❌ prázdný\n";
      return;
    }

    let prvni = karty[0].dataset.v;
    let ok = true;

    for (let i = 1; i < karty.length; i++) {
      if (karty[i].dataset.v != prvni) {
        ok = false;
      }
    }

    if (ok && karty.length === 4) {
      zprava += "Sloupec " + (index + 1) + ": ✅ " + prvni + "\n";
    } else if (ok) {
      zprava += "Sloupec " + (index + 1) + ": ⚠️ neúplný\n";
    } else {
      zprava += "Sloupec " + (index + 1) + ": ❌ špatně\n";
    }
  });

  alert(zprava);
}

// ✅ nová hra
function novaHra() {
  document.querySelectorAll(".sloupec").forEach(sloupec => {
    sloupec.innerHTML = "";
  });

  document.getElementById("aktualni-karta").innerHTML = "";

  aktualni = null;
  generuj();
}

// start
generuj();
