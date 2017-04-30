(function($) {
  $.fn.dateFormat = function(format) {
    this.each(function() {

      var formatted = moment($(this).html()).format(format);
      $(this).html(formatted);

    });
    return this;
  }
})(jQuery);