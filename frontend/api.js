import {Polica} from "./polica.js"
import {Cvet} from "./cvet.js"
import {Buket} from "./buket.js"

export class Api{
    constructor() {
        
    }

    async VratiSvePolice(){
        try{
            let response = await fetch(`https://localhost:5001/Cvecara/VratiPolice`);
            switch(response.status){
                case 200:{
                    let data= await response.json();
                    let police=[];
                    data.forEach(el => {
                        const polica = new Polica(el.policaID, el.nazivPolice, el.opisPolice, el.kapacitet, el.tren)
                        police.push(polica);               
                    });
                    return police;
                }
                case 204:{
                    return [];
                }
                case 400:{
                    alert(`Client error: ${await response.text()}`);
                    return null;
                }
                default:{
                    alert(`Server error: ${await response.text()}`);
                    return null;
                }
            }
        }
        catch(error) {
            console.error(error);
        }
    }

    async VratiSveCvetove(){
        try{
            let response = await fetch(`https://localhost:5001/Cvecara/VratiCvetove`);
            switch(response.status){
                case 200:{
                    let data= await response.json();
                    let cvetovi=[];
                    data.forEach(el => {
                        const cvet = new Cvet(el.cvetID, el.nazivCveta, el.cenaCveta, el.kolicinaCveta, el.bojaCveta)
                        cvetovi.push(cvet);               
                    });
                    return cvetovi;
                }
                case 204:{
                    return [];
                }
                case 400:{
                    alert(`Client error: ${await response.text()}`);
                    return null;
                }
                default:{
                    alert(`Server error: ${await response.text()}`);
                    return null;
                }
            }
        }
        catch(error) {
            console.error(error);
        }
    }

    async DodajPolicu(polica)
    {
        try{
            let response = await fetch(`https://localhost:5001/Cvecara/DodajPolicu`, {
                headers: {
                    Accept:"application/json",
                    "Content-type": "application/json",
                },
                method:"POST",
                body: JSON.stringify(polica)
            });
            switch(response.status){
                case 200: {
                    location.reload();
                    return true;
                }
                case 400:{
                    alert(`Client error: ${await response.text()}`);
                    return false;
                }
                default:{
                    alert(`Server error: ${await response.text()}`);
                    return false;
                }
            }
        }
        catch(error) {
            console.error(error);
            return null;
        }

    }

    async DodajCvet(cvet)
    {
        try{
            let response = await fetch(`https://localhost:5001/Cvecara/DodajCvet`,{
                headers : {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                method:"POST",
                body:JSON.stringify(cvet)          
            });
            switch(response.status)
            {
                case 200 : {
                    location.reload();
                    return true;
                }
                case 400 : {
                    alert(`Client error: ${await response.text()}`);
                    return false;
                }
                default : {
                    alert(`Server error: ${await response.text()}`);
                    return false;
                }
            }
        }
        catch(error)
        {
            console.log(error);
            return null;
        }
    }

    async IzbrisiCvet(IDCveta)
    {
        try{
            let response = await fetch(`https://localhost:5001/Cvecara/IzbrisiCvet/${IDCveta}`);
            switch(response.status){
                case 200 : {
                    location.reload();
                    return true;
                }
                case 400 : {
                    alert(`Client error: ${await response.text()}`);
                    return false;
                }
                default : {
                    alert(`Server error: ${await response.text()}`);
                    return false;
                }
            }
        }
        catch(error){
            console.log(error);
            return null;
        }
    }

    async IzmeniCvet(cvet)
    {
        try{
            let response = await fetch(`https://localhost:5001/Cvecara/IzmeniCvet`, {
                headers: {
                    Accept:"application/json",
                    "Content-type": "application/json",
                },
                method:"PUT",
                body: JSON.stringify(cvet)
            });
            switch(response.status)
            {
                case 200: {
                    location.reload();
                    return true;
                }
                case 400: {
                    alert(`Client error: ${await response.text()}`);
                    return false;
                }
                default: {
                    alert(`Server error: ${await response.text()}`);
                    return false;
                }
            }
        }
        catch(error)
        {
            console.error(error);
            return null;
        }
    }

    async IzmeniPolicu(polica)
    {
        try{
            let response = await fetch(`https://localhost:5001/Cvecara/IzmeniPolicu`, {
                headers: {
                    Accept:"application/json",
                    "Content-type": "application/json",
                },
                method:"PUT",
                body: JSON.stringify(polica)
            });
            switch(response.status)
            {
                case 200: {
                    location.reload();
                    return true;
                }
                case 400: {
                    alert(`Client error: ${await response.text()}`);
                    return false;
                }
                default: {
                    alert(`Server error: ${await response.text()}`);
                    return false;
                }
            }
        }
        catch(error)
        {
            console.error(error);
            return null;
        }
    }

    async IzbrisiBuket(IDBuketa)
    {
        try{
            let response = await fetch(`https://localhost:5001/Cvecara/IzbrisiBuket`, {
                headers: {
                    Accept:"application/json",
                    "Content-type": "application/json",
                },
                method:"DELETE",
                body: JSON.stringify(IDBuketa)
            });
            switch(response.status){
                case 200 : {
                    location.reload();
                    return true;
                }
                case 400 : {
                    alert(`Client error: ${await response.text()}`);
                    return false;
                }
                default : {
                    alert(`Server error: ${await response.text()}`);
                    return false;
                }
            }
        }
        catch(error){
            console.log(error);
            return null;
        }
    }

    async DodajBuket(buket, IDPolice)
    {
        try{
            let response = await fetch(`https://localhost:5001/Cvecara/DodajBuket/${IDPolice}`,{
                headers : {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                method:"POST",
                body:JSON.stringify(buket)          
            });
            switch(response.status)
            {
                case 200 : {
                    location.reload();
                    return true;
                }
                case 204 : {
                    alert("Kapacitet izabrane police je vec popunjen!")
                    return false;
                }
                case 400 : {
                    alert(`Client error: ${await response.text()}`);
                    return false;
                }
                default : {
                    alert(`Server error: ${await response.text()}`);
                    return false;
                }
            }
        }
        catch(error)
        {
            console.log(error);
            return null;
        }
        
    }

    async VratiSveBuketeNaPolici(IDPolice)
    {
        try{
            let response = await fetch(`https://localhost:5001/Cvecara/VratiBukete/${IDPolice}`);
            switch(response.status){
                case 200:{
                    let data= await response.json();
                    let buketi=[];
                    data.forEach(el => {
                        let buket= new Buket(el.buketID,el.nazivBuketa, el.cenaBuketa, el.policaID,el.cvetoviUBuketu);
                        buketi.push(buket);                    
                    });
                    return buketi;
                }
                case 204:{
                    return [];
                }
                case 400:{
                    alert(`Client error: ${await response.text()}`);
                    return null;
                }
                default:{
                    alert(`Server error: ${await response.text()}`);
                    return null;
                }
            }
        }
        catch(error) {
            console.error(error);
        }
    }

    async VratiCvet(IDCveta){
        try{
            let response = await fetch(`https://localhost:5001/Cvecara/VratiCvet/${IDCveta}`);
            switch(response.status){
                case 200:{
                    let data= await response.json();
                    let cvet = new Cvet(data.cvetID, data.nazivCveta, data.cenaCveta, data.kolicinaCveta, data.bojaCveta);
                    return cvet;
                }
                case 204:{
                    return [];
                }
                case 400:{
                    alert(`Client error: ${await response.text()}`);
                    return null;
                }
                default:{
                    alert(`Server error: ${await response.text()}`);
                    return null;
                }
            }
        }
        catch(error) {
            console.error(error);
        }
    }

    async IzbrisiPolicu(IDPolice)
    {
        try{
            let response = await fetch(`https://localhost:5001/Cvecara/IzbrisiPolicu`, {
                headers: {
                    Accept:"application/json",
                    "Content-type": "application/json",
                },
                method:"DELETE",
                body: JSON.stringify(IDPolice)
            });
            switch(response.status){
                case 200 : {
                    location.reload();
                    return true;
                }
                case 400 : {
                    alert(`Client error: ${await response.text()}`);
                    return false;
                }
                default : {
                    alert(`Server error: ${await response.text()}`);
                    return false;
                }
            }
        }
        catch(error){
            console.log(error);
            return null;
        }
    }
}