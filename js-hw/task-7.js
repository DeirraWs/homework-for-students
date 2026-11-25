/*
    Функція з колбеком:
    Створити функцію calculate, яка приймає два числа і колбек.
    Колбек визначає дію: додавання або віднімання.
*/

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function calculate(a, b, operation) {
    return operation(a, b);
}

console.log(calculate(7, 3, add));
console.log(calculate(7, 3, subtract));
