interface UserDto {
    id: number;
    name: string;
    userName: string;
    bio: string;
    locationsOwned?: LocationDto[];
}