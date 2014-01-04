// create serialize object method for jquery
$.fn.serializeObject = function()
{
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};

// timer helpers
var Timers = {
  timeAsString: function(time) {
    return Timers.twoDigits(time.getHours()) + ":" + Timers.twoDigits(time.getMinutes());
  },

  twoDigits: function(string) {
    var time = ("00" + string).split("");
    return time[time.length - 2] + time[time.length - 1];
  }
}
