import {
  __,
  prop,
  any,
  dissoc,
  compose,
  equals,
  allPass,
  countBy,
  identity,
  values,
  complement,
  propEq,
  gte,
} from "ramda";

// /**
//  * @file Домашка по FP ч. 1
//  *
//  * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
//  * Эти функции/их аналоги есть и в ramda и в lodash
//  *
//  * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
//  * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
//  * удовлетворяет этим аргументам (возвращает true)
//  *
//  * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
//  *
//  * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
//  */

// // 1. Красная звезда, зеленый квадрат, все остальные белые.
// export const validateFieldN1 = ({star, square, triangle, circle}) => {
//     if (triangle !== 'white' || circle !== 'white') {
//         return false;
//     }
//     console.log(star);
//     return star === 'red' && square === 'green';
// };

// // 2. Как минимум две фигуры зеленые.
// export const validateFieldN2 = () => false;

// // 3. Количество красных фигур равно кол-ву синих.
// export const validateFieldN3 = () => false;

// // 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
// export const validateFieldN4 = () => false;

// // 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
// export const validateFieldN5 = () => false;

// // 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
// export const validateFieldN6 = () => false;

// // 7. Все фигуры оранжевые.
// export const validateFieldN7 = () => false;

// // 8. Не красная и не белая звезда, остальные – любого цвета.
// export const validateFieldN8 = () => false;

// // 9. Все фигуры зеленые.
// export const validateFieldN9 = () => false;

// // 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
// export const validateFieldN10 = () => false;

const getStar = prop("star");
const getSquare = prop("square");
const getTriangle = prop("triangle");
const getCircle = prop("circle");

const getGreen = prop("green");
const getRed = prop("red");
const getBlue = prop("blue");

const isWhite = equals("white");
const isRed = equals("red");
const isOrange = equals("orange");
const isGreen = equals("green");
const isBlue = equals("blue");

const dissocWhite = dissoc("white");

const isStarRed = compose(isRed, getStar);
const isStarWhite = compose(isWhite, getStar);
const isStarGreen = compose(isGreen, getStar);
const isStarNotWhite = complement(isStarWhite);
const isStarNotRed = complement(isStarRed);

const isSquareWhite = compose(isWhite, getSquare);
const isSquareOrange = compose(isOrange, getSquare);
const isSquareGreen = compose(isGreen, getSquare);
const isNotWhiteSquare = complement(isSquareWhite);

const isTriangleWhite = compose(isWhite, getTriangle);
const isTriangleGreen = compose(isGreen, getTriangle);
const isNotWhiteTriangle = complement(isTriangleWhite);

const isCircleWhite = compose(isWhite, getCircle);
const isCircleBlue = compose(isBlue, getCircle);
const isCircleGreen = compose(isGreen, getCircle);

const countDupes = compose(countBy(identity), values);
const countDupesWhitoutWhite = compose(dissocWhite, countDupes);

const numberOfGreenColors = compose(getGreen, countDupes);
const redEqualsBlue = ({ blue, red }) => blue === red;
const squareEqualsTriangle = ({ square, triangle }) => square === triangle;

const allFiguresHasSameColor = (color) => compose(propEq(color, 4), countDupes);
const moreOrEqualsTwo = gte(__, 2);
const greaterOrEqualsThenThree = gte(__, 3);
const anyGreaterOrEqualsThenThree = any(greaterOrEqualsThenThree);
const anyValueGreaterOrEqualsThenThree = compose(
  anyGreaterOrEqualsThenThree,
  values
);

const oneRed = propEq("red", 1);
const twoGreens = propEq("green", 2);
const twoGreenColors = compose(twoGreens, countDupes);
const oneRedColor = compose(oneRed, countDupes);

/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
  isStarRed,
  isSquareGreen,
  isTriangleWhite,
  isCircleWhite,
]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(moreOrEqualsTwo, numberOfGreenColors);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = compose(redEqualsBlue, countDupes);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
  isStarRed,
  isSquareOrange,
  isCircleBlue,
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = compose(
  anyValueGreaterOrEqualsThenThree,
  countDupesWhitoutWhite
);

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([
  isTriangleGreen,
  twoGreenColors,
  oneRedColor,
]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = allFiguresHasSameColor("orange");

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = allPass([isStarNotWhite, isStarNotRed]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = allFiguresHasSameColor("green");

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass([
  isNotWhiteSquare,
  isNotWhiteTriangle,
  squareEqualsTriangle,
]);
