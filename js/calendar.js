(function($){
    var WK_DAYNAMES = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    var TABLE = '<table cellpadding="0" cellspacing="0" style="width: 100%;" ></table>';
    var CELL_OF_MONTH = '<div class="day-cell-of-month" style="border-left: 1px solid #ccc; min-height:120px;" ></div>';
    /**
     * Make top elemnts for calendar.
     */
    function makeCalendarTop($wrapper, elments) {
        var $table = $(TABLE);
        $tr = $('<tr></tr>');
        $table.append($tr);
        for(var i = 0; i < elments.length; ++i) {
            $tr.append('<td title="'+elments[i]+'">' + elments[i] + '</td>');
        }
        $wrapper.append($table);
        return $table;
    }
    function makeMonthCells($wrapper) {
        for(var y = 0; y < 5; ++y) {
            $monthRow = $('<div class="month-row"></div>');
            $monthRow.css('top', y*20 + '%');
            $monthRow.css(y == 4? 'bottom': 'height', y == 4? '0':'21%');
            $wrapper.append($monthRow);
        }
    }
    /**
     * make a stage for month calendar.
     */
    function month(wrapper) {
        $wrapper = $(wrapper);
        $wrapper.html('');
        makeCalendarTop($wrapper, WK_DAYNAMES);
        var $eventContainer = $('<div class="event-container"></div>');
        $wrapper.append($eventContainer);
        makeMonthCells($eventContainer);
    }

    function week(wrapper) {

    }

    function day(wrapper) {

    }
    $.fn.extend({
        calendar: function(opts){
            for(var i = 0; i < this.length; ++i) {
                var $calendar = $('<div class="calendar-container"></div>');
                $(this[i]).append($calendar);
                month($calendar);
            }
        }
    });
})(jQuery);
