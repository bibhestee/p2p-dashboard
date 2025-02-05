import moment from "moment";

export function formatDate(date: string): string {
    return moment(date).format("MMMM Do YYYY, h:mm a")
}