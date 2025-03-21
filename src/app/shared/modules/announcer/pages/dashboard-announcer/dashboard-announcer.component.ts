import { Component, inject } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { WalletDto } from '../../models/wallet.interface';
import { AnnouncerService } from '../../services/announcer.service';
import { TotalAdsDto } from '../../models/ad-post-dto.interface';

@Component({
  selector: 'app-dashboard-announcer',
  imports: [],
  templateUrl: './dashboard-announcer.component.html',
  styleUrl: './dashboard-announcer.component.scss'
})
export class DashboardAnnouncerComponent {


  //services
  private readonly _walletService = inject(WalletService)
  private readonly _announcerService = inject(AnnouncerService)

  wallet: WalletDto = { balance: 0.00, id: 0 };
  totalAds: TotalAdsDto = { total: 0, totalActive: 0};
  totalViews: number = 0;

  ngOnInit() {
    this.getWalletUser();
    this.getTotalAds();
    this.getTotalAdViews();
  }



  getWalletUser() {
    this._walletService.getWalletByUserId().subscribe({
      next: value => {
        this.wallet = value
      }
    })
  }

  getTotalAds(){
    this._announcerService.getTotalAdUser().subscribe({
      next: value =>{
        this.totalAds = value        
      }
    })
  }

  getTotalAdViews(){
    this._announcerService.getTotalAdViewsUser().subscribe({
      next: value =>{
        this.totalViews = value.total;
      }
    })
  }
}
