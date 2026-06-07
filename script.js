let maxCislo = 20;let maxCis = [];

  while (vysledky.length < 5) {
    let v = rezim === "plusminus"
      ? rand(0, maxCislo)
      : rand(1, 10);

    if (!vysledky.includes(v)) vysledky.push(v);
  }

  vysledky.forEach(v => {

    let pouzite = [];

    while (pouzite.length < 4) {

      let priklad;

      if (rezim === "plusminus") {
        if (Math.random() < 0.5) {
          let a = rand(0, v);
          let b = v - a;
          priklad = `${a} + ${b}`;
        } else {
          let a = rand(v, maxCislo);
          let b = a - v;
          priklad = `${a} - ${b}`;
        }
      } else {
        if (Math.random() < 0.5) {
          let a = rand(1, 10);

          if (v % a === 0) {
            let b = v / a;
            priklad = `${a} × ${b}`;
          } else {
            priklad = `1 × ${v}`;
          }
        } else {
          let b = rand(1, 10);
          let a = v * b;
          priklad = `${a} ÷ ${b}`;
        }
      }

      if (!pouzite.includes(priklad)) {
        pouzite.push(priklad);

        balicek.push({ priklad, vysledek: v });
      }
    }
  });

  balicek.sort(() => Math.random() - 0.5);
}

// ✅ karta
function vytvorKartu(text, vysledek) {
  let karta = document.createElement("div");
  karta.className = "karta";
  karta.innerText = text;
  karta.dataset.v = vysledek;
  karta.draggable = true;

  // ✅ PC drag
  karta.addEventListener("dragstart", () => {
    tazenaKarta = karta;
  });

  // ✅ MOBIL výběr
  karta.addEventListener("touchend", (e) => {
    e.preventDefault();
    vybranaKarta = karta;
  });

  return karta;
}

// ✅ líznout
function lizniKartu() {
  if (balicek.length === 0) {
    document.getElementById("aktualni-karta").innerText = "Konec hry";
    return;
  }

  let k = balicek.pop();

  let zona = document.getElementById("aktualni-karta");
  zona.innerHTML = "";
  zona.appendChild(vytvorKartu(k.priklad, k.vysledek));
}

// ✅ sloupce
document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".sloupec").forEach(sloupec => {

    // ✅ PC drag
    sloupec.addEventListener("dragover", e => e.preventDefault());

    sloupec.addEventListener("drop", e => {
      e.preventDefault();

      if (!tazenaKarta) return;

      if (sloupec.children.length === 0) {
        let nadpis = document.createElement("div");
        nadpis.innerText = tazenaKarta.dataset.v;
        nadpis.style.fontWeight = "bold";
        sloupec.appendChild(nadpis);
      }

      sloupec.appendChild(tazenaKarta);
      tazenaKarta = null;

      document.getElementById("aktualni-karta").innerHTML = "";
    });

    // ✅ MOBIL klik → klik
    sloupec.addEventListener("touchend", (e) => {
      e.preventDefault();

      if (!vybranaKarta) return;

      if (sloupec.children.length === 0) {
        let nadpis = document.createElement("div");
        nadpis.innerText = vybranaKarta.dataset.v;
        nadpis.style.fontWeight = "bold";
        sloupec.appendChild(nadpis);
      }

      sloupec.appendChild(vybranaKarta);
      vybranaKarta = null;

      document.getElementById("aktualni-karta").innerHTML = "";
    });

  });

  generuj();
});

// ✅ kontrola
function zkontroluj() {
  document.querySelectorAll(".sloupec").forEach(sloupec => {

    let karty = sloupec.querySelectorAll(".karta");

    if (karty.length === 0) {
      sloupec.style.background = "red";
      return;
    }

    let v = karty[0].dataset.v;
    let ok = true;

    karty.forEach(k => {
      if (k.dataset.v !== v) ok = false;
    });

    sloupec.style.background =
      ok && karty.length === 4 ? "green" :
      ok ? "orange" : "red";
  });
}

function novaHra() {
  document.querySelectorAll(".sloupec").forEach(s => {
    s.innerHTML = "";
    s.style.background = "#c8e6c9";
  });

  document.getElementById("aktualni-karta").innerHTML = "";
  generuj();
}

function nastavObtiznost(h) {
  maxCislo = h;
  novaHra();
}

function nastavRezim(r) {
  rezim = r;
  novaHra();
}

function toggleNavod() {
  let n = document.getElementById("navod");
  n.style.display = n.style.display === "none" ? "block" : "none";
}
let balicek = [];
let tazenaKarta = null;
let vybranaKarta = null;   // ✅ mobil
let rezim = "plusminus";

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generuj() {
  balicek = [];

