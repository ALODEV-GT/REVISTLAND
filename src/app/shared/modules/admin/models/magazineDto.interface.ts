export interface MagazineAdminDto {
    id: number,
    title: string,
    costPerDay: number,
    createdAt: Date,
    username: string
}

export interface UpdateCostMagazineDto {
    costPerDay: number;
}