interface LocationDto {
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