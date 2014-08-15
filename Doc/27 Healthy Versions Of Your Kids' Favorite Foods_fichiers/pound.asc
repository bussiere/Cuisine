
var Base64 = {
    _Rixits : "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/",
    fromNumber : function(number) {
        if (isNaN(Number(number)) || number === null ||
            number === Number.POSITIVE_INFINITY)
            throw "The input is not valid";
        if (number < 0)
            throw "Can't represent negative numbers now";

        var rixit; 
        var residual = Math.floor(number);
        var result = '';
        while (true) {
            rixit = residual % 64
            result = this._Rixits.charAt(rixit) + result;
            residual = Math.floor(residual / 64);

            if (residual == 0)
                break;
            }
        return result;
    },

    toNumber : function(rixits) {
        var result = 0;
        rixits = rixits.split('');
        for (e in rixits) {
            result = (result * 64) + this._Rixits.indexOf(rixits[e]);
        }
        return result;
    },
  // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode : function (input) {
        if (typeof input == 'undefined' || input == null){
            input = '';
        }
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode : function (input) {
        if (typeof input == 'undefined' || input == null){
            return '';
        }
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utftext.length ) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }
}

/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/

var CryptoJS=CryptoJS||function(h,r){var k={},l=k.lib={},n=function(){},f=l.Base={extend:function(a){n.prototype=this;var b=new n;a&&b.mixIn(a);b.hasOwnProperty("init")||(b.init=function(){b.$super.init.apply(this,arguments)});b.init.prototype=b;b.$super=this;return b},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var b in a)a.hasOwnProperty(b)&&(this[b]=a[b]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
j=l.WordArray=f.extend({init:function(a,b){a=this.words=a||[];this.sigBytes=b!=r?b:4*a.length},toString:function(a){return(a||s).stringify(this)},concat:function(a){var b=this.words,d=a.words,c=this.sigBytes;a=a.sigBytes;this.clamp();if(c%4)for(var e=0;e<a;e++)b[c+e>>>2]|=(d[e>>>2]>>>24-8*(e%4)&255)<<24-8*((c+e)%4);else if(65535<d.length)for(e=0;e<a;e+=4)b[c+e>>>2]=d[e>>>2];else b.push.apply(b,d);this.sigBytes+=a;return this},clamp:function(){var a=this.words,b=this.sigBytes;a[b>>>2]&=4294967295<<
32-8*(b%4);a.length=h.ceil(b/4)},clone:function(){var a=f.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var b=[],d=0;d<a;d+=4)b.push(4294967296*h.random()|0);return new j.init(b,a)}}),m=k.enc={},s=m.Hex={stringify:function(a){var b=a.words;a=a.sigBytes;for(var d=[],c=0;c<a;c++){var e=b[c>>>2]>>>24-8*(c%4)&255;d.push((e>>>4).toString(16));d.push((e&15).toString(16))}return d.join("")},parse:function(a){for(var b=a.length,d=[],c=0;c<b;c+=2)d[c>>>3]|=parseInt(a.substr(c,
2),16)<<24-4*(c%8);return new j.init(d,b/2)}},p=m.Latin1={stringify:function(a){var b=a.words;a=a.sigBytes;for(var d=[],c=0;c<a;c++)d.push(String.fromCharCode(b[c>>>2]>>>24-8*(c%4)&255));return d.join("")},parse:function(a){for(var b=a.length,d=[],c=0;c<b;c++)d[c>>>2]|=(a.charCodeAt(c)&255)<<24-8*(c%4);return new j.init(d,b)}},t=m.Utf8={stringify:function(a){try{return decodeURIComponent(escape(p.stringify(a)))}catch(b){throw Error("Malformed UTF-8 data");}},parse:function(a){return p.parse(unescape(encodeURIComponent(a)))}},
q=l.BufferedBlockAlgorithm=f.extend({reset:function(){this._data=new j.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=t.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var b=this._data,d=b.words,c=b.sigBytes,e=this.blockSize,f=c/(4*e),f=a?h.ceil(f):h.max((f|0)-this._minBufferSize,0);a=f*e;c=h.min(4*a,c);if(a){for(var g=0;g<a;g+=e)this._doProcessBlock(d,g);g=d.splice(0,a);b.sigBytes-=c}return new j.init(g,c)},clone:function(){var a=f.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});l.Hasher=q.extend({cfg:f.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){q.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,d){return(new a.init(d)).finalize(b)}},_createHmacHelper:function(a){return function(b,d){return(new u.HMAC.init(a,
d)).finalize(b)}}});var u=k.algo={};return k}(Math);

(function(){var h=CryptoJS,j=h.lib.WordArray;h.enc.Base64={stringify:function(b){var e=b.words,f=b.sigBytes,c=this._map;b.clamp();b=[];for(var a=0;a<f;a+=3)for(var d=(e[a>>>2]>>>24-8*(a%4)&255)<<16|(e[a+1>>>2]>>>24-8*((a+1)%4)&255)<<8|e[a+2>>>2]>>>24-8*((a+2)%4)&255,g=0;4>g&&a+0.75*g<f;g++)b.push(c.charAt(d>>>6*(3-g)&63));if(e=c.charAt(64))for(;b.length%4;)b.push(e);return b.join("")},parse:function(b){var e=b.length,f=this._map,c=f.charAt(64);c&&(c=b.indexOf(c),-1!=c&&(e=c));for(var c=[],a=0,d=0;d<
e;d++)if(d%4){var g=f.indexOf(b.charAt(d-1))<<2*(d%4),h=f.indexOf(b.charAt(d))>>>6-2*(d%4);c[a>>>2]|=(g|h)<<24-8*(a%4);a++}return j.create(c,a)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();


if (typeof pound == 'undefined'){
	var pound = {};	
}
pound.VERSION = '1.0';
pound.ENV = 'dev';
pound.URL = 'http://dev.pound.buzzfeed.com/';
pound.VERTICAL = 'default';
pound.BUZZID = undefined;
pound.BUZZ_NAME = undefined;
pound.TIMESTAMP = 1380000000;

if (typeof pound.LOGGED_IN_ONLY == 'undefined'){
	pound.LOGGED_IN_ONLY = true;
} 
if (typeof pound.VERIFY_IDENTITIES == 'undefined'){
	pound.VERIFY_IDENTITIES = false;
}
if (typeof Date != 'undefined'){
	pound.TIMESTAMP = (new Date()).getTime(); // The current time
} else if (typeof Math != 'undefined' && typeof Math.random != 'undefined'){
	pound.TIMESTAMP = Math.random(); 
} else {
	pound.TIMESTAMP = 0;
}
if (typeof pound.SOCIAL_COUNTS == 'undefined'){
  pound.SOCIAL_COUNTS = { 
    "facebook_shares": 0, 
    "twitter_shares": 0 
  };
}
var bf_static_was_undefined = false;

if(typeof BF_STATIC != 'undefined'){
	pound.ENV = BF_STATIC['bf_env'] ? BF_STATIC['bf_env'] : 'dev';

	if (pound.ENV == 'dev'){
		pound.URL = 'http://dev.pound.buzzfeed.com/';
	} else if (pound.ENV == 'stage'){
		pound.URL = 'http://pound.stage.buzzfeed.com/';
	} else if (pound.ENV == 'live'){
		pound.URL = 'http://pound.buzzfeed.com/';
	} else {
		pound.URL = 'http://dev.pound.buzzfeed.com/';
	}
	
	pound.VERTICAL = BF_STATIC['vertical'] || 'default';
	pound.BUZZID = BF_STATIC['campaignid'];
	pound.BUZZ_NAME = BF_STATIC['buzz_name'];
  pound.TIMESTAMP = BF_STATIC['generated_timestamp']; // The current time w/ milliseconds
} else {
	bf_static_was_undefined = true;
}

pound.XHR_URL = pound.URL + 'pixel';

if (typeof pound.VERIFY_IDENTITIES == 'undefined'){ // This will already be set for testing. Don't override test settings.
	pound.VERIFY_IDENTITIES = false;
}

pound.FONTS = ['Andale Mono', 'Arial Black', 'Arnoldboecklin', 'Avantgarde', 
             'Blippo', 'Book Antiqua', 'Brushstroke', 'Charcoal', 'Comic Sans', 
             'Comic Sans MS', 'Coronetscript', 'Courier', 'Courier New', 
             'Fixed', 'Florence', 'Gadget', 'Geneva', 'Georgia', 'Gill Sans', 
             'Helvetica', 'Helvetica Narrow', 'Impact', 'Lucida Console', 
             'Lucida Grande', 'Lucida Sans Unicode', 'Lucidatypewriter', 
             'MS Sans Serif', 'MS Serif', 'Monaco', 'New Century Schoolbook', 
             'New York', 'Oldtown', 'Palatino', 'Palatino Linotype', 
             'Parkavenue', 'Symbol', 'Tahoma', 'Times', 'Times New Roman', 
             'Trebuchet MS', 'Verdana', 'Webdings', 'Zapf Chancery', 'cursive', 
             'fantasy', 'monospace', 'sans-serif', 'serif'];

pound.ACTIVEX_PLUGINS = ['AOL Toolbar', 'Activeweave', 'Advanced searchbar', 
			 'Affine', 'AhnLab SiteGuard', 'Alexa Toolbar', 
			 'Altavista toolbar', 'Bing Bar', 'Browser toolbar', 
			 'Data Toolbar', 'DeeperWeb', 'DoNotTrackMe', 
			 'Earthlink toolbar', 'FeedsPlus', 'Fiddler', 
			 'GeoSurf', 'Ghostery', 'Gofor-It Internet Explorer', 
			 'Google Toolbar', 'IE Ad-dons', 
			 'IE Developer toolbar', 'IE7pro', 'IMacros', 
			 'LastPass Password Manager', 'LuckyTabSave', 
			 'MSFeedIcon', 'Microsoft Internet Mail and News', 
			 'Microsoft NetMeeting', 'Mitto Password Manager', 
			 'Mouse Gestures for Internet Explorer', 
			 'Offer Assistant', 'Outlook Express', 'Quero', 
			 'SafeWallet Password Manager', 'Simple Adblock', 
			 'Speckle', 'SpoofStick', 'Stickis', 
			 'Streaming Internet Radio Toolbar', 'Surf Canyon', 
			 'Turn Off the Lights', 'Vivisimo MiniBar', 
			 'WOT Services', 'WebNotes', 'Windows Address Book', 
			 'Windows Live Toolbar', 'Windows Messaging', 
			 'Xmarks Sync', 'Xupiter', 'Yahoo! Axis', 
			 'Yahoo! Toolbar', 'Yolink', 'Zemanta'];


if (typeof pound == 'undefined'){
	var pound = {};
}
if (typeof pound.lib == 'undefined'){
	pound.lib = {};
}
if (typeof Base64 == 'undefined'){
    var Base64 = {
        encode: function(a){
            return encodeURIComponent(a);
        },
        decode: function(a){
            return decodeURIComponent(a);
        }
    };
}

pound.lib.decodeCascadeString = function(cascade_string){
    if (!cascade_string || cascade_string == 'undefined'){
        return {};
    }
    var decoded = Base64.decode(unescape(cascade_string));
    if(decoded && decoded.length > 0 && decoded[0] == '?'){
        decoded = decoded.substr(1, decoded.length);
    }
    var parsed  = pound.lib.parseQueryString(decoded, '/');

    // Now validate. If there is an error we'll most often have a key that is not t, o, or v; or we'll have a value set to undefined.
    for(var key in parsed){
        if (parsed.hasOwnProperty(key)){
            var typ = (typeof parsed[key]).toLowerCase();
            if(typ != 'string' && typ != 'object'){ // The only valid types.
                return {}; 
            }
            if(key != 't' && key != 'o' && key != 'v' && key != 'b' && key != 'u'){
                return {};
            }
        }
    }
    return parsed; 
};

pound.lib.encodeCascadeObject = function(cascade_object){
    return Base64.encode(pound.lib.createQueryString(cascade_object, '/'));
};

/**
 * Sets a cookie from a key, value, expiry, and path.
 * 
 * @param {String} key The key to fetch the cookie by in the future.
 * @param {String} value The value the key should correspond to
 * @param {String} expiry The UTC formatted string of the expiry date/time.
 * @param {String} path The path over which the cookie is valid.
 * @returns {String} The string representation of the cookie.
 */
pound.lib.setCookie = function(key, value, expiry, path){
	var equalities = [];
	var pairs = [[key, escape(value)], ["expires", expiry], ["path", path]];
	var i, pair;
	for (i=0; i<pairs.length; i++){
		pair = pairs[i];
		equalities.push(pair.join("="));
	}
	var ck = (equalities.join("; ") + ";");
	document.cookie = ck;
	return ck;
};	

/**
 * Gets a cookie by a given name.
 * 
 * @param {String} key The key for the cookie to return.
 * @returns {String} The cookie (value) as a string.
 */
pound.lib.getCookie = function(key){
	var start = document.cookie.indexOf(key+'=');
	var end = document.cookie.indexOf(';', start);
	if (end < 0){
		end = document.cookie.length;
	}
	var kv_pair = document.cookie.slice(start, end).split('=');

	return kv_pair[1];
};

/**
 * Expires a cookie by name.
 * 
 * @params {String} key The name of the cookie to expire.
 */
pound.lib.expireCookie = function(key){
	var exdate = new Date();
	exdate.setDate(exdate.getDate() - 60); 
    
	pound.lib.setCookie(key, '', exdate.toUTCString(), '/');
	pound.lib.setCookie(key, '', exdate.toUTCString(), '');
};

/**
 * Creates a query string from a js object; params.
 * 
 * @param {String} params
 * @returns {String}
 */
pound.lib.createQueryString = function(params, delimiter) {
	var query_string = [];
	var value;

    if (typeof delimiter == 'undefined'){
        delimiter = '&';
    }
	
	if (params === null || params === undefined){
		return '';
	}
	if (params === {}){
		return '?';
	}
	for ( var key in params ) {
		if (params.hasOwnProperty(key)){
			value = params[key];
			if (value === null){
				value = '';
			}
			if (value === undefined){
				continue;
			} else {
				query_string.push(key + "=" + value);					
			}
		}
	}
	return "?" + (query_string.join(delimiter));
};

/**
 * Parses a query string into a javascript object.
 * 
 * @param {String} qs
 * @returns {Object}
 */
pound.lib.parseQueryString = function(qs, delimiter){
	if (qs == '' || qs == undefined || qs == null){
		return {};
	}
    if (typeof delimiter == 'undefined'){
        delimiter = '&';
    }
	var params = qs.split(delimiter);
	var pair;
	var obj = {};
	for (var i=0; i<params.length; i++){
		pair = params[i].split('=');
		if (pair[1] == ''){
			pair[1] = null;
		}
		obj[pair[0]] = pair[1];
	}
	return obj;
};


/**
 * Returns the subbuzz_id given any child node of the subbuzz in an existing DOM.
 *
 * @param {HTMLElement} node
 * 
 * @returns {String}
 */
pound.lib.getSubBuzzIdFromChildNode = function(node){
	if (!node){
		throw new Error("No node was passed to getSubBuzzIdFromChildNode");
	}
	var target_class = /buzz_superlist_item/;
	while (node.parentNode){
		if(node.hasAttribute('class') && node.getAttribute('class').match(target_class)) {
			break;
		}
		node = node.parentNode;
	}
	return node.getAttribute('id').replace('superlist_', '');
};

pound.lib.bind = function(el, eventType, callback){
	if (window.addEventListener){
		el.addEventListener(eventType, callback, false);
	} else if (window.attachEvent) {
		el.attachEvent('on' + eventType, callback);
	} else {
		el['on' + eventType] = callback;
	}
};

pound.lib.unbind = function(el, eventType, callback){
	if (!el){
		return;
	}
	if(el.removeEventListener){
		el.removeEventListener(eventType, callback, false);
	} else if (el.detachEvent){
		el.detachEvent('on' + eventType, callback);
	} else {
		el['on' + eventType] = function(e){return false;};
	}
};

pound.lib.endEvent = function(evt){
	if (evt){
		evt.cancelBubble = true;
		evt.returnValue = false;
		
		if (evt.stopPropagation){
			evt.stopPropagation();
		}
		if (typeof evt.preventDefault != 'undefined'){
			evt.preventDefault();
		}
	}
	return false;
};


pound.lib.walk = function(el, should_return, should_traverse){
	if (!el){
	    return el;
	}
	
	var found;
	for (var i=0; i< el.childNodes.length; i++){
		
		if(should_return(el.childNodes.item(i))){
			found = el.childNodes.item(i); 
		} else if (should_traverse(el.childNodes.item(i))){
			found = pound.lib.walk(el.childNodes.item(i), should_return, should_traverse);
		} else {
			continue;
		}
		
		if (found){
			return found;
		}
	}
}

if (typeof pound == 'undefined'){
    pound = {};
}
if (typeof pound.sharing == 'undefined'){
    pound.sharing = {};
}

/**
 * Allows hooks to be registered when sharing buttons are clicked.
 *
 */
pound.sharing.hooks = new (function(){
    var _this = this;

    _this.hooks = [];

    /**
     * Registers a callback to be executed when a share button is clicked. The callback gets passed the event target.
     *
     * @param {function} callable The function to execute. Will be passed the event target, an {HTMLElement}
     */
    this.register = function(callable){
        if (typeof callable != 'undefined'){
            _this.hooks.push(callable);
        }
    };

    /**
     * Executes the hooks for a share button.
     *
     * @param {HTMLElement} e The share button that was clicked.
     */
    this.execute = function(el){
        for(var i=0; i<_this.hooks.length; i++){
            _this.hooks[i](el);
        }
    };
})();

if (typeof pound == 'undefined') {
	var pound = {};
}
if (typeof pound.identity == 'undefined'){
	pound.identity = {};
}

/**
 * Generates a unique id for the user based on the time and a random variable. 
 * Resolution is 1 month with about 0.6% chance of collisions each second. 
 * 
 * @constructor
 * @returns {string} unique_id
 */
pound.identity.Unique = function(){
    var r = NaN;
    for( var i=0; i<10; i++){
        if(isNaN(r)){
            r = parseInt(Math.random() * 10000000000);
        } else {
            break;
        }
    }
	return r.toString(36);
}

if (typeof pound == 'undefined') {
	var pound = {};
}
if (typeof pound.identity == 'undefined'){
	pound.identity = {};
}

function default_buzzfeed_id(){
	return undefined;
}

/**
 * Returns the buzzfeed userid if the user is logged in. Otherwise; nothing.
 * 
 * @constructor
 * @returns {mixed} Either a string or null
 */
pound.identity.Buzzfeed = function(){
	if (typeof BF_User != 'undefined'){
		var userid = (((new BF_User()).getUserInfo()).userid);	
		return userid;
	}
	return default_buzzfeed_id();
};
pound.Validate = new (function(){
    
    var _this = this;
    var _base36 = new RegExp('[0-9A-Za-z]+');

    /**
     * Determines whether or not a single string id is valid. 
     *
     * @param {String} id The id to test whether or not it's valid.
     * @returns {Boolean} true if the id is valid. false otherwise.
     * */
    this.stringId = function(id){
        if(!id || !id.length || isNaN(parseInt(id, 36))){
            return false;
        }
        var m = _base36.exec(id);
        if (m != null && m[0] == id){
            return true;
        } 
        return false;
    };

    /**
     * Determines whether or not the pound-visit-http url contains only valid ids.
     *
     * @param {String} url Some url to check for validity.
     * @returns {object} An object containing any invalid components.
     */
    this.poundHttpUrl = function(url, visit){
        var qs = pound.lib.parseQueryString(pound.urls._getQueryString(url));
        var e = encodeURIComponent(visit.errors.join(":"));
        var invalid = _this.idObject(qs);
        var munged = {"e": encodeURIComponent(visit.errors.join(':'))};
        var id;

        for(var key in qs){
            if(invalid.hasOwnProperty(key)){
                id = invalid[key];
                if(!_this.stringId(id)){
                    id = _this.munge(id); // Attempt to munge.
                    if(id){
                        munged[key] = id;
                    }
                }
            } else {
                munged[key] = qs[key];
            }
        }

        return pound.XHR_URL + pound.lib.createQueryString(munged);
    };

    /**
     * Determines whether or not the pound-share-http url contains only valid ids.
     *
     * @param {String} url Some url to check for validity.
     * @returns {object} An object containing any invalid components.
     */
    this.poundShareUrl = function(url, visit){
        var qs = pound.lib.parseQueryString(pound.urls._getQueryString(url));
        var e = encodeURIComponent(visit.errors.join(":"));
        var invalid = _this.shareObject(qs);
        var munged = {"e": encodeURIComponent(visit.errors.join(':'))};
        var id;

        for(var key in qs){
            if(invalid.hasOwnProperty(key)){
                id = invalid[key];
                if(key == 'u' && !_this.stringId(id)){
                    id = _this.munge(id); // Attempt to munge.
                    if(id){
                        munged[key] = id;
                    }
                } else {
                    id = parseInt(id);
                    if(!isNaN(id)){
                        munged[key] = id;
                    }
                }
            } else {
                munged[key] = qs[key];
            }
        }

        return pound.XHR_URL + pound.lib.createQueryString(munged);

    };


    /**
     * Checks to see if the bf_visit cookie contains only valid ids.
     *
     * @returns {object} An object containing any invalid components.
     */
    this.cookie = function(){
        var c = pound.lib.parseQueryString(unescape(pound.lib.getCookie('bf_visit')));
        return _this.idObject(c); 
    };

    /**
     * Parses the valid components of an id object to determine whether or not each value is a valid id.
     *
     * @param {Object} o The object to parse.
     * @returns {object} An object containing any invalid components.
     */
    this.idObject = function(o){
        var invalid = {};
        if(o['u'] && !_this.stringId(o['u'])){
            invalid['u'] = o['u'];
        }
        if(o['o'] && !_this.stringId(o['o'])){
            invalid['o'] = o['o']; 
        }
        if(o['t'] && !_this.stringId(o['t'])){
            invalid['t'] = o['t'];
        }
        return invalid;
    };

    /**
     * Validates an object representing a click-click-share relationship between two posts and a user. 
     *
     * @param {object} o The object to validate.
     * @returns {object} Any invalid portion of the object.
     */
    this.shareObject = function(o){
        var invalid = {};
        if(o['u'] && !_this.stringId(o['u'])){
            invalid['u'] = o['u'];
        }
        if(o['c'] && isNaN(o['c'])){
            invalid['c'] = o['c'];
        }
        if(o['p'] && isNaN(o['p'])){
            invalid['p'] = o['p'];
        }
        return invalid;
    };

    /**
     * Attempts to munge an invalid id by removing trailing bytes until it either parses to a base 36 integer or is empty.
     *
     * @returns {Mixed} Either a {String} if the id successfully munges or false if it doesn't.
     */
    this.munge = function(invalid_id){
        while(invalid_id && invalid_id.length && invalid_id.length > 0){
            if(!_this.stringId(invalid_id)){
                invalid_id = invalid_id.substr(0, invalid_id.length - 1);
            } else {
                return invalid_id;
            }
        }
        return false;
    };

})();

pound.UrlRewriting = function(){
	var _this = this;

	/*
	 * Initializes the urls class. Breaks the current URL down into it's components.
	 * @private 
	 */
	this._init = function(){
		_this.utm_param = 'utm_term';

		_this.baseUrl 		  = _this._removeQueryString(_this._removeHash(document.URL));
		_this.baseQueryString = document.URL.substr(document.URL.indexOf('?'), document.URL.length);
		_this.baseHashString  = window.location.hash.substr(1,window.location.hash.length);
		
        // Determine if we're in QA mode.
        var qs = pound.lib.parseQueryString(_this.baseQueryString); 

        if (typeof qs['qa'] != 'undefined' && qs['qa'] == '1'){
            _this.baseUrl = _this.baseUrl.replace('dev.', 'www.');
            _this.baseUrl = _this.baseUrl.replace('/bf2', '');
        }
	}

	/**
	 * Gets the cascade string corresponding to the current 'visit'. It's in
	 * stringified json format, t is the key for the twice-removed id while o is the
	 * key for the once-removed id.
	 * 
	 * @returns {String}
	 */
	this._getCascadeString = function(){
		var sharer = window.bf_visit.sharer;
		var current = window.bf_visit.unique; // TODO: Figure out the best param to use here.
	
		if (typeof sharer != 'undefined'){
			return pound.lib.encodeCascadeObject({t: sharer,
								                  o: current});
		}
		return pound.lib.encodeCascadeObject({o: current});
	};

	/**
	 * Replaces the current url's hash with the current user's pound id. 
	 * 
	 * @param {String} url The url to add the hash to.
	 * @private
	 * @returns {String} The url with the new hash.
	 */
	this._addHash = function(url){
		var hash = window.bf_visit.unique;
				
		return _this._removeHash(url) + (hash !== undefined ? '#' + hash : '');
	};

	/**
	 * Returns the url passed with the hash removed.
	 * 
	 * @param {String} url The url to remove the hash from.
	 * @private
	 * @returns {String} The new url
	 */
	this._removeHash = function(url){
		if (url.indexOf('#') > -1){
			return url.substr(0, url.indexOf('#'));
		}
		return url;
	};
	
	/**
	 * Removes the querystring from the url passed.
	 * 
	 * @param {String} url The url to remove the querystring from.
	 * @private
	 * @returns {String} The new url.
	 */
	this._removeQueryString = function(url){
		var hash = _this._getHash(url);
		if (url.indexOf('?') > -1){
			return url.substr(0, url.indexOf('?')) + (hash !== undefined ? '#' + hash : '');
		}
		return url;
	};

	/**
	 * Returns the hash on the url passed (without the pound sign).
	 * 
	 * @param {String} url The url to return the hash from.
	 * @private
	 * @returns {mixed} Returns a string (possibly empty) if there is a hash, otherwise returns undefined.
	 */
	this._getHash = function(url){
		if (url.indexOf('#') > -1){
            return url.substr(url.indexOf('#') + 1,url.length);
            var decoded = Base64.decode(hash)
            return Base64.encode(decoded.substr(decoded.indexOf('?'), decoded.length));
		}
		return undefined;
	};

	/**
	 * Gets the querystring for the url passed.
	 * 
	 * @param {String} url The url to return the querystring from
	 * @private
	 * @returns {mixed} Returns a (possibly empty) string if a querystring is set, otherwise undefined
	 */
	this._getQueryString = function(url){
		url = _this._removeHash(url);
		if (url.indexOf('?') > -1){
			return url.substr(url.indexOf('?') + 1, url.length);
		}
		return undefined;
	};

	/**
	 * Adds the appropriate utm_* term to the existing set of querystring parameters.
	 * 
	 * @param {String} url The url to add the querystring parameter to.
     * @param {Array} additional_params Additional parameters to send the hash through
     * @param {Array<Array<String>>} An array of length N containing N 2-element arrays where the first element is the parameter name to add to the URL and the second element is the associated value.
	 * @private
	 * @returns {String} The new url with the querystring param added in it.
	 */
	this._addQueryString = function(url, additional_params, additional_keyvals){
		var hash = _this._getHash(url);
		var qs   = pound.lib.parseQueryString(_this._getQueryString(url));
		var pname;

		url  = _this._removeHash(url);
		url  = _this._removeQueryString(url);
	
		qs[_this.utm_param] = window.bf_visit.unique; 

        if (typeof additional_params != 'undefined'){
            for(var i=0;i<additional_params.length;i++){
                pname = additional_params[i];
                qs[pname] = escape(window.bf_visit.unique);
            }
        }
        if (typeof additional_keyvals != 'undefined'){
            for(i=0; i<additional_keyvals.length; i++){
                pname = additional_keyvals[i][0];
                pval = additional_keyvals[i][1];
                qs[pname] = pval;
            }
        }

		var r = url + pound.lib.createQueryString(qs) + (hash ? '#' + hash : '');
		return r;
	};
	
	/**
	 * Returns the current URL escaped with the cascade parameters added into the hash. 
	 * 
	 * @returns {String} 
	 */
	this.hashOnly = function(){
        return escape(_this._addHash(_this.baseUrl));
	};
	
	/**
	 * Returns the current URL escaped with the cascade parameters added into the querystring only (using the appropriate utm-prefixed parameter)
	 * 
     * @param {Array<String>} additional_params Additional parameters to set the cascade string to in the querystring.
     * @param {Array<Array<String>>} An array of length N containing N 2-element arrays where the first element is the parameter name to add to the URL and the second element is the associated value.
	 * @returns {String}
	 */
	this.queryStringOnly = function(additional_params, additional_keyvals){
        var with_querystring;
		if (typeof additional_params != 'undefined'){
            with_querystring = _this._addQueryString(_this.baseUrl, additional_params, additional_keyvals);
		} else {
            with_querystring = _this._addQueryString(_this.baseUrl);
        }

        // Don't include the hash if it's the automatically written unique id hash.
        if(_this.baseHashString != window.bf_visit.unique){ 
            with_querystring += ((_this.baseHashString) ? '#' + _this.baseHashString : '');
        }

		return escape(with_querystring);
	};
	
	/**
	 * Returns the current URL escaped with the cascade parameters added into both the querystring and the hash
     *
     * @param {Array<String>} Additional url parameters to include the cascade string on.
     * @param {Array<Array<String>>} An array of length N containing N 2-element arrays where the first element is the parameter name to add to the URL and the second element is the associated value.
	 * 
	 * @returns {String}
	 */
	this.hashAndQueryString = function(additional_params, additional_keyvals){
		if (typeof additional_params != 'undefined'){
			return escape(_this._addHash(_this._addQueryString(_this.baseUrl, additional_params, additional_keyvals))); 
		}
	    return escape(_this._addHash(_this._addQueryString(_this.baseUrl)));
    };

	/**
	 * Returns the current URL escaped with no cascade parameters at all 
	 * 
	 * @returns {String}
	 */
	this.stripped = function(){
		return _this.baseUrl; 
	};
	
	/**
	 * An interface to the unescaped versions of each hashOnly, queryStringOnly, and hashAndQueryString 
	 * 
	 */
	this.unescaped = {
		hashOnly:           function(){ 
            return unescape(_this.hashOnly()); 
        },
		queryStringOnly:    function(additional_params, additional_keyvals){ 
            return unescape(_this.queryStringOnly(additional_params, additional_keyvals)); 
        },
		hashAndQueryString: function(additional_params, additional_keyvals){ 
            return unescape(_this.hashAndQueryString(additional_params, additional_keyvals)); 
        }
	};

    this.setBaseUrl = function(base_url){
		_this.baseUrl 		  = _this._removeQueryString(_this._removeHash(base_url));
		_this.baseQueryString = base_url.substr(base_url.indexOf('?'), base_url.length);
		_this.baseHashString  = base_url.substr(base_url.indexOf('#'), base_url.length); 
    };
	
	_this._init();
};

if (typeof pound == 'undefined'){
	var pound = {};
}

/**
 * Represents a visit. Makes a decision whether or not to record the visit, and 
 * constructs the tracking pixel accordingly.
 * 
 * @constructor
 * @returns {pound.Visit}
 */
pound.Visit = function() {
	var _this   	   = this;

	this.init = function(){
        if (typeof window.bf_visit != 'undefined'){ // Visit should be called ONLY ONCE
            return null;
        }
		this.img  	       = undefined;
		this.bf       	   = undefined;
		this.random   	   = undefined;
		
		this.sharer  = null;
        this.errors = [];

        this.to_save = [];

        this.interval = setInterval(_this.processQueue, 100);

        if(typeof pound.urls == 'undefined'){
            pound.urls = new pound.UrlRewriting();
        }

        _this.processCascadeSegment(); // Sets identity and stores current bpage to cookie

        window.location.hash = _this.unique;

        if (_this.previous_buzzid && _this.previous_buzzid != _this.current_buzzid){
            _this.recordBpageToBpage();
        }
	};

    this.toJson = function(){
        return JSON.stringify({
            "sharer": _this.sharer,
            "unique": _this.unique,
            "bf": _this.bf,
            "current_buzzid": _this.current_buzzid,
            "previous_buzzid": _this.previous_buzzid,
            "errors": _this.errors
        });
    };
	
	/**
	 * Parses the URL hash into tracking ids.
	 * 
	 * @private
	 */
	this._parseHash = function(){
		var sharer = window.location.hash.slice(1,window.location.hash.length);
		if (typeof sharer != 'undefined' && sharer && sharer.length > 0){
			this.sharer = sharer;
		}
	};
	
	/**
	 * Parses utm_term GA parameter into tracking ids.
	 * 
	 * @private
	 */
	this._parseQueryString = function(){
        var sharer = undefined; 

		if (location.search.length >= 1){
			params = pound.lib.parseQueryString(location.search.substr(1));			
            sharer = params['utm_term'] || params['fb_ref'];
		}

		if (typeof sharer != 'undefined'){ 
			this.sharer = sharer;
		}
	};
	
	/**
	 * Parses the cascade segment from the url hash if it is set. Or the query 
	 * string parameters. Sets state for making decisions to save or not.
	 * 
	 * @private
	 */
	this._parseCascadeSegment = function(){
		_this._parseQueryString();
		_this._parseHash();

        if(_this.sharer && !pound.Validate.stringId(_this.sharer)){
            var or = pound.Validate.munge(_this.sharer);
            if(or){
                _this.sharer = or;
            } else {
                _this.errors.push(":4:" + _this.sharer.toString()); 
                _this.sharer = undefined;
            }
        }

        if (_this.sharer == _this.unique){
            _this.sharer = undefined;
        }
	};
	
	/**
	 * Processes the client's bf_visit cookie if it exists. If it's there and 
	 * valid all ids present will be set and it will return true. Otherwise it 
	 * will simply return false.
	 * 
	 * @returns boolean True if the identity is successfully parsed from the cookie and set. false otherwise.
	 */
	this._loadStateFromCookie = function(){
		var id = pound.lib.parseQueryString(unescape(pound.lib.getCookie("bf_visit")));
        var b, u;

        if (id['c'] !== undefined){
            _this.previous_buzzid = id['c'];
        }

		if ((id['b'] === undefined && id['u'] === undefined) || id['v'] != pound.VERSION){
            pound.lib.expireCookie('bf_visit');
			return false; // Missing id or old version.
		}

        if (!pound.Validate.stringId(id['u'])){
            _this.errors.push(":1:" + pound.lib.getCookie('bf_visit'));
            u = pound.Validate.munge(id['u']);
            if (u){
                 _this.unique = u;
            } else {
                pound.lib.expireCookie('bf_visit');
                return false;
            }
        } else {
		    _this.unique = id['u']; 
        }

		_this.bf     = id['b'] ;

		return true;
	};

    this.storeCurrentBPage = function(){
        var bf_visit = unescape(pound.lib.getCookie('bf_visit'));
        var qs = pound.lib.parseQueryString(bf_visit);

        qs['c'] = _this.current_buzzid;

        qs = pound.lib.createQueryString(qs);

        var exdate = new Date();
		exdate.setDate(exdate.getDate() + 60); // Set expiry to 60 days
		
		pound.lib.setCookie("bf_visit", qs.slice(1,qs.length), exdate.toUTCString(), '/');
    };

	/**
	 * Exports the current identity to the bf_visit cookie.
	 * 
	 * @returns {String} A string representation of the bf_visit cookie.
	 */
	this._loadStateToCookie = function(){
		var qs = pound.lib.createQueryString({
			'b': _this.bf,
			'u': _this.unique,
            'v': pound.VERSION
		});

		var exdate = new Date();
		exdate.setDate(exdate.getDate() + 60); // Set expiry to 60 days

		pound.lib.setCookie("bf_visit", qs.slice(1,qs.length), exdate.toUTCString(), '/');
	};
	
	/**
	 * Sets the three ids. If they are already set in the Cookie or via some 
	 * other storage mechanism they're set from there. Otherwise new ones are 
	 * generated.
	 * 
	 */
	this.setIdentity = function(){
        var retries = 0;
		if (!_this._loadStateFromCookie()){ // If we're unable to load the state from the cookie...
			_this.bf     = pound.identity.Buzzfeed();
			_this.unique = pound.identity.Unique();
        }

        while(!pound.Validate.stringId(_this.unique) && retries++ < 10){
            _this.unique = pound.identity.Unique();
        }

        _this.current_buzzid = BF_STATIC['campaignid'];

        if(!pound.Validate.stringId(_this.unique)){
            _this.errors.push(":2:" + _this.unique.toString());
        } else {
            _this._loadStateToCookie();
        }
	};

	/**
	 * Constructs the tracking pixel based on the state of the Visit.
	 */
	this.save = function(){
		var img = document.createElement('img');
		
		var src = pound.XHR_URL;
        var qs  = {'u': encodeURIComponent(_this.unique),
                   'v': encodeURIComponent(pound.VERSION),
                   'c': encodeURIComponent(_this.current_buzzid),
                   'r': encodeURIComponent(document.referrer)};

        if (pound.VERIFY_IDENTITIES){
            qs['b'] = encodeURIComponent(_this.bf);
        }
		if (_this.sharer){
			qs['o'] = encodeURIComponent(_this.sharer);
		}
        
        src += pound.lib.createQueryString(qs);

        var validated_url = pound.Validate.poundHttpUrl(src, _this);

        img.setAttribute('src', validated_url);

        _this.img = img;

        img.setAttribute('height', '1');
        img.setAttribute('width', '1');
        img.setAttribute('id', 'pound-visit-http');
        img.setAttribute('class', 'pound-visit-http');

        _this.queuePixel(img);
	};

    /**
     * This method saves a tracking pixel for a click->click->share event. When a user clicks any share button; this method is invoked. It checks the value previously pulled by this class from the cookie containing the buzzid for the referring page. It also loads the buzzid for the current page. It then loads a tracking pixel with this information as well as the current user's unique id. 
     *
     */
    this.recordShare = function(){
		var img = document.createElement('img');
		
		var src = pound.XHR_URL;
        var qs  = {'u': encodeURIComponent(_this.unique),
                   'v': encodeURIComponent(pound.VERSION),
                   'r': encodeURIComponent(document.referrer) };

        if (_this.current_buzzid){
            qs['c'] = encodeURIComponent(_this.current_buzzid);
        }
        if (_this.previous_buzzid){
            qs['p'] = encodeURIComponent(_this.previous_buzzid);
        }

        src += pound.lib.createQueryString(qs);

        var validated_url = pound.Validate.poundShareUrl(src, _this);

        img.setAttribute('src', validated_url);

        img.setAttribute('height', '1');
        img.setAttribute('width', '1');
        img.setAttribute('id', 'pound-share-http');
        img.setAttribute('class', 'pound-share-http');

        _this.queuePixel(img);
    };

    /**
     * Records bpage-to-bpage click events.
     * */
    this.recordBpageToBpage = function(){
		var img = document.createElement('img');
		
		var src = pound.XHR_URL;
        var qs  = {'u': encodeURIComponent(_this.unique),
                   'v': encodeURIComponent(pound.VERSION),
                   'r': encodeURIComponent(document.referrer) };

        if (_this.current_buzzid){
            qs['c'] = encodeURIComponent(_this.current_buzzid);
        }
        if (_this.previous_buzzid){
            qs['p'] = encodeURIComponent(_this.previous_buzzid);
        }
        if (_this.sharer){
            qs['o'] = encodeURIComponent(_this.sharer);
        }

        src += pound.lib.createQueryString(qs);

        var validated_url = pound.Validate.poundShareUrl(src, _this); // Same as share url

        img.setAttribute('src', validated_url);

        img.setAttribute('height', '1');
        img.setAttribute('width', '1');
        img.setAttribute('id', 'pound-click-http');
        img.setAttribute('class', 'pound-click-http');

        _this.queuePixel(img);
    };

	/**
	 * Process the cascade segment in the url hash. Decide whether or not to
	 * save the visit. Execute the routine to save (or not).
	 */
	this.processCascadeSegment = function(){
		_this.setIdentity();
		_this._parseCascadeSegment();
        _this.storeCurrentBPage(); // Updates cookie with current buzzid
		
		if (_this.sharer != null){ // If there is a cascade segment we want to save. Always.
			_this.save();
		} else if (pound.VERIFY_IDENTITIES && _this.bf !== undefined && _this.img === undefined){ // If the user logs in we want to save. Always.
			_this.save();
		}
	};

	
	this.toString = function(){
		return '[object pound.Visit]';
	};

    this.queuePixel = function(img){
        if (document.body != null && typeof document.body != 'undefined'){
            document.body.appendChild(img);
        } else {
            _this.to_save.push(img);
        }
    };

    this.processQueue = function(){
        if (document.body != null && typeof document.body != 'undefined'){
            clearTimeout(_this.interval);

            var saving = _this.to_save;
            _this.to_save = [];

            for(var i=0; i<saving.length; i++){
                document.body.appendChild(saving[i]);
            };
        }
    };
	
    _this.init();
};

window.bf_visit = new pound.Visit();

if (typeof module !== 'undefined'){
	module.exports = pound;	// This is only a test.
} else {
/**
 * Initalizes the application. 
 * 
 * @returns {Boolean}
 */
// After 20 retries we quit trying.
var pound_retries = 0;
function init_pound(){
	if (typeof bf_login == 'undefined' || typeof BF_User == 'undefined'){ 
		if (pound_retries < 20){
			setTimeout(init_pound, 1000); // Requirements haven't loaded yet. This shouldn't ever happen.
		}
		pound_retries += 1;
		return false;
	} else {
		if (pound.VERIFY_IDENTITIES){
			if ((pound.LOGGED_IN_ONLY && (new BF_User()).isLoggedIn()) || !pound.LOGGED_IN_ONLY) {
				window.bf_visit.processCascadeSegment();
			} else {
				bf_login.loggedInCallbacks.push(window.bf_visit.processCascadeSegment);
			}
		} 
	}
	return false;
};

/**
 * Binds the initialization method to the window onload event without frameworks
 */
function registerWithBuzzLoader(){
	if(typeof BuzzLoader != 'undefined'){
		BuzzLoader.register(init_pound,5);
	} else {
        if (typeof bfjs == 'undefined' || !bfjs.isMobile()) {
		    setTimeout(registerWithBuzzLoader, 500);
        } else {
            init_pound();
        }
	}
}

registerWithBuzzLoader();
}
