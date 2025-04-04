import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Comment } from '@subscriber/models/magazine';
import { tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CommentService {
    private readonly baseUrl: string;

    constructor(
        private http: HttpClient,
        private apiConfig: ApiConfigService
    ) {
        this.baseUrl = this.apiConfig.API_MAGAZINES;
    }

    getCommentsMagazine(id: number) {
        return this.http.get<Comment[]>(`${this.baseUrl}/${id}/comment`).pipe(
            tap((resp: Comment[]) => {
                resp.forEach((comment: Comment) => {
                    comment.timeAgo = this.formatTimeAgo(comment.createdAt.toString())
                })
            })
        )
    }

    comment(id: number, content: string) {
        return this.http.post<Comment>(`${this.baseUrl}/${id}/comment`, { content }).pipe(
            tap((resp: Comment) => {
                resp.timeAgo = this.formatTimeAgo(resp.createdAt.toString())
            })
        )
    }

    formatTimeAgo(isoDateString: string): string {
        const date = new Date(isoDateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (seconds < 0) {
            return "En el futuro";
        }

        const intervals = [
            { unit: 'año', seconds: 31536000 },
            { unit: 'mes', seconds: 2592000 },
            { unit: 'semana', seconds: 604800 },
            { unit: 'día', seconds: 86400 },
            { unit: 'hora', seconds: 3600 },
            { unit: 'minuto', seconds: 60 },
            { unit: 'segundo', seconds: 1 }
        ];

        for (const interval of intervals) {
            const count = Math.floor(seconds / interval.seconds);
            if (count >= 1) {
                return `Hace ${count} ${interval.unit}${count !== 1 ? 's' : ''}`;
            }
        }

        return "Justo ahora";
    }
}
