export interface AdReportDto {
    adType: string;
    username: string;
    datePay: Date;
    plan: number,
    amount: number;
}

export interface MagazineReportDto {
    title: string;
    editor: string;
    datePay: Date;
    amount: number;
}

export interface MagazineCostTotalDto {
    title: string;
    costPerDay: number;
    createdAt: Date;
    username: string;
    costTotal: number;
}

export interface EarningsReport {
    totalEarnings: number;
    totalAdPost: number;
    totalAdBlocks: number;
    totalCostPerDay: number;
    totalIncome: number;
    adReportDto: AdReportDto[];
    magazineReportDto: MagazineReportDto[];
    magazineCostTotalDto: MagazineCostTotalDto[];
}

export interface PostAdReportTotal{
    adReportDto: AdReportDto[];
    totalAdPost: number;
}

