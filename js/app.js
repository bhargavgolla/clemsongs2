var suggestionTemplateGen = function(obj){
    return '<p class="courseId">'+obj.courseid+'<br/>'+obj.type+'</p><p class="courseName">'+obj.coursename+'</p><p class="courseDescription">'+obj.description+'</p>';
}

var addedCourses = [];
var addedCourseDatums = [];
var addCourse = function(datum) {
    console.log(datum.allowDuplicate);
    if (addedCourses.indexOf(datum.courseid) == -1 || datum.allowDuplicate) {
        addedCourses.push(datum.courseid);
        addedCourseDatums.push(datum);
        var course = '<div class="courseAdded alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span>'+datum.courseid+':'+datum.coursename+'</span></div>';
        $('#conc'+datum.type+' div.panel-body').append(course);
        $('#conc'+datum.type).collapse('show');
    }
    console.log(addedCourseDatums);
    console.log(addedCourses);
}

var removeCourse = function(text) {
    var removedID = text.substr(0,text.indexOf(":"));
    var removedIndex = addedCourses.indexOf(removedID);
    console.log(addedCourseDatums);
    console.log(addedCourses);
    console.log(removedIndex);
    console.log(removedID);
    console.log(text);
    if (removedIndex > -1) {
        addedCourses.splice(removedIndex, 1);
    }
    addedCourseDatums.forEach(function(course, index) {
        if (course.courseid.indexOf(removedID) > -1) {
            addedCourseDatums.splice(index,1);
        }
    });
    console.log(addedCourseDatums);
    console.log(addedCourses);
}

var checkGrad = function(option) {
    var graduateAble = 2;
    var issues = [];
    var gradLevel = 0;
    var concentrations = {};
    var breadth = 0;
    var concCoursesNo = 2;
    var concField = "";
    var formal = false;
    var impl = false;
    addedCourseDatums.forEach(function(course, index) {
        if (course.courseid.indexOf("CPSC 8") != -1) {
            gradLevel++;        
        }
        if (course.formal) {
            formal = true;
        }
        if (course.impl) {
            impl = true;
        }
        if (concentrations.hasOwnProperty(course.type)) {
            concentrations[course.type]++;
            if (concentrations[course.type] > concCoursesNo) {
                concCoursesNo = concentrations[course.type];
                concField = course.typeFull;
            }
        } else {
            concentrations[course.type] = 1;
            breadth++;
        }
    });
    console.log("User opted "+option);
    console.log("No. of 800 level: "+gradLevel);
    console.log(concentrations);
    console.log("No. of breadths: "+breadth);
    console.log("Concentration course no. "+concCoursesNo);
    console.log("Concentration Field "+concField);
    console.log("Done with formal "+formal);
    console.log("Done with impl "+impl);
    if (addedCourseDatums.length < 10) {
        graduateAble = 1;
    }
    if (gradLevel < 7) {
        issues.push("You have just "+gradLevel+" 800 level courses.");
        graduateAble = 0;
    } else if (option.indexOf("Thesis") != -1  && gradLevel < 8) {
        issues.push("You have just "+gradLevel+" 800 level courses.");
        graduateAble = 0;
    }
    if (concCoursesNo < 3 || concField == "") {
        issues.push("You are required to satisy Concentration requirement by doing atleast three courses from a core area.");
        graduateAble = 0;
    }
    if (breadth < 4) {
        issues.push("You are required to satisy Breadth requirement by doing atleast one course in at least three core areas other than concentration.");
        graduateAble = 0;
    }
    if (option.indexOf("Thesis") != -1 && !formal) {
        issues.push("Being a thesis student, you're required to fulfill Formal Thinking requirements.");
        graduateAble = 0;
    }
    if (option.indexOf("Thesis") != -1 && !impl) {
        issues.push("Being a thesis student, you're required to fulfill Implementation requirements.");
        graduateAble = 0;
    }
    if (graduateAble == 2) {
        $("#success #option").text(option);
        $("#success #concentration").text(concField);
        $("#success").show();
        $("#info").hide();
        $("#error").hide();
    } else if (graduateAble == 1) {
        $("#info #option").text(option);
        $("#info #concentration").text(concField);
        $("#success").hide();
        balance = (10 - addedCourseDatums.length)*3;
        $("#balance").text(balance);
        $("#info").show();
        $("#error").hide();
    } else {
        $("#success").hide();
        $("#info").hide();
        $("#error").show();
        console.log(issues);
        $("#error #gradIssues").empty();
        issues.forEach(function(issue,index){
            $("#error #gradIssues").append("<p>"+issue+"</p>");
        });
    }
    
}

$(document).ready(function(){
    var option = "";
    $("a.option").click(function(){
        option = $(this).text();
    });
    var courses = new Bloodhound({
	    datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.courseid+" "+d.coursename+" "+d.type); },
	    queryTokenizer: Bloodhound.tokenizers.whitespace,
            prefetch: {
                url: './assets/courses.json',
                ttl: 0
            }
    });
    courses.initialize();
    $('.form-control').focus(function(){
        $('.tt-dropdown-menu').width($('.tt-input').outerWidth());
    });
	$('ul.navbar-nav>li').click(function(){
		if ($('button.navbar-toggle').is(':visible')) {
			$('div.navbar-collapse').collapse('hide');
		}
	});
    $('input.typeahead').typeahead({
        highlight: true,
        autoselect: true
    },
    {
        name: 'cpscCourses',
        displayKey: 'coursename',
        source: courses.ttAdapter(),
        templates: {
            suggestion: suggestionTemplateGen
        }
    });
    $('input.typeahead').on("typeahead:selected",function(obj, datum, name) {
        $('input.typeahead').typeahead('val',"");
        addCourse(datum);
    });
    $('#gradCheck').click(function(){
        ga('send', 'event', 'Graduate', 'click', 'gradcheck', 1);
		checkGrad(option);
	});
    $('#generatePdf').click(function(){
        var doc = new jsPDF();

        // We'll make our own renderer to skip this editor
        var specialElementHandlers = {
            '.close': function(element, renderer){
                return true;
            }
        };

        // All units are in the set measurement for the document
        // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
        doc.fromHTML($('#accordion')[0], 15, 15, {
            'elementHandlers': specialElementHandlers
        });
        doc.save('GS2forYourRef.pdf');
        //doc.autoPrint();
        ga('send', 'event', 'Prints', 'click', 'print', 1);
        /*var printContents = document.getElementById("accordion").innerHTML;
        var originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;

        window.print();

        document.body.innerHTML = originalContents;*/
    });
    $('.option').on("click",function(){
        console.log($(this).text());
        ga('send', 'event', 'Course choice', 'click', $(this).text(), 1);
    });
    $('.reportIssue').on("click",function(){
        console.log($(this).text());
        ga('send', 'event', 'Issues', 'click', $(this).text(), -1);
    });
    $( document ).on( "click", ".alert", function() {
        removeCourse($("span",this).text());
    });
});
