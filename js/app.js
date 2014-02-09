var option = "";
/*var courses = new Bloodhound({
	datumTokenizer: function(d) { return d.tokens; },
	queryTokenizer: Bloodhound.tokenizers.whitespace,
	prefetch: './assets/courses.json'
});
courses.initialize();*/
$(document).ready(function(){
	$('ul.navbar-nav>li').click(function(){
		if ($('button.navbar-toggle').is(':visible')) {
			$('div.navbar-collapse').collapse('hide');
		}
	});
    /*$('#courses .typeahead').typeahead(null, {
        name: 'cpscCourses',
        displayKey: 'coursename',
        source: courses.ttAdapter()
    });*/
});
