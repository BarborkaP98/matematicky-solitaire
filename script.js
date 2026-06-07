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

  let pouziteVysledky = [];

  while (pouziteVysledky.length < 5) {
    let v = rezim === "plusminus"
      ? rand(0, maxCislo)
      : rand(1, 10);

    if (!pouziteVysledky.includes(v)) {
      pouziteVysledky.push(v);
    }
  }

  pouziteVysledky.forEach(v => {

    let pouzitePriklady = [];

    while (pouzitePriklady.length < 4) {

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

      if (!pouzitePriklady.includes(priklad)) {
        pouzitePriklady.push(priklad);

        balicek.push({
          priklad: priklad,
          vysledek: v
        });
      }
    }
  });

  balicek.sort(() => Math.random() - 0.5);
}

// karta
function vytvorKartu(text, vysledek) {
  let karta = document.createElement("div");
  karta.className = "karta";
  karta.innerText = text;

