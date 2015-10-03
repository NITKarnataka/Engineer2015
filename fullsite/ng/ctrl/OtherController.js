Engi.controller('OtherController', function($http,$rootScope,$scope, $timeout, $location,$routeParams,$anchorScroll) {

	if($location.$$path=='/sponsors'||$location.$$path=='/team'){
		var name = $location.$$path;
		$timeout(function(){
			$('#animatedModal').scrollTop( $('#'+name.substr(1)).position().top );
		},1000);
	}

	$http.get('./json/members.json').then(function(msg){
		console.log(msg.data)
		$scope.membersList = msg.data;
		initi();
	});
	var rotateImage=	function(){		
			var lastTime = 0;
			var prefixes = 'webkit moz ms o'.split(' ');
			// get unprefixed rAF and cAF, if present
			var requestAnimationFrame = window.requestAnimationFrame;
			var cancelAnimationFrame = window.cancelAnimationFrame;
			// loop through vendor prefixes and get prefixed rAF and cAF
			var prefix;
			for( var i = 0; i < prefixes.length; i++ ) {
				if ( requestAnimationFrame && cancelAnimationFrame ) {
					break;
				}
				prefix = prefixes[i];
				requestAnimationFrame = requestAnimationFrame || window[ prefix + 'RequestAnimationFrame' ];
				cancelAnimationFrame  = cancelAnimationFrame  || window[ prefix + 'CancelAnimationFrame' ] ||
				window[ prefix + 'CancelRequestAnimationFrame' ];
			}

			// fallback to setTimeout and clearTimeout if either request/cancel is not supported
			if ( !requestAnimationFrame || !cancelAnimationFrame ) {
				requestAnimationFrame = function( callback, element ) {
					var currTime = new Date().getTime();
					var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
					var id = window.setTimeout( function() {
						callback( currTime + timeToCall );
					}, timeToCall );
					lastTime = currTime + timeToCall;
					return id;
				};

				cancelAnimationFrame = function( id ) {
					window.clearTimeout( id );
				};
			}

			function extend( a, b ) {
				for( var key in b ) { 
					if( b.hasOwnProperty( key ) ) {
						a[key] = b[key];
					}
				}
				return a;
			}

			// from http://www.quirksmode.org/js/events_properties.html#position
			function getMousePos(e) {
				var posx = 0;
				var posy = 0;
				if (!e) var e = window.event;
				if (e.pageX || e.pageY) 	{
					posx = e.pageX;
					posy = e.pageY;
				}
				else if (e.clientX || e.clientY) 	{
					posx = e.clientX + document.body.scrollLeft
						+ document.documentElement.scrollLeft;
					posy = e.clientY + document.body.scrollTop
						+ document.documentElement.scrollTop;
					console.log(e.clientX +' - '+ e.clientY)
				}
				return {
					x : posx,
					y : posy
				}
			}

			// from http://www.sberry.me/articles/javascript-event-throttling-debouncing
			function throttle(fn, delay) {
				var allowSample = true;

				return function(e) {
					if (allowSample) {
						allowSample = false;
						setTimeout(function() { allowSample = true; }, delay);
						fn(e);
					}
				};
			}

			/***************************************************************************/

			/**
			* TiltFx fn
			*/
			var wrapper_text;
			function TiltFx(el, options) {
				this.el = el;
				wrapper_text = el.parentNode.nextSibling.nextSibling;
				this.options = extend( {}, this.options );
				extend( this.options, options );
				this._init();
				this._initEvents();
			}

			/**
			* TiltFx options.
			*/
			TiltFx.prototype.options = {
				// number of extra image elements (div with background-image) to add to the DOM - min:1, max:5 (for a higher number, it's recommended to remove the transitions of .tilt__front in the stylesheet.
				extraImgs : 0,
				// the opacity value for all the image elements.
				opacity : 0.7,
				// by default the first layer does not move.
				bgfixed : false,
				// image element's movement configuration
				movement : {
					perspective : 1000, // perspective value
					translateX : 0, // a relative movement of -10px to 10px on the x-axis (setting a negative value reverses the direction)
					translateY : 0, // a relative movement of -10px to 10px on the y-axis 
					translateZ : 0, // a relative movement of -20px to 20px on the z-axis (perspective value must be set). Also, this specific translation is done when the mouse moves vertically.
					rotateX : 2, // a relative rotation of -2deg to 2deg on the x-axis (perspective value must be set)
					rotateY : 2, // a relative rotation of -2deg to 2deg on the y-axis (perspective value must be set)
					rotateZ : 0 // z-axis rotation; by default there's no rotation on the z-axis (perspective value must be set)
				}
			}

			/**
			* Initialize: build the necessary structure for the image elements and replace it with the HTML img element.
			*/
			TiltFx.prototype._init = function() {
				this.tiltWrapper = document.createElement('div');
				this.tiltWrapper.className = 'tilt';

				// main image element.
				this.tiltImgBack = document.createElement('div');
				this.tiltImgBack.className = 'tilt__back';
				this.tiltImgBack.style.backgroundImage = 'url(' + this.el.src + ')';
				this.tiltWrapper.appendChild(this.tiltImgBack);

			// image elements limit.
				if( this.options.extraImgs < 1 ) {
					this.options.extraImgs = 0;
				}
				else if( this.options.extraImgs > 5 ) {
					this.options.extraImgs = 5;
				}

				if( !this.options.movement.perspective ) {
					this.options.movement.perspective = 0;
				}

			// add the extra image elements.
				this.imgElems = [];
				for(var i = 0; i < this.options.extraImgs; ++i) {
					var el = document.createElement('div');
					el.className = 'tilt__front';
					el.style.backgroundImage = 'url(' + this.el.src + ')';
					el.style.opacity = this.options.opacity;
					this.tiltWrapper.appendChild(el);
					this.imgElems.push(el);
				}

				if( !this.options.bgfixed ) {
					this.imgElems.push(this.tiltImgBack);
					++this.options.extraImgs;
				}

			// add it to the DOM and remove original img element.
				this.el.parentNode.insertBefore(this.tiltWrapper, this.el);
				this.el.parentNode.removeChild(this.el);

				// tiltWrapper properties: width/height/left/top
				this.view = { width : this.tiltWrapper.offsetWidth, height : this.tiltWrapper.offsetHeight };
			};

			/**
			* Initialize the events on the main wrapper.
			*/
			TiltFx.prototype._initEvents = function() {
				var self = this,
				moveOpts = self.options.movement;

			// mousemove event..
				this.tiltWrapper.addEventListener('mousemove', function(ev) {
					requestAnimationFrame(function() {
						// mouse position relative to the document.
						var mousepos = getMousePos(ev),
							// document scrolls.
							docScrolls = {left : document.body.scrollLeft + document.documentElement.scrollLeft, top : document.body.scrollTop + document.documentElement.scrollTop},
							bounds = self.tiltWrapper.getBoundingClientRect(),
							// mouse position relative to the main element (tiltWrapper).
							relmousepos = {
								x : mousepos.x - bounds.left - docScrolls.left,
								y : mousepos.y - bounds.top - docScrolls.top
							};

					// configure the movement for each image element.
						for(var i = 0, len = self.imgElems.length; i < len; ++i) {
							var el = self.imgElems[i],
								rotX = moveOpts.rotateX ? 8 * ((i+1)*moveOpts.rotateX/self.options.extraImgs) / self.view.height * relmousepos.y - ((i+1)*moveOpts.rotateX/self.options.extraImgs) : 0,
								rotY = moveOpts.rotateY ? 8 * ((i+1)*moveOpts.rotateY/self.options.extraImgs) / self.view.width * relmousepos.x - ((i+1)*moveOpts.rotateY/self.options.extraImgs) : 0,
								rotZ = 0//moveOpts.rotateZ ? 2 * ((i+1)*moveOpts.rotateZ/self.options.extraImgs) / self.view.width * relmousepos.x - ((i+1)*moveOpts.rotateZ/self.options.extraImgs) : 0,
								//transX = moveOpts.translateX ? 4 * ((i+1)*moveOpts.translateX/self.options.extraImgs) / self.view.width * relmousepos.x - ((i+1)*moveOpts.translateX/self.options.extraImgs) : 0,
								//transY = moveOpts.translateY ? 4 * ((i+1)*moveOpts.translateY/self.options.extraImgs) / self.view.height * relmousepos.y - ((i+1)*moveOpts.translateY/self.options.extraImgs) : 0,
								//transZ = 0//moveOpts.translateZ ? 2 * ((i+1)*moveOpts.translateZ/self.options.extraImgs) / self.view.height * relmousepos.y - ((i+1)*moveOpts.translateZ/self.options.extraImgs) : 0;
								
							el.parentNode.parentNode.nextSibling.nextSibling.style.transform = 'rotate3d(1,0,0,' + rotX + 'deg) rotate3d(0,1,0,' + rotY + 'deg) rotate3d(0,0,1,' + rotZ + 'deg)';
							el.parentNode.parentNode.nextSibling.nextSibling.style.WebkitTransform = 'rotate3d(1,0,0,' + rotX + 'deg) rotate3d(0,1,0,' + rotY + 'deg) rotate3d(0,0,1,' + rotZ + 'deg)';
							el.parentNode.parentNode.nextSibling.nextSibling.style.transition= 'none';
							
							//console.log(el.parentNode.parentNode.nextSibling.nextSibling)
							el.style.WebkitTransform = 'rotate3d(1,0,0,' + rotX + 'deg) rotate3d(0,1,0,' + rotY + 'deg) rotate3d(0,0,1,' + rotZ + 'deg)';
							el.style.transform = 'rotate3d(1,0,0,' + rotX + 'deg) rotate3d(0,1,0,' + rotY + 'deg) rotate3d(0,0,1,' + rotZ + 'deg)';
							el.style.transition = 'none';
								
						}
					});
				});

			// reset all when mouse leaves the main wrapper.
				this.tiltWrapper.addEventListener('mouseleave', function(ev) {
						setTimeout(function() {
						for(var i = 0, len = self.imgElems.length; i < len; ++i) {
							var el = self.imgElems[i];
							
							el.parentNode.parentNode.nextSibling.nextSibling.style.WebkitTransform = 'rotate3d(1,1,1,0deg)';
							el.parentNode.parentNode.nextSibling.nextSibling.style.transform = 'rotate3d(1,1,1,0deg)';
							el.parentNode.parentNode.nextSibling.nextSibling.style.transition = 'all .8s ease';

							el.style.WebkitTransform = 'rotate3d(1,1,1,0deg)';
							el.style.transform = 'rotate3d(1,1,1,0deg)';
							el.style.transition = 'all .8s ease';
							
						}	
					}, 60);
				
				});

			// window resize
				window.addEventListener('resize', throttle(function(ev) {
					// recalculate tiltWrapper properties: width/height/left/top
						self.view = { width : self.tiltWrapper.offsetWidth, height : self.tiltWrapper.offsetHeight };
					}, 50));
			};

			function init() {
			// search for imgs with the class "tilt-effect"
				[].slice.call(document.querySelectorAll('img.tilt-effect')).forEach(function(img) {
					new TiltFx(img, JSON.parse(img.getAttribute('data-tilt-options')));
				});
			}

			init();

			window.TiltFx = TiltFx;

			/**/
		};

	$scope.show='about'
	$scope.showTab = function(name){
		$scope.show=name;
	}

	$timeout(function(){
		$scope.waitLoad = true;
	},10000);

	$scope.showMember = function(cname){
		$scope.members = [];
		if(cname=="All"){
			$scope.members = $scope.membersList;
		}else{
			for(var i=0;i<$scope.membersList.length;i++){
				if($scope.membersList[i].classie==cname)
					$scope.members.push($scope.membersList[i])
			}
		}

		/**/
		$timeout(rotateImage,500);
	};



	var initi = function(){
		$scope.showMember('core');
		$scope.waitLoad=false;
	}

	

	$scope.committee = {
		All:'All',
		core:'Core Members',
		mnp:'Publicity',
		events:'Events',
		hospi:'Hospitality',
		workshops:'workshops',
		office:'Office',
		fnr:'Food And Refreshments',
		ca:'Campus Ambassadors',
		engitalks:'EngiTalks',
		cteam:'Create Team'
	}
	

	$scope.$watch('showType',function(n,o){
		if(n!=o){
			$scope.showMember(n)
		}
	});

});
