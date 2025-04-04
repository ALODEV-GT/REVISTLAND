import { HttpClient, HttpParams } from '@angular/common/http';
import { MagazineService } from "./magazine.service";
import { ApiConfigService } from '@shared/services/api-config.service';
import { of } from 'rxjs';
import { MagazineItem } from '@subscriber/models/magazine';
import { MagazineIssue, MinimalMagazineIssue } from '../models/magazine-issue.model';
import { EditMagazine, FlatMagazine, MinimalMagazine, NewMagazine } from '../models/magazine.model';
import { Page } from '@shared/models/Page';

describe("MagazineService", () => {
    let httpClientSpy: jasmine.SpyObj<HttpClient>;
    let apiConfigServiceSpy: jasmine.SpyObj<ApiConfigService>;
    let service: MagazineService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', [
            'get', 'post', 'put', 'patch', 'delete'
        ]);
        apiConfigServiceSpy = jasmine.createSpyObj('ApiConfigService', [], {
            'API_MAGAZINES': 'api/magazines'
        });

        service = new MagazineService(httpClientSpy, apiConfigServiceSpy);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get magazine issue', (done: DoneFn) => {
        const magazineId = 1;
        const issueId = 1;
        const mockResponse = {} as MagazineIssue;

        httpClientSpy.get.and.returnValue(of(mockResponse));

        service.getMagazineIssue(magazineId, issueId).subscribe({
            next: (response) => {
                expect(response).toEqual(mockResponse);
                expect(httpClientSpy.get).toHaveBeenCalledWith(
                    `${apiConfigServiceSpy.API_MAGAZINES}/${magazineId}/issues/${issueId}`
                );
                done();
            }
        });
    });

    it('should get magazine issues', (done: DoneFn) => {
        const magazineId = 1;
        const mockResponse = [{} as MagazineIssue];

        httpClientSpy.get.and.returnValue(of(mockResponse));

        service.getMagazineIssues(magazineId).subscribe({
            next: (response) => {
                expect(response).toEqual(mockResponse);
                expect(httpClientSpy.get).toHaveBeenCalledWith(
                    `${apiConfigServiceSpy.API_MAGAZINES}/${magazineId}/issues`
                );
                done();
            }
        });
    });

    it('should get editor magazine', (done: DoneFn) => {
        const id = 1;
        const mockResponse = {} as EditMagazine;

        httpClientSpy.get.and.returnValue(of(mockResponse));

        service.getEditorMagazine(id).subscribe({
            next: (response) => {
                expect(response).toEqual(mockResponse);
                expect(httpClientSpy.get).toHaveBeenCalledWith(
                    `${apiConfigServiceSpy.API_MAGAZINES}/${id}`,
                    { params: { type: 'published' } }
                );
                done();
            }
        });
    });

    it('should get editor magazines completed', (done: DoneFn) => {
        const mockResponse = [{} as FlatMagazine];
        const complete = true;

        httpClientSpy.get.and.returnValue(of(mockResponse));

        service.getEditorMagazines(complete).subscribe({
            next: (response) => {
                expect(response).toEqual(mockResponse);

                expect(httpClientSpy.get)
                    .withContext('one call')
                    .toHaveBeenCalledTimes(1);

                done();
            }
        });
    });

    it('should create magazine', (done: DoneFn) => {
        const magazine = {} as NewMagazine;
        const mockResponse = {} as MinimalMagazine;

        httpClientSpy.post.and.returnValue(of(mockResponse));

        service.createMagazine(magazine).subscribe({
            next: (response) => {
                expect(response).toEqual(mockResponse);
                expect(httpClientSpy.post).toHaveBeenCalledWith(
                    apiConfigServiceSpy.API_MAGAZINES,
                    magazine
                );
                done();
            }
        });
    });

    it('should create issue', (done: DoneFn) => {
        const magazineId = 1;
        const formData = new FormData();
        const mockResponse = {} as MagazineIssue;

        httpClientSpy.post.and.returnValue(of(mockResponse));

        service.createIssue(magazineId, formData).subscribe({
            next: (response) => {
                expect(response).toEqual(mockResponse);
                expect(httpClientSpy.post).toHaveBeenCalledWith(
                    `${apiConfigServiceSpy.API_MAGAZINES}/${magazineId}/issues`,
                    formData
                );
                done();
            }
        });
    });

    it('should update magazine', (done: DoneFn) => {
        const id = 1;
        const magazine = {} as EditMagazine;
        const mockResponse = {} as MinimalMagazine;

        httpClientSpy.put.and.returnValue(of(mockResponse));

        service.updateMagazine(id, magazine).subscribe({
            next: (response) => {
                expect(response).toEqual(mockResponse);
                expect(httpClientSpy.put).toHaveBeenCalledWith(
                    `${apiConfigServiceSpy.API_MAGAZINES}/${id}`,
                    magazine
                );
                done();
            }
        });
    });

    it('should update ad blocking expiration date', (done: DoneFn) => {
        const id = 1;
        const expirationDate = '2023-12-31';
        const mockResponse = {} as MinimalMagazine;

        httpClientSpy.patch.and.returnValue(of(mockResponse));

        service.updateAdBlockingExpirationDate(id, expirationDate).subscribe({
            next: (response) => {
                expect(response).toEqual(mockResponse);
                expect(httpClientSpy.patch).toHaveBeenCalledWith(
                    `${apiConfigServiceSpy.API_MAGAZINES}/${id}/ads`,
                    { adBlockingExpirationDate: expirationDate }
                );
                done();
            }
        });
    });

    it('should update issue', (done: DoneFn) => {
        const magazineId = 1;
        const issueId = 1;
        const issue = {} as MinimalMagazineIssue;
        const mockResponse = {} as MagazineIssue;

        httpClientSpy.put.and.returnValue(of(mockResponse));

        service.updateIssue(magazineId, issueId, issue).subscribe({
            next: (response) => {
                expect(response).toEqual(mockResponse);
                expect(httpClientSpy.put).toHaveBeenCalledWith(
                    `${apiConfigServiceSpy.API_MAGAZINES}/${magazineId}/issues/${issueId}`,
                    issue
                );
                done();
            }
        });
    });

    it('should delete magazine', (done: DoneFn) => {
        const id = 1;

        httpClientSpy.delete.and.returnValue(of(void 0));

        service.deleteMagazine(id).subscribe({
            next: (response) => {
                expect(response).toBeUndefined();
                expect(httpClientSpy.delete).toHaveBeenCalledWith(
                    `${apiConfigServiceSpy.API_MAGAZINES}/${id}`
                );
                done();
            }
        });
    });

    it('should delete issue', (done: DoneFn) => {
        const magazineId = 1;
        const id = 1;

        httpClientSpy.delete.and.returnValue(of(void 0));

        service.deleteIssue(magazineId, id).subscribe({
            next: (response) => {
                expect(response).toBeUndefined();
                expect(httpClientSpy.delete).toHaveBeenCalledWith(
                    `${apiConfigServiceSpy.API_MAGAZINES}/${magazineId}/issues/${id}`
                );
                done();
            }
        });
    });

    it('should get magazine by category', (done: DoneFn) => {
        const idCategory = 1;
        const mockResponse = {} as Page<MagazineItem>;

        httpClientSpy.get.and.returnValue(of(mockResponse));

        service.getMagazineByCategory(idCategory).subscribe({
            next: (response) => {
                expect(response).toEqual(mockResponse);
                const params = new HttpParams().set('idCategory', idCategory);
                expect(httpClientSpy.get).toHaveBeenCalledWith(
                    apiConfigServiceSpy.API_MAGAZINES,
                    { params }
                );
                done();
            }
        });
    });

    it('should get magazine', (done: DoneFn) => {
        const id = '1';
        const mockResponse = {} as MagazineItem;

        httpClientSpy.get.and.returnValue(of(mockResponse));

        service.getMagazine(id).subscribe({
            next: (response) => {
                expect(response).toEqual(mockResponse);
                expect(httpClientSpy.get).toHaveBeenCalledWith(
                    `${apiConfigServiceSpy.API_MAGAZINES}/${id}`
                );
                done();
            }
        });
    });

    it('should get user magazines', (done: DoneFn) => {
        const mockResponse = [{} as MagazineItem];

        httpClientSpy.get.and.returnValue(of(mockResponse));

        service.getUserMagazines().subscribe({
            next: (response) => {
                expect(response).toEqual(mockResponse);
                expect(httpClientSpy.get).toHaveBeenCalledWith(
                    `${apiConfigServiceSpy.API_MAGAZINES}/my-subscriptions`
                );
                done();
            }
        });
    });

    it('should get newest magazines', (done: DoneFn) => {
        const mockResponse = [{} as MagazineItem];

        httpClientSpy.get.and.returnValue(of(mockResponse));

        service.getNewestMagazines().subscribe({
            next: (response) => {
                expect(response).toEqual(mockResponse);
                expect(httpClientSpy.get).toHaveBeenCalledWith(
                    `${apiConfigServiceSpy.API_MAGAZINES}/newest`
                );
                done();
            }
        });
    });
});