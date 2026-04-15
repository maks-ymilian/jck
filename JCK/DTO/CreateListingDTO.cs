using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JCK.DTO
{
    public class CreateListingDTO
    {
        public string CarName { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public decimal Price { get; set; }

    public int Year { get; set; }

    public string CarLocation { get; set; } = string.Empty;

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }
    }
}