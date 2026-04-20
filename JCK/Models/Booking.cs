namespace JCK.Models;

public class Booking
{
    public int Id { get; set; }
    public int ListingId { get; set; }
    public string? UserId { get; set; }
    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }
}