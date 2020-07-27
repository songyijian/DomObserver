# DomMutationObserver DOM 观察对象



## 监听配置
- childList：子元素的变动
- characterData：节点内容或节点文本的变动
- subtree：所有下属节点（包括子节点和子节点的子节点）的变动想要观察哪一种变动类型，就在option对象中指定它的值为true。需要注意的是，不能单独观察subtree变动，必须同时指定childList、attributes和characterData中的一种或多种。
- attributes：属性的变动
- attributeOldValue：值为true或者为false。如果为true，则表示需要记录变动前的属性值。
- characterDataOldValue：值为true或者为false。如果为true，则表示需要记录变动前的数据值。
- attributesFilter：值为一个数组，表示需要观察的特定属性（比如['class', 'str']）。

```
config = {
  // MutationObserver原始api ------
  attributes: true, 
  attributeOldValue:true,
  childList: true, //是否观察子节点的变动
  subtree:true, //是否观察所有后代节点的变动
  characterData: true,
  attributeFilter: ['class', 'src'] //{Array} 表示需要观察的特定属性，默认设置

  // DomObserver拓展api ----------
  attrTagFilter: ['p','item'], // 需要观察的特定标签的属性 ['p','div']些标签的属性


  rmTagFilter:['a'],    // 删除的标签，小写
  rmNodesFilter:[$('u')[0]], //指定节点被删除
  addTagFilter:['a'], //添加的标签类型，不支持addNodesFilter

  // 保留字段
  parenTagFilter:[] // 可以监听的tag类型
  parenNodeFilter:[] // 指定那些节点被监听

}

// 声明配置
new DomObserver( dom, config )

// 全局配置
DomObserver.config = {}

```

## api
```
var ds = new DomObserver( dom, config )
  ds.observe() // 启动监听
  ds.disconnect() // 卸载监听

  ds.childList(()=>{}) // dom变化时执行回调
  ds.addChildList(()=>{}) // dom删除时执行回调
  ds.rmChildList(()=>{})  // dom添加时执行回调
  ds.attributes(()=>{})  // 属性变化时执行回调
  ds.change(()=>{}) // 配置内所以变化都会时执行回调

  ds.update(dom = document, config = {}) //修改配置

```

```

type:观察的变动类型（attribute、characterData或者childList）。
target:发生变动的DOM对象。
addedNodes:新增的DOM对象。
removeNodes:删除的DOM对象。
previousSibling:前一个同级的DOM对象，如果没有则返回null。
nextSibling:下一个同级的DOM对象，如果没有就返回null。
attributeName:发生变动的属性。如果设置了attributeFilter，则只返回预先指定的属性。
oldValue:变动前的值。这个属性只对attribute和characterData变动有效，如果发生childList变动，则返回null。

```



## 参考资料：

  https://juejin.im/post/5dd39c866fb9a0200f053b0f  

  https://zhuanlan.zhihu.com/p/31543436  
