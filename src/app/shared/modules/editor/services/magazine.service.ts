import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  MagazineIssue,
  MinimalMagazineIssue,
} from '@editor/models/magazine-issue.model';
import {
  EditMagazine,
  FlatMagazine,
  MinimalMagazine,
  NewMagazine,
} from '@editor/models/magazine.model';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Observable } from 'rxjs';
import { Page } from '@shared/models/Page';
import { MagazineItem } from '@subscriber/models/magazine';

@Injectable({
  providedIn: 'root',
})
export class MagazineService {
  private readonly baseUrl = inject(ApiConfigService).API_MAGAZINES;
  private readonly http = inject(HttpClient);

  constructor() { }
  getMagazineIssue(
    magazineId: number,
    issueId: number
  ): Observable<MagazineIssue> {
    return this.http.get<MagazineIssue>(
      `${this.baseUrl}/${magazineId}/issues/${issueId}`
    );
  }

  getMagazineIssues(magazineId: number): Observable<MagazineIssue[]> {
    return this.http.get<MagazineIssue[]>(
      `${this.baseUrl}/${magazineId}/issues`
    );
  }

  getEditorMagazine(id: number): Observable<EditMagazine> {
    return this.http.get<EditMagazine>(`${this.baseUrl}/${id}`, {
      params: { type: 'published' },
    });
  }

  getEditorMagazines(complete: boolean = true): Observable<FlatMagazine[]> {
    return this.http.get<FlatMagazine[]>(this.baseUrl, {
      params: { type: 'published', complete },
    });
  }

  createMagazine(magazine: NewMagazine): Observable<MinimalMagazine> {
    return this.http.post<MinimalMagazine>(this.baseUrl, magazine);
  }

  createIssue(
    magazineId: number,
    formData: FormData
  ): Observable<MagazineIssue> {
    return this.http.post<MagazineIssue>(
      `${this.baseUrl}/${magazineId}/issues`,
      formData
    );
  }

  updateMagazine(
    id: number,
    magazine: EditMagazine
  ): Observable<MinimalMagazine> {
    return this.http.put<MinimalMagazine>(`${this.baseUrl}/${id}`, magazine);
  }

  updateIssue(
    magazineId: number,
    issueId: number,
    issue: MinimalMagazineIssue
  ): Observable<MagazineIssue> {
    return this.http.put<MagazineIssue>(
      `${this.baseUrl}/${magazineId}/issues/${issueId}`,
      issue
    );
  }

  deleteMagazine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  deleteIssue(magazineId: number, id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${magazineId}/issues/${id}`);
  }

  getMagazineByCategory(idCategory: number) {
    const params = new HttpParams()
      .set("idCategory", idCategory)
    return this.http.get<Page<MagazineItem>>(`${this.baseUrl}`, { params })
  }

  getMagazine(id: string) {
    return this.http.get<MagazineItem>(`${this.baseUrl}/${id}`)
  }

  getUserMagazines() {
    return this.http.get<MagazineItem[]>(`${this.baseUrl}/my-subscriptions`)
  }

  getNewestMagazines() {
    return this.http.get<MagazineItem[]>(`${this.baseUrl}/newest`)
  }
}
