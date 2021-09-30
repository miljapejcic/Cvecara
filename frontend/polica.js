import { Cvet } from "./cvet.js";
import { Buket } from "./buket.js";
import { Api } from "./api.js";

export class Polica{
    constructor(policaID, naziv, opis, kapacitet, tren){
        this.policaID = policaID;
        this.nazivPolice = naziv;
        this.opisPolice = opis;
        this.kapacitet = kapacitet;
        this.buketiNaPolici = [];
        this.tren = tren;
        this.container = null;
    }

    DodajBuket(buket){
        this.buketiNaPolici.push(buket);
    }

    NacrtajPolicu(host){
        if(!host){
            throw new Exception("Roditeljski element ne postoji");
        }
        else{
            this.container = document.createElement("div");
            this.container.classList.add("policaDiv");
            host.appendChild(this.container);

            let infoDiv = document.createElement("div");
            infoDiv.className = "policaInfoDiv";
            this.NapisiInfoOPolici(infoDiv);
            this.container.appendChild(infoDiv);

            let buketiDiv = document.createElement("div");
            buketiDiv.className = "policaBuketiDiv";
            this.NacrtajBukete(buketiDiv);
            this.container.appendChild(buketiDiv);
        }
    }

    NapisiInfoOPolici(host){
        let tmp = document.createElement("h3");
        tmp.className = "nazivPoliceInfo"
        tmp.innerHTML = `${this.nazivPolice} (kapacitet=${this.kapacitet})`;
        host.appendChild(tmp);

        tmp = document.createElement("p");
        tmp.className = "opisPoliceInfo"
        tmp.innerHTML = this.opisPolice;
        host.appendChild(tmp)

        let divZaDugmicePolice = document.createElement("div")
        divZaDugmicePolice.className = "divZaDugmicePolice"
        host.appendChild(divZaDugmicePolice);

        let divZaIzmene = document.createElement("div");
        divZaIzmene.className = "divZaIzmenePolice"
        divZaIzmene.style.display = "none";
        host.appendChild(divZaIzmene)

        let labela = document.createElement("label");
        labela.innerHTML = "Izmenite naziv police:";
        divZaIzmene.appendChild(labela);

        let poljeZaUnos = document.createElement("input");
        poljeZaUnos.className = "noviNazivPolice";
        poljeZaUnos.defaultValue = this.nazivPolice;
        divZaIzmene.appendChild(poljeZaUnos);

        labela = document.createElement("label");
        labela.innerHTML = "Izmenite opis police";
        divZaIzmene.appendChild(labela);

        poljeZaUnos = document.createElement("textarea");
        poljeZaUnos.rows = 2;
        poljeZaUnos.style.resize = "none"
        poljeZaUnos.className = "noviOpisPolice";
        poljeZaUnos.defaultValue = this.opisPolice;
        divZaIzmene.appendChild(poljeZaUnos);
        
        labela = document.createElement("label");
        labela.innerHTML = "Izmenite kapacitet police";
        divZaIzmene.appendChild(labela);

        poljeZaUnos = document.createElement("input");
        poljeZaUnos.className = "noviKapPolice";
        poljeZaUnos.type = "number";
        if(this.tren > 0){
            poljeZaUnos.min = this.tren;
        }
        else if(this.tren == 0){
            poljeZaUnos.min = 1;
        }
        poljeZaUnos.defaultValue = this.kapacitet;
        divZaIzmene.appendChild(poljeZaUnos);

        const dugme3 = document.createElement("button");
        dugme3.innerHTML = "Izmeni informacije";
        divZaIzmene.appendChild(dugme3);
        dugme3.onclick = (async (ev) => {
            let n = divZaIzmene.querySelector(".noviNazivPolice").value;
            let o = divZaIzmene.querySelector(".noviOpisPolice").value;
            let k = divZaIzmene.querySelector(".noviKapPolice").value;
            if(n == this.nazivPolice && o ==this.opisPolice && k == this.kapacitet){
                alert("Niste promenili nikakve informacije o polici!")
            }
            else if(n != "" && o != "" && k){
                this.nazivPolice = n;
                this.opisPolice = o;
                this.kapacitet = k;
                let api = new Api();
                api.IzmeniPolicu(this);
            }
            else{
                alert("Sva polja moraju biti popunjena!")
            }
        })

        const dugme = document.createElement("button");
        // dugme.style.marginTop = "5px"
        // dugme.style.marginBottom = "5px"
        dugme.innerHTML = "Izmeni informacije o polici";
        dugme.className = "dugmeZaPolicu"
        divZaDugmicePolice.appendChild(dugme);
        dugme.onclick = ((ev) => {
            if(dugme.innerHTML == "Izmeni informacije o polici"){
                dugme.innerHTML = "Odustani od izmene"
                divZaIzmene.style.display = "flex";
                divZaIzmene.style.flexDirection = "column";
            }
            else{
                dugme.innerHTML = "Izmeni informacije o polici";
                divZaIzmene.style.display = "none";
            }
        })

        const dugme2 = document.createElement("button");
        dugme2.className = "dugmeZaPolicu"
        dugme2.innerHTML = "Izbrisi policu";
        divZaDugmicePolice.appendChild(dugme2);
        dugme2.onclick = (async (ev) => {
            let api = new Api();
            api.IzbrisiPolicu(this.policaID);
        })
    }

    async NacrtajBukete(host){
        let api = new Api();
        this.buketiNaPolici = await api.VratiSveBuketeNaPolici(this.policaID)
        let tmp;
        this.buketiNaPolici.forEach(el=>{
            tmp = document.createElement("div");
            tmp.className = "buketDiv"
            el.NacrtajBuket(tmp);
            host.appendChild(tmp)
        })
    }
    
    
}