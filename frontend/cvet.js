import { Api } from "./api.js";

export class Cvet{
    constructor(cvetID, nazivCveta, cenaCveta, kolicinaCveta, bojaCveta) {
        this.cvetID = cvetID,
        this.nazivCveta = nazivCveta;
        this.cenaCveta = cenaCveta;
        this.kolicinaCveta = kolicinaCveta;
        this.bojaCveta = bojaCveta;
        this.miniKontejner = null;
    }

    NacrtajCvet(host,kol){
        this.miniKontejner = document.createElement("div");
        this.miniKontejner.className = "cvet";
        this.miniKontejner.innerHTML = `${this.nazivCveta}, kolicina: ${kol}`;
        this.miniKontejner.style.backgroundColor = this.bojaCveta;
        host.appendChild(this.miniKontejner);
    }

    async NacrtajCvetZaInv(host){
        let lab = document.createElement("label");
        lab.innerHTML = this.nazivCveta + " - kolicina: " + this.kolicinaCveta + ", cena: " + this.cenaCveta;
        host.appendChild(lab);
        
        lab = document.createElement("label");
        lab.innerHTML = "Promeni kolicinu";
        host.appendChild(lab);

        let poljeZaIzmenu = document.createElement("input");
        poljeZaIzmenu.className = "kolCvetaInv";
        poljeZaIzmenu.type = "number";
        poljeZaIzmenu.defaultValue = this.kolicinaCveta;
        poljeZaIzmenu.min = 0;
        host.appendChild(poljeZaIzmenu);

        lab = document.createElement("label");
        lab.innerHTML = "Promeni cenu";
        host.appendChild(lab);

        poljeZaIzmenu = document.createElement("input");
        poljeZaIzmenu.className = "cenaCvetaInv";
        poljeZaIzmenu.type = "number";
        poljeZaIzmenu.defaultValue = this.cenaCveta;
        poljeZaIzmenu.min = 0;
        host.appendChild(poljeZaIzmenu);


        const dugme = document.createElement("button");
        dugme.style.marginTop = "5px"
        dugme.style.marginBottom = "5px"
        dugme.innerHTML = "Izmeni informacije o cvetu";
        host.appendChild(dugme);
        dugme.onclick = (async (ev) => {
            const kol = parseInt(host.querySelector(".kolCvetaInv").value);
            const cena = parseInt(host.querySelector(".cenaCvetaInv").value);

            if(kol == this.kolicinaCveta && cena == this.cenaCveta){
                alert("Niste promenili nikakve informacije o cvetu!")
            }
            else{
                let cvetIz = new Cvet(this.cvetID, this.nazivCveta, cena,kol, this.bojaCveta)
                let api = new Api();
                await api.IzmeniCvet(cvetIz);
            }
        })
    }
}