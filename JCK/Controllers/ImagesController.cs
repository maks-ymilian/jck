using Amazon;
using Amazon.S3;
using Amazon.S3.Model;

[ApiController]
[Route("api/[controller]")]
public class ImagesController : ControllerBase // inherits from controller base 
{
    private readonly AppDbContext _context;
    const string BUCKET_NAME = "images";
    private AmazonS3Client s3Client = new(
        Environment.GetEnvironmentVariable("S3_ACCESS_KEY_ID"),
        Environment.GetEnvironmentVariable("S3_SECRET_KEY"),
        new AmazonS3Config{
            RegionEndpoint = RegionEndpoint.EUWest1,
            ServiceURL = "https://xwzyxydorcpaouxfyumm.storage.supabase.co/storage/v1/s3",
            ForcePathStyle = true,
        });

    public ImagesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("upload")]
    public async Task<IActionResult> UploadFile(List<IFormFile> files)
    {
        if (files == null || files.Count == 0)
            return BadRequest("No file provided");

        var urls = new List<string>();
        foreach (var file in files)
        { 
            using var stream = new MemoryStream();
            await file.CopyToAsync(stream);
            stream.Position = 0;

            string file_name = Guid.NewGuid().ToString();
            await s3Client.PutObjectAsync(new PutObjectRequest{BucketName = BUCKET_NAME, Key = file_name, InputStream = stream, ContentType = file.ContentType});
            urls.Add($"https://xwzyxydorcpaouxfyumm.supabase.co/storage/v1/object/public/{BUCKET_NAME}/{file_name}");
        }
        return Ok(new {urls});
    }
}