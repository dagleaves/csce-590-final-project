namespace webapp.Server.Models
{
    public class Achievement
    {
        public int Id { get; set; }
        public DateTime CertifiedDate { get; set; }

        public int EmployeeId { get; set; }
        public Employee Employee { get; set; } = null!;

        public required string CertificateName { get; set; }
        public Certificate Certificate { get; set; } = null!;
    }
}
