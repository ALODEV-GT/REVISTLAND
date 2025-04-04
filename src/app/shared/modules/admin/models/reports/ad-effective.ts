export interface ViewDto {
    urlView: string;
    createdAtView: string;
}

export interface AdViewsDto {
    createdAtAd: string;
    adType: string;
    idAd: string;
    durationDays: string;
    views: ViewDto[];
}

export interface AdvertiserAdViewsDto {
    username: string;
    email: string;
    idUser: string;
    adViewsDtos: AdViewsDto[];
}

export interface ReportAdvertiserAdViews{
    advertiserAdViews: AdvertiserAdViewsDto[];
    range: string;
}



