var dialogs = require('alloy/dialogs');

function closeMe(e) {
	$.add.close();
}

function saveBook(e) {
	dialogs.confirm({message: 'Are you sure you want to save?', callback: function() {
		Alloy.Collections.book.create(
			{
				title: $.title.value,
				author: $.author.value
			},
			{
				wait: true, // Waits for a response from the server
				success: function(model, response, options) {// Custom call after a successful call.
					var message = 'Successfully created '  + response.title + ' by ' + response.author + '!';
					alert(message);
					$.title.value = $.author.value = ''; // Clear the fields
				},
				error: function(model, response, options) { // Custom callback after an unsuccessful call.
					alert(response); // Alert the user there was an error.
				}
			}
		);
	}});
}