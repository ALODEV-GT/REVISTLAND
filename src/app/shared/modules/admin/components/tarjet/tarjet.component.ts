import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { TypeTarjet } from '../../models/type-tarjet.enum';
import { DashboadService } from '../../services/dashboad.service';

@Component({
  selector: 'app-tarjet',
  imports: [],
  templateUrl: './tarjet.component.html',
  styleUrl: './tarjet.component.scss'
})
export class TarjetComponent {

  @Input() startDate!: string;
  @Input() endDate!: string;
  @Input() type!: TypeTarjet;

  //services
  private readonly _dashboardService = inject(DashboadService);

  title = ''
  value = '--'
  label = ''


  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.getData()
    }
  }

  getTotalPostAd() {
    this.title = 'Anuncios Publicados'
    this.label = 'Total de los anuncios publicado'
    if (this.startDate === '' || this.endDate === '') {
      this._dashboardService.getTotolPost().subscribe({
        next: value => {
          this.value = `${value.total}`
        }
      })
      return
    }

    this._dashboardService.getTotolPost(this.startDate, this.endDate).subscribe({
      next: value => {
        this.value = `${value.total}`
      }
    })

  }

  getTotalPostMagazines() {
    this.title = 'Revistas Publicadas'
    this.label = 'Total de las Revistas publicadas'
    if (this.startDate === '' || this.endDate === '') {
      this._dashboardService.getTotalMagazinesPost().subscribe({
        next: value => {
          this.value = `${value.total}`
        }
      })
      return
    }

    this._dashboardService.getTotalMagazinesPost(this.startDate, this.endDate).subscribe({
      next: value => {
        this.value = `${value.total}`
      }
    })

  }

  getTopEditor() {
    this.title = 'Top Editor'
    this.label = 'Editor con mas anuncios publicados'
    if (this.startDate === '' || this.endDate === '') {
      this._dashboardService.getTopEditor().subscribe({
        next: value => {
          this.value = `${value.userName}`
        }
      })
      return
    }

    this._dashboardService.getTopEditor(this.startDate, this.endDate).subscribe({
      next: value => {
        this.value = `${value.userName}`
      }
    })

  }

  getTopAnnouncer() {
    this.title = 'Top Anunciador'
    this.label = 'Usuario con mas anuncios publicados'
    if (this.startDate === '' || this.endDate === '') {
      this._dashboardService.getTopPublisherAd().subscribe({
        next: value => {
          this.value = `${value.userName}`
        }
      })
      return
    }

    this._dashboardService.getTopPublisherAd(this.startDate, this.endDate).subscribe({
      next: value => {
        this.value = `${value.userName}`
      }
    })

  }

  getData() {
    switch (this.type) {
      case TypeTarjet.AD_POST:
        this.getTotalPostAd();
        break;

      case TypeTarjet.MAGAZINE_POST:
        this.getTotalPostMagazines();
        break;

      case TypeTarjet.REVENUE:
        this.title = 'Ganancia Total'
        this.label = 'Ingresos - costos'
        break;

      case TypeTarjet.EDITOR:
        this.getTopEditor()
        break;

      case TypeTarjet.ANNOUNCER:
        this.getTopAnnouncer()
        break;

      default:
        break;
    }
  }


}
