import { LocationDto } from "../Location/LocationDto";

export interface UserDto {
    id: number;
    name: string;
    email: string;
    bio: string;
    locationsOwned?: LocationDto[];
}