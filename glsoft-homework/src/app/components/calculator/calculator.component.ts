import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})

export class CalculatorComponent implements OnInit {

  result: string = '0';
  style: string = 'original'; // Default Style
  memoryResult: number = 0;
  memoryClick: boolean = false;
  MRCClick: number = 0;
  evalString = '';

  ngOnInit(): void {


    document.onkeydown = e => {
      const number_list = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      const operator_list = [ {key : '+'}, '-', '*', '/', 'Enter', 'Backspace']

      let number = number_list.filter(v => v == e.key);
      let operator = number_list.filter(v => v == e.key);
      if (number.length > 0) {
        this.onNumberButtonClick(number[0]);
      }
      if (operator.length > 0) {
        this.onOperatorButtonClick(operator[0]);
      }

    }
  }

  onChangeStyleButtonClick() {
    this.style = this.style === 'original' ? 'vintage' : 'original';
  }

  onOperatorButtonClick(value: string) {
    switch (value) {
      case '%':
        this.result = eval(this.result + '/100');
        break;
      case 'MU':
        let temp = eval(`${this.result}/100 + 1`);
        this.memoryResult = eval(`${this.evalString}${temp}`)
        this.evalString = '';
        this.memoryClick = true;
        break;
      case 'MC':
        this.memoryResult = 0;
        break;
      case 'MR':
        this.result = this.memoryResult + '';
        this.memoryClick = false;
        break;
      case 'M-':
        this.memoryResult -= Number(this.result);
        this.memoryClick = true;
        break;
      case 'M+':
        this.memoryResult += Number(this.result);
        this.memoryClick = true;
        break;
      case '±':
        if (Number(this.result) != 0) {
          let temp = this.result;
          this.result = eval(`${this.result} - ${temp} * 2`)
        }
        break;
      case 'delete':
        if (Number(this.result) >= 10) {
          this.result = Math.floor(Number(eval(`${this.result} / 10`))) + '';
        } else {
          this.result = '0';
        }
        break;
      case 'plus':
        this.evalString += this.result + '+'
        this.result = '0';
        break;
      case 'minus':
        this.evalString += this.result + '-'
        this.result = '0';
        break;
      case 'cross':
        this.evalString += this.result + '*'
        this.result = '0';
        break;
      case 'remove':
        this.evalString += this.result + '/'
        this.result = '0';
        break;
      case 'decimal':
        this.result += '.';
        break;
      case 'all-clear':
        this.result = '0';
        this.evalString = '';
        break;
      case 'equal':
        this.evalString += this.result;
        this.calculate();
        this.evalString = '';
        break;
      case 'ce':
        this.result = '0';
        break;
      case 'root':
        this.result = Math.sqrt(Number(this.result)) + '';
        break;
      case 'MRC':
        console.log(this.MRCClick, this.memoryClick, this.result, this.memoryResult)
        // MR
        if (this.MRCClick == 0 && this.memoryClick) {
          this.result = this.memoryResult + '';
          this.memoryClick = false;
          this.MRCClick++;
        }
        // MC
        if (this.MRCClick == 1) {
          this.memoryResult = 0;
          this.MRCClick = 0;
        }
        break;
    }
  }

  onNumberButtonClick(value: string) {
    if (this.result.length > 18) {
      return;
    }
    if (this.memoryClick) {
      this.result = '0';
      this.memoryClick = false;
    }
    this.result = this.result == '0' ? value : this.result + value;
  }


  calculate() {
    // console.log(this.evalString);
    this.result = eval(this.evalString);
  }
}


