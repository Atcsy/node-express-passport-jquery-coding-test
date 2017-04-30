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
  loadProfile: function(done) {
    $.get('/profile', function(content) {
      $('#container').html(content);
      return done();
    });
  },
  dateFormat: function(className) {
    $(className).dateFormat('MMMM Do YYYY, h:mm:ss a');
  }
};
