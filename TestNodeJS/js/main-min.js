﻿var GetUsersMod=function(){"use strict";function a(){function c(a,b,c){var d=new XMLHttpRequest;d.onreadystatechange=function(){var a;4==d.readyState&&(200==d.status?(a=d.responseText,b(a)):c(d.responseText))},d.open("GET",a,!0),d.send()}function d(a){b.innerHTML=a;var c={datatype:"json",datafields:[{name:"ID"},{name:"USERNAME"},{name:"PASSWORD"},{name:"ACTIVE"}]};c.localdata=a;var d=new $.jqx.dataAdapter(c);$("#testGrid").jqxGrid({pageable:!0,source:d,sortable:!0,width:"96%",enablehover:!1,selectionmode:"none",height:200,PageSize:17,theme:"bootstrap",columns:[{text:"ID",dataField:"ID",width:30},{text:"USERNAME",dataField:"USERNAME"},{text:"ACTIVE",dataField:"ACTIVE"}]})}function e(a){console.log(a)}var a=document.getElementById("btnGetUsers"),b=document.getElementById("GetUsersResult");a.addEventListener("click",function(a){a.preventDefault(),c("http://localhost:1337/getUsers?apiKey=bm9kZWpz",d,e)})}return a}(),InsertUserMod=function(){function a(){function f(c,d,e){var f={};f.USERNAME=a.value,f.PASSWORD=b.value,$.ajax({url:c,type:"POST",data:JSON.stringify(f),async:!0,success:function(a){g(a)},error:function(a){h(a)}})}function g(a){d.innerText="Success"}function h(a){d.innerText="Failure"}var a=document.getElementById("txtUserName"),b=document.getElementById("txtPassword"),d=(document.getElementById("txtPasswordError"),document.getElementById("getInsertResult")),e=document.getElementById("btnInsertUser");e.addEventListener("click",function(a){a.preventDefault(),f("http://localhost:1337/insertUser?apiKey=bm9kZWpz",g,h)})}return a}(),GetUserByIdMod=function(){function a(){function e(b,c,d){$.ajax({url:b,type:"GET",contentType:"application/json; charset=utf-8",data:{USERID:a.value},async:!0,success:function(a){c(a)},error:function(a){d(a)}})}function f(a){var b={datatype:"json",datafields:[{name:"ID"},{name:"USERNAME"},{name:"PASSWORD"},{name:"ACTIVE"}]};b.localdata=a;var c=new $.jqx.dataAdapter(b);$("#getUserResult").jqxGrid({pageable:!0,source:c,sortable:!0,width:"96%",enablehover:!1,selectionmode:"none",height:200,PageSize:17,theme:"bootstrap",columns:[{text:"ID",dataField:"ID",width:30},{text:"USERNAME",dataField:"USERNAME"},{text:"ACTIVE",dataField:"ACTIVE"}]}),d.style.display="none"}function g(a){c.innerText="Failure",d.style.display="none"}var a=document.getElementById("txtUserId"),b=document.getElementById("btnGetUser"),c=document.getElementById("getUserResult"),d=document.getElementById("getInfo");b.addEventListener("click",function(a){a.preventDefault(),d.style.display="block";var b="http://localhost:1337/getUserById?apiKey=bm9kZWpz";e(b,f,g)})}return a}();