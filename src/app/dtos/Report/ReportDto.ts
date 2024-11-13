interface ReportDto {
    id: number;
    comment: string;
    userSenderId: number;
    userReportedId: number;
    reasons: ReasonDto[];
}