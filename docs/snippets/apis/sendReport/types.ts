export declare enum ReportReason {
    Sensitive = 1,
    Annoy = 2,
    Fraud = 3,
    Other = 0,
}

export type SendReportOptions = {
    reason: ReportReason.Other;
    content: string;
} | {
    reason: Exclude<ReportReason, ReportReason.Other>;
};

export type SendReportResponse = {
    reportId: string;
};