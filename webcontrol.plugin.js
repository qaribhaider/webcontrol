//Pluginn
(function ($) {
    $._webControlObject = {
        defaults: {
            events: {},
            info_div_class: 'nwc-modal',
            info_div_inner_class: 'info',
            info_div_bg: '#EEE',
            onfinishloading: function () {
            }
        },
        init: function (options) {
            this.opts = $.extend({}, this.defaults, options);
        },
        init_info_div: function () {
            var infoDivClass = this.opts.info_div_class,
                    msgDivClass = this.opts.info_div_inner_class;
            var infoDiv = $("<div />")
                    .addClass(infoDivClass)
                    .css({
                        "position": "fixed",
                        "bottom": "10px",
                        "right": "10px",
                        "z-index": "10000",
                        "background": this.opts.info_div_bg,
                        "padding": "20px",
                        "font-size": "16px"
                    });
            var msgDiv = $("<div />")
                    .addClass(msgDivClass);
            infoDiv.html(msgDiv).hide();
            $("body").append(infoDiv);
        },
        init_info_div_show: function (html) {
            $('.' + this.opts.info_div_class)
                    .show()
                    .find('.' + this.opts.info_div_inner_class)
                    .html(html);
        },
        init_socket: function () {
            this.socket = io.connect('http://52.24.242.157:80');
        },
        init_socket_handlers: function () {
            // Used proxy to get correct scope of `this`
            this.socket.on('clientid', $.proxy(function (data) {
                var link = 'control.php?c=' + data.id;
                var link_elem = '<a href="' + link + '" target="_blank">' + data.id + '</a>';
                this.init_info_div_show("Your id is : " + link_elem);
            }, this));
            this.socket.on('message', $.proxy(function (data) {
                var response = data.message,
                        action = response.action,
                        val = response.val;

                if (typeof this.opts.events[action] === 'function') {
                    this.opts.events[action](val);
                }
            }, this));
        },
        init_socket_handlers_client: function () {

        },
        show: function (options) {
            this.init(options);
            this.init_info_div();
            this.init_socket();
            this.init_socket_handlers();

            if (typeof this.onfinishloading === 'function') { // make sure the callback is a function
                this.opts.onfinishloading.call(this); // brings the scope to the callback
            }
        },
        init_client: function (client_id) {
            this.init_socket();
            var $that = this;
            $(".nwc-trigger").click(function (e) {
                e.preventDefault();
                var msg = {'action': $(this).attr("nwc-action"), 'val': $(this).attr("nwc-value")};
                $that.socket.emit('message', {message: msg, client: client_id});
                return false;
            });
        }
    };
}(jQuery));

//Helper  
var webControl = function (options) {
    $._webControlObject.show(options);
};
var webControlClient = function (client_id) {
    $._webControlObject.init_client(client_id);
};
