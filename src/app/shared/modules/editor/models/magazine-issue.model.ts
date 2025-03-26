export interface MagazineIssue {
  id: number;
  pdfUrl: string;
  title?: string;
  magazineTitle: string;
  magazineId: number;
}

export interface NewMagazineIssue {
  magazineId: number;
  title: string;
}

export interface MinimalMagazineIssue {
  id: number;
  title: string;
  pdfUrl: string;
}
