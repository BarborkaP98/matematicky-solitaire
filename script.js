let maxCislo = 20;
let balicek = [];
let aktualni = null;
let tazenaKarta = null;
let rezim = "plusminus";

// náhodné číslo
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ✅ generování balíčku (FINÁLNÍ VERZE)
function generuj() {
  balicek = [];

  let pouzite = new Set();

  for (let sl = 0; sl < 5; sl++) {

    let v;
    let pocet = 0;

    while (pocet < 4) {

      let priklad;

      if (rezim === "plusminus") {

        // ✅ normální režim
        v = rand(0, maxCislo);

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

        // ✅ násobilkový režim BEZ while problémů

        if (Math.random() < 0.5) {
          let a = rand(1, 10);
          let b = rand(1, 10);

          v = a * b;
          priklad = `${a} × ${b}`;

        } else {
          let b = rand(1, 10);
          let vysledek = rand(1, 10);

          let a = b * vysledek;

          v = vysledek;
          priklad = `${a} ÷ ${b}`;
        }
      }

      if (!pouzite.has(priklad)) {
        pouzite.add(priklad);

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

// ✅ vytvoření karty
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

// ✅ drop
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

    if (tazenaKarta) {
      tazenaKarta.remove();
      tazenaKarta = null;
    }

    aktualni = null;
    document.getElementById("aktualni-karta").innerHTML = "";
  });

});

// ✅ kontrola
function zkontroluj() {
  let sloupce = document.querySelectorAll(".sloupec");

  let vseSpravne = true;

  sloupce.forEach(sloupec => {
    let karty = sloupec.children;

    sloupec.style.backgroundColor = "rgba(255,255,255,0.2)";

    if (karty.length === 0) {
      sloupec.style.backgroundColor = "#ff9999";
      vseSpravne = false;
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
    setTimeout(() => {
      alert("🎉 Skvělá práce!");
    }, 200);
  }
}

// ✅ nová hra
function novaHra() {
  document.querySelectorAll(".sloupec").forEach(sloupec => {
    sloupec.innerHTML = "";
    sloupec.style.backgroundColor = "#c8e6c9";
  });

  document.getElementById("aktualni-karta").innerHTML = "";

  aktualni = null;
  generuj();
}


// ✅ režimy
function nastavObtiznost(hodnota) {
  maxCislo = hodnota;
  novaHra();
}

function nastavRezim(r) {
  rezim = r;
  novaHra();
}

// ✅ návod toggle
function toggleNavod() {
  let navod = document.getElementById("navod");

  if (navod.style.display === "none") {
    navod.style.display = "block";
  } else {
    navod.style.display = "none";
  }
}

// start
generuj();
