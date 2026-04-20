export function shake_element(element)
{
    element.classList.add("shake");
    element.addEventListener("animationend", () => element.classList.remove("shake"), {once: true});
}

export function format_date(date)
{
    if (date.getFullYear() === new Date().getFullYear())
        return date.toLocaleDateString(undefined, { month: "long", day: "numeric" });
    else
        return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

export function format_date_range(date_start, date_end, capitalize = false)
{
    if (!(date_start instanceof Date)) date_start = new Date(date_start);
    if (!(date_end instanceof Date)) date_end = new Date(date_end);
    const now = new Date();

    if (date_start < now && date_end > now)
    {
        const until = capitalize ? "Until" : "until";
        return until + " " + format_date(date_end);
    }

    let start_format = {day: "numeric"};
    let end_format = {day: "numeric", month: "long"};

    if (date_start.getFullYear() !== now.getFullYear() || date_end.getFullYear() !== now.getFullYear())
    {
        start_format.year = "numeric";
        start_format.month = "long";
        end_format.year = "numeric";
    }

    if (date_start.getMonth() != date_end.getMonth())
        start_format.month = "long";

    return date_start.toLocaleDateString(undefined, start_format) + " - " + date_end.toLocaleDateString(undefined, end_format);
}

