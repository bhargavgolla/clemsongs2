var suggestionTemplateGen = function(obj){
    return '<p class="courseId">'+obj.courseid+'<br/>'+obj.type+'</p><p class="courseName">'+obj.coursename+'</p><p class="courseDescription">'+obj.description+'</p>';
}
var addedCourses = [];
var addedCourseDatums = [];
var addCourse = function(datum) {
    console.log(datum);
    if (addedCourses.indexOf(datum.courseid) == -1) {
        addedCourses.push(datum.courseid);
        addedCourseDatums.push(datum);
        var course = '<div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong>'+datum.courseid+':'+datum.coursename+'</strong></div>';
        $('#conc'+datum.type+' div.panel-body').append(course);
        $('#conc'+datum.type).collapse('show');
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
        addCourse(datum);
    });
});
