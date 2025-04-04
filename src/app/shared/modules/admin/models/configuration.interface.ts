export interface ConfigurationDto {
    id: number;
    costMagazineDay: number;
    costHidingAdDay: number;
}

export interface UpdateCostHidingAdDayDto{
    costHidingAdDay: number;
}

export interface UpdateCostMagazineDayDto{
    costMagazineDay: number;
}