export class Helper {

    /**
     * Get tomorrow day as a string
     * @returns tomorrow day as a string
     */
    static getTomorrowDayAsString(): string {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        return tomorrow.getDate().toString();
    }

    /**
     * Pad a trailing zero to days like 1,2,3,4,5,6,7,8,9 (one digit days in month)
     * @param dateStr is in format of "Tue 1 Apr 2025" (Look, there is no trailing zero)
     * @returns returns a string that represents the date in the original format or
     *          in format with trailing zero like "Tue 01 Apr 2025"
     */
    static padDay(dateStr: string): string {
        // This regex splits the string into three groups:
        // 1. The day-of-week (e.g., "Tue ") including any trailing spaces.
        // 2. The day number (1 or 2 digits).
        // 3. The rest of the date (e.g., " Apr 2025").
        const regex = /^([A-Za-z]{3}\s+)(\d{1,2})(\s+[A-Za-z]{3}\s+\d{4})$/;
        const match = dateStr.match(regex);

        if (match) {
            let day = match[2];
            // If day is one digit, pad it with a 0.
            if (day.length === 1) {
                day = '0' + day;
            }
            return match[1] + day + match[3];
        }

        // If the format doesn't match, return the original string.
        return dateStr;
    }
}

