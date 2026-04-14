
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
        
        if (products == null)
            return BadRequest();
        
        return Ok(products); // Returns JSON
    }

    [HttpGet("recommended")]
    public async Task<IActionResult> GetRecommendedListings(string customerLocation)
    {
        var listings = await _context.Listings.ToListAsync();

        var recommended = listings
            .Where(l => l.CarLocation.ToLower() == customerLocation.ToLower())
            .ToList();

        return Ok(recommended);
    }


    //search api call
     // GET /api/Listing/search?query=apartment
    [HttpGet("search")]
    public async Task<IActionResult>Search([FromQuery] string query)
    {
        // returns nothing 
        if (string.IsNullOrWhiteSpace(query))
            return Ok(new List<Listing>());

        var results = await _context.Listings.Where(listing => listing.CarName.Contains(query.ToLower())).Select(listing => new
        {
        id =  listing.Id,
        carName = listing.CarName
        }
        ).ToListAsync();

        return Ok(results);
    }  

    [HttpPost]
    public async Task<IActionResult> CreateListing(Listing listing)
    {
        _context.Listings.Add(listing);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProducts), new { id = listing.Id }, listing);
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteListing(int id)
    {
        var listing = await _context.Listings.FindAsync(id);

        if (listing == null)
            return NotFound();

        _context.Listings.Remove(listing);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetListing(int id)
    {
        var listing = await _context.Listings.FindAsync(id);

        if (listing == null)
            return NotFound();

        return Ok(new
        {
            car_name = listing.CarName,
            owner_name = listing.OwnerId, 
            owner_image = "/images/user.jpg", 
            description = $"A {listing.Year} {listing.CarName}", 

            average_rating = listing.Review, 
            eligible_for_review = true, 

            price_per_day = listing.Price,

            
            available_start_date = DateTime.Now,
            available_end_date = DateTime.Now.AddMonths(1)
        });
    }


}