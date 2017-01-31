var UIMod = (function () {
    
    function UIMod() {
        //Used for collapsible panels
        $(document).on('click', '.panel-heading span.clickable', function (e) {
            var $this = $(this);
            if (!$this.hasClass('panel-collapsed')) {
                $this.parents('.panel').find('.panel-body').slideUp();
                $this.addClass('panel-collapsed');
                $this.find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
            } else {
                $this.parents('.panel').find('.panel-body').slideDown();
                $this.removeClass('panel-collapsed');
                $this.find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
            }
        });

        //Nav bar
        var navHome = document.getElementById("navHome");
        var navGU = document.getElementById("navGU");
        var navGUBI = document.getElementById("navGUBI");
        var navIU = document.getElementById("navIU");
        var navUU = document.getElementById("navUU");
        var navDU = document.getElementById("navDU");
        var conGetUsers = document.getElementById("conGetUsers");
        var conInsertUser = document.getElementById("conInsertUser");
        var conGetUser = document.getElementById("conGetUser");
        var conUpdateUser = document.getElementById("conUpdateUser");

        navHome.addEventListener('click', function (e) {
            hideAll();
            removeClass();
            navHome.classList.add("active");
        });
        navGU.addEventListener('click', function (e) {
            hideAll();
            removeClass();
            navGU.classList.add("active");
            conGetUsers.style.display = "block";
        });
        navGUBI.addEventListener('click', function (e) {
            hideAll();
            removeClass();
            navGUBI.classList.add("active");
            conGetUser.style.display = "block";
        });
        navIU.addEventListener('click', function (e) {
            hideAll();
            removeClass();
            navIU.classList.add("active");
            conInsertUser.style.display = "block";
        });
        navUU.addEventListener('click', function (e) {
            hideAll();
            removeClass();
            navUU.classList.add("active");
            conUpdateUser.style.display = "block";
        });
        navDU.addEventListener('click', function (e) {
            hideAll();
            removeClass();
            navDU.classList.add("active");
        });

        function hideAll() {
            conGetUsers.style.display = 'none';
            conInsertUser.style.display = 'none';
            conGetUser.style.display = 'none';
            conUpdateUser.style.display = 'none';
        };

        function removeClass() {
            if (navHome.classList.contains("active")) {
                navHome.classList.remove("active");
            };
            if (navGU.classList.contains("active")) {
                navGU.classList.remove("active");
            };
            if (navGUBI.classList.contains("active")) {
                navGUBI.classList.remove("active");
            };
            if (navIU.classList.contains("active")) {
                navIU.classList.remove("active");
            };
            if (navUU.classList.contains("active")) {
                navUU.classList.remove("active");
            };
            if (navDU.classList.contains("active")) {
                navDU.classList.remove("active");
            };
        };

    };

    return UIMod;
}());

var GetUsersMod = (function () {

    function GetUsersMod() {
        var btnGetUsers = document.getElementById("btnGetUsers");
        var getUsersResult = document.getElementById("GetUsersResult");
        var getInfoGU = document.getElementById("getInfoGU");

        btnGetUsers.addEventListener('click', function (e) {
            e.preventDefault();
            getInfoGU.style.display = "block";
            httpGet("http://localhost:1337/getUsers?apiKey=bm9kZWpz", displayResult, err);
        });

        function httpGet(url, onSuccess, onFailure) {
            var httpReq = new XMLHttpRequest();

            httpReq.onreadystatechange = function () {
                var data;

                if (httpReq.readyState == 4) {

                    if (httpReq.status == 200) {
                        data = httpReq.responseText;
                        onSuccess(data);
                    } else {
                        onFailure(httpReq.responseText);
                    };

                };

            };

            httpReq.open("GET", url, true);
            httpReq.send();
        };

        function displayResult(res) {
            var source = {
                datatype: "json",
                datafields: [
                    { name: 'ID' },
                    { name: 'USERNAME' },
                    { name: 'PASSWORD' },
                    { name: 'ACTIVE' }
                ],
            };

            source.localdata = res;
            var dataAdapter = new $.jqx.dataAdapter(source);

            //Load grid
            $('#testGrid').jqxGrid({
                pageable: true,
                source: dataAdapter,
                sortable: true,
                width: "96%",
                enablehover: false,
                selectionmode: 'none',
                height: 200,
                PageSize: 17,
                theme: 'bootstrap',
                columns: [
                    { text: 'ID', dataField: 'ID', width: 30 },
                    { text: 'USERNAME', dataField: 'USERNAME' },
                    { text: 'ACTIVE', dataField: 'ACTIVE' },
                ]
            });
            getInfoGU.style.display = "none";
        };

        function err(errorMessage) {
            console.log(errorMessage);
            getInfoGU.style.display = "none";
        };
    };

    return GetUsersMod;
}());

var InsertUserMod = (function () {

    function InsertUserMod() {
        var txtUserName = document.getElementById("txtUserName");
        var txtPassword = document.getElementById("txtPassword");
        var txtPasswordError = document.getElementById("txtPasswordError");
        var getInsertResult = document.getElementById("getInsertResult");
        var btnInsertUser = document.getElementById("btnInsertUser");

        btnInsertUser.addEventListener('click', function (e) {
            e.preventDefault();
            ium_post("http://localhost:1337/insertUser?apiKey=bm9kZWpz", ium_pass, ium_fail);
        });

        function ium_post(url, onSuccess, onFailure) {
            var testdata = {};
            testdata.USERNAME = txtUserName.value;
            testdata.PASSWORD = txtPassword.value;

            //JQuery way
            $.ajax({
                url: url,
                type: "POST",
                data: JSON.stringify(testdata),
                async: true,
                success: function (result) {
                    ium_pass(result);
                },
                error: function (e) {
                    ium_fail(e);
                }
            });

            //XMLHttpRequest way
            //var xhr = new XMLHttpRequest();
            //xhr.open('POST', url, true);
            //xhr.setRequestHeader('Content-Type', 'application/json');
            //xhr.onload = function () {
            //    if (xhr.status === 200) {
            //        ium_pass(xhr.responseText);
            //    } else {
            //        ium_fail(xhr.responseText);
            //    }
            //};
            //xhr.send(JSON.stringify(testdata));

        };

        function ium_pass(result) {
            getInsertResult.innerText = "Success";
            getInsertResult.setAttribute("class", "alert alert-success col-md-2");
            getInsertResult.style.display = "block";
            var opac = 1;
            var blur = setInterval(function () {
                opac -= 0.05;
                getInsertResult.style.opacity = opac;
            }, 200);
            setTimeout(function () {
                clearInterval(blur);
                getInsertResult.style.display = "none";
                getInsertResult.removeAttribute("class");
            }, 4000);
        };

        function ium_fail(error) {
            getInsertResult.innerText = "Failure";
            getInsertResult.setAttribute("class", "alert alert-warning col-md-2");
            getInsertResult.style.display = "block";
            var opac = 1;
            var blur = setInterval(function () {
                opac -= 0.05;
                getInsertResult.style.opacity = opac;
            }, 200);
            setTimeout(function () {
                clearInterval(blur);
                getInsertResult.style.display = "none";
                getInsertResult.removeAttribute("class");
            }, 4000);
        };

    };

    return InsertUserMod;
}());

var GetUserByIdMod = (function () {

    function GetUserByIdMod() {
        var txtUserId = document.getElementById("txtUserId");
        var btnGetUser = document.getElementById("btnGetUser");
        var getUserResult = document.getElementById("getUserResult");
        var getInfoGUBI = document.getElementById("getInfoGUBI");

        btnGetUser.addEventListener('click', function (e) {
            e.preventDefault();
            getInfoGUBI.style.display = 'block';
            var sUrl = "http://localhost:1337/getUserById?apiKey=bm9kZWpz";
            gubim_get(sUrl, gubim_displayResult, gubim_fail);
        });
        
        function gubim_get(url, onSuccess, onFailure) {
            //JQuery way
            $.ajax({
                url: url,
                type: "GET",
                contentType: 'application/json; charset=utf-8',
                data: { "USERID": txtUserId.value },
                async: true,
                success: function (result) {
                    onSuccess(result);
                },
                error: function (e) {
                    onFailure(e);
                }
            });

            //XMLHttpRequest way
            //var xhr = new XMLHttpRequest();
            //xhr.open('GET', url + '&USERID=' + txtUserId.value, true);
            //xhr.setRequestHeader('Content-Type', 'application/json');
            //xhr.onload = function () {
            //    if (xhr.status === 200) {
            //        onSuccess(xhr.responseText);
            //    } else {
            //        onFailure(xhr.responseText);
            //    }
            //};
            //xhr.send();
        };

        function gubim_displayResult(res) {
            var source = {
                datatype: "json",
                datafields: [
                    { name: 'ID' },
                    { name: 'USERNAME' },
                    { name: 'PASSWORD' },
                    { name: 'ACTIVE' }
                ],
            };

            source.localdata = res;
            var dataAdapter = new $.jqx.dataAdapter(source);

            //Load grid
            $('#getUserResult').jqxGrid({
                pageable: true,
                source: dataAdapter,
                sortable: true,
                width: "96%",
                enablehover: false,
                selectionmode: 'none',
                height: 200,
                PageSize: 17,
                theme: 'bootstrap',
                columns: [
                    { text: 'ID', dataField: 'ID', width: 30 },
                    { text: 'USERNAME', dataField: 'USERNAME' },
                    { text: 'ACTIVE', dataField: 'ACTIVE' },
                ]
            });
            getInfoGUBI.style.display = 'none';
        };

        function gubim_fail(error) {
            getUserResult.innerText = "Failure";
            getInfoGUBI.style.display = 'none';
        };

    };

    return GetUserByIdMod;
}());

var UpdateUserMod = (function () {

    function UpdateUserMod() {
        var selUserLoader = document.getElementById("selUserLoader");
        var isSelectLoaded = document.getElementById("isSelectLoaded");
        var selUserUU = document.getElementById("selUserUU");
        var defaultSelect = "select user";
        var showFieldsUU = document.getElementById("showFieldsUU");
        var showFieldsLoader = document.getElementById("showFieldsLoader");
        var txtUserNameUU = document.getElementById("txtUserNameUU");
        var txtPasswordUU = document.getElementById("txtPasswordUU");
        var slideThree = document.getElementById("slideThree");
        var btnUpdateUser = document.getElementById("btnUpdateUser");

        //Load select
        $.ajax({
            url: "http://localhost:1337/getUsers?apiKey=bm9kZWpz",
            type: "GET",
            async: true,
            success: function (result) {
                var defaultOption = document.createElement("option");
                defaultOption.value = "default";
                defaultOption.text = "select user";
                selUserUU.appendChild(defaultOption);

                for (var i = 0; i < result.length; i++) {
                    var option = document.createElement("option");
                    option.value = result[i].ID;
                    option.text = result[i].USERNAME;
                    selUserUU.appendChild(option);
                };

                selUserLoader.style.display = "none";
                isSelectLoaded.style.display = "block";
            },
            error: function (e) {
                
            }
        });

        selUserUU.onchange = function () {
            var elem = (typeof this.selectedIndex === "undefined" ? window.event.srcElement : this);
            defaultSelect = elem.text || elem.options[elem.selectedIndex].text;
            var selectValue = elem.value || elem.options[elem.selectedIndex].value;

            if (defaultSelect != "select user") {
                //load fields
                showFieldsLoader.style.display = "block";
                $.ajax({
                    url: "http://localhost:1337/getUserById?apiKey=bm9kZWpz",
                    type: "GET",
                    contentType: 'application/json; charset=utf-8',
                    data: { "USERID": selectValue },
                    async: true,
                    success: function (result) {
                        txtUserNameUU.value = result[0].USERNAME;
                        txtPasswordUU.value = result[0].PASSWORD;
                        var isActive = result[0].ACTIVE;
                        if (isActive == "Y" || isActive == "y") {
                            slideThree.checked = true;
                        } else {
                            slideThree.checked = false;
                        }
                        //show fields
                        showFieldsUU.style.display = "block";
                        showFieldsLoader.style.display = "none";
                    },
                    error: function (e) {
                        showFieldsLoader.style.display = "none";
                    }
                });
                
            } else {
                //hide fields
                showFieldsUU.style.display = "none";
            };
        };
    };

    return UpdateUserMod;
}());