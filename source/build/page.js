var modal = {
	_cacheDom: function() {
		this.$modal = $('.modal');
		this.$modal__body = this.$modal.find('.modal__body');
		this.$modal__cancel = this.$modal.find('.modal__cancel');
		this.$modal__submit = this.$modal.find('.modal__submit');
	},
	_events: function() {
		var _this = this;
		this.$modal__cancel.on('click',this.close.bind(this));
	},
	modalBodyRender: function() {
		this.$modal__body.html(this.obj.modal__html);
		this.$modal__submit.on('click',this.obj.submit)
	},
	open: function(obj) {
		if (obj) {
			this.obj = obj;
		} else {
			console.log('need for spee... params!');
			return false;
		}
		this.modalBodyRender();
		this.$modal.addClass('modal_open');
		console.log('modal opened');
	},
	close: function() {
		this.$modal.removeClass('modal_open');
		this.obj.close();
		this.$modal__body.html('');
		this.$modal__submit.off('click');
		this.obj = null;
	},
	init: function() {
		this._cacheDom();
		this._events();
	}
}

var link = {
	modal__html: $('<input class="modal_href" type="text" placeholder="href"><br><input  class="modal_text" type="text" placeholder="text"><br><input  class="modal_alt" type="text" placeholder="alt">'),
	submit: function() {
		var href = $('.modal_href').val();
		var text = $('.modal_text').val();
		var alt = $('.modal_alt').val();

		if (href[0] === '#') {
			console.log('якорь!');
		}
		this.html = $('<a href="' + href + '" alt="'+alt+'">' + text + '</a>');
		this.md = '['+text+']('+href+' "'+alt+'")';

		$('.wrapper__body').append(this.html);
	},
	close: function() {
		$('.modal_href').val('');
		$('.modal_text').val('');
		$('.modal_alt').val('');
	}
};
var h$ = {
	modal__html: $('<input class="modal_h_text" type="text" placeholder="text"><br><select class="modal_h"><option selected="selected" value="1">H1</option><option value="2">H2</option><option value="3">H3</option><option value="4">H4</option><option value="5">H5</option><option value="6">H6</option></select>'),
	submit: function() {
		var text = $('.modal_h_text').val();
		var h$ = $('.modal_h').val();
		var x = '';
		for (var i = 0; i < +h$; i++) {
			x+='#';
		}

		this.html = $('<h'+h$+'>'+text+'</h'+h$+'>');
		this.md = x+' '+text+'\n';
		$('.wrapper__body').append(this.html);
	},
	close: function() {
		$('.modal_h_text').val('');
		$('.modal_h').val('');
	},
};
$(function() {
	modal.init();
	$('.add__h').on('click', function() {
		modal.open(h$);
	});
	$('.add__link').on('click', function() {
		modal.open(link);
	});
});
