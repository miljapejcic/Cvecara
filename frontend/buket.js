import { Api } from "./api.js";

export class Buket{
    constructor(buketID, nazivBuketa, cenaBuketa, policaID, cvetoviUBuketu) {
        this.buketID = buketID;
        this.nazivBuketa = nazivBuketa;
        this.cenaBuketa = cenaBuketa;
        this.policaID = policaID; 
        this.cvetoviUBuketu = cvetoviUBuketu;
    }

    NacrtajBuket(host){
        let tmp = document.createElement("div");
        tmp.className = "unutarBuketa"
        let l = document.createElement("h4");
        l.innerHTML = `${this.nazivBuketa}, cena: ${this.cenaBuketa} dinara`;
        tmp.appendChild(l);
        
        let cveceDiv = document.createElement("div");
        cveceDiv.className = "cveceUBuketuDiv"
        this.NacrtajCvece(cveceDiv);
        tmp.appendChild(cveceDiv);

        let btnDiv = document.createElement("div")
        btnDiv.className = "btnProdaj"

        const dugme = document.createElement("button");
        dugme.innerHTML = "Prodaj buket";
        btnDiv.appendChild(dugme)
        tmp.appendChild(btnDiv);
        dugme.onclick = (async (ev) => {
            let api = new Api();
            await api.IzbrisiBuket(this.buketID)
        })
        host.appendChild(tmp);

    }

    async NacrtajCvece(host){
        let tmp;
        let api = new Api();
        let cvet;
        this.cvetoviUBuketu.forEach(async (el) => {
            cvet = await api.VratiCvet(el.cvetID)
            tmp = document.createElement("div");
            tmp.className = "cvetUBuketuDiv"
            cvet.NacrtajCvet(tmp, el.kolicina);
            host.appendChild(tmp)
        });
    }
}