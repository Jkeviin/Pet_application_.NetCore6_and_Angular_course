using Microsoft.EntityFrameworkCore;

namespace BE_CRUDMascotas.Models.Repository
{
    public class MascotaRepository: IMascotaRespository
    {
        private readonly AplicationDbContext _context;
        public MascotaRepository(AplicationDbContext context)
        {
            _context = context;

        }

        public async Task<Mascota> AddMascota(Mascota mascota)
        {
            // Agrega Mascota a la base de datos
            _context.Add(mascota);
            // Guarda cambios en la base de datos
            await _context.SaveChangesAsync();
            return (mascota);
        }

        public async Task DeleteMascota(Mascota mascota)
        {
            // Elimina de la base de datos
            _context.Mascotas.Remove(mascota);
            // Guarda cambios en la base de datos
            await _context.SaveChangesAsync();
        }

        public async Task<Mascota> GetMascotaById(int id)
        {
            var mascota = await _context.Mascotas.FindAsync(id);
            return mascota!;
        }

        public async Task<List<Mascota>> GetMascotaList()
        {
            return await _context.Mascotas.ToListAsync();
        }

        public async Task UpdateMascota(Mascota mascota)
        {
            var mascotaItem = await _context.Mascotas.FirstOrDefaultAsync(x => x.Id == mascota.Id);

            if(mascotaItem != null)
            {

                // Edita los valores
                mascotaItem.Nombre = mascota.Nombre;
                mascotaItem.Edad = mascota.Edad;
                mascotaItem.Peso = mascota.Peso;
                mascotaItem.Color = mascota.Color;
                mascotaItem.Raza = mascota.Raza;

                // Guarda cambios en la base de datos.
                await _context.SaveChangesAsync();
            }

        }
    }
}
