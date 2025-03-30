export class BookData {
    title: string;
    checkinDate: string;
    checkoutDate: string;
    numberOfNights: number;
    numberOfAdults: number;
    numberOfKids: number;

    constructor(
        title: string,
        checkinDate: string,
        checkoutDate: string,
        numberOfNights: number,
        numberOfAdults: number,
        numberOfKids: number
    ) {
        this.title = title;
        this.checkinDate = checkinDate;
        this.checkoutDate = checkoutDate;
        this.numberOfNights = numberOfNights;
        this.numberOfAdults = numberOfAdults;
        this.numberOfKids = numberOfKids;
    }
}
