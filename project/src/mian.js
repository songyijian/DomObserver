'use strict';

function type(o) {
  return Object.prototype.toString.call(o).slice(8, -1)
}

export default class DomObserver {
  constructor( dom = document, config = {} ) {
    this.MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    var isSupport = !!MutationObserver;
    if (!isSupport) {
      console.error('Browser does not support')
      return undefined
    }

    this.dom = dom
    this.config = {}
    var defaultConfig = {
      attributes: true, 
      attributeOldValue:true,
      childList: true,
      subtree:true,
      characterData: true,
    }
    Object.assign(this.config, defaultConfig, DomObserver.config, config)
    this.observerObj =  this.created()
    this.observe()

    this.onChildList = function(){}
    this.onAddChildList = function(){}
    this.onRmChildList = function(){}
    this.onAttributes = function(){}
    this.onChange = function(){}
  }

  created() {
    var MutationObserver = this.MutationObserver;
    return new MutationObserver((mutations, instance) => {
      mutations.forEach((mitem) => {
        
        if (mitem.type === 'childList') {
          let rmlist = mitem.removedNodes
          let addlist = mitem.addedNodes

          // addedNodes
          if (addlist.length > 0) {
            let atf = this.config.addTagFilter
            if(type(atf)==='Array'){ 
              let addlock = false
              for (let c = 0; c < rmlist.length; c++) {
                let n = rmlist[c];
                let tn = n.nodeName.toLowerCase()
                if(atf.indexOf(tn)>=0){
                  addlock = true
                  break
                }
              }
              if(addlock){
                this.childList(mitem)
                this.onAddChildList(mitem)
              }
            }else{
              this.childList(mitem)
              this.onAddChildList(mitem)
            }
          }

          // removedNodes
          if (rmlist.length > 0) {
            let rtf = this.config.rmTagFilter
            let rnf = this.config.rmNodesFilter
            if(type(rtf)==='Array' || type(rnf)==='Array'){ 
              let rmlock = false
              for (let c = 0; c < rmlist.length; c++) {
                let n = rmlist[c];
                let tn = n.nodeName.toLowerCase()
                if(type(rtf)==='Array' && rtf.indexOf(tn)>=0){
                  rmlock = true
                  break
                }else if(type(rnf)==='Array'){
                  for (let e = 0; e < rnf.length; e++) {
                    if(rnf[e] === n){
                      rmlock = true
                      break
                    }
                  }
                  if(rmlock)break
                }
              }
              if(rmlock){
                this.childList(mitem)
                this.onRmChildList(mitem)
              }
            }else{
              this.childList(mitem)
              this.onRmChildList(mitem)
            }
          }
        }

        // attributes
        if (mitem.type === 'attributes') {
          let tag = mitem.target.nodeName.toLowerCase()
          let atf = this.config.attrTagFilter
          let key = mitem.attributeName; 
          let val = mitem.target.getAttribute(key);

          if(!atf || type(atf) ==='undefined' || type(atf)!=='Array' ){ 
            this.onAttributes(mitem, key, val )
            return this
          }
          if(atf.indexOf(tag) >= 0){
            this.onAttributes(mitem, key, val )
          }
          
        }

      })
    })
    //.observe(this.dom, self.config)
  }

  observe() {
    this.observerObj && this.observerObj.observe(this.dom, this.config);
    return this
  }

  disconnect() {
    this.observerObj && this.observerObj.disconnect();
    return this
  }

  /////////////////////////////////
  // 注册监听
  childList(fn) {
    typeof fn === 'function' &&  (this.onChildList = fn)
    return this
  }
  addChildList(fn) {
    typeof fn === 'function' &&  (this.onAddChildList = fn)
    return this
  }
  rmChildList(fn) {
    typeof fn === 'function' &&  (this.onRmChildList = fn)
    return this
  }
  attributes(fn) {
    typeof fn === 'function' &&  (this.onAttributes = fn)
    return this
  }
  change(){
    typeof fn === 'function' &&  (this.onChange = fn)
    return this
  }

}

DomObserver.config = {}



