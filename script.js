let maxCislo = 20;
let balicek = [];
let aktualni = null;
let tazenaKarta = null;
let rezim = "plusminus";

function rand(min, max) {
  return Math.floor(Math.random()*(max-min+1))+min;
}
function generuj() {
  let pouziteVysledky = new Set();  balicek = [];

  for (let sl = 0; sl < 5; sl++) {

    let v;
    do {
      v = (rezim === "plusminus")
        ? rand(0, maxCislo)
        : rand(1, 10);
    } while (pouziteVysledky.has(v));

    pouziteVysledky.add(v);

    let pouzitePriklady = new Set();
    let pocet = 0;

    while (pocet < 4) {

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

      // ✅ HLÍDÁNÍ DUPLIKÁTŮ
      if (!pouzitePriklady.has(priklad)) {
        pouzitePriklady.add(priklad);

        balicek.push({
          priklad: priklad,
          vysledek: v
        });

        pocet++;
      }
    }
  }

  balicek.sort(() => Math.random() - 0.5);
}



// karta
function vytvorKartu(text, vysledek) {
  let karta = document.createElement("div");
  karta.className = "karta";
  karta.innerText = text;
  karta.dataset.v = vysledek;
  karta.draggable = true;

  karta.addEventListener("dragstart", (e) => {
    tazenaKarta = karta;
  });

  return karta;
}

// líznout
function lizniKartu() {
  if (balicek.length === 0) {
    document.getElementById("aktualni-karta").innerText = "Konec hry";
    return;
  }

  aktualni = balicek.pop();

  let zona = document.getElementById("aktualni-karta");
  zona.innerHTML = "";

  zona.appendChild(vytvorKartu(aktualni.priklad, aktualni.vysledek));
}

// drop
document.querySelectorAll(".sloupec").forEach(sloupec => {

  sloupec.addEventListener("dragover", e => e.preventDefault());

  sloupec.addEventListener("drop", e => {
    e.preventDefault();

    if (!tazenaKarta) return;

  // ✅ pokud je sloupec prázdný → zobraz výsledek
  if (sloupec.children.length === 0) {
    let vysledek = tazenaKarta.dataset.v;

    let nadpis = document.createElement("div");
    nadpis.innerText = vysledek;
    nadpis.style.fontWeight = "bold";
    nadpis.style.marginBottom = "5px";

    sloupec.appendChild(nadpis);
  }

    sloupec.appendChild(tazenaKarta);
    tazenaKarta = null;

    aktualni = null;
    document.getElementById("aktualni-karta").innerHTML = "";
  });
});

// kontrola
function zkontroluj() {
  let sloupce = document.querySelectorAll(".sloupec");

  sloupce.forEach(s => {
    let k = s.children;

    if (k.length === 0) {
      s.style.backgroundColor = "#ff9999";
      return;
    }

    let v = k[0].dataset.v;
    let ok = [...k].every(x => x.dataset.v === v);

    if (ok && k.length === 4) s.style.backgroundColor = "#8bc34a";
    else if (ok) s.style.backgroundColor = "#ffd54f";
    else s.style.backgroundColor = "#ff9999";
  });
}

// nová hra
function novaHra() {
  document.querySelectorAll(".sloupec").forEach(s => {
    s.innerHTML = "";
    s.style.backgroundColor = "#c8e6c9";
  });

  document.getElementById("aktualni-karta").innerHTML = "";

  generuj();
}

// režimy
function nastavObtiznost(h) {
  maxCislo = h;
  novaHra();
}

function nastavRezim(r) {
  rezim = r;
  novaHra();
}

// návod
function toggleNavod() {
  let n = document.getElementById("navod");
  n.style.display = n.style.display === "none" ? "block" : "none";
}

// start
generuj();
