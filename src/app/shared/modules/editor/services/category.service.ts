import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiConfigService } from '@shared/services/api-config.service';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly baseUrl = inject(ApiConfigService).API_CATEGORIES;
  private readonly http = inject(HttpClient);

  private readonly categoryImages: Map<string, string> = new Map([
    ["Moda y Estilo", "category/fashion.jpg"],
    ["Cine y Entretenimiento", "category/entertainment.jpg"],
    ["Gastronomía", "category/gastronomy.jpg"],
    ["Historia", "category/history.jpg"],
    ["Automóviles", "category/vehicles.jpg"],
    ["Videojuegos", "category/videogames.jpg"],
    ["Educación y Cultura", "category/education.jpg"],
    ["Naturaleza y Medio Ambiente", "category/nature.jpg"]
  ])

  constructor() { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl);
  }

  getImageCategory(name: string) {
    return this.categoryImages.get(name)
  }
}
