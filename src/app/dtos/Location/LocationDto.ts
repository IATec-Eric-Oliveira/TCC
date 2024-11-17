import { CategoryDto } from "../Category/CategoryDto";
import { RatingDto } from "../Rating/RatingDto";

export interface LocationDto {
    id: number;
    name: string;
    description: string;
    address: string;
    longitude: number;
    latitude: number;
    userOwnerId: number;
    ratings: RatingDto[];
    categories: CategoryDto[];
}