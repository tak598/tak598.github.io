const button = document.querySelector("#button");
const result = document.querySelector("#result");
const valueResult = document.querySelector("#valueResult")
const itemList = document.querySelector("#item-list");
const head = document.querySelector("#head");
const explain = document.querySelector("#explain")
const program = document.querySelector("#program");
const inputText1 = document.querySelector("#inputText1")
const inputText2 = document.querySelector("#inputText2")
const inputText3 = document.querySelector("#inputText3")
let resultArray = [];
let programText = "";
let resultText = "";

button.addEventListener("click", () => {
  resultArray = [];
  programText = "";
  resultText = "";
  showProgram(itemList.value);
  console.log(resultArray);
  if(programText){
    result.innerHTML = programText;
  }
  valueResult.innerHTML = resultText;
});

itemList.addEventListener("change", () => {
  result.innerHTML = "";
  valueResult.innerHTML = "";
  const itemName = itemList.value;
  switch (itemName) {
    case "factorial":
      inputText2.style.display = 'none';
      inputText3.style.display = 'none';
      head.innerHTML = "nの階乗の計算プログラム";
      explain.innerHTML = "第一引数にnの値を入力してください";
      program.innerHTML = `
int factorial(int n)
{
    if (n > 0)
        return (n * factorial(n - 1));
    else
        return (1);
}`;
      break;
    case "sum":
      inputText2.style.display = 'none';
      inputText3.style.display = 'none';
      head.innerHTML = "n以下の正の整数の総和の計算";
      explain.innerHTML = "第一引数にnの値を入力してください";
      program.innerHTML = `
int sum(int n)
{
    if (n > 1)
        return (n + sum(n - 1));
    else
        return (1);
}`;
      break;
    case "power":
      inputText2.style.display = '';
      inputText3.style.display = 'none';
      head.innerHTML = "xのy乗を計算するプログラム";
      explain.innerHTML = "第一引数にx、第二引数にyの値を入力してください";
      program.innerHTML = `
int power(int x, int y)
{
    if(y == 0)
        return 1;
    else
        return(x * power(x, y-1));
}`;
      break;
    case "GCD":
      inputText2.style.display = '';
      inputText3.style.display = 'none';
      head.innerHTML = "整数値x,yの最大公約数を返却するプログラム";
      explain.innerHTML = "第一引数にx、第二引数にyの値を入力してください";
      program.innerHTML = `
int gcd(int x, int y)
{
    if (y == 0)
        return x;
    else
        return (gcd(y, x%y));
}`;
      break;
    case "fibonacci":
      inputText2.style.display = 'none';
      inputText3.style.display = 'none';
      head.innerHTML = "フィボナッチ数列の計算";
      explain.innerHTML = "第一引数にnの値を入力してください";
      program.innerHTML = `
int fibonacci(int n) {
    if (n <= 1) {
        return n;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}`;
      break;
    case "hanoi":
      inputText2.style.display = '';
      inputText3.style.display = '';
      head.innerHTML = "ハノイの塔のプログラム";
      explain.innerHTML = "第一引数にn、第二引数にx,第三引数にyの値を入力してください (例:x軸からy軸へ、n枚移動させる)<br>xとyは1から3までにしてください";
      program.innerHTML = `
void move(int n, int x, int y)
{
    if (n > 1)
        move(n - 1, x, 6 - x - y);

    printf("[%d]を%d軸から%d軸へ移動", n, x, y);

    if (n > 1)
        move(n - 1, 6 - x - y, y);
}`;
      break;
  }
});


const showProgram = (itemName) => {
  const input1 = Number(document.querySelector("#input1").value);
  const input2 = Number(document.querySelector("#input2").value);
  const input3 = Number(document.querySelector("#input3").value);

  if (isNaN(input1) || isNaN(input2) || isNaN(input3) || input1 < 0 || input2 < 0 || input3 < 0){
    result.innerHTML = "正の整数値を入力してください";
    return null;
  }

  switch (itemName) {
    case "factorial":
      if(input1 > 10){
        result.innerHTML = "nは10以下にしてください"
        return null;
      }
      showFactorial(input1);
      break;
    case "sum":
      if(input1 > 20){
        result.innerHTML = "nは20以下にしてください"
        return null;
      }
      showSum(input1);
      break;
    case "power":
      if(input1 > 10){
        result.innerHTML = "x,yは10以下にしてください"
        return null;
      }
      showPower(input1, input2);
      break;
    case "GCD":
      if(input1 > 1000 || input2 > 1000){
        result.innerHTML = "x,yは1000以下にしてください"
        return null;
      }
      showGCD(input1, input2);
      break;
    case "fibonacci":
      if(input1 > 7){
        result.innerHTML = "nは7以下にしてください"
        return null;
      }
      showFibonacci(input1);
      break;
    case "hanoi":
      if(input2 < 1 || input2 > 3  || input3 < 1 || input3 > 3){
        result.innerHTML = "xとyは1から3までで選んでください";
        return null;
      }
      if(input2 === input3){
        result.innerHTML = "xとyは違う値にしてください"
        return null;
      }
      if(input1 > 5){
        result.innerHTML = "nは5枚以下にしてください";
        return null;
      }
      showMove(input1, input2, input3);
      break;
  }
};

const showMove = (n, x, y) => {
  if (n < 1) {
    throw new Error("ディスク番号は1以上でなければなりません");
  }

  // 再帰的計算: n > 1 の場合
  if (n > 1) {
    programText = `${programText}
  void move(int ${n}, int ${x}, int ${y})
  {
      <span id="green">if (${n} > 1)
          move(${n - 1}, ${x}, ${6 - x - y});</span>
      printf("${n}を${x}軸から${y}軸へ移動");
      <span id="green">if (${n} > 1)
          move(${n - 1}, ${6 - x - y}, ${y});</span>
  }
      `;
    showMove(n - 1, x, 6 - x - y); // 再帰呼び出し (n-1を移動)
  } else {
    //n = 0のとき
    programText = `${programText}
  void move(int ${n}, int ${x}, int ${y})
  {
      <span id="red">if (${n} > 1)
          move(${n - 1}, ${x}, ${6 - x - y});</span>
      printf("${n}を${x}軸から${y}軸へ移動");
      <span id="red">if (${n} > 1)
          move(${n - 1}, ${6 - x - y}, ${y});</span>
  }
      `;
  }


  // ここでディスクの移動処理
  resultText = `${resultText}
  [${n}]を${x}軸から${y}軸へ移動`;

  // 再帰的計算の後
  if (n > 1) {
    showMove(n - 1, 6 - x - y, y); // 再帰呼び出し (no-1を移動)
  }

  return;
};

const showFibonacci = (n) => {
  if (n < 0) {
    throw new Error("負のインデックスはサポートされていません");
  }

  // ベースケース: n == 0 または n == 1 の場合
  if (n === 0) {
    programText = `${programText}
  int fibonacci(int ${n})
  {
      <span id="green">if (${n} <= 1)
          return 0;</span>
      <span id="red">else
          return fibonacci(${n - 1}) + fibonacci(${n - 2});</span>
  }
          `;
    resultArray[0] = 0; // fib(0) = 0
    resultText = `${resultText}
  fibonacci(${n}) = 0`;
    return 0;
  } else if (n === 1) {
    programText = `${programText}
  int fibonacci(int ${n})
  {
      <span id="green">if (${n} <= 1)
          return 0;</span>
      <span id="red">else
          return fibonacci(${n - 1}) + fibonacci(${n - 2});</span>
  }
          `;
    resultArray[1] = 1; // fib(1) = 1
    resultText = `${resultText}
  fibonacci(${n}) = 1`;
    return 1;
  }

  // 再帰的計算: n > 1 の場合
  programText = `${programText}
  int fibonacci(int ${n})
  {
      <span id="red">if (${n} <= 1)
          return 0;</span>
      <span id="green">else
          return fibonacci(${n - 1}) + fibonacci(${n - 2});</span>
  }
          `;

  // 再帰呼び出し
  resultArray[n] = showFibonacci(n - 1) + showFibonacci(n - 2);
  resultText = `${resultText}
  fibonacci(${n}) = fibonacci(${n - 1}) + fibonacci(${n - 2}) = ${
    resultArray[n]
  }`;
  return resultArray[n];
};

const showSum = (n) => {
  if (n < 0) {
    throw new Error("負の数はサポートされていません");
  }

  // ベースケース: n == 1 の場合
  if (n === 0) {
    programText = `${programText}
  int sum(int ${n})
  {
      <span id="red">if (${n} > 0)
          return (${n} + sum(${n - 1}));</span>
      <span id="green">else
          return (0);</span>
  }`;
    // resultArray[1] = 1; // sum(1) = 1
    resultArray[0] = 0;
    resultText = `${resultText}
  sum(${n}) = 1`;
    return 0;
  }

  // 再帰的計算: n > 1 の場合
  programText = `${programText}
  int sum(int ${n})
  {
      <span id="green">if (${n} > 0)
          return (${n} + sum(${n - 1}));</span>
      <span id="red">else
          return (0);</span>
  }
          ↓
          ↓`;

  // 再帰呼び出し
  resultArray[n] = n + showSum(n - 1);
  resultText = `${resultText}
  sum(${n}) = ${n} + sum(${n - 1}) = ${resultArray[n]}`;
  return resultArray[n];
};

const showPower = (x, y) => {
  if (y < 0) {
    throw new Error("負の指数はサポートされていません");
  }

  // ベースケース: y == 0 の場合
  if (y === 0) {
    programText = `${programText}
int power(int ${x}, int ${y})
{
    <span id="green">if (${y} == 0)
        return 1;</span>
    <span id="red">else
        return(${x} * power(${x}, ${y - 1}));</span>
}
        `;
    resultArray[0] = 1; // x^0 = 1
    resultText = `${resultText}
  power(${x}, ${y}) = 1`;
    return 1;
  }

  // 再帰的計算: y > 0 の場合
  programText = `${programText}
int power(int ${x}, int ${y})
{
    <span id="red">if (${y} == 0)
        return 1;</span>
    <span id="green">else
        return(${x} * power(${x}, ${y - 1}));</span>
}
        ↓
        ↓`;

  // 再帰呼び出し
  resultArray[y] = x * showPower(x, y - 1);
  resultText = `${resultText}
  power(${x}, ${y}) = ${x} * power(${x}, ${y - 1}) = ${resultArray[y]}`;
  return resultArray[y];
};

const showGCD = (a, b) => {
  if (a < 0 || b < 0) {
    throw new Error("負の数はサポートされていません");
  }

  if (b === 0) {
    programText = `${programText}
  int gcd(int ${a}, int ${b})
  {
      <span id="green">if (${b} == 0)
          return (${a});</span>
      <span id="red">else
          return (gcd(${b}, ${a} % ${b});</span>)
  }
          `;
    resultArray[0] = a; // GCDは a そのもの
    resultText = `${resultText}
  gcd(${a}, ${b}) = ${a}`;
    return a;
  }

  //b != 0のとき
  programText = `${programText}
  int gcd(int ${a}, int ${b})
  {
      <span id="red">if (${b} == 0)
          return (${a});</span>
      <span id="green">else
          return (gcd(${b}, ${a} % ${b});</span>)
  }
          ↓
          ↓`;

  // 再帰呼び出し
  //   resultArray[a] = showGCD(b, a % b);
  showGCD(b, a % b);
  resultText = `${resultText}
  gcd(${a}, ${b}) = gcd(${b}, ${a} % ${b})`;
  return resultArray[a];
};

const showFactorial = (n) => {
  if (n < 0) {
    throw new Error("負の数の階乗は定義されていません");
  }

  if (n === 0) {
    programText = `${programText}
int factorial(int ${n})
{
    <span id="red">if (${n} > 0)
        return (${n} * factorial(${n - 1}));</span>
    <span id="green">else
        return (1);</span>
}`;
    resultArray[0] = 1; // 0! = 1
    resultText = `${resultText}
factorial(${n}) = 1`;
    return 1;
  }


  //n>0のとき
  programText = `${programText}
int factorial(int ${n})
{
    <span id="green">if (${n} > 0)
        return (${n} * factorial(${n - 1}));</span>
    <span id="red">else
        return (1);</span>
}
        ↓
        ↓`;
  resultArray[n] = n * showFactorial(n - 1);
  resultText = `${resultText}
factorial(${n}) = ${n} * factorial(${n - 1}) = ${resultArray[n]}`;
  return resultArray[n];
};
