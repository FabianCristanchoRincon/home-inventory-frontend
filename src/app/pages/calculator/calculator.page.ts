import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit {


  value = '0';
  oldValue = '0';
  labelOp:string = '';
  lastChar = '';
  color = 'tertiary';

  lastOperator = 'x';
  readyForNewInput = true;
  numberGroups = [
    [7, 8, 9, 'x'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'],
    [0, 'c', '/', '=']
  ];

  constructor() { }

  ngOnInit() {
  }

  

  onButtonPress(symbol) {
    this.color = 'tertiary';
    let numberS = this.labelOp.substring(this.labelOp.length-1);
    console.log(this.lastChar);
    console.log(!Number.isNaN(numberS));
    this.labelOp += (Number.isInteger(this.lastChar) && Number.isInteger(symbol))? symbol : ' ' +symbol;

    if (Number.isInteger(symbol)) {
      if (this.readyForNewInput)
        this.value = '' + symbol;
      else
        this.value += '' + symbol;
      this.readyForNewInput = false;
    }
    else if (symbol === 'c') {
      this.value = '0';
      this.readyForNewInput = true;
      this.labelOp = '';
    }
    else if (symbol === '=') {
      if (this.lastOperator === 'x')
        this.value = '' + (parseInt(this.oldValue) * parseInt(this.value));
      else if (this.lastOperator === '-')
        this.value = '' + (parseInt(this.oldValue) - parseInt(this.value));
      else if (this.lastOperator === '+')
        this.value = '' + (parseInt(this.oldValue) + parseInt(this.value));
      else if (this.lastOperator === '/')
        this.value = '' + (parseInt(this.oldValue) / parseInt(this.value));
      this.readyForNewInput = true;
      this.labelOp = this.value;
      this.color = 'success';
    }
    else { // operator
      this.readyForNewInput = true;
      this.oldValue = this.value;
      this.lastOperator = symbol;
    }
    this.lastChar = symbol;
  }

}
