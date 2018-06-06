$(document).ready(function() {
	cleanStorage();
	addEvent();
	$('#button').click(validateFields);
	$('#button').click(sendSuccessMsg);
});

var patterns = {
	name: /^[a-zA-Z\s]+$/,
	age: /^\d{1,2}$/,
	phone: /^\d{10}$/,
	email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z{2,8}])?$/,
	about: /.{20,100}/,
};

function cleanStorage() {
	localStorage.clear();
}

function addEvent() {
	$('.input').each(function() {
		setEvents($(this));
	});
}

function sendSuccessMsg() {
	if (
		JSON.parse(localStorage.name) &&
		JSON.parse(localStorage.age) &&
		JSON.parse(localStorage.phone) &&
		JSON.parse(localStorage.email) &&
		JSON.parse(localStorage.about)
	) {
		alert('Success');
	}
}

function validateButton() {
	if (
		$('#name')
			.val()
			.trim().length > 0 &&
		$('#age')
			.val()
			.trim().length > 0 &&
		$('#phone')
			.val()
			.trim().length > 0 &&
		$('#email')
			.val()
			.trim().length > 0 &&
		$('#about')
			.val()
			.trim().length > 0
	) {
		activateButton();
	} else {
		deactivateButton();
	}
}

function activateButton() {
	$('#button').removeAttr('disabled');
	$('#button').addClass('active');
}

function deactivateButton() {
	$('#button').attr('disabled', 'true');
	$('#button').removeClass('active');
}

function setEvents($item) {
	$item.keyup(validateButton);
	$item.keyup(validInput);
}

function validInput() {
	var id = $(this).attr('id');
	if (patterns[id].test(event.target.value)) {
		localStorage.setItem(id, 'true');
	} else {
		localStorage.setItem(id, 'false');
	}
}

function validateFields(event) {
	event.preventDefault();
	$('.input').each(function() {
		validateSingleField($(this));
	});
}

function validateSingleField($element) {
	$($element).css('width', '94%');
	let $item = $element.attr('id');
	cleanMsg($item);
	if (JSON.parse(localStorage[$item]) === false) {
		$('#' + $item)
			.next()
			.show();
		$('#' + $item)
			.next()
			.next()
			.show();
	} else {
		$('#' + $item)
			.next()
			.next()
			.next()
			.show();
	}
}

function cleanMsg($item) {
	$('#' + $item)
		.next()
		.hide();
	$('#' + $item)
		.next()
		.next()
		.hide();
	$('#' + $item)
		.next()
		.next()
		.next()
		.hide();
}
