let maxCislo = 20;
let balicek = [];
let aktualni = null;
let tazenaKarta = null;
let rezim = "plusminus";

function rand(min, max) {
  return Math.floor(Math.random()*(max-min+1))+min;
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
          let a = 1;
          let b = v;
          priklad = `${a} × ${b}`;
        } else {
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
  });

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
