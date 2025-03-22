import { TypeAd } from "./type-ad.enum"

export interface ChargePeriodAdDto{
    id: number,
    adType:TypeAd,
    durationDays: number,
    cost:number
}