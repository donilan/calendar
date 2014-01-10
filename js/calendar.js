var Calendar = function(_opts){
    var defaultOptions = {
        id: null,
        debug: true,
        weekDaynames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        tableTmpl: '<table cellpadding="0" cellspacing="0" ></table>',
        onclick: function(){}
    };
    this.options = $.extend({}, defaultOptions, _opts);
    this.data = {};
    this.cells = [];
    /* Init function*/
    this._init = function() {
        this.debug('Element id [' + this.options.id + '] begin init...');
        this.calendar = $('#'+this.options.id);
        var top = this.calendar.offset().top;
        this.calendar.html('')
            .addClass('calendar-container')
            .height($(window).height() - top);
        this._makeCalendarTop();
        this._makeMonthCells();
        this.debug('Init done.')
    }

    /**
     * Make top elemnts for calendar.
     */
    this._makeCalendarTop = function() {
        var $div = $('<div class="week-daynames"></div>');
        var $table = $(this.options.tableTmpl);
        this.calendar.append($div);
        $div.append($table);
        $tr = $('<tr></tr>');
        $table.append($tr);
        for(var i = 0; i < this.options.weekDaynames.length; ++i) {
            $tr.append('<th title="'+this.options.weekDaynames[i]+'">' +
                       this.options.weekDaynames[i] + '</th>');
        }
    }

    this._makeMonthCells = function() {
        var $eventContainer = $('<div class="event-container"></div>');
        this.calendar.append($eventContainer);
        for(var y = 0; y < 5; ++y) {
            $monthRow = $('<div class="month-row"></div>');
            $monthRow.css('top', y*20 + '%');
            $monthRow.css(y == 4? 'bottom': 'height', y == 4? '0':'21%');
            $eventContainer.append($monthRow);
            $tr = $('<tr></tr>');
            $table = $(this.options.tableTmpl).append($tr);
            $table.addClass('month-row-table');
            $monthRow.append($table);

            for(var x = 0; x < 7; ++x) {
                $tr.append('<td>&nbsp;</td>');
            }
        }
    }

    /* debug message */
    this.debug = function(msg) {
        if(this.options.debug) {
            console.log(msg);
        }
    }

    if(this.options.id)
        this._init(_opts);
    else
        this.debug('Options id cannot be null or empty.');
        
};
/* Auto fix size.*/
$(window).resize(function(){
    if($(window).height() > 300) {
        var top = $('.calendar-container').offset().top;
        $('.calendar-container').height($(window).height() - top);
    }
});
