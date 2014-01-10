(function(){
    /* Auto fix size.*/
    $(window).resize(function(){
        if($(window).height() > 300) {
            var top = $('.calendar-container').offset().top;
            $('.calendar-container').height($(window).height() - top);
        }
    });

    Date.prototype.addDays = function (num) {
        var value = this.valueOf();
        value += 86400000 * num;
        this.setTime(value);
    }

    Date.prototype.addSeconds = function (num) {
        var value = this.valueOf();
        value += 1000 * num;
        this.setTime(value);
    }

    Date.prototype.addMinutes = function (num) {
        var value = this.valueOf();
        value += 60000 * num;
        this.setTime(value);
    }

    Date.prototype.addHours = function (num) {
        var value = this.valueOf();
        value += 3600000 * num;
        this.setTime(value);
    }

    Date.prototype.addMonths = function (num) {
        var value = new Date(this.valueOf());

        var mo = this.getMonth();
        var yr = this.getYear();

        mo = (mo + num) % 12;
        if (0 > mo) {
            yr += (this.getMonth() + num - mo - 12) / 12;
            mo += 12;
        }
        else
            yr += ((this.getMonth() + num - mo) / 12);

        this.setMonth(mo);
        this.setYear(yr);
    }
    
})();

var Calendar = function(_opts){
    var defaultOptions = {
        id: null,
        debug: true,
        weekDaynames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        tableTmpl: '<table cellpadding="0" cellspacing="0" ></table>',
        onclick: function(){}
    };
    this.options = $.extend({}, defaultOptions, _opts);
    this.data = [];
    this.rows = [];
    this.cell = [];
    /* Init function*/
    this._init = function() {
        this.debug('Element id [' + this.options.id + '] begin init...');
        this.calendar = $('#'+this.options.id);
        var top = this.calendar.offset().top;
        this.calendar.html('')
            .addClass('calendar-container')
            .height($(window).height() - top);

        this.eventContainer = $('<div class="event-container"></div>');
        this.calendar.append(this.eventContainer);
        this._makeCalendarTop();
        this._makeMonthBackground();
        this._refreshMonthRows();
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
    /* Make background for month rows.*/
    this._makeMonthBackground = function() {
        for(var y = 0; y < 5; ++y) {
            $monthRow = $('<div class="month-row"></div>');
            $monthRow.css('top', y*20 + '%');
            $monthRow.css(y == 4? 'bottom': 'height', y == 4? '0':'21%');
            this.eventContainer.append($monthRow);
            $tr = $('<tr></tr>');
            $table = $(this.options.tableTmpl).append($tr);
            $table.addClass('month-row-bg-table');
            $monthRow.append($table);

            $monthRowTable = $(this.options.tableTmpl);
            $monthRowTable.addClass('month-row-table');
            $monthRow.append($monthRowTable);
            this.rows[this.rows.length] = $monthRowTable;
            // TODO complete the row.
            for(var x = 0; x < 7; ++x) {
                $tr.append('<td>&nbsp;</td>');
            }
        }
    };

    this._refreshMonthRows = function(year, month) {
        now = new Date();
        if(year == undefined || month == undefined) {
            year = now.getFullYear();
            month = now.getMonth();
        }
        firstDay = new Date();
        firstDay.setFullYear(year, month, 1);
        firstDay.addDays(-firstDay.getDay());
        for(var i = 0; i < 35; ++i) {
            if(i % 7 == 0) {

            }
        }
    };
    this._addMonthCell = function(index, span, content) {

    }

    this._isToday = function(anyDate) {
        if(anyDate != undefined) {
            var now = new Date();
            var year = anyDate.getFullYear();
            var month = anyDate.getMonth();
            var day = anyDate.getDate();
            if(year == now.getFullYear() &&
               month == now.getMonth() &&
               day = now.getDate())
                return true;
        }
        return false;
    }

    this.addEvent = function(event) {
//        console.log(event);
//        console.log(new Date(event.start));
        this.data[this.data.length] = event;
    };

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
