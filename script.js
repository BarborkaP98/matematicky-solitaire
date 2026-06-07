let balicek = [];
let tazenaKarta = null;

function rand(min, max) {
  return {  return Math.floor(Math.random() * (max - min + 1)) + min;
    let pouzite = [];

    while (pouzite.length < 4) {

      let typ = Math.random();
      let priklad;

      if (typ < 0.5) {

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

function vytvorKartu(text, vysledek) {
  let karta = document.createElement("div");
  karta.className = "karta";
  karta.innerText = text;
  karta.dataset.v = vysledek;
  karta.draggable = true;

  karta.addEventListener("dragstart", () => {
    tazenaKarta = karta;
  });

  return karta;
}

function lizniKartu() {
  if (balicek.length === 0) {
    document.getElementById("aktualni-karta").innerText = "Konec hry";
    return;
  }

  let karta = balicek.pop();

  let zona = document.getElementById("aktualni-karta");
  zona.innerHTML = "";
  zona.appendChild(vytvorKartu(karta.priklad, karta.vysledek));
}

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

      document.getElementById("aktualni-karta").innerHTML = "";
    });

  });

  generuj();
});

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
}

function generuj() {
  balicek = [];

  let vysledky = [];

  while (vysledky.length < 5) {
    let v = rand(1, 10);
    if (!vysledky.includes(v)) vysledky.push(v);
  }

