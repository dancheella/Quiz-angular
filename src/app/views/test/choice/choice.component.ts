import {Component, OnInit} from '@angular/core';
import {TestService} from "../../../shared/services/test.service";
import {QuizListType} from "../../../../types/quiz-list.type";

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent implements OnInit {
  quizzes: QuizListType[] = [];


  constructor(private testsService: TestService) {
  }

  ngOnInit(): void {
    this.testsService.getTests()
      .subscribe((result: QuizListType[]) => {
        this.quizzes = result;
      })
  }

}
