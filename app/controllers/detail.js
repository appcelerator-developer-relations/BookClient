var args = arguments[0] || {};
	book = args.toJSON(),
	model = args,
	dialogs = require('alloy/dialogs');

$.author.value = book.author || 'No author';
$.title.value = book.title || 'No title';

function closeMe(e) {
	$.detail.close();
}

function updateBook(e) {
	dialogs.confirm({message: 'Are you sure you want to make changes?', callback: function() {
		model.save({title: $.title.value, author: $.author.value});
	}});
}

function deleteBook(e) {
	dialogs.confirm({message: 'Are you sure you want to delete this book?', callback: function() {
		model.destroy({
			wait: true, // Waits for a response from the server
			success: function(mod, response, options) { // Custom callback after a successful call.
				$.detail.close(); // Close the window
			},
			error: function(mod, response, options) { // Custom callback after an unsuccessful call.
				alert(response); // Alert the user there was an error.
			}
		});
	}});
}
