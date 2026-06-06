let balicek = [];
let aktualni = null;

// náhodné číslo
function nahodneCislo(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// generování balíčku
function generujBalicek() {
  balicek = [];

  let vysledky = [];

  while (vysledky.length < 5) {
    let cislo = nahodneCislo(0, 100);
    if (!vysledky.includes(cislo)) {
      vysledky.push(cislo);
    }
  }

  vysledky.forEach(vysledek => {
    let pocet = 0;

    while (pocet < 4) {
      let typ = Math.random() < 0.5 ? "plus" : "minus";
      let a, b, priklad;

      if (typ === "plus") {
        a = nahodneCislo(0, vysledek);
        b = vysledek - a;
        priklad = `${a} + ${b}`;
      } else {
        a = nahodneCislo(vysledek, 100);
        b = a - vysledek;
        priklad = `${a} - ${b}`;
      }

      balicek.push({
        priklad: priklad,
        vysledek: vysledek
      });

      pocet++;
    }
  });

  balicek.sort(() => Math.random() - 0.5);
}

// líznutí karty
function lizniKartu() {
  if (balicek.length === 0) {
    document.getElementById("aktualni-karta").innerText = "Konec hry!";
    return;
  }

  aktualni = balicek.pop();

  let div = document.getElementById("aktualni-karta");

  div.innerHTML = "";

  let karta = document.createElement("div");
  karta.className = "karta";
  karta.innerText = aktualni.priklad;

  karta.draggable = true;

  karta.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(aktualni));
  });

  div.appendChild(karta);
}

// drop do sloupců
document.querySelectorAll(".sloupec").forEach(sloupec => {

  sloupec.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  sloupec.addEventListener("drop", (e) => {
    e.preventDefault();

    if (!aktualni) return;

