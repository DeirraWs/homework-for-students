/*
    Сума чисел:
    Дано масив чисел [1, 2, 2, 3, 4, 4]. 
    Знайти суму.
*/

const numbers = [1, 2, 2, 3, 4, 4];

const total = numbers.reduce((sum, number) => sum + number, 0);
console.log(total);
