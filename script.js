let balicek = [];
let aktualni = null;

// náhodné číslo
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// vytvoření balíčku
function generuj() {
  balicek = [];

  let vysledky = [];
  while (vysledky.length < 5) {
    let v = rand(0, 20);
    if (!vysledky.includes(v)) vysledky.push(v);
  }

  vysledky.forEach(v => {
    for (let i = 0; i < 4; i++) {
      let a = rand(0, v);
      let b = v - a;

      balicek.push({
        priklad: a + " + " + b,
        vysledek: v
      });
    }
  });

  balicek.sort(() => Math.random() - 0.5);
}

// líznutí
function lizniKartu() {
  if (balicek.length === 0) {
    document.getElementById("aktualni-karta").innerText = "Konec hry";
    return;
  }

  aktualni = balicek.pop();
  document.getElementById("aktualni-karta").innerText = aktualni.priklad;
}

// klikání na sloupce
document.querySelectorAll(".sloupec").forEach(sloupec => {
  sloupec.onclick = () => {
    if (!aktualni) return;

    let posledni = sloupec.lastElementChild;

    if (!posledni || posledni.dataset.v == aktualni.vysledek) {

      let div = document.createElement("div");
      div.className = "karta";
      div.innerText = aktualni.priklad;
      div.dataset.v = aktualni.vysledek;

      sloupec.appendChild(div);
      aktualni = null;
      document.getElementById("aktualni-karta").innerText = "";

    } else {
      alert("Špatný tah");
    }
  };
});

generuj();
