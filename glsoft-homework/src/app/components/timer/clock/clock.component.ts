import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  hours: string = '00';
  minutes: string = '00';
  seconds: string = '00';
  type: string = 'set'

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ClockComponent>
  ) { }

  ngOnInit(): void {
    console.log(this.data.content);

    this.type = this.data.content === 'set time' ? 'set' : 'warning'
  }

  onPlusClick(time: string) {
    switch (time) {
      case 'hours':
        let tempHours = Number(this.hours) + 1
        this.hours = tempHours >= 10 ? '' + tempHours : '0' + tempHours;
        break;
      case 'minutes':
        let tempMinutes = Number(this.minutes) + 1
        if (tempMinutes >= 60) {
          tempMinutes -= 60;
          let plusHours = Number(this.hours) + 1
          this.hours = plusHours >= 10 ? '' + plusHours : '0' + plusHours;
        }
        this.minutes = tempMinutes >= 10 ? '' + tempMinutes : '0' + tempMinutes;
        break;
      case 'seconds':
        let tempSeconds = Number(this.seconds) + 1
        if (tempSeconds >= 60) {
          tempSeconds -= 60;
          let plusMinutes = Number(this.minutes) + 1;
          this.minutes = plusMinutes > 10 ? '' + plusMinutes : '0' + plusMinutes;
        }
        this.seconds = tempSeconds >= 10 ? '' + tempSeconds : '0' + tempSeconds;
        break;
      case '15s':
        break;
      case '5m':
        break;
    }
  }

  onMinusClick(time: string) {

  }

  onCloseClick() {
    this.dialogRef.close();
  }


}
