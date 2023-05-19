import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {


  soundType = ['enabled', 'chimes only', 'disabled'];
  countType = ['up', 'down'];
  timeType = ['default', 'seconds', 'minutes'];

  sound: string = ''
  timeline: boolean = true;
  overtime: boolean = true;
  countmode: string = '';
  timeformat: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SettingComponent>,
  ) { };

  ngOnInit(): void {
    this.sound = this.estimateValueExist('sound');
    this.timeline = this.estimateValueExist('timeline');
    this.overtime = this.estimateValueExist('overtime');
    this.countmode = this.estimateValueExist('countmode');
    this.timeformat = this.estimateValueExist('timeformat');
  }

  estimateValueExist(content: string) {
    if (this.data.setting[content] === null || this.data.setting[content] === '' || this.data.setting[content] === undefined) {
      if (content == 'sound') {
        return this.soundType[0];
      }
      if (content == 'timeline') {
        return true;
      }
      if (content == 'overtime') {
        return false;
      }
      if (content == 'countmode') {
        return this.countType[0];
      }
      if (content == 'timeformat') {
        return this.timeType[0];
      }
    }
    return this.data.setting[content];
  }

  onCloseClick() {
    let result = {
      sound: this.sound,
      timeline: this.timeline,
      overtime: this.overtime,
      countmode: this.countmode,
      timeformat: this.timeformat
    }
    console.log(result);
    this.dialogRef.close(result);
  }

  onSoundClick() {
    let index = this.soundType.indexOf(this.sound);
    this.sound = index >= this.soundType.length - 1 ? this.soundType[0] : this.soundType[index + 1];
  }

  onCountModeClick() {
    this.countmode = this.countmode === 'up' ? 'down' : 'up';
  }

  onTimeFormatClick() {
    let index = this.timeType.indexOf(this.timeformat);
    this.timeformat = index >= this.timeType.length - 1 ? this.timeType[0] : this.timeType[index + 1];
  }

}
