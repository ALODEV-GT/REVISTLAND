import { MagazineService } from '@editor/services/magazine.service';
import { Component, inject, OnInit } from '@angular/core';
import { Heart, LucideAngularModule } from 'lucide-angular';
import { ActivatedRoute } from '@angular/router';
import { MagazineItem, Comment } from '@subscriber/models/magazine';
import { LikeService } from '@shared/modules/editor/services/like.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentService } from '@shared/modules/editor/services/comment.service';
import { CommonModule } from '@angular/common';
import { IssuesService } from '@shared/modules/editor/services/issues.service';
import { Issue } from '@shared/modules/editor/models/magazine.model';
import { CategoryService } from '@shared/modules/editor/services/category.service';
import { SubscriptionService } from '@shared/modules/editor/services/subscription.service';


@Component({
  selector: 'app-magazine-detail',
  imports: [LucideAngularModule, ReactiveFormsModule, CommonModule],
  templateUrl: './magazine-detail.component.html',
  styleUrl: './magazine-detail.component.scss'
})
export default class MagazineDetailComponent implements OnInit {
  private readonly magazineService = inject(MagazineService)
  private readonly likeService = inject(LikeService)
  private readonly commentService = inject(CommentService)
  private readonly issueService = inject(IssuesService)
  readonly categoryService = inject(CategoryService)
  readonly subscriptionService = inject(SubscriptionService)

  readonly Heart = Heart
  activateRoute = inject(ActivatedRoute)
  liked: boolean = false
  subscribed: boolean = false
  comment: FormControl = new FormControl("", [Validators.required, Validators.minLength(2)])

  magazine: MagazineItem | null = null
  comments: Comment[] = []
  issues: Issue[] = []

  ngOnInit(): void {
    const id = this.activateRoute.snapshot.paramMap.get('id');
    this.magazineService.getMagazine(id!).subscribe({
      next: (resp: MagazineItem) => {
        this.magazine = resp
        this.loadComments()
        this.loadIssues()
      }
    })

    this.likeService.userLikedMagazine(id!).subscribe({
      next: (resp: boolean) => {
        this.liked = resp
      }
    })

    this.subscriptionService.userSubscribedMagazine(id!).subscribe({
      next: (resp: boolean) => {
        this.subscribed = resp
      }
    })
  }

  loadIssues() {
    this.issueService.getIssues(this.magazine?.id!).subscribe({
      next: (resp: Issue[]) => {
        this.issues = resp
      }
    })
  }

  togglelike() {
    if (this.magazine?.disableLikes) {
      return
    }

    if (this.liked) {
      this.likeService.unlikeMagazine(this.magazine!.id).subscribe({
        next: () => {
          this.magazine!.likeCount -= 1
          this.liked = false
        }
      })
    } else {
      this.likeService.likeMagazine(this.magazine!.id).subscribe({
        next: () => {
          this.magazine!.likeCount += 1
          this.liked = true
        }
      })
    }
  }

  toggleSubscription() {
    if (this.magazine?.disableSuscriptions) {
      //TODO: Mostrar erro que no se puede suscribir
      return
    }

    if (this.subscribed) {
      this.subscriptionService.unsubscribeMagazine(this.magazine!.id).subscribe({
        next: () => {
          this.subscribed = false
        }
      })
    } else {
      this.subscriptionService.subscribeMagazine(this.magazine!.id).subscribe({
        next: () => {
          this.subscribed = true
        }
      })
    }
  }

  saveComment() {
    if (this.comment.invalid) {
      //TODO: Mostrar errro de que es un comentario invalido
      return
    }

    this.commentService.comment(this.magazine!.id, this.comment.value).subscribe({
      next: (resp: Comment) => {
        this.comments.unshift(resp);
        this.comment.reset();
      }
    })
  }

  loadComments() {
    this.commentService.getCommentsMagazine(this.magazine!.id).subscribe({
      next: (resp: Comment[]) => {
        this.comments = resp
      }
    })
  }

  openPdfInNewTab(pdfUrl: string): void {
    if (!pdfUrl) {
      console.error('La URL del PDF no está definida');
      return;
    }
    window.open(pdfUrl, '_blank');
  }

}
