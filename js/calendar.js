(function($){
    var WK_DAYNAMES = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    var TABLE = '<table cellpadding="0" cellspacing="0" ></table>';
    /**
     * Make top elemnts for calendar.
     */
    function makeCalendarTop($wrapper, elments) {
        var $div = $('<div class="week-daynames"></div>');
        var $table = $(TABLE);
        $wrapper.append($div);
        $div.append($table);
        $tr = $('<tr></tr>');
        $table.append($tr);
        for(var i = 0; i < elments.length; ++i) {
            $tr.append('<td title="'+elments[i]+'">' + elments[i] + '</td>');
        }
        return $table;
    }
    function makeMonthCells($wrapper) {
        var $eventContainer = $('<div class="event-container"></div>');
        $wrapper.append($eventContainer);
        for(var y = 0; y < 5; ++y) {
            $monthRow = $('<div class="month-row"></div>');
            $monthRow.css('top', y*20 + '%');
            $monthRow.css(y == 4? 'bottom': 'height', y == 4? '0':'21%');
            $eventContainer.append($monthRow);
            $tr = $('<tr></tr>');
            $table = $(TABLE).append($tr);
            $table.addClass('month-row-table');
            $monthRow.append($table);
            for(var x = 0; x < 7; ++x) {
                $tr.append('<td class="month-cell">&nbsp;</td>');
            }
        }
    }
    /**
     * make a stage for month calendar.
     */
    function month(wrapper) {
        $wrapper = $(wrapper);
        $wrapper.html('');
        makeCalendarTop($wrapper, WK_DAYNAMES);
        makeMonthCells($wrapper);
    }

    function week(wrapper) {

    }

    function day(wrapper) {

    }
    $.fn.extend({
        calendar: function(opts){
            for(var i = 0; i < this.length; ++i) {
                var that = $(this[i]);
                that.addClass('calendar-container');
                month(that);
            }
        }
    });
})(jQuery);
