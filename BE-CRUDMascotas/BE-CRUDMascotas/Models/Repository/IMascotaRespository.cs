namespace BE_CRUDMascotas.Models.Repository
{
    public interface IMascotaRespository
    {
        // Retorna listado Mascota
        Task<List<Mascota>> GetMascotaList();

        // Retorna Mascota
        Task<Mascota> GetMascotaById(int id);

        // No retorna, solo hace proceso
        Task DeleteMascota(Mascota mascota);
        Task<Mascota> AddMascota(Mascota mascota);
        Task UpdateMascota(Mascota mascota);
    }
}
