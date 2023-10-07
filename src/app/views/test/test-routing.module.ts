import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChoiceComponent} from "./choice/choice.component";
import {TestComponent} from "./test/test.component";
import {ResultComponent} from "./result/result.component";
import {AnswerComponent} from "./answer/answer.component";

const routes: Routes = [
  {path: 'choice', component: ChoiceComponent},
  {path: 'test', component: TestComponent},
  {path: 'result', component: ResultComponent},
  {path: 'answer', component: AnswerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule {
}
