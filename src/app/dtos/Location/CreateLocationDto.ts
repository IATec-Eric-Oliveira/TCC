export interface CreateLocationDto {
    name: string;
    description: string;
    address: string;
    longitude: number;
    latitude: number;
    categories?: number[];
}