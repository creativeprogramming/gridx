//>>built
define("dojox/app/View","dojo/_base/declare,dojo/_base/lang,dojo/Deferred,dojo/when,require,dojo/dom-attr,dijit/_TemplatedMixin,dijit/_WidgetsInTemplateMixin,./model".split(","),function(j,c,e,g,h,i,k,l,m){return j("dojox.app.View",null,{constructor:function(b){this.definition=this.template=this.templateString=this.name=this.id="";this.parent=null;this.children={};this.selectedChild=null;this._started=!1;this._definition=null;c.mixin(this,b);this.parent.views&&c.mixin(this,this.parent.views[this.name])},
_loadViewDefinition:function(){var b=new e,a;if(this.definition&&"none"===this.definition)return b.resolve(!0),b;this.definition?a=this.definition.replace(/(\.js)$/,""):(a=this.id.split("_"),a.shift(),a=a.join("/"),a="./views/"+a);var d;try{var c=a,f=c.indexOf("./");0<=f&&(c=a.substring(f+2));d=h.on("error",function(a){!b.isResolved()&&!b.isRejected()&&a.info[0]&&0<=a.info[0].indexOf(c)&&(b.resolve(!1),d.remove())});0==a.indexOf("./")&&(a="app/"+a);h([a],function(a){b.resolve(a);d.remove()})}catch(n){b.resolve(!1),
d.remove()}return b},_loadViewTemplate:function(){if(this.templateString)return!0;if(!this.dependencies)this.dependencies=[];var b=this.template;0==b.indexOf("./")&&(b="app/"+b);var b=this.template?this.dependencies.concat(["dojo/text!"+b]):this.dependencies.concat([]),a=new e;if(0<b.length){var d;try{d=h.on("error",c.hitch(this,function(b){!a.isResolved()&&!a.isRejected()&&b.info[0]&&0<=b.info[0].indexOf(this.template)&&(a.resolve(!1),d.remove())})),h(b,function(){a.resolve.call(a,arguments);d.remove()})}catch(i){a.resolve(!1),
d.remove()}}else a.resolve(!0);var f=new e;g(a,c.hitch(this,function(a){this.templateString=this.template?a[a.length-1]:"<div></div>";f.resolve(this)}));return f},start:function(){if(this._started)return this;var b=this._loadViewDefinition(),a=this._loadViewTemplate();this._startDef=new e;g(b,c.hitch(this,function(b){this._definition=b;g(a,c.hitch(this,function(){this._setupModel()}))}));return this._startDef},_setupModel:function(){if(this.loadedModels)this._startup();else{var b=new e,a;try{a=m(this.models,
this.parent,this.app)}catch(d){return b.reject("load model error."),b.promise}a.then?g(a,c.hitch(this,function(a){if(a)this.loadedModels=a;this._startup()}),function(){b.reject("load model error.")}):(this.loadedModels=a,this._startup())}},_startup:function(){this._widget=this.render(this.templateString);this.domNode=this._widget.domNode;this.parent.domNode.appendChild(this.domNode);this._widget.startup();i.set(this.domNode,"id",this.id);i.set(this.domNode,"data-app-region","center");i.set(this.domNode,
"style","width:100%; height:100%");this._widget.region="center";this._definition&&c.mixin(this,this._definition);this.app.log("  > in app/View calling init() name=[",this.name,"], parent.name=[",this.parent.name,"]");this.init();this._started=!0;this._startDef&&this._startDef.resolve(this)},render:function(b){var a=new k,d=new l;if(this.loadedModels)d.loadedModels=this.loadedModels;c.mixin(a,d);a.templateString=b;a.buildRendering();return a},init:function(){},beforeActivate:function(){},afterActivate:function(){},
beforeDeactivate:function(){},afterDeactivate:function(){},destroy:function(){}})});