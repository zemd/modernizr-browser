/**
 * Copyright 2012 Dmitry Zelenetskiy
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview Test browser vendor, version and os
 *
 * (1) version is for Opera because its ua formatted like Opera/9.80
 */
(function (global) {
    'use strict';

    var Modernizr = global.Modernizr,
        navigator = global.navigator,
        userAgent = (global.userAgent || navigator.userAgent).toLowerCase(),
        browser = {},
        version = browser.version = (userAgent.match(new RegExp(".*(?:rv|chrome|webkit|version|ie)[\/: ](.+?)([ \\);]|$)")) || [])[1], /* 1 */
        isMobile = false,
        platformName,
        document = global.document,
        docElement = document.documentElement;

    Modernizr.addTest('mobile', function () {
        var isIphone = new RegExp("iphone").test(userAgent),
            isIpad = new RegExp("ipad").test(userAgent),
            isIpod = new RegExp("ipod").test(userAgent),
            isAndroid = new RegExp("android").test(userAgent),
            isMobileSafari = new RegExp("apple.*mobile.*safari").test(userAgent);

        isMobile = isMobileSafari &&
            (isIphone ||
                isIpad ||
                isIpod ||
                isAndroid);

        if (!isMobile) {
            return false;
        }

        Modernizr.addTest('iphone', function () {
            return isIphone;
        });
        Modernizr.addTest('ipod', function () {
            return isIpod;
        });
        Modernizr.addTest('ipad', function () {
            return isIpad;
        });
        Modernizr.addTest('android', function () {
            return isAndroid;
        });

        return isMobile;
    });

    Modernizr.addTest('desktop', function () {
        if (Modernizr.isMobile) {
            return false;
        }

        Modernizr.addTest('ie', function () {
            if (navigator.appName === 'Microsoft Internet Explorer') {
                var re = new RegExp("(MSIE|msie) ([0-9]{1,}[\\.0-9]{0,})");
                /*jslint eqeq: true */
                /*jshint eqnull: true */
                if (re.exec(userAgent) != null) {
                    docElement.className += ' ie' + parseFloat(RegExp.$2);
                }
                return true;
            } else if (navigator.userAgent.match(/\s+Trident\/(\d+)\./)) {
                re = /\s+rv:(\d+\.\d+)/;
                /*jslint eqeq: true */
                /*jshint eqnull: true */
                if (re.exec(userAgent) != null) {
                    docElement.className += ' ie' + parseFloat(RegExp.$1);
                }
                return true;
            }
            return false;
        });

        Modernizr.addTest('firefox', function () {
            return new RegExp("mozilla").test(userAgent) && !new RegExp("(compatible|webkit|msie)").test(userAgent);
        });

        Modernizr.addTest('webkit', function () {
            return new RegExp("webkit").test(userAgent);
        });

        Modernizr.addTest('chrome', function () {
            return new RegExp("chrome").test(userAgent);
        });

        Modernizr.addTest('opera', function () {
            return new RegExp("opera").test(userAgent);
        });
        return true;
    });

    platformName = new RegExp("windows").test(userAgent) ? 'windows' :
        new RegExp("macintosh").test(userAgent) || (new RegExp("mac os x").test(userAgent) && !new RegExp("like mac os x").test(userAgent)) ? 'macos' :
            new RegExp("(linux | x11)").test(userAgent) ? 'linux' :
                false;

    if (platformName) {
        Modernizr.addTest(platformName, function () {
            return true;
        });
    }

}(this));

