export interface IBooking {
    _id?: string;
    booking_date_start: string;
    booking_date_end?: string;
    experience_id: string;
    comments: string;
    user_id?: string;
}