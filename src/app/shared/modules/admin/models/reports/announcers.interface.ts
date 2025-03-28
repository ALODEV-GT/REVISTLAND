export interface AdReportEmailDto {
    adType: string;
    username: string;
    datePay: Date;
    plan: number,
    amount: number;
    email: string;
}

export interface PaymentPostAdPerAnnouncerDto {
    amountTotal: number;
    adReportDtos: AdReportEmailDto[];
    username: string;
}

export interface TotalReportPaymentPostAdByAnnouncersDto {
    paymentPostAdPerAnnouncerDtos: PaymentPostAdPerAnnouncerDto[];
    totalAdPost: number;

}