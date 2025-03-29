import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MagazineAdminDto, UpdateCostMagazineDto } from '../../models/magazineDto.interface';
import { ReportService } from '../../services/report.service';
import { FormsModule } from '@angular/forms';
import { AnnouncerService } from '@shared/modules/announcer/services/announcer.service';
import { AnnouncersDto } from '../../models/announcer.interface';
import { ModalMsgComponent } from '@shared/modules/announcer/components/modal-msg/modal-msg.component';

@Component({
  selector: 'app-magazines',
  imports: [FormsModule, ModalMsgComponent],
  templateUrl: './magazines.component.html',
  styleUrl: './magazines.component.scss'
})
export class MagazinesComponent {


  //modals
  @ViewChild('modal') modalRef!: ElementRef<HTMLDialogElement>;
  @ViewChild('modal2') modalRef2!: ElementRef<HTMLDialogElement>;
  @ViewChild('modal3') modalRef3!: ElementRef<HTMLDialogElement>;

  private readonly _reportService = inject(ReportService)

  magazines: MagazineAdminDto[] = []
  magazineUpdate!: MagazineAdminDto;
  editors: AnnouncersDto[] = []
  costGlobal = 0
  newCost = 0


  costNull: boolean = true;
  editorId: number = 0;
  asc: boolean = false;


  ngOnInit() {
    this.getAllMagazinesWithParams()
    this.getAllEditors()
    this.getConfiguration()
  }

  updateCost(update: boolean, magazine: MagazineAdminDto) {
    if (update) {
      this.newCost = magazine.costPerDay
    } else {
      this.newCost = this.costGlobal
    }
    this.magazineUpdate = magazine
    this.modalRef.nativeElement.showModal();
  }

  getListUpdate() {
    this.getAllMagazinesWithParams()
  }

  getAllEditors() {
    this._reportService.getAllEditors().subscribe({
      next: value => {
        this.editors = value
      }
    })
  }

  getAllMagazinesWithParams() {
    console.log(this.costNull, this.editorId, this.asc);

    this._reportService.getAllMagazinesWithParams(this.costNull, this.editorId, this.asc).subscribe({
      next: value => {
        this.magazines = value
      }
    })
  }


  formatDateTime(date: any): string {
    const parsedDate = date instanceof Date ? date : new Date(date);
    return parsedDate.toISOString().split('T')[0] + ' ' + parsedDate.toTimeString().slice(0, 5) + ' hrs';
  }

  getConfiguration() {
    this._reportService.getConfiguration().subscribe({
      next: value => {
        this.costGlobal = value.costMagazineDay
      }
    })
  }

  closeModal() {
    this.modalRef.nativeElement.close();
  }

  addBalance() {
    if (this.newCost <= 0) {
      this.modalRef3.nativeElement.showModal();
      return
    }

    const val = this.magazineUpdate.costPerDay

    this.magazineUpdate.costPerDay = this.newCost

    const mgUp: UpdateCostMagazineDto = {costPerDay: this.newCost }
    
    this.newCost = 0

    this.closeModal();

    this._reportService.updateCostPerDayMagazine(mgUp,this.magazineUpdate.id).subscribe({
      next: value =>{
        this.getAllMagazinesWithParams()
        this.modalRef2.nativeElement.showModal();
      },
      error: err => {
        this.magazineUpdate.costPerDay = val
        this.modalRef3.nativeElement.showModal();
      }
    })

  }





}
