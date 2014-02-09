$(document).ready(function(){
    var option = "";
    var courses = new Bloodhound({
	    datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.courseid+" "+d.coursename+" "+d.type); },
	    queryTokenizer: Bloodhound.tokenizers.whitespace,
        local:[
          {
            "courseid": "CPSC 8700",
            "fall": "fall-all",
            "spring": "spring-none",
            "coursename": "Introduction to Biometrics",
            "description": "XYZZYSPOON!",
            "type": "Applications"
          },
          {
            "courseid": "CPSC 8400",
            "fall": "fall-none",
            "spring": "spring-all",
            "coursename": "Design and Analysis of Algorithms",
            "description": "XYZZYSPOON!",
            "type": "Computing Foundations"
          },
          {
            "courseid": "CPSC 8620",
            "fall": "fall-none",
            "spring": "spring-all",
            "coursename": "Database Management System Design",
            "description": "XYZZYSPOON!",
            "type": "Applications"
          },
          {
            "courseid": "CPSC 8310",
            "fall": "fall-all",
            "spring": "spring-none",
            "coursename": "Introduction to Human Centered Computing",
            "description": "XYZZYSPOON!",
            "type": "Interactive Computing"
          },
          {
            "courseid": "CPSC 8100",
            "fall": "fall-all",
            "spring": "spring-none",
            "coursename": "Introduction to Artificial Intelligence",
            "description": "XYZZYSPOON!",
            "type": "Applications"
          },
          {
            "courseid": "CPSC 6620",
            "fall": "fall-all",
            "spring": "spring-all",
            "coursename": "Database Management Systems",
            "description": "XYZZYSPOON!",
            "type": "Applications"
          },
            {
            "courseid": "CPSC 6620",
            "fall": "fall-all",
            "spring": "spring-all",
            "coursename": "Database Management Systems",
            "description": "XYZZYSPOON!",
            "type": "Applications"
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
    $('input.typeahead').on("typeahead:selected",function(obj, datum, name) {
        $('.typeahead').typeahead('val',"");
        console.log(datum);
    });
});
