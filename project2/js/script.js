// Global Variables:
    var entries = 0;
    var locationEntries = 0;
    var departmentEntries = 0;
    var editModeOn = false;
    var open = false;
    var checkbox = $('#editCheck');

    //Preloader
    async function preloader(state) {




        if(state) {
        $(".loader").delay(4800).fadeOut("slow");
        $("#overlayer").delay(5000).fadeOut("slow");
        $("#loadModal").modal({backdrop: 'static', keyboard: false, show: true})

            $('#content').show();

            console.log('Carregando')


        } else {

        await new Promise(r => setTimeout(r, 2000));


            $("#loadModal").modal('hide')

            console.log('Exibindo...')

        }


    }

// Functions:
    //Get data
    function getAllDepartmentsData() {

        
        $.ajax({
            url: 'php/getAllDepartmentsData.php',
            type: 'POST',
            dataType: 'json',
            data: {

            },
            success: function(result) {
                var departments = [];


                // console.log(result);
                if (result.status.name == "ok") {
                    result['data'].forEach(element => {
                        $("#departmentUpdate").append("<option value='"+element.id+"'>"+element.name+"</option>");
                        $("#departmentAdd").append("<option value='"+element.id+"'>"+element.name+"</option>");
                    });
                    
                    // $("#departmentUpdate").val(5)
                    sortSelect("#departmentUpdate");
                }  
            },
            error: function(jqXHR, textStatus, errorThrown) {
            //    console.log(jqXHR.responseText);
            }
        }); 
    }
    function getAllLocationsData(){
        $.ajax({
            url: 'php/getAllLocationsData.php',
            type: 'POST',
            dataType: 'json',
            data: {

            },
            success: function(result) {

                // console.log(result);
                if (result.status.name == "ok") {
                    result['data'].forEach(element => {
                        $("#locationUpdate").append("<option value='"+element.id+"'>"+element.name+"</option>");
                        $("#locationAdd").append("<option value='"+element.id+"'>"+element.name+"</option>");
                    });  
                    sortSelect("#locationUpdate");  

                }
            
            },
            error: function(jqXHR, textStatus, errorThrown) {
            //    console.log(jqXHR.responseText);
            }
        }); 
    }

    // Fill Tables
// Employee/Main Table
    function buildTable(phpUrl, parameter, searchInput){
        $.ajax({
            url: phpUrl,
            type: 'POST',
            dataType: 'json',
            data: {
                para: parameter,
                input: searchInput,
            },
            success: function(result) {

                // console.log(searchInput);
                // console.log(result);
                entries = 0;
                if (result.status.name == "ok") {
                    result['data'].forEach(element => {
                        entries ++;
                        var html = "<tr>";
                        // html += "<th class='idClass entry"+element.id+"'>" + element.id + "</th>";
                        html += "<td class='nameClass entry"+element.id+"' data-toggle='modal' data-target='#updateModal'>" + element.lastName + ", " + element.firstName + "</td>";
                        html += "<td class='jobClass entry"+element.id+"' data-toggle='modal' data-target='#updateModal'>" + element.jobTitle + "</td>";
                        html += "<td class='departmentClass entry"+element.id+"' data-toggle='modal' data-target='#updateModal'>" + element.department + "</td>";
                        html += "<td class='locationClass entry"+element.id+"' data-toggle='modal' data-target='#updateModal'>" + element.location + "</td>";
                        html += "<td class='emailClass entry"+element.id+"' data-toggle='modal' data-target='#updateModal'>" + element.email + "</td>";
                        html += "<td class=' editCol employeeNum"+element.id+"' data-toggle='modal' data-target='#deleteModal'>" + "<img class='minusButton' src='images/minus-square-solid.svg' alt='Minus Icon from fontawesome'>" + "</td>" + "</tr>";

                        $("#employeeTableBody").append(html);
                        entryClick(element);
                        entryClickEmployeeDelete(element);
                        if(editModeOn ===false) {
                            $(".editCol").hide();  
                        }                        
                    });
                    $("#entriesNum").empty();
                    countEntries(entries);
                                
                }
            
            },
            error: function(jqXHR, textStatus, errorThrown) {
            //    console.log(jqXHR.responseText);
            }
        }); 
    }
    function countEntries(num) {
        $("#entriesNum").append("<p class='m-auto text-light'> Total Entries: " + num + "</p>");
    }

//  Department Table
    function buildDepartmentTable(){



        $.ajax({
            url: 'php/getAllDepartmentsAndLocationsData.php',
            type: 'POST',
            dataType: 'json',
            data: {

            },
            success: function(result) {

                // console.log(searchInput);
                // console.log(result);
                departmentEntries = 0;
                if (result.status.name == "ok") {
                    result['data'].forEach(element => {
                        departmentEntries ++;
                        var html = "<tr>";
                        // html += "<th class=' departmentId"+element.id+"'>" + element.id + "</th>";
                        html += "<td class='departmentNum"+element.id+"' departmentName"+element.id+"' data-toggle='modal' data-target='#updateModal'>" + element.name + "</td>";
                        html += "<td class='departmentNum"+element.id+"' departmentLocationName"+element.id+"' data-toggle='modal' data-target='#updateModal'>" + element.location + "</td>";
                        html += "<td class=' editCol departmentNum"+element.id+"' data-toggle='modal' data-target='#deleteModal'>" + "<img class='minusButton' src='images/minus-square-solid.svg' alt='Minus Icon from fontawesome'>" + "</td>" + "</tr>";

                        $("#departmentTableBody").append(html);
                        entryClickDepartmentDelete(element);
                        entryClickDepartmentUpdate(element);
                        if(editModeOn ===false) {
                            $(".editCol").hide();  
                        }   
                        
                    });

                                
                }


            
            },
            error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR.responseText);
            }
        }); 
    }
    
// Location Table
function buildLocationTable(){
    $.ajax({
        url: 'php/getAllLocationsData.php',
        type: 'POST',
        dataType: 'json',
        data: {

        },
        success: function(result) {

            // console.log(searchInput);
            // console.log(result);
            locationEntries = 0;
            if (result.status.name == "ok") {
                result['data'].forEach(element => {
                    locationEntries ++;
                    var html = "<tr>";
                    // html += "<th class=' locationId"+element.id+"'>" + element.id + "</th>";
                    html += "<td class='locationNum"+element.id+"' locationName"+element.id+"' data-toggle='modal' data-target='#updateModal'>" + element.name + "</td>";
                    html += "<td class=' editCol locationNum"+element.id+"' data-toggle='modal' data-target='#deleteModal'>" + "<img class='minusButton' src='images/minus-square-solid.svg' alt='Minus Icon from fontawesome'>" + "</td>" + "</tr>";

                    $("#locationTableBody").append(html);
                    entryClickLocationDelete(element);
                    entryClickLocationUpdate(element);
                    if(editModeOn ===false) {
                        $(".editCol").hide();  
                    }   
                });
                            
            }
        
        },
        error: function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR.responseText);
        }
    }); 
}

    function displayEmployeeProfile(element){
        $("#profileTitle").empty();
        $("#profileBody").empty();
        
        $("#profileTitle").html(element.firstName + " " + element.lastName);

        buildProfileTable(element, element.id, element.lastName, element.firstName, element.jobTitle, element.department, element.location, element.email);
    }

    function buildProfileTable(element, id, lastName, firstName, jobTitle, department, location, email){
        var table = "<table class='m-auto table-striped'><tbody id='displayTable'> ";
        // table += "<tr><td>ID: </td><td class='entry"+element.id+"'>" + id + "</td></tr>";
        table += "<tr><td>Last Name: </td><td class='entry"+element.id+"'>" + lastName + "</td></tr>";
        table += "<tr><td>First Name: </td><td class='entry"+element.id+"'>" + firstName + "</td></tr>";
        table += "<tr><td>Job Title: </td><td class='entry"+element.id+"'>" + jobTitle + "</td></tr>";
        table += "<tr><td>Department: </td><td class='entry"+element.id+"'>" + department + "</td></tr>";
        table += "<tr><td>Location: </td><td class='entry"+element.id+"'>" + location + "</td></tr>";
        table += "<tr><td>Email: </td><td class='entry"+element.id+"'>" + email + "</td></tr></tbody></table>";
    $("#profileBody").prepend(table);
    }

    function profileReturn() {
        $("#displayProfile").attr('style', 'display: hide;');
        
        $("#searchText").val('');
        $("#entriesNum").attr('style', 'display: flex;');
    }


//Entry Clicks:
    // Employee Update/ View
    function entryClick(entryNum) {
        $(".entry"+entryNum.id).on('click', function() {
            if(editModeOn == true){
                displayUpdateProfile(entryNum);
                // console.log(entryNum)
                $("#profileFooter").show();
            }
            if(editModeOn == false){
                displayEmployeeProfile(entryNum);
                $("#profileFooter").hide();
            }
            
            
        });
    }

    // Department Update
    function entryClickDepartmentUpdate(entryNum) {
        $(".departmentNum"+entryNum.id).on('click', function() {
            if(editModeOn == true){
                updateDepartmentDisplay(entryNum);
                // console.log(entryNum)
                $("#profileFooter").show();
            }
            if(editModeOn == false){
                $("#profileTitle").empty();
                $("#profileBody").empty();
                $("#profileTitle").html("To update a department enable edit mode.")
                $("#profileFooter").hide();
            }           
        });
    }

    // Location Update
    function entryClickLocationUpdate(entryNum) {
        $(".locationNum"+entryNum.id).on('click', function() {
            if(editModeOn == true){
                updateLocationDisplay(entryNum);
                // console.log(entryNum)
                $("#profileFooter").show();
            }
            if(editModeOn == false){
                $("#profileTitle").empty();
                $("#profileBody").empty();
                $("#profileTitle").html("To update a location enable edit mode.")
                $("#profileFooter").hide();
            }              
        });
    }

    // Employee Delete
    function entryClickEmployeeDelete(entryNum) {
        $(".employeeNum"+entryNum.id).on('click', function() {
            // if(editModeOn == true){
                employeeDeletionWarning(entryNum.firstName, entryNum.lastName);
                $("#deleteEmployeeYesButton").on('click', function() {
                    deleteEmployee(entryNum.id);
                })
            // }     
        });
    }

    // Department Delete
    function entryClickDepartmentDelete(entryNum) {
        $(".departmentNum"+entryNum.id).on('click', function() {
            // if(editModeOn == true){
                departmentDeletionWarning(entryNum.name);
                $("#deleteDepartmentYesButton").on('click', function() {
                    deleteDepartment(entryNum.id);
                })
            // }     
        });
    }

    // Location Delete
    function entryClickLocationDelete(entryNum) {
        $(".locationNum"+entryNum.id).on('click', function() {
            // if(editModeOn == true){
                locationDeletionWarning(entryNum.name);
                $("#deleteLocationYesButton").on('click', function() {
                    deleteLocation(entryNum.id);
                })
            // }     
        });
    }


    function emptyTables() {
        $("#employeeTableBody").empty();
        $("#locationTableBody").empty();
        $("#departmentTableBody").empty();
    }
    function reset() {
        emptyTables();
        profileReturn(); 

        buildTable("php/getAllData.php");
        buildLocationTable();
        buildDepartmentTable();
        employeeClick();

        $("#tableSelect option:selected").val() === "Employees";

    }



//Search Functions:
    function equals() {
        var parameter = $("#columnTitle").val();
        var searchInput = $("#searchText").val();
        $("#displayProfile").attr('style', 'display: hide;');
        $("#entriesNum").attr('style', 'display: flex;');
        $("#employeeTableBody").empty();
        buildTable("php/equals.php", parameter, searchInput);
    }
    function startsWith() {
        var parameter = $("#columnTitle").val();
        var searchInput = $("#searchText").val();
        $("#displayProfile").attr('style', 'display: hide;');
        $("#entriesNum").attr('style', 'display: flex;');
        $("#employeeTableBody").empty();
        buildTable("php/startsWith.php", parameter, searchInput);

    }
    function endsWith() {
        var parameter = $("#columnTitle").val();
        var searchInput = $("#searchText").val();
        $("#displayProfile").attr('style', 'display: hide;');
        $("#entriesNum").attr('style', 'display: flex;');
        $("#employeeTableBody").empty();
        buildTable("php/endsWith.php", parameter, searchInput);

    }
    function contains() {
        var parameter = $("#columnTitle").val();
        var searchInput = $("#searchText").val();
        $("#displayProfile").attr('style', 'display: hide;');
        $("#entriesNum").attr('style', 'display: flex;');
        $("#employeeTableBody").empty();
        buildTable("php/contains.php", parameter, searchInput);
        
    }

// Success Messages
    function successMessage(message) {
        $("#successMessage").empty();
        $("#successMessage").append(message);
        $("#successModal").modal('show'); 
    }


//Tables - hide/show
    function hideTables() {
        $("#directoryTable").fadeOut();
        $("#locationTable").fadeOut();
        $("#departmentTable").fadeOut();
    }

    function employeeClick() {
        $("#entriesNum").empty();
        hideTables();     
        if($(window).width() <= 425){
            $("#moreButtonWrapper").show();
        }

        $("#directoryTable").fadeIn();
        $("#entriesNum").append("<p class='m-auto text-light'> Total Entries: " + entries+ " Employees</p>");
    }   

    function locationClick() {
        $("#entriesNum").empty();
        hideTables();
        $("#moreButtonWrapper").hide();
        $("#locationTable").fadeIn();
        $("#entriesNum").append("<p class='m-auto text-light'> Total Entries: " + locationEntries+ " Locations</p>");
    }
  
    function departmentClick() {

        $("#entriesNum").empty();
        hideTables();
        $("#moreButtonWrapper").hide();
        $("#departmentTable").fadeIn();
        $("#entriesNum").append("<p class='m-auto text-light'> Total Entries: " + departmentEntries+ " Departments</p>");
    }


//Sort Table
    //Employee Table
    var table=$('#directoryTable');
    var tbody =$('#employeeTableBody');
    var sort_order = "asc";

    // function sortById() {

    //     if(sort_order === "asc") {
    //         sort_order = "desc";
    //     } else {
    //         sort_order = "asc";
    //     }

    // tbody.find('tr').sort(function(a, b) 
    // {
    // if(sort_order =='asc') 
    // {
    // return $('th:last', a).text().localeCompare($('th:last', b).text());
    // }
    // else 
    // {
    // return $('th:last', b).text().localeCompare($('th:last', a).text());
    // }
            
    // }).appendTo(tbody);
        
    // }
    function sortByName()
    {
        if(sort_order === "asc") {
            sort_order = "desc";
        } else {
            sort_order = "asc";
        }

    tbody.find('tr').sort(function(a, b) 
    {
    if(sort_order == 'asc') 
    {
    return $('td:nth-child(1)', a).text().localeCompare($('td:nth-child(1)', b).text());
    }
    else 
    {
    return $('td:nth-child(1)', b).text().localeCompare($('td:nth-child(1)', a).text());
    }
            
    }).appendTo(tbody);
    }
    function sortByJob()
    {
        if(sort_order === "asc") {
            sort_order = "desc";
        } else {
            sort_order = "asc";
        }

    tbody.find('tr').sort(function(a, b) 
    {
    if(sort_order == 'asc') 
    {
    return $('td:nth-child(2)', a).text().localeCompare($('td:nth-child(2)', b).text());
    }
    else 
    {
    return $('td:nth-child(2)', b).text().localeCompare($('td:nth-child(2)', a).text());
    }
            
    }).appendTo(tbody);
    }
    function sortByDepartment()
    {
        if(sort_order === "asc") {
            sort_order = "desc";
        } else {
            sort_order = "asc";
        }

    tbody.find('tr').sort(function(a, b) 
    {
    if(sort_order == 'asc') 
    {
    return $('td:nth-child(3)', a).text().localeCompare($('td:nth-child(3)', b).text());
    }
    else 
    {
    return $('td:nth-child(3)', b).text().localeCompare($('td:nth-child(3)', a).text());
    }
            
    }).appendTo(tbody);
    }
    function sortByLocation()
    {
        if(sort_order === "asc") {
            sort_order = "desc";
        } else {
            sort_order = "asc";
        }

    tbody.find('tr').sort(function(a, b) 
    {
    if(sort_order == 'asc') 
    {
    return $('td:nth-child(4)', a).text().localeCompare($('td:nth-child(4)', b).text());
    }
    else 
    {
    return $('td:nth-child(4)', b).text().localeCompare($('td:nth-child(4)', a).text());
    }
            
    }).appendTo(tbody);
    }
    function sortByEmail()
{
    if(sort_order === "asc") {
        sort_order = "desc";
    } else {
        sort_order = "asc";
    }

 tbody.find('tr').sort(function(a, b) 
 {
  if(sort_order == 'asc') 
  {
   return $('td:nth-child(5)', a).text().localeCompare($('td:nth-child(5)', b).text());
  }
  else 
  {
   return $('td:nth-child(5)', b).text().localeCompare($('td:nth-child(5)', a).text());
  }
		
 }).appendTo(tbody);
    }

    // Location Table
    function sortByLocationName()
    {
        var tbody =$('#locationTableBody');
        if(sort_order === "asc") {
            sort_order = "desc";
        } else {
            sort_order = "asc";
        }

    tbody.find('tr').sort(function(a, b) 
    {
    if(sort_order == 'asc') 
    {
    return $('td:nth-child(1)', a).text().localeCompare($('td:nth-child(1)', b).text());
    }
    else 
    {
    return $('td:nth-child(1)', b).text().localeCompare($('td:nth-child(1)', a).text());
    }
            
    }).appendTo(tbody);
    }

    // Department Table
    function sortByDepartmentName()
    {
        var tbody =$('#departmentTableBody');
        if(sort_order === "asc") {
            sort_order = "desc";
        } else {
            sort_order = "asc";
        }

    tbody.find('tr').sort(function(a, b) 
    {
    if(sort_order == 'asc') 
    {
    return $('td:nth-child(1)', a).text().localeCompare($('td:nth-child(1)', b).text());
    }
    else 
    {
    return $('td:nth-child(1)', b).text().localeCompare($('td:nth-child(1)', a).text());
    }
            
    }).appendTo(tbody);
    }
    function sortByDepartmentLocationName()
    {
        var tbody =$('#departmentTableBody');
        if(sort_order === "asc") {
            sort_order = "desc";
        } else {
            sort_order = "asc";
        }

    tbody.find('tr').sort(function(a, b) 
    {
    if(sort_order == 'asc') 
    {
    return $('td:nth-child(2)', a).text().localeCompare($('td:nth-child(2)', b).text());
    }
    else 
    {
    return $('td:nth-child(2)', b).text().localeCompare($('td:nth-child(2)', a).text());
    }
            
    }).appendTo(tbody);
    }

//Sort Select list
    function sortSelect(id) {
        
        var select = $(id);
        select.html(select.find('option').sort(function(x, y) {
        return $(x).text() > $(y).text() ? 1 : -1;
        }));
    
        // select default item after sorting (first item)
        // $('select').get(0).selectedIndex = 0;
    }

//Edit Mode:
    //Slider
        checkbox.on('change', (event) => {
            if (event.currentTarget.checked) {
                console.log('Editmode On')
                editOn();

            } else {
                console.log('Editmode Off')
                editOff();
                $('#editCheck').prop("checked", false);
            }
        })

    function editOn() {
        editModeOn = true;

        $(".editCol").fadeIn();

        //Color changes
        $("#optionsBarWrapper").attr('style', 'background-color: black;');
        $("body").attr('style', 'background-color: black;');
        $("#editModeText").attr('style', 'color: white;');
        $("#moreButton").attr('style', 'background-color: white;');
    }

    function editOff() {
        editModeOn = false;

        $(".editCol").hide();

        reset();
            //Color changes
            $("#optionsBarWrapper").attr('style', 'background-color: white;');
            $("body").attr('style', 'background-color: white;');
            $("#editModeText").attr('style', 'color: black;');
    }
    if(editModeOn ===false) {
        $(".editCol").hide();  
    }

    //Database Alter Warning
        //Update Validate
        function validateEmployeeUpdate() {
            var lastName = $("#lastNameUpdate").val();
            var firstName = $("#firstNameUpdate").val();
            var jobTitle = $("#jobTitleUpdate").val();
            var department = $("#departmentUpdate").val();
            var location = $("#locationUpdate").val();
            var email = $("#emailUpdate").val();

            if (lastName == "") {
                $("#confirmationMessage").empty();
                $("#confirmationButtons").empty();
                            
                $("#confirmationMessage").append("Last name must be filled out");
                return false;
            }
            if (firstName == "") {
                $("#confirmationMessage").empty();
                $("#confirmationButtons").empty();
                            
                $("#confirmationMessage").append("First name must be filled out");
                return false;
            }
            if (department == "") {
                $("#confirmationMessage").empty();
                $("#confirmationButtons").empty();
                            
                $("#confirmationMessage").append("Department name must be filled out");
                return false;
            }
            if (location == "") {
                $("#confirmationMessage").empty();
                $("#confirmationButtons").empty();
                            
                $("#confirmationMessage").append("Location name must be filled out");
                return false;
            }
            if (jobTitle == "") {
                $("#confirmationMessage").empty();
                $("#confirmationButtons").empty();
                            
                $("#confirmationMessage").append("Job title must be filled out");
                return false;
            }
            if (email == "") {
                $("#confirmationMessage").empty();
                $("#confirmationButtons").empty();
                            
                $("#confirmationMessage").append("Email address must be filled out");
                return false;
            }


        }
        function validateDepartmentUpdate() {
            var department = $("#newDepartmentName").val();

            if (department == "") {
                $("#confirmationMessage").empty();
                $("#confirmationButtons").empty();
                            
                $("#confirmationMessage").append("The new department name must be filled out");
                return false;
            }
        }
        function validateLocationUpdate() {
            var location = $("#newLocationName").val();

            if (location == "") {
                $("#confirmationMessage").empty();
                $("#confirmationButtons").empty();
                            
                $("#confirmationMessage").append("The new location name must be filled out");
                return false;
            }
        }
        //Add Validate
        function validateEmployeeAdd() {
            var lastName = $("#lastNameAdd").val();
            var firstName = $("#firstNameAdd").val();
            var jobTitle = $("#jobTitleAdd").val();
            var department = $("#departmentAdd").val();
            var location = $("#locationAdd").val();
            var email = $("#emailAdd").val();

            if (lastName == "") {
                $("#confirmationMessage").empty();
                $("#confirmationButtons").empty();
                            
                $("#confirmationMessage").append("Last name must be filled out");
                return false;
            }
            if (firstName == "") {
                $("#confirmationMessage").empty();
                $("#confirmationButtons").empty();
                            
                $("#confirmationMessage").append("First name must be filled out");
                return false;
            }
            if (department == "") {
                $("#confirmationMessage").empty();
                $("#confirmationButtons").empty();
                            
                $("#confirmationMessage").append("Department name must be filled out");
                return false;
            }
            if (location == "") {
                $("#confirmationMessage").empty();
                $("#confirmationButtons").empty();
                            
                $("#confirmationMessage").append("Location name must be filled out");
                return false;
            }
            if (jobTitle == "") {
                $("#confirmationMessage").empty();
                $("#confirmationButtons").empty();
                            
                $("#confirmationMessage").append("Job title must be filled out");
                return false;
            }
            if (email == "") {
                $("#confirmationMessage").empty();
                $("#confirmationButtons").empty();
                            
                $("#confirmationMessage").append("Email address must be filled out");
                return false;
            }


        }
        
        // Warning Messages
        function warning(modification, entryType) {
            $("#confirmationMessage").attr('style', 'display: block;');
            $("#warningMessage").empty();
            $("#warningMessage").append("<p class='message'>Are you sure you wish to <span style='color:red;'>"+modification+"</span> a "+entryType.toLowerCase()+"?</p>");
        }
        function warningHide() {
            $("#confirmationMessage").attr("style", "display:hide;");
        }

            // Employee
            function employeeDeletionWarning(firstName, lastName) {
                $("#deleteMessage").empty();
                $("#deleteButtons").empty();


                $("#deleteMessage").append("<p class='m-auto col-12' id='employeeWarningMessage'></p><br>");
                $("#deleteButtons").append("<button class='m-auto col-4 btn btn-primary yesButton' id='deleteEmployeeYesButton' data-dismiss='modal'>Yes</button><button class='m-auto col-4 btn btn-primary' id='noButton' class='close' data-dismiss='modal'>No</button>");

                $("#employeeWarningMessage").append("<p class='message'>Are you sure you wish to <span style='color:red;'>delete</span> the entry: "+firstName +" " + lastName + "?</p>");
            }
            // Department
            function departmentDeletionWarning(departmentName) {
                $("#deleteMessage").empty();
                $("#deleteButtons").empty();

                $("#deleteMessage").append("<p class='m-auto col-12' id='departmentWarningMessage'></p><br>");
                $("#deleteButtons").append("<button class='m-auto col-4 btn btn-primary yesButton' id='deleteDepartmentYesButton' data-dismiss='modal'>Yes</button><button class='m-auto col-4 btn btn-primary' id='noButton' class='close' data-dismiss='modal'>No</button>");

                $("#departmentWarningMessage").append("<p class='message'>Are you sure you wish to <span style='color:red;'>delete</span> the department: "+departmentName +"?</p>");
            }
            // Location
            function locationDeletionWarning(locationName) {
                $("#deleteMessage").empty();
                $("#deleteButtons").empty();

                $("#deleteMessage").append("<p class='m-auto col-12' id='locationWarningMessage'></p><br>");
                $("#deleteButtons").append("<button class='m-auto col-4 btn btn-primary yesButton' id='deleteLocationYesButton' data-dismiss='modal'>Yes</button><button class='m-auto col-4 btn btn-primary' id='noButton' class='close' data-dismiss='modal'>No</button>");

                $("#locationWarningMessage").append("<p class='message'>Are you sure you wish to <span style='color:red;'>delete</span> the location: "+locationName +"?</p>");
            }


    //Update Entry
        function updateProfile(element) {
            $.ajax({
                url: 'php/update.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    id: element.id,
                    lastName: $("#lastNameUpdate").val(),
                    firstName: $("#firstNameUpdate").val(),
                    jobTitle: $("#jobTitleUpdate").val(),
                    email: $("#emailUpdate").val(),
                    department: $("#departmentUpdate").val(),
                },
                
                success: function(result) {
                    // console.log(element.id);
                    // console.log(result);
                    entries = 0
                    if (result.status.name == "ok") {
                        successMessage("Entry updated");
                        reset();                                
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                //  console.log(jqXHR.responseText);
                }
            }); 
        }
        function displayUpdateProfile(element) {  
            $("#profileTitle").empty();
            $("#profileBody").empty();
            // console.log(element)

            $("#profileTitle").html(element.firstName + " " + element.lastName);

            //Get department and location:
            getAllDepartmentsData();
                var lastNameInput = "<input class='form-control' type='text' id='lastNameUpdate' placeholder='" + element.lastName + "'>";
                var firstNameInput = "<input class='form-control' type='text' id='firstNameUpdate' placeholder='" + element.firstName + "'>";
                var jobTitleInput = "<input class='form-control' type='text' id='jobTitleUpdate' placeholder='" + element.jobTitle + "'>";

                var departmentInput = "<select class='form-control' name='departmentUpdate' id='departmentUpdate'><option value='" + element.id + "'>" + element.department + "</option></select>";

                var locationInput = "<p val='locationUpdate' style='padding-left:15px;'>Set department.</select>";

                var emailInput = "<input class='form-control' type='text' id='emailUpdate' placeholder='" + element.email + "'>";

                buildProfileTable(element, element.id, lastNameInput, firstNameInput, jobTitleInput, departmentInput, locationInput, emailInput);


            //Add Save Button:
            var saveButton = "<button type='button' id='updateProfileSaveButton' class='btn btn-primary'  data-toggle='modal' data-target='#confirmationModal'>Save</button>";

            $("#profileFooter").empty();
            $("#profileFooter").append(saveButton);

            //On save button click:
            $("#updateProfileSaveButton").on('click', function() {
                if(validateEmployeeUpdate() != false) {
                    $("#confirmationMessage").empty();
                    $("#confirmationButtons").empty();
                                
                    $("#confirmationMessage").append("<p class='m-auto col-12' id='warningMessage'></p><br>");
                    $("#confirmationButtons").append("<button class='m-auto col-4 btn btn-primary yesButton' id='updateProfileYesButton' data-dismiss='modal'>Yes</button><button class='m-auto col-4 btn btn-primary' id='noButton' class='close' data-dismiss='modal'>No</button>");

                    warning("update", "employee");

                    $("#updateProfileYesButton").on('click', function() {

                        updateProfile(element);
                    });
                }
            });

            $("#entriesNum").empty();
            
        }

        function updateDepartment() {
            $.ajax({
                url: 'php/updateDepartment.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    id: $("#departmentUpdate").val(),
                    departmentName: $("#newDepartmentName").val(),
                    locationId: $("#locationUpdate").val(),
                },
                
                success: function(result) {;
                    //  console.log(result);
                    if (result.status.name == "ok") {
                        successMessage("Department updated");
                        // reset();                                
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                //  console.log(jqXHR.responseText,textStatus);
                successMessage("Department updated");
                }
            }); 
        }
        function updateDepartmentDisplay(element) {
            $("#profileTitle").empty();
            $("#profileBody").empty();
            // console.log(element);

            $("#profileTitle").html(element.name);

            var table = "<table class='m-auto table-striped'><tbody id='displayTable'>";

            //Get locations:
            getAllDepartmentsData();
            getAllLocationsData();

            table += "<tr><td>Current department names: </td><td>" + "<select class='form-control' id='departmentUpdate'><option value="+ element.id +" selected>"+ element.name+"</select>" + "</td></tr>";
            table += "<tr><td>New department name: </td><td>" + "<input class='form-control' type='text' placeholder='New department name...' id='newDepartmentName'></input>" + "</td></tr>";
            table += "<tr><td>Location: </td><td>" + "<select class='form-control' id='locationUpdate'><option value="+ element.id +" selected>"+ element.location+"</select>" + "</td></tr></tbody></table>";
            $("#profileBody").append(table);

            //Add Save Button:
            var saveButton = "<button type='button' id='updateDepartmentSaveButton' class='btn btn-primary'  data-toggle='modal' data-target='#confirmationModal'>Save</button>";

            $("#profileFooter").empty();
            $("#profileFooter").append(saveButton);
                    

            //On save button click:
            $("#updateDepartmentSaveButton").on('click', function() {
                if(validateDepartmentUpdate() != false) {
                    $("#confirmationMessage").empty();
                    $("#confirmationButtons").empty();
                                
                    $("#confirmationMessage").append("<p class='m-auto col-12' id='warningMessage'></p><br>");
                    $("#confirmationButtons").append("<button class='m-auto col-4 btn btn-primary yesButton' id='updateDepartmentYesButton' data-dismiss='modal'>Yes</button><button class='m-auto col-4 btn btn-primary' id='noButton' class='close' data-dismiss='modal'>No</button>");
                    
                    warning("update", "department");

                    $("#updateDepartmentYesButton").on('click', function() {
                        
                            updateDepartment();
                    });
                };
            });
        }

        function updateLocation() {
            $.ajax({
                url: 'php/updateLocation.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    id: $("#locationUpdate").val(),
                    locationName: $("#newLocationName").val(),
                },
                
                success: function(result) {
                    console.log(result);
                    if (result.status.name == "ok") {
                        successMessage("Location updated");
                        // reset();                                
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                //  console.log(jqXHR.responseText);
                }
            }); 
        }
        function updateLocationDisplay(element) {
            $("#profileTitle").empty();
            $("#profileBody").empty();
            // console.log(element)

            $("#profileTitle").html(element.name);

            var table = "<table class='m-auto table-striped'><tbody id='displayTable'>";

            //Get locations:
            getAllLocationsData();
            table += "<tr><td>Current location names: </td><td>" + "<select class='form-control' id='locationUpdate'><option value="+ element.id +" selected>"+ element.name+"</select>" + "</td></tr>";
            table += "<tr><td>New location name: </td><td>" + "<input class='form-control' type='text' placeholder='New location name...' id='newLocationName'></input>" + "</td></tr>";
            table += "</tbody></table>";
            $("#profileBody").prepend(table);

            //Add Save Button:
            var saveButton = "<button type='button' id='updateLocationSaveButton' class='btn btn-primary'  data-toggle='modal' data-target='#confirmationModal'>Save</button>";

            $("#profileFooter").empty();
            $("#profileFooter").append(saveButton);
                    

            //On save button click:
            $("#updateLocationSaveButton").on('click', function() {
                if(validateLocationUpdate() != false) {
                    $("#confirmationMessage").empty();
                    $("#confirmationButtons").empty();
                                
                    $("#confirmationMessage").append("<p class='m-auto col-12' id='warningMessage'></p><br>");
                    $("#confirmationButtons").append("<button class='m-auto col-4 btn btn-primary yesButton' id='updateLocationYesButton' data-dismiss='modal'>Yes</button><button class='m-auto col-4 btn btn-primary' id='noButton' class='close' data-dismiss='modal'>No</button>");
                    
                    warning("update", "location");

                    $("#updateLocationYesButton").on('click', function() {
                        
                            updateLocation();
                    });
                };
            });
        }

    //ADD
        function addEmployee() {
            $.ajax({
                url: 'php/insertPersonnelData.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    lastName: $("#lastNameAdd").val(),
                    firstName: $("#firstNameAdd").val(),
                    jobTitle: $("#jobTitleAdd").val(),
                    email: $("#emailAdd").val(),
                    department: $("#departmentAdd").val(),
                },
                success: function(result) {
        
                    // console.log(result);
                    if (result.status.name == "ok") {
                        successMessage('Entry successfully added.')
                        reset();
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                //    console.log(jqXHR.responseText,  textStatus, errorThrown);
                }
            }); 
        }
        function addEmployeeDisplay() {
            //Get departments:
            getAllDepartmentsData();

            //On save button click:
            $("#addEmployeeSaveButton").on('click', function() {
                if(validateEmployeeAdd() != false) {
                    $("#confirmationMessage").empty();
                    $("#confirmationButtons").empty();

                    $("#confirmationMessage").append("<p class='m-auto col-12' id='warningMessage'></p><br>");
                    $("#confirmationButtons").append("<button class='m-auto col-4 btn btn-primary yesButton' id='addEmployeeYesButton' data-dismiss='modal'>Yes</button><button class='m-auto col-4 btn btn-primary' id='noButton' class='close' data-dismiss='modal'>No</button>");

                    warning("add", "employee");

                    $("#addEmployeeYesButton").on('click', function() {
                        addEmployee();
                        $("#confirmationMessage").attr('style', 'display: hide;');
                    });
                }
            });
        }

        function addDepartment() {
            $.ajax({
                url: 'php/insertDepartmentData.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    name: $("#departmentNameAdd").val(),
                    locationID: $("#locationAdd").val(),
                },
                success: function(result) {
                    // console.log(result);
                    entries = 0
                    if (result.status.name == "ok") {
                        successMessage("Department added.")
                        reset();              
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                // console.log(jqXHR.responseText);
                }
            }); 
        }
        function addDepartmentDisplay() {

            //Get locations:
            getAllLocationsData();
              

            //On save button click:
            $("#addDepartmentSaveButton").on('click', function() {
                if ($("#departmentNameAdd").val() == "") {
                    $("#confirmationMessage").empty();
                    $("#confirmationButtons").empty();
                                
                    $("#confirmationMessage").append("The new department name must be filled out to update this information");
                }else {
                    $("#confirmationMessage").empty();
                    $("#confirmationButtons").empty();

                    $("#confirmationMessage").append("<p class='m-auto col-12' id='warningMessage'></p><br>");
                    $("#confirmationButtons").append("<button class='m-auto col-4 btn btn-primary yesButton' id='addDepartmentYesButton' data-dismiss='modal'>Yes</button><button class='m-auto col-4 btn btn-primary' id='noButton' class='close' data-dismiss='modal'>No</button>");

                    warning("add", "department");

                    $("#addDepartmentYesButton").on('click', function() {                        
                        addDepartment();                    
                        $("#confirmationMessage").attr('style', 'display: hide;');
                    });
                };
            });
        }

        function addLocation() {
            $.ajax({
                url: 'php/insertLocationData.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    locationName: $("#locationNameAdd").val(),
                },
                success: function(result) {
                    // console.log(result);
                    entries = 0
                    if (result.status.name == "ok") {
                        successMessage("Location added.");
                        $("#locationNameAdd").val() == "";
                        reset();              
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                // console.log(jqXHR.responseText);
                }
            }); 
        }
        function addLocationDisplay(){

            //Get locations:
            getAllLocationsData();
            

            //On save button click:
            $("#addLocationSaveButton").on('click', function() {
                if ($("#locationNameAdd").val()== "") {
                
                    $("#confirmationMessage").empty();
                    $("#confirmationButtons").empty();
                                
                    $("#confirmationMessage").append("The new location name must be filled out to update this information");
                } else {
                    $("#confirmationMessage").empty();
                    $("#confirmationButtons").empty();
                                
                    $("#confirmationMessage").append("<p class='m-auto col-12' id='warningMessage'></p><br>");
                    $("#confirmationButtons").append("<button class='m-auto col-4 btn btn-primary yesButton' id='addLocationYesButton' data-dismiss='modal'>Yes</button><button class='m-auto col-4 btn btn-primary' id='noButton' class='close' data-dismiss='modal'>No</button>");

                    warning("add", "location");

                    $("#addLocationYesButton").on('click', function() {
                        addLocation();
                        $("#confirmationMessage").attr('style', 'display: hide;');
                    });
                };
            });
        }

    // DELETE 
        function deleteEmployee(entryId) {
            $.ajax({
                url: 'php/deleteEmployeeById.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    id: entryId
                },
                success: function(result) {
        
                    console.log(result);
                    if (result.status.name == "ok") {
                        successMessage('Entry successfully deleted.');
                        reset();
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                   console.log(jqXHR.responseText);
                }
            }); 
        }

        function deleteDepartment(entryId) {
            $.ajax({
                url: 'php/deleteDepartmentByIdNum.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    id: entryId,
                },
                success: function(result) {
                    // console.log(result);
                    entries = 0
                    if (result.status.name == "ok") {
                        successMessage("Department deleted.")
                        // reset();   
                        setTimeout(() => {
                            window.location.href='/';
                        }, 3000);

                    }
                    if (result.status.name == "executed") {
                        successMessage("Error: This department still has dependencies!")
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                // console.log(jqXHR.responseText);
                }
            }); 
        }

        function deleteLocation(entryId) {
            $.ajax({
                url: 'php/deleteLocationByIdNum.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    id: entryId,
                },
                success: function(result) {
                    console.log(result);
                    entries = 0
                    if (result.status.name == "ok") {
                        successMessage("Location deleted.")

                        setTimeout(() => {
                            window.location.href='/';
                        }, 3000);
                                    
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.responseText);
                successMessage(jqXHR.responseText);
                }
            }); 

        }


    //Mobile Only Functions
        var i = 0;
        function showMoreData() {
            i++;
                if(i == 1) {
                    $(".jobClass").attr("style", "display: table-cell");
                }
                if(i == 2) {
                    $(".jobClass").attr("style", "display: none");
                    $(".departmentClass").attr("style", "display: table-cell");
                }
                if(i == 3) {
                    $(".departmentClass").attr("style", "display: none");
                    $(".locationClass").attr("style", "display: table-cell");
                }
                if(i == 4) {
                    $(".locationClass").attr("style", "display: none");
                    $(".emailClass").attr("style", "display: table-cell");
                }
                if(i == 5) {
                    $(".emailClass").attr("style", "display: none");
                    i=0;
                }
            


            }
        



//Document Ready:
    $(document).ready(async function() {

    await preloader(1)

    buildTable("php/getAllData.php");
    buildLocationTable();
    buildDepartmentTable();

    preloader(0)


    //Preloader
        // preloader();

    });



//On click:
    $("#submitButton").on('click', function() {
        if($('#sortBy').val() =='equals') {
            equals();
        }
        if($('#sortBy').val() =='contains') {
            contains();
        }
        if($('#sortBy').val() =='startsWith') {
            startsWith();
        }
        if($('#sortBy').val() =='endsWith') {
            endsWith();
        }
    });

    $("#resetButton").on('click', function() {
        reset();
    });

    $("#employeeAddButton").on('click', function() {
        addEmployeeDisplay();
    });

    $("#departmentAddButton").on('click', function() {
        addDepartmentDisplay();
    });

    $("#locationAddButton").on('click', function() {
        addLocationDisplay();
    });

    $("#closeWarning").on('click', function () {
        warningHide();
    });

    $("#closeSignIn").on('click', function () {
        signInHide();
    });

        // Column sorting
            //Employee
        $("#nameCol").on("click", function () {
            sortByName();
        });
        $("#jobCol").on("click", function () {
            sortByJob();
        });
        $("#departmentCol").on("click", function () {
            sortByDepartment();
        });
        $("#locationCol").on("click", function () {
            sortByLocation();
        });
        $("#emailCol").on("click", function () {
            sortByEmail();
        });
            //Location
        $("#locationNameCol").on("click", function () {
            sortByLocationName();
        });
            
            //Department
        $("#departmentNameCol").on("click", function () {
            sortByDepartmentName();
        });
        $("#departmentLocationNameCol").on("click", function () {
            sortByDepartmentLocationName();
        });



        //Add entries
        $("#addEmployee").on("click", function () {
            addEmployeeDisplay();
        });
        $("#addLocation").on("click", function () {
            addLocationDisplay();
        });
        $("#addDepartment").on("click", function () {
            addDepartmentDisplay();
        });

// On change:
    $("#tableSelect").on("change", async function () {
        if($( "#tableSelect option:selected").val() === "Employees") {
            
            await preloader(1)
            employeeClick();
            preloader(0)

        }
        if($( "#tableSelect option:selected").val() === "Locations") {
            
            await preloader(1)
            locationClick();
            preloader(0)

        }
        if($( "#tableSelect option:selected").val() === "Departments") {
            
            await preloader(1)
            departmentClick();
            preloader(0)


        }
    })
