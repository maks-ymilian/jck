
using System.Formats.Asn1;

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


    //search api call
     // GET /api/Listing/search?query=apartment
    [HttpGet("search")]
    public async Task<IActionResult>Search([FromQuery] string query)
    {
        // returns nothing 
        if (string.IsNullOrWhiteSpace(query))
            return Ok(new List<Listing>());

        var results = _context.Listings.Where(listing => listing.CarName.ToLower().Contains(query.ToLower())).Select(listing => new
        {
            listing.CarName
        }
        ).ToListAsync();

        return Ok(results);
    }           
}