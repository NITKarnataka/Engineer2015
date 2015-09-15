$(document).ready(function() {  
   $('.stationary img').each(function(fadeInDiv) {
     $(this).delay((fadeInDiv+1) * 500).fadeIn(500*fadeInDiv);
   });
   $('.innertext').delay(1200).fadeIn(700).fadeOut(700).fadeIn(700);
	$('.circle1,.circle2,.circle3,.circle4,.circle5,.circle6').hover(function(){
		var number = $(this).context.className.substring(6);
			$('.cool'+number).toggleClass("showtext");
	});
	
});
  