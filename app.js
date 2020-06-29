"use strict";

// 1. Подсчитать сумму всех чисел в заданном пользователем диапазоне.

let rangeOfNumbersField = document.querySelector(".field--number"),
  btnCalcRange = document.querySelector(".bnt-calcRange"),
  rangeOfNumbers = document.querySelector(".out-range"),
  sumOfRangeNumbers = document.querySelector(".out-rangeSum");

let numbers = {
  firstOpernand: null,
};

let { firstOpernand } = numbers;

const calcRange = (e) => {
  let value = +rangeOfNumbersField.value;

  if (firstOpernand === null) {
    firstOpernand = value;
    rangeOfNumbersField.value = "";
    btnCalcRange.innerHTML = "Ответ";
    return;
  }
  if (firstOpernand != null) {
    let result = [];
    for (let i = firstOpernand; i <= value; i++) {
      result.push(i);
    }
    rangeOfNumbers.innerHTML = `Диапазон чисел:${result.join(",")}`;
    result = result.reduce((a, b) => a + b);
    sumOfRangeNumbers.innerHTML;
    sumOfRangeNumbers.innerHTML = `Сумма чисел ${result}`;
  }
  firstOpernand = null;
  btnCalcRange.innerHTML = "Введите число";
  rangeOfNumbersField.value = "";
};
btnCalcRange.addEventListener("click", calcRange);

// 2. Запросить 2 числа и найти только наибольший общий делитель.

const firstNodNum = document.querySelector(".fieldNodFirst"),
  secondNodNum = document.querySelector(".fieldNodSecond"),
  nodResult = document.querySelector(".out-nod-result");

const nodFields = [firstNodNum, secondNodNum];

// находим все  делители числа
const getNode = (val) => {
  let arr = [];
  for (let i = 1; i <= val; i++) {
    if (!(val % i)) {
      arr.push(i);
    }
  }

  
  return arr;
};


const nodeOut = (arrOne, arrTwo) => {
  let total = [],
    firstOpernand = getNode(arrOne),
    secondOpernand = getNode(arrTwo);

  //  сравниваем делители
  for (let i = 0; i < firstOpernand.length; i++) {
    for (let k = 0; k < secondOpernand.length; k++) {
      if (firstOpernand[i] === secondOpernand[k]) {
        total.push(firstOpernand[i]);
      }
    }
  }
  // находим наибольщий среди общих

  let result = Math.max.apply(null, total);

  if (result != -Infinity) {
    nodResult.innerHTML = result;
  }
  
};






const fieldValidator = () => {
  let firstValue = firstNodNum.value,
    secondValue = secondNodNum.value;

  if (firstValue.trim().length > 0 && secondValue.trim().length > 0) {
    nodeOut(firstValue, secondValue);
  }
};

nodFields.forEach((el) => el.addEventListener("input", fieldValidator));

//  3. Запросить у пользователя число и вывести все делители этого числа.

// Вариант через for()

/* const allDividers = num => {
    let counter = []
    for( let i = 1; i <= num; i++  ) {
        if( !(num % i) ){
            counter.push( i )
        }
    }

    return counter.join(',')
}

console.log(allDividers(10)); */

const fieldDividers = document.querySelector(".fieldDividers"),
  outResDividers = document.querySelector(".out-resDividers");

const getDividers = (event) => {
  let value = fieldDividers.value;

  if (value.length > 0) {
    value = Number(value);
    let result = Array.from(new Array(value), (n, i) => i + 1).filter(
      (num) => !(value % num)
    );

    outResDividers.innerHTML = `Число: ${value} Делители: ${result.join(",")}`;
  }
};
fieldDividers.addEventListener("keyup", getDividers);

// 4. Определить количество цифр в введенном числе.
const quantityNumbers = document.querySelector(".quantityNumbers"),
  outQuantityNumbers = document.querySelector(".out-quantityNumbers");

const amountOfNums = (num) => {
  let count = 0;
  for (let i = 0; i < num.length; i++) {
    if (Number(num[i])) count++;
  }
  if (count > 0) {
    outQuantityNumbers.innerHTML = count;
  }
};

quantityNumbers.addEventListener("input", () =>
  amountOfNums(quantityNumbers.value)
);

// 5  Запросить у пользователя 10 чисел и подсчитать, сколько он ввел положительных, отрицательных и нулей. При этом также посчитать, сколько четных и нечетных. Вывести статистику на экран. Учтите, что достаточно одной переменной (не 10) для ввода чисел пользователем.

const checkValueOfNumbers    = document.querySelector(".checkValueOfNumbers"),
  bntCheckValueOfNumbers     = document.querySelector(".bntCheckValueOfNumbers"),
  outCheckValueOfNumbers     = document.querySelector(".out-checkValueOfNumbers"),
  leftToInp                  = document.querySelector(".leftToInp");

let infoAboutNumbers = {
  positiveNum: 0,
  negativeNum: 0,
  zero: 0,
  evenNum: 0,
  oddNum: 0,

  checkNegZerPos( val ) {
    if ( val > 0 ) {
      ++this.positiveNum;
    } else if ( val < 0 ) {
      ++this.negativeNum;
    } else {
      ++this.zero;
    }
  },

  checkOddEven( val ) {
    if ( !( val % 2 ) ) {
      ++this.evenNum;
    } else {
      ++this.oddNum;
    }
  },
  showResult( target ) {
    target.innerHTML = `Положительных: ${ this.positiveNum }, Отрицательных: ${ this.negativeNum },
    Нулей: ${ this.zero }</br>Четных: ${ this.evenNum }, Нечетных: ${ this.oddNum }`;
  },
};

const clearKeys = ( obj, val ) => {
  Object.keys( obj ).forEach(( key ) => {
    typeof obj[key] != "function" ? ( obj[key] = val ) : key;
  });
};

let counter = 0;
const checkNumbers = () => {
  let value  = checkValueOfNumbers.value;
  counter    == 0 ? ( outCheckValueOfNumbers.innerHTML = "" ) : null;

  if (counter < 10) {
    infoAboutNumbers.checkNegZerPos( value );
    infoAboutNumbers.checkOddEven( value );

    checkValueOfNumbers.value = "";
    ++counter;
    leftToInp.innerHTML = 10 - counter;
  }
  if (counter == 10) {
    counter    = 0;

    infoAboutNumbers.showResult( outCheckValueOfNumbers );
    clearKeys( infoAboutNumbers, 0 );

    leftToInp.innerHTML = 10;
  }
};

bntCheckValueOfNumbers.addEventListener( "click", checkNumbers );

// 6 Зациклить калькулятор. Запросить у пользователя 2 числа и знак, решить пример, вывести результат и спросить, хочет ли он решить еще один пример. И так до тех пор, пока пользователь не откажется.

const fieldCalc       = document.querySelectorAll( '.field--calc' ),
      calcOptions     = document.querySelector( '#select' ),
      calculatorBtn   = document.querySelector( '.btn--calculator' ),
      btnStart        = document.querySelector( '.btnStart' ),
      calcW           = document.querySelector( '.calculator' ),
      answer          = document.querySelector( '.answer' ),  
      reCalc          = document.querySelector( '.reCalc' ),
      exit            = document.querySelector( '.exit' );

      const startE = () => calcW.style.display="block" ;
const calculator = () => {
  
  let sum = [];
  fieldCalc.forEach( num => {
    num.value.indexOf(',') != -1 ? 
    num.value = num.value.replace(/\,/g,'.') : num;
    sum.push(num.value);
    console.log(num.value.length);
    
  }); 
  
  sum = sum.map(Number).reduce((a,b) => eval( `${a}${calcOptions.value}${b}` ));
  sum = isNaN(sum) ? sum = 0 : sum;
  answer.innerHTML =  sum.toString().length > 4 ? sum.toFixed(2) : sum;
  
  fieldCalc[0].value = "";
  fieldCalc[1].value = "";
  calcW.childNodes[3].classList.add('calculator__result--active');
 
}


btnStart.addEventListener( 'click', startE );
calculatorBtn.addEventListener( 'click',calculator );

reCalc.addEventListener( 'click',() =>{
  calcW.childNodes[3].classList.remove('calculator__result--active');
  calculatorBtn.disabled = true;
});

fieldCalc.forEach(el => el.addEventListener('input',() =>{
  el.value.length > 0 ? calculatorBtn.disabled = false : calculatorBtn.disabled = true;
}));
 
exit.addEventListener( 'click', ()=>{
calcW.childNodes[3].classList.remove('calculator__result--active');
calcW.style.display="none"; 
})

// 8 Зациклить вывод дней недели таким образом: «День недели. Хотите увидеть следующий день?» и так до тех пор, пока пользователь нажимает OK.
const dayOut   = document.querySelector( '.days-out' ),
      nextDay  = document.querySelector( '.nextDay' ),
      prevDay  = document.querySelector( '.prevDay' );

const DAYS = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
let count = 0;
const showDays  = (arr,count) => {
  dayOut.innerHTML = arr[count];
};
const nextDate = () => {
  count >= DAYS.length - 1 ? count = 0 : count++
  showDays(DAYS,count)
}
const prevDate = () => {
  count == 0 ? count = 6 : count--
  showDays(DAYS,count)
}


showDays(DAYS,count)

nextDay.addEventListener('click',nextDate)
prevDay.addEventListener( 'click',prevDate )

// 8 Вывести таблицу умножения для всех чисел от 2 до 9. Каждое число необходимо умножить на числа от 1 до 10.
const table = document.querySelector( '.table' );


let out = '' ;
   
for(let i = 2 ; i <= 9 ; i++){
  for(let k = 1 ; k <= 10 ; k++){
    out += `<li>${i} * ${k} = ${i * k}</li>`
  }

  table.innerHTML += `<ul class="mb">${out}</ul>`
  out = ''
 
}

  


// 10 Игра «Угадай число». Предложить пользователю загадать число от 0 до 100 и отгадать его следующим способом: каждую итерацию цикла делите диапазон чисел пополам, записываете результат в N и спрашиваете у пользователя «Ваше число > N, < N или == N?». В зависимости от того, что указал пользователь, уменьшаете диапазон. Начальный диапазон от 0 до 100, поделили пополам и получили 50. Если пользователь указал, что его число > 50, то изменили диапазон на от 51 до 100. И так до тех пор, пока пользователь не выберет == N.
 
const startGame = document.querySelector( '.StartGame' ),
      mainBlock = document.querySelector( '.firstStep' ),
      game      = document.querySelector( '.game' );
  
 let number = 50;
 let tmp = number / 2; 

const showResults = num => {
  Array.from(game.children).forEach( btn => {
   btn.children.item(0).innerHTML = num
  }) ;
};


const variantMore = () => {
    if(number == 50){
      number += tmp;
    }else {
      number++
    };
 
    showResults(number);

    
}

const variantLess = () => {
  if(number == 50){
    number -= tmp;
  } else {
    number--;
   };
  showResults(number);
}
  

const stopGame =()=>{
  number = 50;
  mainBlock.style.display='block';
  game.classList.remove('game--active');
};

const isStart = () => {
    mainBlock.style.display='none';
    game.classList.add('game--active');
    showResults(number);
  }
startGame.addEventListener( 'click', isStart );
game.children[0].addEventListener( 'click', variantMore );
game.children[1].addEventListener( 'click', stopGame );
game.children[2].addEventListener( 'click', variantLess );
  

      