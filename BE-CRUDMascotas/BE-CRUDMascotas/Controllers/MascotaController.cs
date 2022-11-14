using AutoMapper;
using BE_CRUDMascotas.Models;
using BE_CRUDMascotas.Models.DTO;
using BE_CRUDMascotas.Models.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BE_CRUDMascotas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MascotaController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMascotaRespository _mascotaRespository;

        public MascotaController(IMapper mapper, IMascotaRespository mascotaRespository)
        {
            _mapper = mapper;
            _mascotaRespository = mascotaRespository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var listMascotas = await _mascotaRespository.GetMascotaList();


                var listMascotasDTO = _mapper.Map<IEnumerable<MascotaDTO>>(listMascotas);

                return Ok(listMascotasDTO);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var mascota = await _mascotaRespository.GetMascotaById(id);

                if (mascota == null) return NotFound();

                var mascotaDTO = _mapper.Map<MascotaDTO>(mascota);

                return Ok(mascotaDTO);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                // Filtra y guarda
                var mascota = await _mascotaRespository.GetMascotaById(id);

                if (mascota == null) return NotFound();

                await _mascotaRespository.DeleteMascota(mascota);

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(MascotaDTO mascotaDTO)
        {
            try
            {
                var mascota = _mapper.Map<Mascota>(mascotaDTO);

                mascota.FechaCreacion = DateTime.Now;

                var mascotaItem = await _mascotaRespository.AddMascota(mascota);

                var mascotaItemDTO = _mapper.Map<MascotaDTO>(mascotaItem);

                return CreatedAtAction("Get", new { id = mascotaItemDTO.Id }, mascotaItemDTO);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, MascotaDTO mascotaDTO)
        {
            try
            {
                var mascota = _mapper.Map<Mascota>(mascotaDTO);

                if (id != mascota.Id) return BadRequest();

                // filtra y guarda en una variable
                var mascotaItem = await _mascotaRespository.GetMascotaById(id);

                if (mascotaItem == null) return NotFound();

                await _mascotaRespository.UpdateMascota(mascota);

                return NoContent();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);

            }
        }
    }
}
