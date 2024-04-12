using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapp.Server.Data;
using webapp.Server.Models;
// Other using directives...

[ApiController]
[Route("[controller]")]
public class CertificateController : ControllerBase
{
    private readonly EmployeeContext _context;

    public CertificateController(EmployeeContext context)
    {
        _context = context;
    }

    // POST: api/Certificate
    [HttpPost]
    public async Task<ActionResult<Certificate>> CreateCertificate(Certificate certificate)
    {
        _context.Certificates.Add(certificate);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetCertificate), new { name = certificate.Name }, certificate);
    }

    // GET: api/Certificate
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Certificate>>> GetCertificates()
    {
        return await _context.Certificates.ToListAsync();
    }

    // GET: api/Certificate/5
    [HttpGet("{name}")]
    public async Task<ActionResult<Certificate>> GetCertificate(string name)
    {
        var certificate = await _context.Certificates.FindAsync(name);
        if (certificate == null)
        {
            return NotFound();
        }
        return certificate;
    }

    // PUT: api/Certificate/5
    [HttpPut("{name}")]
    public async Task<IActionResult> UpdateCertificate(string name, Certificate certificate)
    {
        if (name != certificate.Name)
        {
            return BadRequest();
        }

        _context.Entry(certificate).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!CertificateExists(name))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: api/Certificate/5
    [HttpDelete("{name}")]
    public async Task<IActionResult> DeleteCertificate(string name)
    {
        var certificate = await _context.Certificates.FindAsync(name);
        if (certificate == null)
        {
            return NotFound();
        }

        _context.Certificates.Remove(certificate);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool CertificateExists(string name)
    {
        return _context.Certificates.Any(e => e.Name == name);
    }
}