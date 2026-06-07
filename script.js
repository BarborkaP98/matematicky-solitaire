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
function zkontroluj() {function zkontrol sloupce = document.querySelectorAll(".sloupec");

  let vseSpravne = true;

  sloupce.forEach(sloupec => {

    // ✅ vezmeme jen karty (ignorujeme nadpis)
    let karty = Array.from(sloupec.children).filter(el => el.classList.contains("karta"));

    // reset barvy
    sloupec.style.backgroundColor = "#c8e6c9";

    if (karty.length === 0) {
      sloupec.style.backgroundColor = "#ff9999";
      vseSpravne = false;
      return;
    }

    let prvni = karty[0].dataset.v;
    let ok = true;

    for (let i = 1; i < karty.length; i++) {
      if (karty[i].dataset.v !== prvni) {
        ok = false;
      }
    }

    if (ok && karty.length === 4) {
      sloupec.style.backgroundColor = "#8bc34a";
    } 
    else if (ok) {
      sloupec.style.backgroundColor = "#ffd54f";
      vseSpravne = false;
    } 
    else {
      sloupec.style.backgroundColor = "#ff9999";
      vseSpravne = false;
    }
  });

  if (vseSpravne) {
    setTimeout(() => alert("🎉 Skvělá práce!"), 200);
  }
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
