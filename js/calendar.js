(function($){
    var defaultOptions = {
        weekDaynames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        tableTmpl: '<table cellpadding="0" cellspacing="0" ></table>',
        onclick: function(){}
    };
    $.fn.calendar = function(options) {
        options = $.extend({}, defaultOptions, options)
        this.each(function(){
            var $that = $(this);
            $that.addClass('calendar-container');
            $that.height($(window).height());
            var $cal = calendar($that, options);
        });
    };

    $(window).resize(function(){
        if($(window).height() > 300)
            $('.calendar-container').height($(window).height());
    });

    /**
     * Make top elemnts for calendar.
     */
    function makeCalendarTop($wrapper, opts) {
        var $div = $('<div class="week-daynames"></div>');
        var $table = $(opts.tableTmpl);
        $wrapper.append($div);
        $div.append($table);
        $tr = $('<tr></tr>');
        $table.append($tr);
        for(var i = 0; i < opts.weekDaynames.length; ++i) {
            $tr.append('<th title="'+opts.weekDaynames[i]+'">' +
                       opts.weekDaynames[i] + '</th>');
        }
        return $table;
    }
    function makeMonthCells($wrapper, opts) {
        var $eventContainer = $('<div class="event-container"></div>');
        $wrapper.append($eventContainer);
        for(var y = 0; y < 5; ++y) {
            $monthRow = $('<div class="month-row"></div>');
            $monthRow.css('top', y*20 + '%');
            $monthRow.css(y == 4? 'bottom': 'height', y == 4? '0':'21%');
            $eventContainer.append($monthRow);
            $tr = $('<tr></tr>');
            $table = $(opts.tableTmpl).append($tr);
            $table.addClass('month-row-table');
            $monthRow.append($table);

            for(var x = 0; x < 7; ++x) {
                $tr.append('<td>&nbsp;</td>');
            }
        }
        return [];
    }
    /**
     * make a stage for month calendar.
     */
    function calendar(calendarEl, opts) {
        $cal = $(calendarEl);
        $cal.html('');
        $cal.daynamesTable = makeCalendarTop($cal, opts);
        $cal.cells = makeMonthCells($cal, opts);
        return $cal;
    }
})(jQuery);
