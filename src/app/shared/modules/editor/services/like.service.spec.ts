import { LikeService } from "./like.service";
import { HttpClient } from "@angular/common/http";
import { ApiConfigService } from '@shared/services/api-config.service';
import { of } from 'rxjs';

describe("LikeService", () => {
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let apiConfigServiceSpy: jasmine.SpyObj<ApiConfigService>;
    let service: LikeService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete']);
        apiConfigServiceSpy = jasmine.createSpyObj('ApiConfigService', [], {
            'API_MAGAZINES': 'api/magazines'
        });

        service = new LikeService(httpClientSpy, apiConfigServiceSpy);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should use userLikedMagazine and return boolean', (done: DoneFn) => {
        const magazineId = '123';
        const expectedResponse = true;

        httpClientSpy.get.and.returnValue(of(expectedResponse));


        service.userLikedMagazine(magazineId).subscribe({
            next: (response: boolean) => {
                expect(response).withContext('expected response').toEqual(expectedResponse);
                done();
            }
        });
    });

    it('should use likeMagazine and return 200 status', (done: DoneFn) => {
        const magazineId = 123;
        const mockResponse = { status: 200, body: {} };

        httpClientSpy.post.and.returnValue(of(mockResponse));

        service.likeMagazine(magazineId).subscribe({
            next: (response: any) => {
                expect(response)
                    .withContext('expected response')
                    .toEqual(mockResponse);

                expect(httpClientSpy.post)
                    .withContext('one call')
                    .toHaveBeenCalledTimes(1);

                done();
            }
        });
    });

    it('should use unlikeMagazine and 200 status', (done: DoneFn) => {
        const magazineId = 123;
        const mockResponse = { status: 200, body: {} };

        httpClientSpy.delete.and.returnValue(of(mockResponse));

        service.unlikeMagazine(magazineId).subscribe({
            next: (response: any) => {
                expect(response)
                    .withContext('expected response')
                    .toEqual(mockResponse);

                expect(httpClientSpy.delete)
                    .withContext('one call')
                    .toHaveBeenCalledTimes(1);

                done();
            }
        });
    });
});