

[ApiController]
[Route("api/[controller]")]
public class ListingController : ControllerBase // inherits from controller base 

{
    
    private readonly AppDbContext _context;

     public ListingController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetProducts()
    {
        var products = await _context.Listings.ToListAsync();
        return Ok(products); // Returns JSON
    }
}