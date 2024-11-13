interface CreateReportDto {
    comment: string;
    userReportedId: number;
    reasons?: number[];
}