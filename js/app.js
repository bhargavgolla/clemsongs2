$(document).ready(function(){
    var option = "";
    var courses = new Bloodhound({
	    datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.coursename+" "+d.type); },
	    queryTokenizer: Bloodhound.tokenizers.whitespace,
        local:[
          {
            "courseid": "CPSC8700",
            "fall": "fall-all",
            "spring": "spring-none",
            "coursename": "Introduction to Biometrics",
            "description": "XYZZYSPOON!",
            "type": "Applications",
            "tokens": [
              "CPSC8700",
              "Introduction to Biometrics",
              "Applications"
            ]
          },
          {
            "courseid": "CPSC8400",
            "fall": "fall-none",
            "spring": "spring-all",
            "coursename": "Design and Analysis of Algorithms",
            "description": "XYZZYSPOON!",
            "type": "Computing Foundations",
            "tokens": [
              "CPSC8400",
              "Design and Analysis of Algorithms",
              "Computing Foundations",
              "Formal Thinking"
            ]
          },
          {
            "courseid": "CPSC8620",
            "fall": "fall-none",
            "spring": "spring-all",
            "coursename": "Database Management System Design",
            "description": "XYZZYSPOON!",
            "type": "Applications",
            "tokens": [
              "CPSC8620",
              "Database Management System Design",
              "Applications", 
              "Implementation"
            ]
          },
          {
            "courseid": "CPSC8310",
            "fall": "fall-all",
            "spring": "spring-none",
            "coursename": "Introduction to Human Centered Computing",
            "description": "XYZZYSPOON!",
            "type": "Interactive Computing",
            "tokens": [
              "CPSC8310",
              "Introduction to Human Centered Computing",
              "Interactive Computing"
            ]
          },
          {
            "courseid": "CPSC 8100",
            "fall": "fall-all",
            "spring": "spring-none",
            "coursename": "Introduction to Artificial Intelligence",
            "description": "XYZZYSPOON!",
            "type": "Applications",
            "tokens": [
              "CPSC8100",
              "Introduction to Artificial Intelligence",
              "Applications"
            ]
          },
          {
            "courseid": "CPSC 6620",
            "fall": "fall-all",
            "spring": "spring-all",
            "coursename": "Database Management Systems",
            "description": "XYZZYSPOON!",
            "type": "Applications",
            "tokens": [
              "CPSC6620",
              "Database Management Systems",
              "Applications"
            ]
          },
            {
            "courseid": "CPSC 6620",
            "fall": "fall-all",
            "spring": "spring-all",
            "coursename": "Database Management Systems",
            "description": "XYZZYSPOON!",
            "type": "Applications",
            "tokens": [
              "CPSC6620",
              "Database Management Systems",
              "Applications"
            ]
          },
          ]
    });
    courses.initialize();
	$('ul.navbar-nav>li').click(function(){
		if ($('button.navbar-toggle').is(':visible')) {
			$('div.navbar-collapse').collapse('hide');
		}
	});
    $('input.typeahead').typeahead(null, {
        name: 'cpscCourses',
        displayKey: 'coursename',
        source: courses.ttAdapter()
    });
});
