export type SendReportOptions = {
    reason: ReportReason.Other;
    content: string;
} | {
    reason: Exclude<ReportReason, ReportReason.Other>;
};

export type SendReportResponse = {
    reportId: string;
};
