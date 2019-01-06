exports.ids = [0];
exports.modules = {

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_login_vue__ = __webpack_require__(111);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3ab8978e_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_login_vue__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(1);
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "cdfe97a2"

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_login_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3ab8978e_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_login_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3ab8978e_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_login_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_notification_function_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(2);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  metaInfo: {
    title: 'LOGIN page'
  },
  data() {
    return {
      userName: 'zys',
      password: 'zys',
      errorMsg: ''
    };
  },
  methods: _extends({}, Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapActions */])(['login']), {
    doLogin(e) {
      e.preventDefault();
      if (!this.validate()) return;
      this.login({
        userName: this.userName.trim(),
        password: this.password.trim()
      }).then(_ => {
        Object(__WEBPACK_IMPORTED_MODULE_0__components_notification_function_js__["a" /* default */])({
          content: '登录成功'
        });
        this.$router.replace('/todo');
      }).catch(err => {
        Object(__WEBPACK_IMPORTED_MODULE_0__components_notification_function_js__["a" /* default */])({
          content: err.message
        });
      });
    },
    validate() {
      if (!this.userName.trim()) {
        this.errorMsg = '用户名不能为空';
        return false;
      }
      if (!this.password.trim()) {
        this.errorMsg = '密码不能为空';
        return false;
      }
      this.errorMsg = '';
      return true;
    }
  })
});

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._ssrNode("<form class=\"form-login\"><h1>Login</h1> <span>"+_vm._ssrEscape(_vm._s(_vm.errorMsg))+"</span> <input type=\"text\" placeholder=\"请输入用户名\""+(_vm._ssrAttr("value",(_vm.userName)))+" class=\"input-login\"> <input type=\"password\" placeholder=\"请输入密码\""+(_vm._ssrAttr("value",(_vm.password)))+" class=\"input-login\"> <button type=\"submit\">登录</button></form>")])}
var staticRenderFns = []


/***/ })

};;
//# sourceMappingURL=0.server-entry.js.map