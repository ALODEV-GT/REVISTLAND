export enum AdType {
    TEXT_IMAGE = 'TEXT_IMAGE',
    VIDEO = 'VIDEO',
    TEXT = 'TEXT'
}

export interface ChargePeriod {
    id: number;
    adType: AdType;
    durationDays: number;
    cost: number;
}

export interface AdUser {
    id: number;
    advertiser: number;
    content: string;
    imageUrl: string;
    videoUrl: string;
    createdAt: string;
    expiresAt: string;
    isActive: boolean;
    changePeriodAd: ChargePeriod;
}

export interface AdViewCreateDto {
    adId: number;
    urlView: string;
}