namespace JCK.Models;

public class Image
{
    public int Id { get; set; }
    public int ListingId { get; set; }
    public string URL { get; set; } = string.Empty;
    public int Index { get; set; }
}