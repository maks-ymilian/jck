namespace JCK.Controllers;

using Clerk.BackendAPI;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private static ClerkBackendApi clerk = new (Environment.GetEnvironmentVariable("CLERK_SECRET_KEY"));

    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(string id)
    {
        return Ok(await clerk.Users.GetAsync(id));
    }
}
