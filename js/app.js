$(document).ready(function(){
	$('a.navbar-brand,ul.navbar-nav>li').click(function(){
		if ($('button.navbar-toggle').is(':visible')) {
			$('div.navbar-collapse').collapse('hide');
		}
	});
});
