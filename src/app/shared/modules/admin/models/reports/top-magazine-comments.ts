export interface CommentDto {
    usernameComment: string;
    emailComment: string;
    contentComment: Date;
    commentAt: string;
}

export interface MagazineCommentsDto {
    title: string;
    usernameEditor: string;
    createdAt: Date;
    comments: CommentDto[];
}

export interface ReportMagazineCommentsDto {
    magazineCommentsDtoList: MagazineCommentsDto[];
    range: string;
}

