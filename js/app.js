var suggestionTemplateGen = function(obj){
    return '<p class="courseId">'+obj.courseid+'<br/>'+obj.type+'</p><p class="courseName">'+obj.coursename+'</p><p class="courseDescription">'+obj.description+'</p>';
}
$(document).ready(function(){
    var option = "";
    var courses = new Bloodhound({
	    datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.courseid+" "+d.coursename+" "+d.type); },
	    queryTokenizer: Bloodhound.tokenizers.whitespace,
            prefetch: '../assets/courses.json'
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
        source: courses.ttAdapter(),
        templates: {
            suggestion: suggestionTemplateGen
        }
    });
    $('input.typeahead').on("typeahead:selected",function(obj, datum, name) {
        $('input.typeahead').typeahead('val',"");
        console.log(datum);
    });
});
