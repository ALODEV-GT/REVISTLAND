import { HttpClient } from '@angular/common/http';
import { CommentService } from './comment.service';
import { ApiConfigService } from '@shared/services/api-config.service';
import { of } from 'rxjs';
import { Comment } from '@subscriber/models/magazine';

describe('CommentService', () => {
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let apiConfigServiceSpy: jasmine.SpyObj<ApiConfigService>;
    let service: CommentService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete']);
        apiConfigServiceSpy = jasmine.createSpyObj('ApiConfigService', [], {
            'API_MAGAZINES': 'api/magazines'
        });

        service = new CommentService(httpClientSpy, apiConfigServiceSpy);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get comments and format time ago', (done: DoneFn) => {
        const magazineId = 123;
        const mockDate = new Date();
        mockDate.setHours(mockDate.getHours() - 2); // 2 horas atrás

        const mockComments: Comment[] = [
            {
                id: 2,
                content: "",
                createdAt: mockDate,
                timeAgo: '',
                user: {
                    id: 1,
                    profile: {
                        firstName: '',
                        lastName: '',
                        id: 1,
                    },
                    username: '',
                }
            }
        ];

        httpClientSpy.get.and.returnValue(of(mockComments));

        service.getCommentsMagazine(magazineId).subscribe({
            next: (response: Comment[]) => {
                expect(response).withContext('expected comments').toBeTruthy();
                expect(response.length).toBe(1);
                expect(response[0].timeAgo).toBe('Hace 2 horas');

                expect(httpClientSpy.get)
                    .withContext('one call')
                    .toHaveBeenCalledTimes(1);

                expect(httpClientSpy.get)
                    .withContext('correct endpoint')
                    .toHaveBeenCalledWith('api/magazines/123/comment');

                done();
            },
            error: (error) => {
                done.fail('Error en el test: ' + error);
            }
        });
    });

    it('should post a comment and format time ago', (done: DoneFn) => {
        const magazineId = 123;
        const content = 'Nuevo comentario';
        const mockDate = new Date();
        mockDate.setMinutes(mockDate.getMinutes() - 30); // 30 minutos atrás

        const mockComment: Comment = {
            id: 2,
            content: content,
            createdAt: mockDate,
            timeAgo: '',
            user: {
                id: 1,
                profile: {
                    firstName: '',
                    lastName: '',
                    id: 1,
                },
                username: '',
            }
        };

        httpClientSpy.post.and.returnValue(of(mockComment));

        service.comment(magazineId, content).subscribe({
            next: (response: Comment) => {
                expect(response).withContext('expected comment').toBeTruthy();
                expect(response.content).toBe(content);
                expect(response.timeAgo).toBe('Hace 30 minutos');

                expect(httpClientSpy.post)
                    .withContext('one call')
                    .toHaveBeenCalledTimes(1);

                expect(httpClientSpy.post)
                    .withContext('correct endpoint and body')
                    .toHaveBeenCalledWith('api/magazines/123/comment', { content });

                done();
            },
            error: (error) => {
                done.fail('Error en el test: ' + error);
            }
        });
    });

    describe('formatTimeAgo', () => {
        it('should format seconds correctly', () => {
            const date = new Date();
            date.setSeconds(date.getSeconds() - 30);
            expect(service.formatTimeAgo(date.toISOString())).toBe('Hace 30 segundos');
        });

        it('should format minutes correctly', () => {
            const date = new Date();
            date.setMinutes(date.getMinutes() - 5);
            expect(service.formatTimeAgo(date.toISOString())).toBe('Hace 5 minutos');
        });

        it('should format hours correctly', () => {
            const date = new Date();
            date.setHours(date.getHours() - 1);
            expect(service.formatTimeAgo(date.toISOString())).toBe('Hace 1 hora');
        });

        it('should format days correctly', () => {
            const date = new Date();
            date.setDate(date.getDate() - 3);
            expect(service.formatTimeAgo(date.toISOString())).toBe('Hace 3 días');
        });

        it('should format weeks correctly', () => {
            const date = new Date();
            date.setDate(date.getDate() - 10);
            expect(service.formatTimeAgo(date.toISOString())).toBe('Hace 1 semana');
        });

        it('should format months correctly', () => {
            const date = new Date();
            date.setMonth(date.getMonth() - 2);
            expect(service.formatTimeAgo(date.toISOString())).toBe('Hace 1 mes');
        });

        it('should format years correctly', () => {
            const date = new Date();
            date.setFullYear(date.getFullYear() - 1);
            expect(service.formatTimeAgo(date.toISOString())).toBe('Hace 1 año');
        });

        it('should handle future dates', () => {
            const date = new Date();
            date.setDate(date.getDate() + 1);
            expect(service.formatTimeAgo(date.toISOString())).toBe('En el futuro');
        });

        it('should return "Justo ahora" for very recent dates', () => {
            const date = new Date();
            expect(service.formatTimeAgo(date.toISOString())).toBe('Justo ahora');
        });
    });
});