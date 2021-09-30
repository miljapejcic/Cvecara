import { Polica } from "./polica.js";
import { Api } from "./api.js"
import { Cvet } from "./cvet.js"
import { Buket } from "./buket.js"


NacrtajOsnovno();

function NacrtajOsnovno() {
    let kontejner = document.createElement("div");
    kontejner.className = "kontejner";
    let leviDiv = document.createElement("div");
    leviDiv.className = "leviDiv";
    let desniDiv = document.createElement("div");
    desniDiv.className = "desniDiv";
    kontejner.appendChild(leviDiv);
    kontejner.appendChild(desniDiv);
    document.body.appendChild(kontejner);
    NacrtajForme(leviDiv);
    NacrtajDesnuStranu(desniDiv);
}

function NacrtajForme(host) {
    let divDodajP = document.createElement("div")
    divDodajP.className = "formDodaj"
    host.appendChild(divDodajP);
    NacrtajDodajPolicu(divDodajP);

    let divDodajB = document.createElement("div")
    divDodajB.className = "formDodaj"
    host.appendChild(divDodajB);
    NacrtajDodajBuket(divDodajB);

    let divDodajC = document.createElement("div")
    divDodajC.className = "formDodaj"
    host.appendChild(divDodajC);
    NacrtajDodajCvet(divDodajC);

    let divInventar = document.createElement("div")
    divInventar.className = "formDodaj"
    host.appendChild(divInventar);
    NacrtajInventar(divInventar);
}

async function NacrtajDodajPolicu(host) {
    let labela = document.createElement("label");
    labela.innerHTML = "Naziv nove police";
    host.appendChild(labela);

    let poljeZaUnos = document.createElement("input");
    poljeZaUnos.className = "nazivPolice";
    host.appendChild(poljeZaUnos);

    labela = document.createElement("label");
    labela.innerHTML = "Kratki opis nove police";
    host.appendChild(labela);

    poljeZaUnos = document.createElement("textarea");
    poljeZaUnos.rows = 2;
    poljeZaUnos.style.resize = "none"
    poljeZaUnos.className = "opisPolice";
    host.appendChild(poljeZaUnos);

    labela = document.createElement("label");
    labela.innerHTML = "Kapacitet nove police";
    host.appendChild(labela);

    poljeZaUnos = document.createElement("input");
    poljeZaUnos.className = "kapPolice";
    poljeZaUnos.type = "number";
    poljeZaUnos.min = 1;
    host.appendChild(poljeZaUnos);

    const dugme = document.createElement("button");
    dugme.style.marginTop="5px"
    dugme.innerHTML = "Dodaj novu policu";
    host.appendChild(dugme);
    dugme.onclick = (async (ev) => {
        const naziv = host.querySelector(".nazivPolice").value;
        const opis = host.querySelector(".opisPolice").value;
        const kap = parseInt(host.querySelector(".kapPolice").value);
        if(naziv !== "" && opis !== "" && kap)
        {
            let pol = new Polica(0, naziv, opis, kap, 0);
            let api = new Api();
            await api.DodajPolicu(pol);
        }
        else{
            alert("Sva polja moraju biti popunjena!")
        }
    })
}

async function NacrtajDodajBuket(host) {
    let labela = document.createElement("label");
    labela.innerHTML = "Naziv buketa";
    host.appendChild(labela);

    let poljeZaUnos = document.createElement("input");
    poljeZaUnos.className = "nazivBuketa";
    host.appendChild(poljeZaUnos);

    labela = document.createElement("label");
    labela.innerHTML = "Buket ide na policu:";

    let selDiv = document.createElement("div");
    let sel = document.createElement("select");
    sel.className = "listaPolica";
    selDiv.appendChild(labela);
    selDiv.appendChild(sel);

    let api = new Api();
    let police = await api.VratiSvePolice();

    police.forEach((el) => {
        var opcija = document.createElement("option");
        opcija.text = el.nazivPolice;
        opcija.name = "selectPolice"
        opcija.value = el.policaID;
        sel.appendChild(opcija);
    });
    host.appendChild(selDiv);

    let chDiv = document.createElement("div");
    let lab = document.createElement("label");
    lab.innerHTML = "Izaberite cvetove i kolicinu koju zelite"
    chDiv.appendChild(lab);
    host.appendChild(chDiv)

    let cvetovi = await api.VratiSveCvetove();

    let checkedCvetoviprov = [];
    let checkedKol = []

    cvetovi.filter(el => el.kolicinaCveta != 0).forEach((el, index) => {
        let cvetDiv = document.createElement("div");
        cvetDiv.className = "divCbCvet";

        let inp = document.createElement("input");
        inp.type = "checkbox";
        inp.id = index;
        inp.value = el.cvetID;
        checkedCvetoviprov.push(inp);

        let divZaKol = document.createElement("div");
        divZaKol.style.display = "none";

        inp.onclick = (ev) => {
            if (inp.checked == true) {
                divZaKol.style.display = "flex";
                divZaKol.style.flexDirection = "column";
            } else {
                divZaKol.style.display = "none";
            }
        }
        let lab = document.createElement("label");
        lab.innerHTML = el.nazivCveta;
        lab.for = index;
        cvetDiv.appendChild(inp);
        cvetDiv.appendChild(lab);

        lab = document.createElement("label");
        lab.innerHTML = "Kolicina:";
        divZaKol.appendChild(lab);

        let inpKol = document.createElement("input");
        inpKol.className = "kolZaCvetkodBuketa";
        inpKol.id = `numKolCveta${index}`;
        inpKol.type = "number";
        inpKol.min=1;
        inpKol.max = el.kolicinaCveta;
        inpKol.defaultValue = 1;
        checkedKol.push(inpKol);
        divZaKol.appendChild(inpKol);
        chDiv.appendChild(cvetDiv);
        chDiv.appendChild(divZaKol);
    })


    const dugme = document.createElement("button");
    dugme.style.marginTop="5px"
    dugme.innerHTML = "Dodaj novi buket";
    host.appendChild(dugme);
    dugme.onclick = (async (ev) => {
        const naziv = host.querySelector(".nazivBuketa").value;
        let selP = document.querySelector(".listaPolica");
        const policaID = (selP.options[selP.selectedIndex].value);
        let listaCvetova = [];
        let tmp;
        checkedCvetoviprov.forEach((el,index)=>{
            if(el.checked){
                tmp = {
                    cvetID:cvetovi[index].cvetID,
                    kolicina:checkedKol[index].value
                }
                listaCvetova.push(tmp);
            }
        })

        if(naziv !== "" && policaID !== null && listaCvetova.length!=0)
        {
            let b = new Buket(0, naziv,0,policaID,listaCvetova);
            let api = new Api();
            await api.DodajBuket(b,policaID);
        }
        else{
            alert("Sva polja moraju biti popunjena!")
        }
    })
}

async function NacrtajDodajCvet(host) {
    let labela = document.createElement("label");
    labela.innerHTML = "Naziv novog cveta";
    host.appendChild(labela);

    let poljeZaUnos = document.createElement("input");
    poljeZaUnos.className = "nazivCveta";
    host.appendChild(poljeZaUnos);

    labela = document.createElement("label");
    labela.innerHTML = "Kolicina novog cveta";
    host.appendChild(labela);

    poljeZaUnos = document.createElement("input");
    poljeZaUnos.className = "kolCveta";
    poljeZaUnos.type = "number";
    poljeZaUnos.min = 1;
    host.appendChild(poljeZaUnos);

    labela = document.createElement("label");
    labela.innerHTML = "Cena novog cveta";
    host.appendChild(labela);

    poljeZaUnos = document.createElement("input");
    poljeZaUnos.className = "cenaCveta";
    poljeZaUnos.type = "number";
    poljeZaUnos.min = 1;
    host.appendChild(poljeZaUnos);

    labela = document.createElement("label");
    labela.innerHTML = "Boja novog cveta";
    host.appendChild(labela);

    poljeZaUnos = document.createElement("input");
    poljeZaUnos.className = "bojaCveta";
    poljeZaUnos.type = "color";
    host.appendChild(poljeZaUnos);

    const dugme = document.createElement("button");
    dugme.style.marginTop = "5px"
    dugme.innerHTML = "Dodaj novi cvet";
    host.appendChild(dugme);
    dugme.onclick = (ev) => {
        const naziv = host.querySelector(".nazivCveta").value;
        const kol = parseInt(host.querySelector(".kolCveta").value);
        const cena = parseInt(host.querySelector(".cenaCveta").value);
        const boja = host.querySelector(".bojaCveta").value;
        
        if(naziv !== "" && kol && cena && boja !== null)
        {
            let cv = new Cvet(0, naziv, cena, kol, boja);
            let api = new Api();
            api.DodajCvet(cv);
        }
        else{
            alert("Sva polja moraju biti popunjena!")
        }
    }
}

async function NacrtajInventar(host) {
    let labela = document.createElement("center");
    labela.innerHTML = "Svi cvetovi";
    labela.style.marginBottom = "10px"
    host.appendChild(labela);

    let api = new Api()
    let cvetovi = await api.VratiSveCvetove();

    let divZaCvetInv;
    cvetovi.forEach(el =>{
        divZaCvetInv = document.createElement("div");
        divZaCvetInv.className = "divZaCvetInv"
        divZaCvetInv.style.backgroundColor = el.bojaCveta;
        el.NacrtajCvetZaInv(divZaCvetInv);
        host.appendChild(divZaCvetInv)
    })
}

async function NacrtajDesnuStranu(host){
    let api = new Api();
    let police = await api.VratiSvePolice();
    police.forEach(el => {
        el.NacrtajPolicu(host);
    });
}
