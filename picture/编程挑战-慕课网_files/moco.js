function Boxy(o,t){this.WRAPPER='<div class="moco-modal-layer" >                    <div class="moco-modal-title"></div>                    <div class="moco-modal-inner"></div>            </div>',this.DEFAULTS={title:null,closeable:!0,draggable:!0,clone:!1,actuator:null,center:!0,show:!0,modal:!1,fixed:!0,unloadOnHide:!1,clickToFront:!1,behaviours:function(){},afterDrop:function(){},afterShow:function(){},afterHide:function(){},beforeUnload:function(){}},this.DEFAULT_X=50,this.DEFAULT_Y=50,this.boxy=$(this.WRAPPER),$.data(this.boxy[0],"boxy",this),this.visible=!1,this.options=$.extend({},this.DEFAULTS,t||{}),this.options.modal&&(this.options=$.extend(this.options,{center:!0,draggable:!1})),this.options.actuator&&$.data(this.options.actuator,"active.boxy",this),this.setContent(o||"<div></div>"),this._setupTitleBar(),this.boxy.css("display","none").appendTo(document.body),this.toTop(),this.options.fixed&&(Boxy.browser.msie&&Boxy.browser.version<7?this.options.fixed=!1:this.boxy.addClass("fixed")),this.options.center&&Boxy._u(this.options.x,this.options.y)?this.center():this.moveTo(Boxy._u(this.options.x)?this.options.x:this.DEFAULT_X,Boxy._u(this.options.y)?this.options.y:this.DEFAULT_Y),this.options.show&&this.show()}Boxy.zIndex=900,Boxy.dragConfigured=!1,Boxy.resizeConfigured=!1,Boxy.dragging=null,Boxy.browser={mozilla:/firefox/.test(navigator.userAgent.toLowerCase()),webkit:/webkit/.test(navigator.userAgent.toLowerCase()),opera:/opera/.test(navigator.userAgent.toLowerCase()),msie:/msie/.test(navigator.userAgent.toLowerCase())},Boxy.isModalVisible=function(){return $(".moco-modal-blackout").length>0},Boxy._u=function(){for(var o=0;o<arguments.length;o++)if("undefined"!=typeof arguments[o])return!1;return!0},Boxy._handleResize=function(o){var t=$(document);$(".moco-modal-blackout").css("display","none").css({width:t.width(),height:t.height()}).css("display","block")},Boxy._handleDrag=function(o){var t;if(t=Boxy.dragging){var e=$(window).width()-t[0].boxy.width(),i=$(window).height()-t[0].boxy.height(),s=o.pageX-t[1],n=o.pageY-t[2];s<=0&&(s=0),n<=0&&(n=0),s>=e&&(s=e),n>=i&&(n=i),t[0].boxy.stop().animate({left:s+"px",top:n+"px"},10)}},Boxy._nextZ=function(){return Boxy.zIndex++},Boxy._viewport=function(){var o=document.documentElement,t=document.body,e=window;return $.extend(Boxy.browser.msie?{left:t.scrollLeft||o.scrollLeft,top:t.scrollTop||o.scrollTop}:{left:e.pageXOffset,top:e.pageYOffset},Boxy._u(e.innerWidth)?Boxy._u(o)||Boxy._u(o.clientWidth)||0==o.clientWidth?{width:t.clientWidth,height:t.clientHeight}:{width:o.clientWidth,height:o.clientHeight}:{width:e.innerWidth,height:e.innerHeight})},Boxy.prototype={estimateSize:function(){this.boxy.css({visibility:"hidden",display:"block"});var o=this.getSize();return this.boxy.css("display","none").css("visibility","visible"),o},getSize:function(){return[this.boxy.width(),this.boxy.height()]},getContentSize:function(){var o=this.getContent();return[o.width(),o.height()]},getPosition:function(){var o=this.boxy[0];return[o.offsetLeft,o.offsetTop]},getCenter:function(){var o=this.getPosition(),t=this.getSize();return[Math.floor(o[0]+t[0]/2),Math.floor(o[1]+t[1]/2)]},getInner:function(){return $(".moco-modal-inner",this.boxy)},getTInner:function(){return $(".moco-modal-title",this.boxy)},getContent:function(){return this.boxy},setContent:function(o){return o=$(o).css({display:"block"}),this.options.clone&&(o=o.clone(!0)),this.getInner().append(o),this._setupDefaultBehaviours(o),this.options.behaviours.call(this,o),this},moveTo:function(o,t){return this.moveToX(o).moveToY(t),this},moveToX:function(o){return"number"==typeof o?this.boxy.css({left:o}):this.centerX(),this},moveToY:function(o){return"number"==typeof o?this.boxy.css({top:o}):this.centerY(),this},centerAt:function(o,t){var e=this[this.visible?"getSize":"estimateSize"]();return"number"==typeof o&&this.moveToX(o-e[0]/2),"number"==typeof t&&this.moveToY(t-e[1]/2),this},centerAtX:function(o){return this.centerAt(o,null)},centerAtY:function(o){return this.centerAt(null,o)},center:function(o){var t=Boxy._viewport(),e=this.options.fixed?[0,0]:[t.left,t.top];return o&&"x"!=o||this.centerAt(e[0]+t.width/2,null),o&&"y"!=o||this.centerAt(null,e[1]+t.height/2),this},centerX:function(){return this.center("x")},centerY:function(){return this.center("y")},resize:function(o){if(this.visible){o=o||{};var t=o.width||this.boxy.width(),e=o.height||this.boxy.height(),i=this._getBoundsForResize(t,e);return this.boxy.css({left:i[0],top:i[1]}),this.getContent().css({width:i[2],height:i[3]}),o.after&&o.after(this),this}},tween:function(o,t,e){if(this.visible){var i=this._getBoundsForResize(o,t),s=this;return this.boxy.stop().animate({left:i[0],top:i[1]}),this.getContent().stop().animate({width:i[2],height:i[3]},function(){e&&e(s)}),this}},isVisible:function(){return this.visible},show:function(){if(!this.visible){if(this.options.modal){var o=this;Boxy.resizeConfigured||(Boxy.resizeConfigured=!0,$(window).resize(function(){Boxy._handleResize()})),this.modalBlackout=$('<div class="moco-modal-blackout js-moco-modal-cancel"></div>').css({zIndex:Boxy._nextZ(),opacity:.7,width:$(document).width(),height:$(document).height()}).appendTo(document.body),this.toTop(),this.options.closeable&&$(document.body).bind("keypress.boxy",function(t){var e=t.which||t.keyCode;27==e&&(o.hide(),$(document.body).unbind("keypress.boxy"))})}return this.boxy.stop().css({opacity:1}).show(),this.visible=!0,this._fire("afterShow"),this}},hide:function(o){if(this.visible){var t=this;return this.options.modal&&($(document.body).unbind("keypress.boxy"),this.modalBlackout.animate({opacity:0},function(){$(this).remove()})),this.boxy.stop().animate({opacity:0},300,function(){t.boxy.css({display:"none"}),t.visible=!1,$(t.boxy).remove(),t._fire("afterHide"),o&&o(t),t.options.unloadOnHide&&t.unload()}),t.options.closeCallback&&t.options.closeCallback(),this}},toggle:function(){return this[this.visible?"hide":"show"](),this},hideAndUnload:function(o){return this.options.unloadOnHide=!0,this.hide(o),this},unload:function(){this._fire("beforeUnload"),this.boxy.remove(),this.options.actuator&&$.data(this.options.actuator,"active.boxy",!1)},toTop:function(){return this.boxy.css({zIndex:Boxy._nextZ()}),this},getTitle:function(){return $("> .moco-modal-title span",this.getInner()).html()},setTitle:function(o){return $("> .moco-modal-title span",this.getTInner()).html(o),this},_getBoundsForResize:function(o,t){var e=this.getContentSize(),i=[o-e[0],t-e[1]],s=this.getPosition();return[Math.max(s[0]-i[0]/2,0),Math.max(s[1]-i[1]/2,0),o,t]},_setupTitleBar:function(){if(this.options.title){var o=this,t=$("<div></div>").html("<span>"+this.options.title+"</span>");this.options.closeable&&t.append($("<a href='javascript:void(0)' class='moco-icon-close moco-modal-close js-modal-close'></a>").html(this.options.closeText)),this.options.draggable&&(t.addClass("moco-modal-draggable"),t[0].onselectstart=function(){return!1},t[0].unselectable="on",t[0].style.MozUserSelect="none",Boxy.dragConfigured||($(document).mousemove(Boxy._handleDrag),Boxy.dragConfigured=!0),t.mousedown(function(t){o.toTop(),Boxy.dragging=[o,t.pageX-o.boxy[0].offsetLeft,t.pageY-o.boxy[0].offsetTop],$(this).addClass("dragging")}),$(document).mouseup(function(){$(this).removeClass("dragging"),Boxy.dragging=null,o._fire("afterDrop")})),this.getTInner().prepend(t),this._setupDefaultBehaviours(t)}else this.getTInner().remove()},_setupDefaultBehaviours:function(o){var t=this;this.options.clickToFront&&o.click(function(){t.toTop()}),$(".js-modal-close",o).click(function(){return t.hide(),!1}).mousedown(function(o){o.stopPropagation()})},_fire:function(o){this.options[o].call(this)}},function(o){"function"==typeof define&&"function"!=typeof jQuery?define(["jquery"],o):o(jQuery)}(function(o){o.dialog=function(o,t){var e=$.extend({title:"提示",timeout:0,modal:!1,draggable:!0,callback:function(){}},t),i='<div class="moco-modal-dialog">'+o+"</div>",s=new Boxy(i,{title:e.title,modal:e.modal,draggable:e.draggable,closeCallback:e.callback});return 0!=e.timeout&&setTimeout(function(){s.hide(),e.callback()},e.timeout),(e.width||e.height)&&s.resize({width:e.width,height:e.height}),s},o.alert=function(o,t){var e='<div class="moco-modal-wrap">                    <p class="moco-modal-content js-modal-content">$content</p>                    $info                    <div class="moco-modal-btns">                        <a class="moco-btn moco-btn-blue js-modal-submit" onclick="return false" href="javascript:void(0)"><span>$submit</span></a>                    </div>                </div>',i=$.extend({submit:"确定",timeout:0,modal:!0,callback:function(){}},t),s=e.replace("$content",o);s=i.info?s.replace("$info",'<p class="moco-modal-info js-modal-info">'+i.info+"</p>"):s.replace("$info",""),s=s.replace("$submit",i.submit);var n=new Boxy(s,{modal:i.modal,draggable:!1,closeCallback:i.callback});return $(n.boxy).find("a.js-modal-submit").click(function(){n.hide(),i.callback()}),$(n.modalBlackout).click(function(){n.hide(),i.callback()}),0!=i.timeout&&setTimeout(function(){n.hide(),i.callback()},i.timeout),n},o.confirm=function(o,t){var e='<div class="moco-modal-wrap" node-type="outer">                        <p class="moco-modal-content js-modal-content">$content</p>                        $info                    <div class="moco-modal-btns">                        <a class="moco-btn moco-btn-normal js-modal-cancel" onclick="return false" href="javascript:void(0)"><span>$cancel</span></a><a class="moco-btn moco-btn-blue js-modal-submit" onclick="return false" href="javascript:void(0)"><span>$submit</span></a>                    </div>                </div>',i=$.extend({submit:"确定",cancel:"取消",modal:!0,callback:function(){},cancelcallback:function(){}},t),s=e.replace("$content",o);s=i.info?s.replace("$info",'<p class="moco-modal-info js-modal-info">'+i.info+"</p>"):s.replace("$info",""),s=s.replace("$submit",i.submit).replace("$cancel",i.cancel);var n=new Boxy(s,{modal:i.modal,draggable:!1,closeCallback:i.CancelCallback});return $(n.boxy).find("a.js-modal-submit").click(function(){n.hide(),i.callback()}),$(n.boxy).find("a.js-modal-cancel").click(function(){n.hide(),i.cancelcallback()}),$(n.modalBlackout).click(function(){n.hide(),i.cancelcallback()}),n},o.prompt=function(o,t){var e=($(window).width(),$(window).height(),$(".moco-tip-layer").remove(),{success:"moco-icon-tick-revert",error:"moco-icon-point-revert",question:"moco-icon-ques-revert"}),t=$.extend({icon:"success",timeout:1e3,modal:!0,callback:function(){}},t),i="<div class='moco-prompt-layer'><i class='"+e[t.icon]+"'></i>                <span >"+o+"</span></div>",s=new Boxy(i,{modal:t.modal,draggable:!1,closeCallback:t.callback});return setTimeout(function(){s.hide()},t.timeout),s},o.tipAlert=function(o,t){var e=$(".moco-tip-layer").remove();e=$('<div class="moco-modal-layer moco-tip-layer">').appendTo($("body"));var i={success:"moco-icon-tick-revert",error:"moco-icon-point-revert",question:"moco-icon-ques-revert"},t=$.extend({icon:"success",info:"",timeout:1e3},t),s="<i class='"+i[t.icon]+"'></i>                <span>"+t.info+"</span>";e.hide().html(s).css({top:$(o).offset().top-30,left:$(o).offset().left-15}),e.animate({top:$(o).offset().top-45,left:$(o).offset().left-15,opacity:"show"},300),setTimeout(function(){e.animate({opacity:"hide"},300)},t.timeout)},o.tipConfirm=function(o,t){var e=$(".moco-tip-layer").remove();e=$('<div class="moco-modal-layer moco-tip-layer moco-tipconfirm-layer">').appendTo($("body"));var i={success:"moco-icon-tick-revert",error:"moco-icon-point-revert",question:"moco-icon-ques-revert"},t=$.extend({icon:"question",info:"",callback:function(){},cancelcallback:function(){}},t),s='<i class="'+i[t.icon]+'"></i>                <span class="moco-tipconfirm-info">'+t.info+'</span>                <a class="moco-btn moco-btn-blue js-modal-submit" onclick="return false" href="javascript:void(0)"><i class="moco-icon-check"></i></a><a class="moco-btn moco-btn-normal js-modal-cancel" onclick="return false" href="javascript:void(0)"><i class="moco-icon-close"></i></a>';e.hide().html(s).css({top:$(o).offset().top-30,left:$(o).offset().left-15}),e.animate({top:$(o).offset().top-45,left:$(o).offset().left-15,opacity:"show"},300),e.find(".js-modal-cancel").click(function(){e.hide(),t.cancelcallback()}),e.find(".js-modal-submit").click(function(){e.hide(),t.callback()})}}),function(){function o(o){this.position={},this.hashow=!1,this.forword="top",this.timer=null,this.initialize(),this._bindEvent(),this.forceForword=!1,this.mocoUsercardDialog=$(".moco-usercard-dialog")}o.prototype={initialize:function(){$("body").append("<div class='moco-usercard-dialog js-moco-usercard-modal'></div>")},render:function(o){this.mocoUsercardDialog.empty(),this.mocoUsercardDialog.append(o.domtext),this.mocoUsercardDialog.show();var t=($(document).scrollTop(),$(window).height(),this.position.top-$(document).scrollTop()),e=($(document).scrollLeft(),$(window).width(),this.position.left-$(document).scrollLeft());this.forceForword?this.forword=this.forceForword:t<o.height?e>o.width&&t>o.height/2?this.forword="right":this.forword="bottom":this.forword="top","top"==this.forword&&(this.mocoUsercardDialog.css("top",this.position.top-o.height-20),this.mocoUsercardDialog.css("left",this.position.left-o.width/2+o.headWidth/2)),"bottom"==this.forword&&(this.mocoUsercardDialog.css("top",this.position.top+o.headHeight+20),this.mocoUsercardDialog.css("left",this.position.left-o.width/2+o.headWidth/2)),"right"==this.forword&&(this.mocoUsercardDialog.css("top",this.position.top-o.height/2),this.mocoUsercardDialog.css("left",this.position.left+o.headWidth+20)),"left"==this.forword&&(this.mocoUsercardDialog.css("top",this.position.top-o.height/2),this.mocoUsercardDialog.css("left",this.position.left-o.width-20)),this.mocoUsercardDialog.css("width",o.width),this.mocoUsercardDialog.css("height",o.height),this.hashow=!0,this.forceForword=!1},culPosition:function(o){this.position.top=o.top,this.position.left=o.left},show:function(o,t){this.hashow||(this.culPosition($(o.currentTarget).offset()),this.render(t))},hide:function(){$("body").find(".moco-usercard-dialog").hide(),this.hashow=!1},setForceForword:function(o){this.forceForword=o},_bindEvent:function(){var o=this;$(document).delegate(".js-moco-usercard-modal","mouseover",function(t){clearTimeout(o.timer)}),$(document).delegate(".js-moco-usercard-modal","mouseleave",function(t){o.hide()})}},window.usersInfoCache=[];var t=this,e=new o,i=!1,s=!1;this.usercardDialogDom=function(o){var t={dialogbk:"user_dialogbk",signature:"",is_follows:"关注Ta",icon:"icon-group_add",roleText:"",detailNum:"",sexClass:"",cssClass:"moco-usercard-mc-btn-success js-usercard-add-attention",_funsDom:'<a href="/u/'+o.uid+'/fans">                            <div class="moco-usercard-detail-right bold">粉丝                                <span>'+o.fans_num+"</span>                            </div>                        </a>"},e=$.extend(t,e);e.signature=o.sign,e.detailNum='<a href="/u/'+o.uid+'/follows">                                <div class="moco-usercard-detail-left bold">关注                                    <span>'+o.follows_num+"</span>                                    </div>                                </a>                                "+e._funsDom,2==o.user_type?(e.dialogbk="teacher_dialogbk",e.roleText+='<span class="moco-usercard-signicon moco-usercard-teacher"></span>',e.detailNum='<a href="/u/'+o.uid+'/courses?sort=publish">                                    <div class="moco-usercard-detail-left bold">课程                                        <span>'+o.course_num+"</span>                                    </div>                                </a>                                "+e._funsDom,e.signature=o.aboutme,1==o.is_author&&(e.roleText+='<span class="moco-usercard-signicon moco-usercard-author"></span>'),1==o.is_mustar&&(e.roleText+='<span class="moco-usercard-signicon moco-usercard-mxr"></span>')):(1==o.is_author&&(e.dialogbk="author_dialogbk",e.roleText+='<span class="moco-usercard-signicon moco-usercard-author"></span>',e.detailNum='<a href="/u/'+o.uid+'/articles">                                        <div class="moco-usercard-detail-left bold">手记                                            <span>'+o.article_num+'</span>                                        </div>                                    </a>                                    <a href="/u/'+o.uid+'/articles?type=praise">                                        <div class="moco-usercard-detail-right bold">推荐                                            <span class="ml10">'+o.article_recommend_num+"</span>                                        </div>                                    </a>"),1==o.is_mustar&&(e.roleText+='<span class="moco-usercard-signicon moco-usercard-mxr"></span>'),1e4==o.uid&&(e.detailNum='<a href="javascript:void(0);">                                        <div class="moco-usercard-detail-left bold">关注                                            <span class="ml10">'+o.follows_num+"</span>                                        </div>                                    </a>                                    "+e._funsDom)),2==o.sex?e.sexClass="moco-usercard-girl":1==o.sex?e.sexClass="moco-usercard-boy":e.sexClass="moco-usercard-secret",1==o.is_follows&&(e.is_follows="发消息",e.icon="icon-mail",e.cssClass="moco-usercard-mc-btn-primary js-usercard-send-message"),""==e.signature?e.signature="这位同学很懒，木有签名的说～":e.signature.length>45&&(e.signature=e.signature.slice(0,45)+"...");var i='<div class="moco-usercard-headialog js-usercard-headialog" style="background: url(/static/img/u/'+e.dialogbk+'.png) no-repeat 0 0;">                        <a href="/u/'+o.uid+'" target="_blank">                            <img src="http://img.mukewang.com/'+o.portrait+'-40-40.jpg" class="moco-usercard-head" width="40" height="40">                        </a>                        <p class="fs16 bold mt0">                            <a href="/u/'+o.uid+'" target="_blank"><span>'+o.nickname+"</span> </a>"+e.roleText+'</p>                        <p class="fs12 moco-usercard-job-title">                            <span class="moco-usercard-gender mr10 '+e.sexClass+'"></span>                            '+o.job_title+'                        </p>                        <p class="fs12 moco-usercard-signature">'+e.signature+"</p>                        <div> "+e.detailNum+'</div>                        <span class="moco-usercard-mc-btn '+e.cssClass+' pl30 pr30 mt20 " dataid='+o.uid+'>                            <i class="'+e.icon+' moco-usercard-btn-icon"> </i>'+e.is_follows+'                         </span>                        <p class="moco-usercard-add-attention-error"></p>                    </div>';return i},$(".js-usercard-box").delegate(".js-usercard-dialog","mouseover",function(o){var n=$(this),a=n.data("userid");0!=isLogin&&OP_CONFIG.userInfo.uid==a||(s=!1,setTimeout(function(){if(!s){var c=n.width(),r=n.height();if(void 0===usersInfoCache[a])i||(i=!0,$.ajax({type:"GET",url:"/u/gethoveruser?uid="+a,dataType:"json",success:function(i){if(1==i.result){usersInfoCache[a]=i.data;var s=t.usercardDialogDom(i.data);e.show(o,{width:340,height:308,domtext:s,headWidth:c,headHeight:r})}},complete:function(){i=!1}}));else{var l=t.usercardDialogDom(usersInfoCache[a]);e.show(o,{width:340,height:308,domtext:l,headWidth:c,headHeight:r})}}},200))}),$(".js-moco-usercard-modal").delegate(".js-usercard-send-message","click",function(o){if($(".moco-usercard-add-attention-error").text(""),OP_CONFIG.userInfo){var t=$(o.currentTarget).attr("dataid");window.open("/u/"+OP_CONFIG.userInfo.uid+"/messages?uid="+t)}else seajs.use("login_sns",function(o){o.init()})}),$(".js-moco-usercard-modal").delegate(".js-usercard-add-attention","click",function(o){if($(".moco-usercard-add-attention-error").text(""),OP_CONFIG.userInfo){var t=$(o.currentTarget).attr("dataid");$.ajax({type:"POST",url:"/u/"+t+"/ajaxfollows?uid="+t+"x&type=1",dataType:"json",success:function(o){1101==o.result&&($(".js-usercard-add-attention").html('<i class="icon-mail moco-usercard-btn-icon"> </i>发消息'),$(".js-usercard-add-attention").removeClass("moco-usercard-mc-btn-success js-usercard-add-attention").addClass(" moco-usercard-mc-btn-primary js-usercard-send-message")),1103==o.result&&$(".moco-usercard-add-attention-error").text("已经是好友"),1100==o.result&&$(".moco-usercard-add-attention-error").text("关注失败"),usersInfoCache[t].is_follows=1},error:function(o){$(".moco-usercard-add-attention-error").html("服务错误，稍后重试")},complete:function(){}})}else seajs.use("login_sns",function(o){o.init()})}),$(".js-usercard-box").delegate(".js-usercard-dialog","mouseleave",function(o){e.timer=setTimeout(function(){e.hide()},50),s=!0})}();