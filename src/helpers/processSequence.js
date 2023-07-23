// /**
//  * @file Домашка по FP ч. 2
//  *
//  * Подсказки:
//  * Метод get у инстанса Api – каррированый
//  * GET / https://animals.tech/{id}
//  *
//  * GET / https://api.tech/numbers/base
//  * params:
//  * – number [Int] – число
//  * – from [Int] – из какой системы счисления
//  * – to [Int] – в какую систему счисления
//  *
//  * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
//  * Ответ будет приходить в поле {result}
//  */
// import Api from "../tools/api";

// const api = new Api();

// /**
//  * Я – пример, удали меня
//  */
// const wait = (time) =>
//   new Promise((resolve) => {
//     setTimeout(resolve, time);
//   });

// const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
//   /**
//    * Я – пример, удали меня
//    */
//   writeLog(value);

//   api
//     .get("https://api.tech/numbers/base", {
//       from: 2,
//       to: 10,
//       number: "01011010101",
//     })
//     .then(({ result }) => {
//       writeLog(result);
//     });

//   wait(2500)
//     .then(() => {
//       writeLog("SecondLog");

//       return wait(1500);
//     })
//     .then(() => {
//       writeLog("ThirdLog");

//       return wait(400);
//     })
//     .then(() => {
//       handleSuccess("Done");
//     });
// };

// export default processSequence;

import Api from "../tools/api";
import {
  __,
  allPass,
  andThen,
  assoc,
  compose,
  concat,
  gt,
  ifElse,
  length,
  lt,
  mathMod,
  otherwise,
  partial,
  prop,
  tap,
  test,
} from "ramda";

const api = new Api();

const square = (num) => num ** 2;
const gtTwo = gt(__, 2);
const ltTen = lt(__, 10);

const thenSquare = andThen(square);

const lengthGreaterThenTwo = compose(gtTwo, length);
const lengthLowerThenTen = compose(ltTen, length);
const testOnlyNumbers = test(/^[0-9]+\.?[0-9]+$/);
const roundStringToNumber = compose(Math.round, Number);
const modForThreeToString = compose(String, mathMod(__, 3));

const thenModOfThreeToString = andThen(modForThreeToString);
const thenGetLength = andThen(length);

const validate = allPass([
  lengthGreaterThenTwo,
  lengthLowerThenTen,
  testOnlyNumbers,
]);

const API_NUMBERS_URL = "https://api.tech/numbers/base";
const API_ANIMALS_URL = "https://animals.tech/";
const getApiResult = compose(String, prop("result"));

const assocNumberToBinary = assoc("number", __, { from: 10, to: 2 });

const apiGetNumberBinaryBase = compose(
  api.get(API_NUMBERS_URL),
  assocNumberToBinary
);

const thenGetApiResult = andThen(getApiResult);
const thenConcatToAnimalsUrl = andThen(concat(API_ANIMALS_URL));
const thenCallApiWithEmptyParams = andThen(api.get(__, {}));

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
  const tapLog = tap(writeLog);
  const thenTapLog = andThen(tapLog);
  const thenHandleSuccess = andThen(handleSuccess);
  const otherwiseHandleError = otherwise(handleError);

  const handleValidationError = partial(handleError, ["ValidationError"]);

  const sequenceComposition = compose(
    otherwiseHandleError,
    thenHandleSuccess,
    thenGetApiResult,
    thenCallApiWithEmptyParams,
    thenConcatToAnimalsUrl,
    thenTapLog,
    thenModOfThreeToString,
    thenTapLog,
    thenSquare,
    thenTapLog,
    thenGetLength,
    thenTapLog,
    thenGetApiResult,
    apiGetNumberBinaryBase,
    tapLog,
    roundStringToNumber
  );

  const runWithCondition = ifElse(
    validate,
    sequenceComposition,
    handleValidationError
  );
  const logAndRunSequence = compose(runWithCondition, tapLog);

  logAndRunSequence(value);
};

export default processSequence;
