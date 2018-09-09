/**
 * Startpunkt för kulturkatalogen väst Javascript
 * Plats: app.js    
 * @name app.js
 * @module app_js
 */
var appsettingsobject = require("./jsmoduler/appSettings.js");
var materializeJS = require("./jsmoduler/materials.js");


var appsetting = appsettingsobject.config;
/**
 * funkar denna!!.
 * @param {number} input any number
 * @returns {number} information om allt.
 */
$(function () {
    
    //////// History handler
    //// ta hand om querystring parametrar och lagra dom i ett jsonobject urlparam.
    var urlParams = {};
   
    var checkparamsinurl = function () {
        var match,
            pl = /\+/g,  // Regex for replacing addition symbol with a space
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
            query = window.location.search.substring(1);

        urlParams = {};
        while (match = search.exec(query))
            urlParams[decode(match[1])] = decode(match[2]);

        if (!urlParams.tab) {
            var sPageURL = window.location.href.split('/');
            var index = sPageURL.indexOf("addarrtab");
            if (index > 0) {
                urlParams.tab = sPageURL[index + 1];
            };
            var index = sPageURL.indexOf("addarrtab");
            if (index > 0) {
                urlParams.id = sPageURL[index + 1];
            };
            var index = sPageURL.indexOf("id");
            if (index > 0) {
                urlParams.arrid = sPageURL[index + 1];
            };
        }
    };
    checkparamsinurl();
    //////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // START rangesliders för arrangemangformuläret-----------------------------------------------------------------------------
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
    
    //audioplayer.initaudioplayer();

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // STOPP rangesliders för arrangemangformuläret-----------------------------------------------------------------------------
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

   
   // $("#mainapp").attr('style','background:#fff;').html("funkar! eller");    
    //alert('Foundation Core Version: ' + appsettings.config.globalconfig.dnnURL);
   
    //msg.testar("ja du det funkar tror jag det " + appsettings.config.templatedata);

    appsetting.userinfo.userid = $('.kk_aj_CurrentUserid').html();
    appsetting.userinfo.rollid = $('.kk_aj_CurrentRollid').html();
    appsetting.currentpage = $('.kk_aj_CurrentPageType').html();

    ////----------------------------------------------------------------------------
    ////----------------------------------------------------------------------------
    ////----------------------------------------------------------------------------      
    var scrolltotop = function () {
   
        $(window).scroll(function () {
            if ($(this).scrollTop() > 250) {
                $('#myBtn').fadeIn('slow');
            } else {
                $('#myBtn').fadeOut('slow');
            }
        });
        $('#myBtn').click(function () {
            $("html, body").animate({ scrollTop: 0 }, 500);
            //$("html, body").scrollTop(0); //For without animation
            return false;
        });

    }
    ////----------------------------------------------------------------------------
    ////----------------------------------------------------------------------------
    ////----------------------------------------------------------------------------

    var init = function (val, callback) {
        
        materializeJS.init;
      

        scrolltotop();
       
    }

    
    init()

    
    
});
 
