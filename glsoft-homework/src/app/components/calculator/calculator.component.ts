import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})

export class CalculatorComponent implements OnInit {

  result: number = 0;
  previous: number = 0;

  operators_click = {
    plus: false,
    minus: false,
    cross: false,
    remove: false,
  };


  ngOnInit(): void {
  }

  onOperatorButtonClick(value: string) {
    switch (value) {
      case '%':
        this.result = this.result / 100;
        break;
      case 'MU':
        break;
      case 'MC':
        break;
      case 'MR':
        break;
      case 'M-':
        break;
      case 'M+':
        break;
      case '±':
        let temp = this.result;
        if (this.result != 0) {
          this.result = this.result - (temp * 2)
        }
        break;
      case 'delete':
        if (this.result >= 10) {
          this.result = Math.floor(this.result / 10);
        } else {
          this.result = 0;
        }
        break;
      case 'plus':
        if (this.operators_click.plus) {
          this.result = this.result + this.previous;
          this.operators_click.plus = false;
        } else {
          this.previous = this.result;
        }
        break;
      case 'minus':
        break;
      case 'cross':
        break;
      case 'remove':
        break;
      case 'decimal':
        break;
      case 'all-clear':
        this.result = 0;
        break;
      case 'equal':
        break;
      case '0':
        if (this.result > 0) {
          this.result = this.result * 10;
        }
        break;
      case '00':
        if (this.result >= 1) {
          this.result = this.result * 100;
        }
        break;
      case '1':
        if (this.result > 0) {
          this.result = this.result * 10 + 1;
        } else {
          this.result = 1;
        }
        break;
      case '2':
        if (this.result > 0) {
          this.result = this.result * 10 + 2;
        } else {
          this.result = 2;
        }
        break;
      case '3':
        if (this.result > 0) {
          this.result = this.result * 10 + 3;
        } else {
          this.result = 3;
        }
        break;
      case '4':
        if (this.result > 0) {
          this.result = this.result * 10 + 4;
        } else {
          this.result = 4;
        }
        break;
      case '5':
        if (this.result > 0) {
          this.result = this.result * 10 + 5;
        } else {
          this.result = 5;
        }
        break;
      case '6':
        if (this.result > 0) {
          this.result = this.result * 10 + 6;
        } else {
          this.result = 6;
        }
        break;
      case '7':
        if (this.result > 0) {
          this.result = this.result * 10 + 7;
        } else {
          this.result = 7;
        }
        break;
      case '8':
        if (this.result > 0) {
          this.result = this.result * 10 + 8;
        } else {
          this.result = 8;
        }
        break;
      case '9':
        if (this.result > 0) {
          this.result = this.result * 10 + 9;
        } else {
          this.result = 9;
        }
        break;
    }
  }

}


