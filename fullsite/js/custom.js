$(document).ready(function() {
function checkForChanges()
{
    if($('div.pace').hasClass('pace-inactive')){
	   $('.stationary img').each(function(fadeInDiv) {
	   	if(fadeInDiv==1)
	   		$(this).delay(0).fadeIn(0);
	   	else
    		$(this).delay((fadeInDiv+1) * 500).fadeIn(500*fadeInDiv);
	   });
	   $('.innertext').delay(1200).fadeIn(700).fadeOut(700).fadeIn(700);
	}
    else
        setTimeout(checkForChanges, 100);
}
$(checkForChanges);
$('.circle1,.circle2,.circle3,.circle4,.circle5,.circle6').hover(function(){
	var number = $(this).context.className.substring(6);
		$('.cool'+number).toggleClass("showtext");
});
/*plugin paceloader hack*/
function PaceLoaderHack(){
    if($('body').hasClass('pace-done')){
	   $('.pace-progress:before').style('display','none','important');
	   $('.pace-progress').style('display','none','important')
	   $('.pace-activity').style('display','none','important')
	   $('.pace-activity::after').style('display','none','important')
	   $('.pace-activity::before').style('display','none','important');
	   $('.pace').style('display','none','important')
	   $('.pace').style('display','none','important')
	   $('.pace-running').style('display','none','important')

	}
    else
        setTimeout(PaceLoaderHack, 100);
}
$(PaceLoaderHack);
	
});