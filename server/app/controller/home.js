/* eslint-disable no-undef */
'use strict';

const Controller = require('egg').Controller;
const xlsx = require('xlsx');
// const fs = require('fs');
const { doSocial } = require('./../service/social-security');
const { doAccFund } = require('./../service/accumulation-fund');
const { doAttendence } = require('./../service/attendance');

class HomeController extends Controller {
  async index() {
    let file;
    try {
      file = this.ctx.request.files[0];
      let list = [];
      const workbook = xlsx.readFile(file.filepath);
      for (const sheet in workbook.Sheets) {
        const filename = file.filename.split('.')[0];
        if (workbook.Sheets.hasOwnProperty(sheet)) {
          if (filename.includes('社保单据详细信息')) {
            doSocial(xlsx.utils.sheet_to_json(workbook.Sheets[sheet]));
          }
          if (filename.includes('公积金')) {
            const data = doAccFund(xlsx.utils.sheet_to_json(workbook.Sheets[sheet]));
            list = data;
          }
          if (filename.includes('OA考勤明细')) {
            const data = doAttendence(xlsx.utils.sheet_to_json(workbook.Sheets[sheet]));
            list = data;
          }
        }
      }
      this.ctx.body = list;
    } catch (error) {
      this.ctx.logger.error(error);
      // if (error.classtype === 'BusError') {
      // this.ctx.body = new Result(null, false, error.message, error.code);
      // return;
      // }
      // this.ctx.body = new Result(null, false, '未知错误', 10000);
    } finally {
      // if (file) {
      //   await fs.unlink(file.filepath);
      // }
    }
  }
}

module.exports = HomeController;
