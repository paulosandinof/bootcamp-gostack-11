"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _handlebars = _interopRequireDefault(require("handlebars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HandlebarMailTemplateProvider {
  async parse({
    file,
    variables
  }) {
    const templateFileContent = await _fs.default.promises.readFile(file, {
      encoding: 'utf-8'
    });

    const parseTemplate = _handlebars.default.compile(templateFileContent);

    return parseTemplate(variables);
  }

}

var _default = HandlebarMailTemplateProvider;
exports.default = _default;