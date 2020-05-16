import _module from "module";
var exports = {},
    _dewExec = false;
export function dew() {
  if (_dewExec) return exports;
  _dewExec = true;

  var _nodeRequire = function () {
    var Module = _module.Module;

    if (Module) {
      var m = new Module("");
      m.filename = import.meta.url.substr(7 + (Module._nodeModulePaths("/")[0].length > 13));
      m.paths = Module._nodeModulePaths(m.filename.substr(0, m.filename.lastIndexOf("/")));
      return m.require.bind(m);
    } else {
      return function _nodeRequire(id) {
        var e = new Error("Cannot find module '" + id + "'");
        e.code = "MODULE_NOT_FOUND";
        throw e;
      };
    }
  }();

  !function (e, a) {
    "object" == typeof exports && true ? exports = a(_nodeRequire("dayjs")) : "function" == typeof define && define.amd ? define(["dayjs"], a) : e.dayjs_locale_ss = a(e.dayjs);
  }(exports, function (e) {
    "use strict";

    e = e && e.hasOwnProperty("default") ? e.default : e;
    var a = {
      name: "ss",
      weekdays: "Lisontfo_Umsombuluko_Lesibili_Lesitsatfu_Lesine_Lesihlanu_Umgcibelo".split("_"),
      months: "Bhimbidvwane_Indlovana_Indlov'lenkhulu_Mabasa_Inkhwekhweti_Inhlaba_Kholwane_Ingci_Inyoni_Imphala_Lweti_Ingongoni".split("_"),
      weekStart: 1,
      weekdaysShort: "Lis_Umb_Lsb_Les_Lsi_Lsh_Umg".split("_"),
      monthsShort: "Bhi_Ina_Inu_Mab_Ink_Inh_Kho_Igc_Iny_Imp_Lwe_Igo".split("_"),
      weekdaysMin: "Li_Us_Lb_Lt_Ls_Lh_Ug".split("_"),
      ordinal: function (e) {
        return e;
      },
      formats: {
        LT: "h:mm A",
        LTS: "h:mm:ss A",
        L: "DD/MM/YYYY",
        LL: "D MMMM YYYY",
        LLL: "D MMMM YYYY h:mm A",
        LLLL: "dddd, D MMMM YYYY h:mm A"
      },
      relativeTime: {
        future: "nga %s",
        past: "wenteka nga %s",
        s: "emizuzwana lomcane",
        m: "umzuzu",
        mm: "%d emizuzu",
        h: "lihora",
        hh: "%d emahora",
        d: "lilanga",
        dd: "%d emalanga",
        M: "inyanga",
        MM: "%d tinyanga",
        y: "umnyaka",
        yy: "%d iminyaka"
      }
    };
    return e.locale(a, null, !0), a;
  });
  return exports;
}