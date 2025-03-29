export interface SubscriptionsDto {
    usernameSubscriber: string;
    emailSubscriber: string;
    subscribedAt: Date;
}

export interface MagazineSubscriptions {
    title: string;
    usernameEditor: string;
    createdAt: Date
    subscriptionsDtos: SubscriptionsDto[]
}

export interface ReportTopMagazineSubscriptions {
    subscriptions: MagazineSubscriptions[];
    range: string;
}