let maxCislo = 20;
let balicek = [];
let aktualni = null;
let tazenaKarta = null;
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

    if (!vysledky.includes(v)) {
      vysledky.push(v);
    }
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

        balicek.push({
          priklad: priklad,
          vysledek: v
        });
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

  // ✅ 🔥 JEDINÁ DŮLEŽITÁ ÚPRAVA – správná velikost při drag
  karta.addEventListener("dragstart", (e) => {
    tazenaKarta = karta;

    let ghost = karta.cloneNode(true);
    ghost.style.position = "absolute";
    ghost.style.top = "-1000px";

    // ✅ vezme přesnou šířku jako ve sloupci
    ghost.style.width = window.getComputedStyle(karta).width;

    document.body.appendChild(ghost);

    e.dataTransfer.setDragImage(ghost, 20, 20);

    setTimeout(() => ghost.remove(), 0);
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

  zona.appendChild(vytvorKartu(aktualni.priklad, aktualni.vysledek));
}

// ✅ drop
document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".sloupec").forEach(sloupec => {

    sloupec.addEventListener("dragover", e => e.preventDefault());

    sloupec.addEventListener("drop", e => {
      e.preventDefault();

      if (!tazenaKarta) return;

      if (sloupec.querySelectorAll(".karta").length === 0) {
        let nadpis = document.createElement("div");
        nadpis.innerText = tazenaKarta.dataset.v;
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

  generuj();
});

// ✅ kontrola
function zkontroluj() {
  let sloupce = document.querySelectorAll(".sloupec");

  let vseSpravne = true;

  sloupce.forEach(sloupec => {

    let karty = sloupec.querySelectorAll(".karta");

    sloupec.style.backgroundColor = "#c8e6c9";

    if (karty.length === 0) {
      sloupec.style.backgroundColor = "#ff9999";
      vseSpravne = false;
      return;
    }

    let v = karty[0].dataset.v;
    let ok = true;

    karty.forEach(k => {
      if (k.dataset.v !== v) ok = false;
    });

    if (ok && karty.length === 4) {
      sloupec.style.backgroundColor = "#8bc34a";
    } else if (ok) {
      sloupec.style.backgroundColor = "#ffd54f";
      vseSpravne = false;
    } else {
      sloupec.style.backgroundColor = "#ff9999";
      vseSpravne = false;
    }
  });

  if (vseSpravne) {
    setTimeout(() => alert("🎉 Skvělá práce!"), 200);
  }
}

// ✅ nová hra
function novaHra() {
  document.querySelectorAll(".sloupec").forEach(s => {
    s.innerHTML = "";
    s.style.backgroundColor = "#c8e6c9";
  });

  document.getElementById("aktualni-karta").innerHTML = "";
  tazenaKarta = null;
  aktualni = null;

  generuj();
}

// ✅ nastavení
function nastavObtiznost(h) {
  maxCislo = h;
  novaHra();
}

function nastavRezim(r) {
  rezim = r;
  novaHra();
}

// ✅ návod
function toggleNavod() {
  let n = document.getElementById("navod");
  n.style.display = n.style.display === "none" ? "block" : "none";
}
