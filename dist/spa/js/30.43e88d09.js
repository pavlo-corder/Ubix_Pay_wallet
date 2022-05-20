"use strict";(self["webpackChunkubix"]=self["webpackChunkubix"]||[]).push([[30],{9030:(e,t,l)=>{l.r(t),l.d(t,{default:()=>$});l(71);var o=l(3673),i=l(2323);const n={class:"start-screen"},a={class:"container"},s=(0,o._)("h1",null,"Set up your person",-1),r=(0,o._)("h2",{class:"text-black q-mt-lg"},"External identifiers",-1),d=(0,o._)("div",null,[(0,o._)("a",{class:"link--big"},"What is it?")],-1),c={style:{"text-transform":"capitalize"}};function u(e,t,l,u,p,m){const g=(0,o.up)("q-input"),k=(0,o.up)("q-form"),f=(0,o.up)("q-icon"),w=(0,o.up)("q-item-section"),b=(0,o.up)("q-item-label"),_=(0,o.up)("q-item"),C=(0,o.up)("q-list");return(0,o.wg)(),(0,o.iD)("main",n,[(0,o._)("div",a,[s,(0,o.Wm)(k,{onSubmit:e.onSubmit,onReset:e.onReset,class:"q-gutter-md q-mb-md q-mt-md"},{default:(0,o.w5)((()=>[(0,o.Wm)(g,{modelValue:u.name,"onUpdate:modelValue":t[0]||(t[0]=e=>u.name=e),class:"input input--borderDark",filled:"",label:"Enter your name",type:"text"},null,8,["modelValue"]),(0,o.Wm)(g,{modelValue:u.details,"onUpdate:modelValue":t[1]||(t[1]=e=>u.details=e),class:"input input--borderDark",filled:"",label:"Any details you'd like to share",type:"textarea"},null,8,["modelValue"]),r,d,(0,o._)("a",{class:"btn btn--primary btn--autoWidth",onClick:t[2]||(t[2]=(...e)=>u.chooseIdentityProvider&&u.chooseIdentityProvider(...e))},"Link external identifiers")])),_:1},8,["onSubmit","onReset"]),(0,o.Wm)(C,{class:"input input--borderDark q-mb-md",separator:""},{default:(0,o.w5)((()=>[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(u.identifiers,(e=>((0,o.wg)(),(0,o.j4)(_,{key:e.id},{default:(0,o.w5)((()=>[(0,o.Wm)(w,{side:""},{default:(0,o.w5)((()=>["telegram"===e.socialNetwork?((0,o.wg)(),(0,o.j4)(f,{key:0,size:"20px",name:"img:https://cdn.cdnlogo.com/logos/t/39/telegram.svg"})):(0,o.kq)("",!0),"twitter"===e.socialNetwork?((0,o.wg)(),(0,o.j4)(f,{key:1,size:"20px",name:"img:https://cdn.cdnlogo.com/logos/t/96/twitter-icon.svg"})):(0,o.kq)("",!0),"instagram"===e.socialNetwork?((0,o.wg)(),(0,o.j4)(f,{key:2,size:"20px",name:"img:https://cdn.cdnlogo.com/logos/i/92/instagram.svg"})):(0,o.kq)("",!0)])),_:2},1024),(0,o.Wm)(w,null,{default:(0,o.w5)((()=>[(0,o.Wm)(b,{class:"text-ellipsis"},{default:(0,o.w5)((()=>[(0,o._)("span",c,(0,i.zw)(e.socialNetwork)+":  ",1),(0,o._)("span",null,(0,i.zw)(e.id),1)])),_:2},1024)])),_:2},1024)])),_:2},1024)))),128))])),_:1})])])}var p=l(1959),m=l(8825);const g=(0,o._)("div",null,"Twit this text and paste the link to the twit, so we could verify you're the owner of the account:",-1);function k(e,t,l,n,a,s){const r=(0,o.up)("q-toolbar-title"),d=(0,o.up)("q-card-section"),c=(0,o.up)("q-select"),u=(0,o.up)("q-btn"),p=(0,o.up)("q-input"),m=(0,o.up)("q-card-actions"),k=(0,o.up)("q-card"),f=(0,o.up)("q-dialog");return(0,o.wg)(),(0,o.j4)(f,{ref:"dialogRef",onHide:n.onDialogHide,class:"dialog z-top"},{default:(0,o.w5)((()=>[(0,o.Wm)(k,{class:"q-dialog-plugin bg-white-dark"},{default:(0,o.w5)((()=>[(0,o.Wm)(d,null,{default:(0,o.w5)((()=>[(0,o.Wm)(r,{class:"q-dialog__title"},{default:(0,o.w5)((()=>[(0,o.Uk)((0,i.zw)(n.title),1)])),_:1})])),_:1}),(0,o.Wm)(d,null,{default:(0,o.w5)((()=>[(0,o.Wm)(c,{modelValue:n.provider,"onUpdate:modelValue":t[0]||(t[0]=e=>n.provider=e),filled:"",label:"Select provider",options:n.providerOptions,behavior:"menu",class:"input input--borderDark","popup-content-class":"z-max"},null,8,["modelValue","options"])])),_:1}),n.provider?((0,o.wg)(),(0,o.iD)(o.HY,{key:0},[(0,o.Wm)(d,null,{default:(0,o.w5)((()=>[g])),_:1}),(0,o.Wm)(d,null,{default:(0,o.w5)((()=>[(0,o.Wm)(p,{modelValue:n.verificationText,"onUpdate:modelValue":t[2]||(t[2]=e=>n.verificationText=e),filled:"",type:"textarea",class:"input input--borderDark q-mb-sm","bottom-slots":""},{append:(0,o.w5)((()=>[(0,o.Wm)(u,{size:"12px",round:"",flat:"",dense:"",icon:"content_copy",onClick:t[1]||(t[1]=()=>n.copy(n.verificationText))})])),_:1},8,["modelValue"]),(0,o.Wm)(p,{modelValue:n.link,"onUpdate:modelValue":t[3]||(t[3]=e=>n.link=e),filled:"",class:"input input--borderDark",label:"Your link here"},null,8,["modelValue"])])),_:1})],64)):(0,o.kq)("",!0),(0,o.Wm)(m,null,{default:(0,o.w5)((()=>[n.provider?((0,o.wg)(),(0,o.iD)("a",{key:0,class:"btn btn--primary q-mb-sm",onClick:t[4]||(t[4]=(...e)=>n.onOKClick&&n.onOKClick(...e))},"Verify")):(0,o.kq)("",!0),(0,o._)("a",{class:"btn btn--transparent",onClick:t[5]||(t[5]=(...e)=>n.onCancelClick&&n.onCancelClick(...e))},"Cancel")])),_:1})])),_:1})])),_:1},8,["onHide"])}var f=l(1701),w=l(1914);const b=(0,o.Uk)(" Congratulations!"),_=(0,o._)("br",null,null,-1),C=(0,o.Uk)(" You've successfuly linked"),q=(0,o._)("br",null,null,-1),v=(0,o.Uk)(" your person to a Twitter account! ");function y(e,t,l,i,n,a){const s=(0,o.up)("q-toolbar-title"),r=(0,o.up)("q-card-section"),d=(0,o.up)("q-card-actions"),c=(0,o.up)("q-card"),u=(0,o.up)("q-dialog");return(0,o.wg)(),(0,o.j4)(u,{ref:"dialogRef",onHide:i.onDialogHide,class:"dialog z-top"},{default:(0,o.w5)((()=>[(0,o.Wm)(c,{class:"q-dialog-plugin"},{default:(0,o.w5)((()=>[(0,o.Wm)(r,null,{default:(0,o.w5)((()=>[(0,o.Wm)(s,{class:"q-dialog__title text-center",style:{"white-space":"inherit"}},{default:(0,o.w5)((()=>[b,_,C,q,v])),_:1})])),_:1}),(0,o.Wm)(d,null,{default:(0,o.w5)((()=>[(0,o._)("a",{class:"btn btn--transparent",onClick:t[0]||(t[0]=(...e)=>i.onCancelClick&&i.onCancelClick(...e))},"Close")])),_:1})])),_:1})])),_:1},8,["onHide"])}const Z={name:"IdentityLinked",emits:[...f.Z.emits],setup(){const{dialogRef:e,onDialogHide:t,onDialogOK:l,onDialogCancel:o}=(0,f.Z)();return{dialogRef:e,onDialogHide:t,onOKClick(){l()},onCancelClick:o}}};var h=l(4260),D=l(6778),W=l(151),x=l(5589),Q=l(3747),H=l(9367),V=l(7518),I=l.n(V);const T=(0,h.Z)(Z,[["render",y]]),z=T;I()(Z,"components",{QDialog:D.Z,QCard:W.Z,QCardSection:x.Z,QToolbarTitle:Q.Z,QCardActions:H.Z});const O={name:"ChooseIdentityProvider",emits:[...f.Z.emits],setup(){const{dialogRef:e,onDialogHide:t,onDialogOK:l,onDialogCancel:o}=(0,f.Z)(),i=(0,m.Z)();function n(e){(0,w.Z)(e),i.notify({message:"Copied to clipboard!"})}return{title:(0,p.iH)("Choose identity provider"),password:(0,p.iH)(""),provider:(0,p.iH)(null),providerOptions:["Twitter","Instagram","Telegram"],verificationText:(0,p.iH)(""),link:(0,p.iH)(""),$q:(0,m.Z)(),copied:!1,copy:n,dialogRef:e,onDialogHide:t,onOKClick(){l(),i.dialog({component:z}).onOk((()=>{})).onCancel((()=>{})).onDismiss((()=>{}))},onCancelClick:o}}};var S=l(3473),U=l(4842),R=l(8240);const K=(0,h.Z)(O,[["render",k]]),N=K;I()(O,"components",{QDialog:D.Z,QCard:W.Z,QCardSection:x.Z,QToolbarTitle:Q.Z,QSelect:S.Z,QInput:U.Z,QBtn:R.Z,QCardActions:H.Z});const j={name:"SetUpPerson",setup(){const e=(0,m.Z)();function t(){e.dialog({component:N}).onOk((()=>{})).onCancel((()=>{})).onDismiss((()=>{}))}return{name:(0,p.iH)(""),details:(0,p.iH)(""),identifiers:[{socialNetwork:"telegram",id:"@telegram_acc"},{socialNetwork:"instagram",id:"@insta_acc"},{socialNetwork:"twitter",id:"@twitter_acc"}],chooseIdentityProvider:t}}};var P=l(5269),L=l(1046),Y=l(3414),A=l(2035),E=l(4554),B=l(2350);const F=(0,h.Z)(j,[["render",u]]),$=F;I()(j,"components",{QForm:P.Z,QInput:U.Z,QList:L.Z,QItem:Y.Z,QItemSection:A.Z,QIcon:E.Z,QItemLabel:B.Z})}}]);