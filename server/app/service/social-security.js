// 社保单据详细信息
'use strict';

let dataArry = [],
  num = 0;
const doSocial = (data = []) => {
  if (num > 4) {
    num = 0;
  }
  num++;
  dataArry = [ ...dataArry, data ];

  if (num === 4) {
    return dataArry.flat(Infinity);
  }
};

function findUserData(data) {
  const tempArr = [];
  const afterData = [];
  for (let i = 0; i < data.length; i++) {
    if (tempArr.indexOf(data[i]['社会保障号码']) === -1) {
      afterData.push({
        社会保障号码: data[i]['社会保障号码'],
        姓名: data[i]['姓名'],
        origin: [ data[i] ],
      });
      tempArr.push(data[i]['社会保障号码']);
    } else {
      for (let j = 0; j < afterData.length; j++) {
        console.log(afterData[j]['社会保障号码'], data[i]['社会保障号码']);
        if (afterData[j]['社会保障号码'] === data[i]['社会保障号码']) {
          afterData[j].origin.push(data[i]);
          break;
        }
      }
    }
    console.log('afterData', afterData);
  }
}


module.exports = {
  doSocial,
};
