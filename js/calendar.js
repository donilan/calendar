(function($){
    var WK_DAYNAMES = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    /**
     * make a stage for month calendar.
     */
    function month(wrapper) {
        $wrapper = $(wrapper);
        $wrapper.html('');
        for(var i = 0; i < 7; ++i) {

        }
    }

    function week(wrapper) {

    }

    function day(wrapper) {

    }
    $.fn.extend({
        calendar: function(opts){
            for(var i = 0; i < this.length; ++i) {
                var that = this[i];
                month(that);
            }
        }
    });
})(jQuery);
