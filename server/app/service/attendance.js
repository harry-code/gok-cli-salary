/* eslint-disable no-unused-vars */
// 考勤数据
'use strict';

const doAttendence = data => {
  const theadData = data.slice(0, 3);
  const thead = { ...theadData[0], ...theadData[1], ...theadData[2] };
  const tData = data.slice(3);
  return data;
};

module.exports = {
  doAttendence,
};
