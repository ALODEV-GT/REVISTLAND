import { ChargePeriodAdDto } from "./charge-period-ad.interface";

export interface AdPostDto {
    chargePeriodAd: number;
    content: string;
    imageUrl: string;
    videoUrl: string;
}

export interface updateAd {
    content: string;
    imageUrl: string;
    videoUrl: string;
}

export interface TotalAdsDto {
    total: number;
    totalActive: number;
}

export interface TotalViewsAdDto {
    total: number;
}

export interface AdDto {
    id: number;
    advertiser: number;
    content: string;
    imageUrl: string;
    videoUrl: string;
    createdAt: Date;
    expiresAt: Date;
    isActive: boolean;
    changePeriodAd: ChargePeriodAdDto;
}

export interface ViewAdDto{
    urlView: string;
    createdAt: Date;
}

export interface AdViewReportDto {
    adDto:AdDto,
    viewsAdDto: ViewAdDto [];
}

export interface PostAdMount {
    month: string;
    count: number;
}

export interface TotalAmountMoth {
    month: string;
    amount: number;
}

export interface CountAdByTypeDto{
    adType:string;
    count:number;
}