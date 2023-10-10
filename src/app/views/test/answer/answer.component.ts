import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TestService} from "../../../shared/services/test.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {QuizResponseType} from "../../../../types/quiz.type";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit{
  quiz!: QuizResponseType;
  answerInfo: string | null = null;

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private testService: TestService,
              private router: Router) {
  }

  ngOnInit() {
    const userInfo = this.authService.getUserInfo();
    if (userInfo) {
      this.activatedRoute.queryParams.subscribe(params => {
        if (params['id']) {
          this.testService.getAnswer(params['id'], userInfo.userId)
            .subscribe((result: DefaultResponseType | QuizResponseType) => {
              if (result) {
                if ((result as DefaultResponseType).error !== undefined) {
                  throw new Error((result as DefaultResponseType).message);
                }
              }

              this.answerInfo = `${userInfo.fullName}, ${userInfo.email}`;
              this.quiz = result as QuizResponseType;
              return;
            })
        }
      })
    }
  }

  history(): void {
    const queryParams = { id: this.activatedRoute.snapshot.queryParams['id'] };
    this.router.navigate(['/result'], { queryParams });  }
}
