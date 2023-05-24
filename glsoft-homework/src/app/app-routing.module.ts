import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { TimerComponent } from './components/timer/timer.component';
import { WebsocketComponent } from './components/websocket/websocket.component';


const routes: Routes = [
  { path: 'calculator', component: CalculatorComponent },
  { path: '', component: TimerComponent },
  { path: 'websocket', component: WebsocketComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
