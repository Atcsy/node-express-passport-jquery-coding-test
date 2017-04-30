function App() {
  var self = this;

  $(document).ready(function() {
    var applyDateFormat = function() {
      self.dateFormat('.dateFormat');
    };

    self.loadProfile(applyDateFormat);
  });
}

App.prototype = {
  loadProfile(done) {
    $.get('/profile', function(content) {
      $('#container').html(content);
      return done();
    });
  },
  dateFormat(className) {
    $(className).dateFormat('MMMM Do YYYY, h:mm:ss a');
  }
};
