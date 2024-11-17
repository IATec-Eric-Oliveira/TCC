export interface RatingDto {
    id: number;
    score: number;
    comment?: string;
    userId: number;
    locationId: number;
}