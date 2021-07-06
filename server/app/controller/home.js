/* eslint-disable no-undef */
'use strict';

const Controller = require('egg').Controller;
const xlsx = require('xlsx');
// const fs = require('fs');

class HomeController extends Controller {
  async index() {
    let file;
    try {
      file = this.ctx.request.files[0];
      const list = [];
      const workbook = xlsx.readFile(file.filepath);
      for (const sheet in workbook.Sheets) {
        if (workbook.Sheets.hasOwnProperty(sheet)) {
          // 数据直接转成json格式
          list.push(xlsx.utils.sheet_to_json(workbook.Sheets[sheet]));
        }
      }
      console.log('list', list);
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
