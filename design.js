/**
* @description To assign a choosen background color by left clicking the cells
* @description To remove a choosen background color by right clicking the cells
* @description To draw a choosen background color with left mouse button down
*/

$('#pixel_canvas').on('mousedown','td', function(evt) {

// add or remoce the color setting of a single cell

	if( evt.which === 1 ) {
 		const pickColor = document.getElementById('colorPicker').value;
 	 	$(this).css('background-color',pickColor);
	} else if (evt.which === 3) {
 	 	$(this).css('background-color','');
	};

// draw with mouse button hold down - this will not work on a touch display

	$('td').on('mouseover mouseleave', function() {
		const pickColor = document.getElementById('colorPicker').value;
		$(this).css('background-color',pickColor);
	});
})

.on('mouseup', 'td', function() {
	$('td').off('mouseover mouseleave');

});

/**
*@description Create the grid by entereing the input values for width and height.
*@description Limit grid size in dependance of 3 screen size ranges.
*/

function makeGrid() {
	const width = $('#input_width').val();
	const height = $('#input_height').val();
	const table = $('#pixel_canvas');
	table.children().remove();

// small screen size

if ( $(window).width() > 414 && $(window).width() <= 736) {
	if ((width>30) || (height>30)) {
		alert('MAX WIDTH AND HEIGHT IS LIMITED TO 30 TO FIT CANVAS ON SCREEN');
		window.location.reload();
	} else {
		let i = 1;
			while (i <= height) {
			table.append( '<tr></tr>' );
				for (let i = 1; i <= width; i++) {
			  	table.children().last().append('<td></td>');
			    };
			i++;
		};
	};

// medium screen size

} else if ( $(window).width() > 737 && $(window).width() <= 1024){
	if ((width>70) || (height>70)) {
		alert('MAX WIDTH AND HEIGHT IS LIMITED TO 70 TO PREVENT BROWSER CRASH');
		window.location.reload();
	} else {
		let i = 1;
			while (i <= height) {
			table.append( '<tr></tr>' );
				for (let i = 1; i <= width; i++) {
			  	table.children().last().append('<td></td>');
			    };
			i++;
		};
	};

// large screen size

} else if ( $(window).width() > 1025 ){
	if ((width>100) || (height>100)) {
		alert('MAX WIDTH AND HEIGHT IS LIMITED TO 100 TO PREVENT BROWSER CRASH');
		window.location.reload();
	} else {
		let i = 1;
			while (i <= height) {
			table.append( '<tr></tr>' );
 				for (let i = 1; i <= width; i++) {
					table.children().last().append('<td></td>');
					};
				i++;
		};
	};

// screen size too small

	} else {
		alert('OUT OF BOUNDS')
	};

};

/**
*@description Disable the context menu inorder to make smooth 'right-click' possible.
*/

function disableMenu() {
	document.oncontextmenu = function() {
		return false;
	}
}

/**
*@description Refresh the whole page.
*/

$('#btn_reload').click(function() {
    	 location.reload();
	});

/**
*@description Refresh the canvas only.
*/

function clear() {
	if($('#btn_clear').length > 0 ) {
 		return;
 	} else {
 	$('#colorDiv').append('<button type= "submit" id="btn_clear" class="btn"> Clear Canvas</button>');
 	$('#btn_clear').on('click', function() {
 	$('td').css('background-color','');
		});
	};
}

/**
*@description Required call back functions in order to proceed when the 'Submit' button is triggered.
*/

document.getElementById("btn_submit").addEventListener("click",function(event) {
	event.preventDefault();
	makeGrid();
	clear();
	disableMenu();
	$('#btn_submit').hide('slow');
	$('.container').show('fast');
});
