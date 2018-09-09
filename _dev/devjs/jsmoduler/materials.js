var $ = require("jquery");

module.exports = {      
    init:  function(){

        $(document).ready(function () {
            //init DateTimePickers
            materialKit.initFormExtendedDatetimepickers();

            // Sliders Init
            materialKit.initSliders();

            
            function scrollToDownload() {
                if ($('.section-download').length != 0) {
                    $("html, body").animate({
                        scrollTop: $('.section-download').offset().top
                    }, 1000);
                }
            }




        });
        }
}