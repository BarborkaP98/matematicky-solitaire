let maxCislo = 20;
let balicek =;let balicek = [];
let tazenaKarta = null;
let rezim = "plusminus";

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generuj() {
  balicek = [];

  for (let sl = 0; sl < 5; sl++) {

    let v = (rezim === "plusminus") 
      ? rand(0, maxCislo) 
      : rand(1, 10);

    for (let i = 0; i < 4; i++) {

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
          // ✅ násobení – VŽDY odpovídá v
          let a = rand(1, 10);

          if (v % a === 0) {
            let b = v / a;
            priklad = `${a} × ${b}`;
          } else {
            // fallback (vždy správný)
            priklad = `1 × ${v}`;
          }

        } else {
          // ✅ dělení – VŽDY odpovídá v
          let b = rand(1, 10);
          let a = v * b;

          priklad = `${a} ÷ ${b}`;
        }

      }

      balicek.push({
        priklad: priklad,
        vysledek: v
      });
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

    e.dataTransfer.setData("text/plain", JSON.stringify({
      priklad: karta.innerText,
      vysledek: karta.dataset.v
    }));
  });

  return karta;
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

  let karta = vytvorKartu(aktualni.priklad, aktualni.vysledek);
  zona.appendChild(karta);
}

// drop
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

// kontrola
function zkontroluj() {
  let sloupce = document.querySelectorAll(".sloupec");

  let vseSpravne = true;

  sloupce.forEach(sloupec => {
    let karty = sloupec.children;

    sloupec.style.backgroundColor = "#c8e6c9";

    if (karty.length === 0) {
      sloupec.style.backgroundColor = "#ff9999";
      vseSpravne = false;
      return;
    }

    let prvni = karty[0].dataset.v;
    let ok = true;

    for (let i = 1; i < karty.length; i++) {
      if (karty[i].dataset.v != prvni) ok = false;
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
  document.querySelectorAll(".sloupec").forEach(sloupec => {
    sloupec.innerHTML = "";
    sloupec.style.backgroundColor = "#c8e6c9";
  });

  document.getElementById("aktualni-karta").innerHTML = "";

  aktualni = null;
  generuj();
}

// režimy
function nastavObtiznost(hodnota) {
  maxCislo = hodnota;
  novaHra();
}

function nastavRezim(r) {
  rezim = r;
  novaHra();
}

// návod
function toggleNavod() {
  let navod = document.getElementById("navod");

  navod.style.display = (navod.style.display === "none") ? "block" : "none";
}

// start
generuj();
