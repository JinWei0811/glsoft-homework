import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
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
export class TimerComponent implements OnInit, AfterViewInit {


  dialogConfig = {} as MatDialogConfig;
  setTime: string = '00:00'
  setHour: number = 0;
  setMinute: number = 0;
  setSecond: number = 0;
  warningTime: string = '00:00'
  warningHour: number = 0;
  warningMinute: number = 0;
  warningSecond: number = 0;
  countTime: string = '0'
  countHour: number = 0;
  countMinute: number = 0;
  countSecond: number = 0;
  countMSecond: number = 0;

  isStart: boolean = false;
  isPause: boolean = false;
  isEnd: boolean = false;
  viewClock: boolean = false;
  showSetting: boolean = false;

  timer: any;

  caretElement: any;
  timeLineElement: any;


  constructor(private dialog: MatDialog) { }
  ngAfterViewInit(): void {
    this.caretElement = document.querySelector('.up-caret') as HTMLElement;
    this.timeLineElement = document.querySelector('.timeline') as HTMLElement;

    // this.timeLineFalseElement.style.borderImage = 'linear-gradient(to right, #01D801 0%, #01D801 33%, #FF0000 33%, #FF0000 66%, #0000FF 66%, #0000FF 100%)';
    // this.timeLineTrueElement.style.borderImage = 'linear-gradient(to right, #01D801 0%, #01D801 33%, #FF0000 33%, #FF0000 66%, #0000FF 66%, #0000FF 100%)';

  }

  ngOnInit(): void {
    // initConfig
    this.dialogConfig = {
      autoFocus: true,
      width: '100%',
      height: '100%',
      disableClose: true,
    } as MatDialogConfig;
  }

  onClockClick(content: string) {
    let times = {};
    if (content == 'set time') {
      times = {
        hour: this.setHour,
        minute: this.setMinute,
        second: this.setSecond,
      }
    }
    if (content == 'set warning time') {
      times = {
        hour: this.warningHour,
        minute: this.warningMinute,
        second: this.warningSecond,
      }
    }
    this.dialogConfig.data = { content: content, times };
    const dialogRef = this.dialog.open(ClockComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (content == 'set time') {
        this.setHour = Number(result.hours);
        this.setMinute = Number(result.minutes);
        this.setSecond = Number(result.seconds);
      }
      if (content == 'set warning time') {
        this.warningHour = Number(result.hours);
        this.warningMinute = Number(result.minutes);
        this.warningSecond = Number(result.seconds);

        let setTime = 60 * (60 * this.setHour + this.setMinute) + this.setSecond;
        let warningTime = 60 * (60 * this.warningHour + this.warningMinute) + this.warningSecond;
        const segment1 = document.querySelector('.segment1') as HTMLElement;
        const segment2 = document.querySelector('.segment2') as HTMLElement;
        segment1.style.flex = `${1 - (warningTime / setTime) < 0 ? 0 : 1 - (warningTime / setTime)}`
        segment2.style.flex = `${warningTime / setTime > 1 ? 1 : warningTime / setTime}`
      }
      this.generateTimeString(content);
    })
  }

  onStartClick() {
    if (this.isStart) {
      return;
    }

    if (this.setHour == 0 && this.setMinute == 0 && this.setSecond == 0) {
      this.isStart = false;
      return;
    }

    if (!this.isPause) {
      this.countHour = this.setHour;
      this.countMinute = this.setMinute;
      this.countSecond = this.setSecond;
      let totalTime = (60 * (60 * this.countHour + this.countMinute) + this.countSecond) * 1000;
      this.caretElement.style.animation = `moveRight ${totalTime}ms linear forwards`;
    } else {
      this.caretElement.style.animationPlayState = 'running';
    }

    if (this.isEnd) {
      this.caretElement.style.animation = 'none';
      this.caretElement.offsetHeight; // 強制重繪
      this.caretElement.style.animation = null;
      let totalTime = (60 * (60 * this.countHour + this.countMinute) + this.countSecond) * 1000;
      this.caretElement.style.animation = `moveRight ${totalTime}ms linear forwards`;
      this.isEnd = false;
    }

    this.isStart = true;
    this.viewClock = true;
    this.showSetting = true;
    this.isPause = false;
    this.generateTimeString('count time');
    let i = 0;
    this.countMSecond = 900;
    this.timer = setInterval(() => {
      if (this.countMSecond > 0) {
        this.countMSecond -= 100;
      } else {
        if (this.countSecond > 0) {
          this.countSecond--;
          this.countMSecond = 900;
        } else {
          if (this.countMinute > 0) {
            this.countMinute--;
            this.countSecond = 59;
            this.countMSecond = 900;
          } else {
            if (this.countHour > 0) {
              this.countHour--;
              this.countMinute = 59;
              this.countSecond = 59;
              this.countMSecond = 900;
            }
          }
        }
      }
      this.generateTimeString('count time');
      console.log(this.countSecond, this.countMSecond);
      if (this.countHour == 0 && this.countMinute == 0 && this.countSecond == 0 ) {
        this.isStart = false;
        this.isEnd = true;
        this.showSetting = false;
        const clockTime = document.querySelector('.clock-view') as HTMLElement;
        clockTime.style.color = 'white';
        clearInterval(this.timer);
        return;
      }

      let warningTime = 60 * (60 * this.warningHour + this.warningMinute) + this.warningSecond;
      let countTime = 60 * (60 * this.countHour + this.countMinute) + this.countSecond;
      if (warningTime > countTime) {
        const clockTime = document.querySelector('.clock-view') as HTMLElement;
        clockTime.style.color = '#FEFE00';
      }

    }, 100)
  }

  onPauseClick() {
    if (this.isStart) {
      this.isStart = false;
      this.isPause = true;
      this.caretElement.style.animationPlayState = 'paused';
      clearInterval(this.timer)
    }
  }

  onResetClick() {
    this.caretElement.style.animation = 'none';
    this.caretElement.offsetHeight; // 強制重繪
    this.caretElement.style.animation = null;
    this.viewClock = false;
    this.isStart = false;
    this.showSetting = false;
    clearInterval(this.timer);
  }

  generateTimeString(content: string) {
    if (content == 'set time') {
      this.setTime = this.setHour == 0 ?
        `${this.additionZero(this.setMinute)}:${this.additionZero(this.setSecond)}` :
        `${this.additionZero(this.setHour)}:${this.additionZero(this.setMinute)}:${this.additionZero(this.setSecond)}`;
    }
    if (content == 'set warning time') {
      this.warningTime = this.warningHour == 0 ?
        `${this.additionZero(this.warningMinute)}:${this.additionZero(this.warningSecond)}` :
        `${this.additionZero(this.warningHour)}:${this.additionZero(this.warningMinute)}:${this.additionZero(this.warningSecond)}`;
    }
    if (content == 'count time') {
      this.countTime = this.countHour == 0 ?
        `${this.additionZero(this.countMinute)}:${this.additionZero(this.countSecond)}` :
        `${this.additionZero(this.countHour)}:${this.additionZero(this.countMinute)}:${this.additionZero(this.countSecond)}`;
    }
  }

  additionZero(value: number) {
    return value >= 10 ? '' + value : `0${value}`;
  }
}
