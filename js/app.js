$(document).ready(function(){
    var option = "";
    var courses = new Bloodhound({
	    datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.coursename+" "+d.type); },
	    queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: './assets/courses.json'
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
