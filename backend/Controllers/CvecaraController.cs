using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CvecaraController : ControllerBase
    {
        public CvecaraContext Context { get; set; }
        public CvecaraController(CvecaraContext context)
        {
            Context = context;
        }

        [Route("VratiPolice")]
        [HttpGet]
        public async Task<List<Polica>> VratiPolice()
        {
            return await Context.Police.Include(p => p.buketiNaPolici).ToListAsync();
        }

        [Route("DodajPolicu")]
        [HttpPost]
        public async Task DodajPolicu([FromBody] Polica p)
        {
            Context.Police.Add(p);
            await Context.SaveChangesAsync();
        }

        [Route("IzmeniPolicu")]
        [HttpPut]
        public async Task IzmeniPolicu([FromBody] Polica p)
        {
            Context.Update<Polica>(p);
            await Context.SaveChangesAsync();
        }

        [Route("IzbrisiPolicu")]
        [HttpDelete]
        public async Task IzbrisiPolicu([FromBody] int ID)
        {
            var pol = await Context.Police.Include(p => p.buketiNaPolici).Where(p => p.policaID == ID).ToListAsync();
            Context.Remove(pol[0]);
            await Context.SaveChangesAsync();
        }

        [Route("VratiBukete/{IDPolice}")]
        [HttpGet]
        public async Task<List<Buket>> VratiBukete([FromRoute] int IDPolice)
        {
            return await Context.Buketi.Include(p => p.cvetoviUBuketu).Where(p => p.polica.policaID == IDPolice).ToListAsync();
        }

        [Route("DodajBuket/{IDPolice}")]
        [HttpPost]
        public async Task<IActionResult> DodajBuket([FromRoute] int IDPolice, [FromBody] Buket b)
        {
            var polica = await Context.Police.FindAsync(IDPolice);
            if(polica.tren == polica.kapacitet)
            {
                return StatusCode(204);
            }
            else
            {
                b.polica = polica;
                b.polica.tren++;
                int cena = 0;
                foreach(PripadaBuketu p in b.cvetoviUBuketu)
                    {
                        var cvet = await Context.Cvetovi.FindAsync(p.cvetID);
                        cvet.kolicinaCveta -= p.kolicina;
                        cena += p.kolicina*cvet.cenaCveta;
                    }
                b.cenaBuketa = cena;
                Context.Buketi.Add(b);
                await Context.SaveChangesAsync();
                return StatusCode(200);
            }
            
        }

        [Route("IzbrisiBuket")]
        [HttpDelete]
        public async Task IzbrisiBuket([FromBody] int IDBuketa)
        {
            var buket = await Context.Buketi.FindAsync(IDBuketa);
            int idpolice = buket.policaID;
            var polica = await Context.Police.FindAsync(idpolice);
            polica.tren--;
            Context.Remove(buket);
            await Context.SaveChangesAsync();
        }

        [Route("VratiCvetove")]
        [HttpGet]
        public async Task<List<Cvet>> VratiCvetove()
        {
            return await Context.Cvetovi.ToListAsync();
        }

        [Route("VratiCvet/{IDCveta}")]
        [HttpGet]
        public async Task<Cvet> VratiCvet([FromRoute] int IDCveta)
        {
            return await Context.Cvetovi.FindAsync(IDCveta);
        }

        [Route("DodajCvet")]
        [HttpPost]
        public async Task DodajCvet([FromBody] Cvet c)
        {
            Context.Cvetovi.Add(c);
            await Context.SaveChangesAsync();
        }

        [Route("IzbrisiCvet/{IDCveta}")]
        [HttpDelete]
        public async Task IzbrisiCvet([FromRoute] int IDCveta)
        {
            var cvet = await Context.Cvetovi.FindAsync(IDCveta);
            Context.Remove(cvet);
            await Context.SaveChangesAsync();
        }

        [Route("IzmeniCvet")]
        [HttpPut]
        public async Task IzmeniCvet([FromBody] Cvet c)
        {
            Context.Update<Cvet>(c);
            await Context.SaveChangesAsync();
        }
    }
}
