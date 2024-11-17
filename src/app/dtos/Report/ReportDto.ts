import { ReasonDto } from "../Reason/ReasonDto";

export interface ReportDto {
    id: number;
    comment: string;
    userSenderId: number;
    userReportedId: number;
    reasons: ReasonDto[];
}