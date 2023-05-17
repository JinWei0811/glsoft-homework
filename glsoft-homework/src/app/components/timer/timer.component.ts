import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogContainer } from '@angular/material/dialog';
import { ClockComponent } from './clock/clock.component';
import { InformationComponent } from './information/information.component';
import { SettingComponent } from './setting/setting.component';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TimerComponent implements OnInit {


  dialogConfig = {} as MatDialogConfig;


  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    // initConfig
    this.dialogConfig = {
      autoFocus: true,
      width: '100%',
      height: '100%',
      // panelClass: 'dialog-container'
    } as MatDialogConfig;
  }

  onClickClock(content: string) {
    this.dialogConfig.data = { content: content };
    const dialogRef = this.dialog.open(ClockComponent, this.dialogConfig);
  }
}
