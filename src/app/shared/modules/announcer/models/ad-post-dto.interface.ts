import { ChargePeriodAdDto } from "./charge-period-ad.interface";

export interface AdPostDto {
    chargePeriodAd: number;
    content: string;
    imageUrl: string;
    videoUrl: string;
}

export interface updateAd{
    content: string;
    imageUrl: string;
    videoUrl: string;
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
    changePeriodAd:ChargePeriodAdDto;
}