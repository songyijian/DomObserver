
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
function type(o) {
  return Object.prototype.toString.call(o).slice(8, -1);
}

var DomObserver = /*#__PURE__*/function () {
  function DomObserver() {
    var dom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    this.MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    var isSupport = !!MutationObserver;

    if (!isSupport) {
      console.error('Browser does not support');
      return undefined;
    }

    this.dom = dom;
    this.config = {};
    var defaultConfig = {
      attributes: true,
      attributeOldValue: true,
      childList: true,
      subtree: true,
      characterData: true
    };
    Object.assign(this.config, defaultConfig, DomObserver.config, config);
    this.observerObj = this.created();
    this.observe();

    this.onChildList = function () {};

    this.onAddChildList = function () {};

    this.onRmChildList = function () {};

    this.onAttributes = function () {};

    this.onChange = function () {};
  }

  var _proto = DomObserver.prototype;

  _proto.created = function created() {
    var _this = this;

    var MutationObserver = this.MutationObserver;
    return new MutationObserver(function (mutations, instance) {
      mutations.forEach(function (mitem) {
        if (mitem.type === 'childList') {
          var rmlist = mitem.removedNodes;
          var addlist = mitem.addedNodes; // addedNodes

          if (addlist.length > 0) {
            var atf = _this.config.addTagFilter;

            if (type(atf) === 'Array') {
              var addlock = false;

              for (var c = 0; c < rmlist.length; c++) {
                var n = rmlist[c];
                var tn = n.nodeName.toLowerCase();

                if (atf.indexOf(tn) >= 0) {
                  addlock = true;
                  break;
                }
              }

              if (addlock) {
                _this.childList(mitem);

                _this.onAddChildList(mitem);
              }
            } else {
              _this.childList(mitem);

              _this.onAddChildList(mitem);
            }
          } // removedNodes


          if (rmlist.length > 0) {
            var rtf = _this.config.rmTagFilter;
            var rnf = _this.config.rmNodesFilter;

            if (type(rtf) === 'Array' || type(rnf) === 'Array') {
              var rmlock = false;

              for (var _c = 0; _c < rmlist.length; _c++) {
                var _n = rmlist[_c];

                var _tn = _n.nodeName.toLowerCase();

                if (type(rtf) === 'Array' && rtf.indexOf(_tn) >= 0) {
                  rmlock = true;
                  break;
                } else if (type(rnf) === 'Array') {
                  for (var e = 0; e < rnf.length; e++) {
                    if (rnf[e] === _n) {
                      rmlock = true;
                      break;
                    }
                  }

                  if (rmlock) break;
                }
              }

              if (rmlock) {
                _this.childList(mitem);

                _this.onRmChildList(mitem);
              }
            } else {
              _this.childList(mitem);

              _this.onRmChildList(mitem);
            }
          }
        } // attributes


        if (mitem.type === 'attributes') {
          var tag = mitem.target.nodeName.toLowerCase();
          var _atf = _this.config.attrTagFilter;
          var key = mitem.attributeName;
          var val = mitem.target.getAttribute(key);

          if (!_atf || type(_atf) === 'undefined' || type(_atf) !== 'Array') {
            _this.onAttributes(mitem, key, val);

            return _this;
          }

          if (_atf.indexOf(tag) >= 0) {
            _this.onAttributes(mitem, key, val);
          }
        }
      });
    }); //.observe(this.dom, self.config)
  };

  _proto.observe = function observe() {
    this.observerObj && this.observerObj.observe(this.dom, this.config);
    return this;
  };

  _proto.disconnect = function disconnect() {
    this.observerObj && this.observerObj.disconnect();
    return this;
  } /////////////////////////////////
  // 注册监听
  ;

  _proto.childList = function childList(fn) {
    typeof fn === 'function' && (this.onChildList = fn);
    return this;
  };

  _proto.addChildList = function addChildList(fn) {
    typeof fn === 'function' && (this.onAddChildList = fn);
    return this;
  };

  _proto.rmChildList = function rmChildList(fn) {
    typeof fn === 'function' && (this.onRmChildList = fn);
    return this;
  };

  _proto.attributes = function attributes(fn) {
    typeof fn === 'function' && (this.onAttributes = fn);
    return this;
  };

  _proto.change = function change() {
    typeof fn === 'function' && (this.onChange = fn);
    return this;
  };

  return DomObserver;
}();
DomObserver.config = {};

window.DomObserver = DomObserver;
