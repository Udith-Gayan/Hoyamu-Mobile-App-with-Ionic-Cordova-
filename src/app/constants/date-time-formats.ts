export abstract class DateTimeConstants{
    static readonly DATEONLYSTANDARD = "DD/MM/YYYY";

    static getSinhalaShortMonthNames(): string[] {
        return ["ජනවාරි", "පෙබරවාරි", "මාර්තු", "අප්‍රේල්", "මැයි", "ජූනි", "ජූලි", "අගෝස්තු", "සැප්තැම්බර්", "ඔක්තොබර්", "නොවැම්බර්", "දෙසැම්බර්"];
    }

    static getEnglishShortMonthNames(): string[] {
        return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    }
}