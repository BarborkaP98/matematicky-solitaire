let maxCislo = 20;
let balicek = [];
let tazenaKarta = null;
let vybranaKarta = null;
let rezim = "plusminus";

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generuj() {
  balicek = [];
  let vysledky = [];

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

function vytvorKartu(text, vysledek) {
  let karta = document.createElement("div");
  karta.className = "karta";
  karta.innerText = text;
  karta.dataset.v = vysledek;
  karta.draggable = true;

  karta.addEventListener("dragstart", () => {
    tazenaKarta = karta;
  });

  karta.addEventListener("click", function () => {
    
  document.querySelectorAll(".karta").forEach(k => k.style.border = "none");

  karta.style.border = "2px solid red";

    vybranaKarta = karta;
  });

  return karta;
}

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
function presun(sloupec, karta) {

  let puvodni = karta.parentElement;

  // ✅ odeber kartu ze starého sloupce
  if (puvodni && puvodni.classList.contains("sloupec")) {
    karta.remove();

    // ✅ pokud tam nic nezbylo → smaž nadpis
    if (puvodni.querySelectorAll(".karta").length === 0) {
      puvodni.innerHTML = "";
    }
  }

  // ✅ pokud je nový sloupec prázdný → přidej nadpis
  if (sloupec.querySelectorAll(".karta").length === 0) {
    let nadpis = document.createElement("div");
    nadpis.innerText = karta.dataset.v;
    nadpis.style.fontWeight = "bold";
    sloupec.appendChild(nadpis);
  }

  sloupec.appendChild(karta);

  vybranaKarta = null;
  tazenaKarta = null;

  document.getElementById("aktualni-karta").innerHTML = "";
}
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".sloupec").forEach(sloupec => {

    sloupec.addEventListener("dragover", e => e.preventDefault());

    sloupec.addEventListener("drop", e => {
      e.preventDefault();

      if (!tazenaKarta) return;

      presun(sloupec, tazenaKarta);
      tazenaKarta = null;
    });

    sloupec.addEventListener("click", () => {
      if (!vybranaKarta) return;

      presun(sloupec, vybranaKarta);
    });

  });

  generuj();
});

function vloz(sloupec, karta) {
  if (sloupec.querySelectorAll(".karta").length === 0) {
    let nadpis = document.createElement("div");
    nadpis.innerText = karta.dataset.v;
    nadpis.style.fontWeight = "bold";
    sloupec.appendChild(nadpis);
  }

  sloupec.appendChild(karta);
  document.getElementById("aktualni-karta").innerHTML = "";
}

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
