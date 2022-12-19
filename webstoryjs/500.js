var r;
!function (o, a) {
  'use strict';
  var i = 'function', l = 'undefined', s = 'object', c = 'model', u = 'name', f = 'type', d = 'vendor', p = 'version', h = 'architecture', g = 'console', m = 'mobile', b = 'tablet', v = 'smarttv', y = 'wearable', C = {
      extend: function (e, t) {
        var n = {};
        for (var r in e)
          t[r] && t[r].length % 2 == 0 ? n[r] = t[r].concat(e[r]) : n[r] = e[r];
        return n;
      },
      has: function (e, t) {
        return 'string' == typeof e && -1 !== t.toLowerCase().indexOf(e.toLowerCase());
      },
      lowerize: function (e) {
        return e.toLowerCase();
      },
      major: function (e) {
        return 'string' == typeof e ? e.replace(/[^\d\.]/g, '').split('.')[0] : a;
      },
      trim: function (e) {
        return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
      }
    }, w = {
      rgx: function (e, t) {
        for (var n, r, o, l, c, u, f = 0; f < t.length && !c;) {
          var d = t[f], p = t[f + 1];
          for (n = r = 0; n < d.length && !c;)
            if (c = d[n++].exec(e))
              for (o = 0; o < p.length; o++)
                u = c[++r], typeof (l = p[o]) === s && l.length > 0 ? 2 == l.length ? typeof l[1] == i ? this[l[0]] = l[1].call(this, u) : this[l[0]] = l[1] : 3 == l.length ? typeof l[1] !== i || l[1].exec && l[1].test ? this[l[0]] = u ? u.replace(l[1], l[2]) : a : this[l[0]] = u ? l[1].call(this, u, l[2]) : a : 4 == l.length && (this[l[0]] = u ? l[3].call(this, u.replace(l[1], l[2])) : a) : this[l] = u || a;
          f += 2;
        }
      },
      str: function (e, t) {
        for (var n in t)
          if (typeof t[n] === s && t[n].length > 0) {
            for (var r = 0; r < t[n].length; r++)
              if (C.has(t[n][r], e))
                return '?' === n ? a : n;
          } else if (C.has(t[n], e))
            return '?' === n ? a : n;
        return e;
      }
    }, x = {
      browser: {
        oldsafari: {
          version: {
            '1.0': '/8',
            1.2: '/1',
            1.3: '/3',
            '2.0': '/412',
            '2.0.2': '/416',
            '2.0.3': '/417',
            '2.0.4': '/419',
            '?': '/'
          }
        }
      },
      device: {
        amazon: {
          model: {
            'Fire Phone': [
              'SD',
              'KF'
            ]
          }
        },
        sprint: {
          model: { 'Evo Shift 4G': '7373KT' },
          vendor: {
            HTC: 'APA',
            Sprint: 'Sprint'
          }
        }
      },
      os: {
        windows: {
          version: {
            ME: '4.90',
            'NT 3.11': 'NT3.51',
            'NT 4.0': 'NT4.0',
            2000: 'NT 5.0',
            XP: [
              'NT 5.1',
              'NT 5.2'
            ],
            Vista: 'NT 6.0',
            7: 'NT 6.1',
            8: 'NT 6.2',
            8.1: 'NT 6.3',
            10: [
              'NT 6.4',
              'NT 10.0'
            ],
            RT: 'ARM'
          }
        }
      }
    }, E = {
      browser: [
        [
          /(opera\smini)\/([\w\.-]+)/i,
          /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,
          /(opera).+version\/([\w\.]+)/i,
          /(opera)[\/\s]+([\w\.]+)/i
        ],
        [
          u,
          p
        ],
        [/(opios)[\/\s]+([\w\.]+)/i],
        [
          [
            u,
            'Opera Mini'
          ],
          p
        ],
        [/\s(opr)\/([\w\.]+)/i],
        [
          [
            u,
            'Opera'
          ],
          p
        ],
        [
          /(kindle)\/([\w\.]+)/i,
          /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,
          /(avant\s|iemobile|slim)(?:browser)?[\/\s]?([\w\.]*)/i,
          /(bidubrowser|baidubrowser)[\/\s]?([\w\.]+)/i,
          /(?:ms|\()(ie)\s([\w\.]+)/i,
          /(rekonq)\/([\w\.]*)/i,
          /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i
        ],
        [
          u,
          p
        ],
        [/(konqueror)\/([\w\.]+)/i],
        [
          [
            u,
            'Konqueror'
          ],
          p
        ],
        [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],
        [
          [
            u,
            'IE'
          ],
          p
        ],
        [/(edge|edgios|edga|edg)\/((\d+)?[\w\.]+)/i],
        [
          [
            u,
            'Edge'
          ],
          p
        ],
        [/(yabrowser)\/([\w\.]+)/i],
        [
          [
            u,
            'Yandex'
          ],
          p
        ],
        [/(Avast)\/([\w\.]+)/i],
        [
          [
            u,
            'Avast Secure Browser'
          ],
          p
        ],
        [/(AVG)\/([\w\.]+)/i],
        [
          [
            u,
            'AVG Secure Browser'
          ],
          p
        ],
        [/(puffin)\/([\w\.]+)/i],
        [
          [
            u,
            'Puffin'
          ],
          p
        ],
        [/(focus)\/([\w\.]+)/i],
        [
          [
            u,
            'Firefox Focus'
          ],
          p
        ],
        [/(opt)\/([\w\.]+)/i],
        [
          [
            u,
            'Opera Touch'
          ],
          p
        ],
        [/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i],
        [
          [
            u,
            'UCBrowser'
          ],
          p
        ],
        [/(comodo_dragon)\/([\w\.]+)/i],
        [
          [
            u,
            /_/g,
            ' '
          ],
          p
        ],
        [/(windowswechat qbcore)\/([\w\.]+)/i],
        [
          [
            u,
            'WeChat(Win) Desktop'
          ],
          p
        ],
        [/(micromessenger)\/([\w\.]+)/i],
        [
          [
            u,
            'WeChat'
          ],
          p
        ],
        [/(brave)\/([\w\.]+)/i],
        [
          [
            u,
            'Brave'
          ],
          p
        ],
        [/(qqbrowserlite)\/([\w\.]+)/i],
        [
          u,
          p
        ],
        [/(QQ)\/([\d\.]+)/i],
        [
          u,
          p
        ],
        [/m?(qqbrowser)[\/\s]?([\w\.]+)/i],
        [
          u,
          p
        ],
        [/(baiduboxapp)[\/\s]?([\w\.]+)/i],
        [
          u,
          p
        ],
        [/(2345Explorer)[\/\s]?([\w\.]+)/i],
        [
          u,
          p
        ],
        [/(MetaSr)[\/\s]?([\w\.]+)/i],
        [u],
        [/(LBBROWSER)/i],
        [u],
        [/xiaomi\/miuibrowser\/([\w\.]+)/i],
        [
          p,
          [
            u,
            'MIUI Browser'
          ]
        ],
        [/;fbav\/([\w\.]+);/i],
        [
          p,
          [
            u,
            'Facebook'
          ]
        ],
        [
          /safari\s(line)\/([\w\.]+)/i,
          /android.+(line)\/([\w\.]+)\/iab/i
        ],
        [
          u,
          p
        ],
        [/headlesschrome(?:\/([\w\.]+)|\s)/i],
        [
          p,
          [
            u,
            'Chrome Headless'
          ]
        ],
        [/\swv\).+(chrome)\/([\w\.]+)/i],
        [
          [
            u,
            /(.+)/,
            '$1 WebView'
          ],
          p
        ],
        [/((?:oculus|samsung)browser)\/([\w\.]+)/i],
        [
          [
            u,
            /(.+(?:g|us))(.+)/,
            '$1 $2'
          ],
          p
        ],
        [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i],
        [
          p,
          [
            u,
            'Android Browser'
          ]
        ],
        [/(sailfishbrowser)\/([\w\.]+)/i],
        [
          [
            u,
            'Sailfish Browser'
          ],
          p
        ],
        [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i],
        [
          u,
          p
        ],
        [/(dolfin)\/([\w\.]+)/i],
        [
          [
            u,
            'Dolphin'
          ],
          p
        ],
        [/(qihu|qhbrowser|qihoobrowser|360browser)/i],
        [[
            u,
            '360 Browser'
          ]],
        [/((?:android.+)crmo|crios)\/([\w\.]+)/i],
        [
          [
            u,
            'Chrome'
          ],
          p
        ],
        [/(coast)\/([\w\.]+)/i],
        [
          [
            u,
            'Opera Coast'
          ],
          p
        ],
        [/fxios\/([\w\.-]+)/i],
        [
          p,
          [
            u,
            'Firefox'
          ]
        ],
        [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],
        [
          p,
          [
            u,
            'Mobile Safari'
          ]
        ],
        [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],
        [
          p,
          u
        ],
        [/webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
        [
          [
            u,
            'GSA'
          ],
          p
        ],
        [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
        [
          u,
          [
            p,
            w.str,
            x.browser.oldsafari.version
          ]
        ],
        [/(webkit|khtml)\/([\w\.]+)/i],
        [
          u,
          p
        ],
        [/(navigator|netscape)\/([\w\.-]+)/i],
        [
          [
            u,
            'Netscape'
          ],
          p
        ],
        [
          /(swiftfox)/i,
          /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
          /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,
          /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,
          /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
          /(links)\s\(([\w\.]+)/i,
          /(gobrowser)\/?([\w\.]*)/i,
          /(ice\s?browser)\/v?([\w\._]+)/i,
          /(mosaic)[\/\s]([\w\.]+)/i
        ],
        [
          u,
          p
        ]
      ],
      cpu: [
        [/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],
        [[
            h,
            'amd64'
          ]],
        [/(ia32(?=;))/i],
        [[
            h,
            C.lowerize
          ]],
        [/((?:i[346]|x)86)[;\)]/i],
        [[
            h,
            'ia32'
          ]],
        [/windows\s(ce|mobile);\sppc;/i],
        [[
            h,
            'arm'
          ]],
        [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],
        [[
            h,
            /ower/,
            '',
            C.lowerize
          ]],
        [/(sun4\w)[;\)]/i],
        [[
            h,
            'sparc'
          ]],
        [/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i],
        [[
            h,
            C.lowerize
          ]]
      ],
      device: [
        [/\((ipad|playbook);[\w\s\),;-]+(rim|apple)/i],
        [
          c,
          d,
          [
            f,
            b
          ]
        ],
        [/applecoremedia\/[\w\.]+ \((ipad)/],
        [
          c,
          [
            d,
            'Apple'
          ],
          [
            f,
            b
          ]
        ],
        [/(apple\s{0,1}tv)/i],
        [
          [
            c,
            'Apple TV'
          ],
          [
            d,
            'Apple'
          ],
          [
            f,
            v
          ]
        ],
        [
          /(archos)\s(gamepad2?)/i,
          /(hp).+(touchpad)/i,
          /(hp).+(tablet)/i,
          /(kindle)\/([\w\.]+)/i,
          /\s(nook)[\w\s]+build\/(\w+)/i,
          /(dell)\s(strea[kpr\s\d]*[\dko])/i
        ],
        [
          d,
          c,
          [
            f,
            b
          ]
        ],
        [/(kf[A-z]+)\sbuild\/.+silk\//i],
        [
          c,
          [
            d,
            'Amazon'
          ],
          [
            f,
            b
          ]
        ],
        [/(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i],
        [
          [
            c,
            w.str,
            x.device.amazon.model
          ],
          [
            d,
            'Amazon'
          ],
          [
            f,
            m
          ]
        ],
        [/android.+aft([bms])\sbuild/i],
        [
          c,
          [
            d,
            'Amazon'
          ],
          [
            f,
            v
          ]
        ],
        [/\((ip[honed|\s\w*]+);.+(apple)/i],
        [
          c,
          d,
          [
            f,
            m
          ]
        ],
        [/\((ip[honed|\s\w*]+);/i],
        [
          c,
          [
            d,
            'Apple'
          ],
          [
            f,
            m
          ]
        ],
        [
          /(blackberry)[\s-]?(\w+)/i,
          /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,
          /(hp)\s([\w\s]+\w)/i,
          /(asus)-?(\w+)/i
        ],
        [
          d,
          c,
          [
            f,
            m
          ]
        ],
        [/\(bb10;\s(\w+)/i],
        [
          c,
          [
            d,
            'BlackBerry'
          ],
          [
            f,
            m
          ]
        ],
        [/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone|p00c)/i],
        [
          c,
          [
            d,
            'Asus'
          ],
          [
            f,
            b
          ]
        ],
        [
          /(sony)\s(tablet\s[ps])\sbuild\//i,
          /(sony)?(?:sgp.+)\sbuild\//i
        ],
        [
          [
            d,
            'Sony'
          ],
          [
            c,
            'Xperia Tablet'
          ],
          [
            f,
            b
          ]
        ],
        [/android.+\s([c-g]\d{4}|so[-l]\w+)(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i],
        [
          c,
          [
            d,
            'Sony'
          ],
          [
            f,
            m
          ]
        ],
        [
          /\s(ouya)\s/i,
          /(nintendo)\s([wids3u]+)/i
        ],
        [
          d,
          c,
          [
            f,
            g
          ]
        ],
        [/android.+;\s(shield)\sbuild/i],
        [
          c,
          [
            d,
            'Nvidia'
          ],
          [
            f,
            g
          ]
        ],
        [/(playstation\s[34portablevi]+)/i],
        [
          c,
          [
            d,
            'Sony'
          ],
          [
            f,
            g
          ]
        ],
        [/(sprint\s(\w+))/i],
        [
          [
            d,
            w.str,
            x.device.sprint.vendor
          ],
          [
            c,
            w.str,
            x.device.sprint.model
          ],
          [
            f,
            m
          ]
        ],
        [
          /(htc)[;_\s-]+([\w\s]+(?=\)|\sbuild)|\w+)/i,
          /(zte)-(\w*)/i,
          /(alcatel|geeksphone|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i
        ],
        [
          d,
          [
            c,
            /_/g,
            ' '
          ],
          [
            f,
            m
          ]
        ],
        [/(nexus\s9)/i],
        [
          c,
          [
            d,
            'HTC'
          ],
          [
            f,
            b
          ]
        ],
        [
          /d\/huawei([\w\s-]+)[;\)]/i,
          /(nexus\s6p|vog-l29|ane-lx1|eml-l29)/i
        ],
        [
          c,
          [
            d,
            'Huawei'
          ],
          [
            f,
            m
          ]
        ],
        [/android.+(bah2?-a?[lw]\d{2})/i],
        [
          c,
          [
            d,
            'Huawei'
          ],
          [
            f,
            b
          ]
        ],
        [/(microsoft);\s(lumia[\s\w]+)/i],
        [
          d,
          c,
          [
            f,
            m
          ]
        ],
        [/[\s\(;](xbox(?:\sone)?)[\s\);]/i],
        [
          c,
          [
            d,
            'Microsoft'
          ],
          [
            f,
            g
          ]
        ],
        [/(kin\.[onetw]{3})/i],
        [
          [
            c,
            /\./g,
            ' '
          ],
          [
            d,
            'Microsoft'
          ],
          [
            f,
            m
          ]
        ],
        [
          /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i,
          /mot[\s-]?(\w*)/i,
          /(XT\d{3,4}) build\//i,
          /(nexus\s6)/i
        ],
        [
          c,
          [
            d,
            'Motorola'
          ],
          [
            f,
            m
          ]
        ],
        [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],
        [
          c,
          [
            d,
            'Motorola'
          ],
          [
            f,
            b
          ]
        ],
        [/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i],
        [
          [
            d,
            C.trim
          ],
          [
            c,
            C.trim
          ],
          [
            f,
            v
          ]
        ],
        [/hbbtv.+maple;(\d+)/i],
        [
          [
            c,
            /^/,
            'SmartTV'
          ],
          [
            d,
            'Samsung'
          ],
          [
            f,
            v
          ]
        ],
        [/\(dtv[\);].+(aquos)/i],
        [
          c,
          [
            d,
            'Sharp'
          ],
          [
            f,
            v
          ]
        ],
        [
          /android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,
          /((SM-T\w+))/i
        ],
        [
          [
            d,
            'Samsung'
          ],
          c,
          [
            f,
            b
          ]
        ],
        [/smart-tv.+(samsung)/i],
        [
          d,
          [
            f,
            v
          ],
          c
        ],
        [
          /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,
          /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i,
          /sec-((sgh\w+))/i
        ],
        [
          [
            d,
            'Samsung'
          ],
          c,
          [
            f,
            m
          ]
        ],
        [/sie-(\w*)/i],
        [
          c,
          [
            d,
            'Siemens'
          ],
          [
            f,
            m
          ]
        ],
        [
          /(maemo|nokia).*(n900|lumia\s\d+)/i,
          /(nokia)[\s_-]?([\w-]*)/i
        ],
        [
          [
            d,
            'Nokia'
          ],
          c,
          [
            f,
            m
          ]
        ],
        [/android[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i],
        [
          c,
          [
            d,
            'Acer'
          ],
          [
            f,
            b
          ]
        ],
        [/android.+([vl]k\-?\d{3})\s+build/i],
        [
          c,
          [
            d,
            'LG'
          ],
          [
            f,
            b
          ]
        ],
        [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],
        [
          [
            d,
            'LG'
          ],
          c,
          [
            f,
            b
          ]
        ],
        [/(lg) netcast\.tv/i],
        [
          d,
          c,
          [
            f,
            v
          ]
        ],
        [
          /(nexus\s[45])/i,
          /lg[e;\s\/-]+(\w*)/i,
          /android.+lg(\-?[\d\w]+)\s+build/i
        ],
        [
          c,
          [
            d,
            'LG'
          ],
          [
            f,
            m
          ]
        ],
        [/(lenovo)\s?(s(?:5000|6000)(?:[\w-]+)|tab(?:[\s\w]+))/i],
        [
          d,
          c,
          [
            f,
            b
          ]
        ],
        [/android.+(ideatab[a-z0-9\-\s]+)/i],
        [
          c,
          [
            d,
            'Lenovo'
          ],
          [
            f,
            b
          ]
        ],
        [/(lenovo)[_\s-]?([\w-]+)/i],
        [
          d,
          c,
          [
            f,
            m
          ]
        ],
        [/linux;.+((jolla));/i],
        [
          d,
          c,
          [
            f,
            m
          ]
        ],
        [/((pebble))app\/[\d\.]+\s/i],
        [
          d,
          c,
          [
            f,
            y
          ]
        ],
        [/android.+;\s(oppo)\s?([\w\s]+)\sbuild/i],
        [
          d,
          c,
          [
            f,
            m
          ]
        ],
        [/crkey/i],
        [
          [
            c,
            'Chromecast'
          ],
          [
            d,
            'Google'
          ],
          [
            f,
            v
          ]
        ],
        [/android.+;\s(glass)\s\d/i],
        [
          c,
          [
            d,
            'Google'
          ],
          [
            f,
            y
          ]
        ],
        [/android.+;\s(pixel c)[\s)]/i],
        [
          c,
          [
            d,
            'Google'
          ],
          [
            f,
            b
          ]
        ],
        [/android.+;\s(pixel( [23])?( xl)?)[\s)]/i],
        [
          c,
          [
            d,
            'Google'
          ],
          [
            f,
            m
          ]
        ],
        [
          /android.+;\s(\w+)\s+build\/hm\1/i,
          /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,
          /android.+(mi[\s\-_]*(?:a\d|one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i,
          /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i
        ],
        [
          [
            c,
            /_/g,
            ' '
          ],
          [
            d,
            'Xiaomi'
          ],
          [
            f,
            m
          ]
        ],
        [/android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i],
        [
          [
            c,
            /_/g,
            ' '
          ],
          [
            d,
            'Xiaomi'
          ],
          [
            f,
            b
          ]
        ],
        [/android.+;\s(m[1-5]\snote)\sbuild/i],
        [
          c,
          [
            d,
            'Meizu'
          ],
          [
            f,
            m
          ]
        ],
        [/(mz)-([\w-]{2,})/i],
        [
          [
            d,
            'Meizu'
          ],
          c,
          [
            f,
            m
          ]
        ],
        [
          /android.+a000(1)\s+build/i,
          /android.+oneplus\s(a\d{4})[\s)]/i
        ],
        [
          c,
          [
            d,
            'OnePlus'
          ],
          [
            f,
            m
          ]
        ],
        [/android.+[;\/]\s*(RCT[\d\w]+)\s+build/i],
        [
          c,
          [
            d,
            'RCA'
          ],
          [
            f,
            b
          ]
        ],
        [/android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i],
        [
          c,
          [
            d,
            'Dell'
          ],
          [
            f,
            b
          ]
        ],
        [/android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i],
        [
          c,
          [
            d,
            'Verizon'
          ],
          [
            f,
            b
          ]
        ],
        [/android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i],
        [
          [
            d,
            'Barnes & Noble'
          ],
          c,
          [
            f,
            b
          ]
        ],
        [/android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i],
        [
          c,
          [
            d,
            'NuVision'
          ],
          [
            f,
            b
          ]
        ],
        [/android.+;\s(k88)\sbuild/i],
        [
          c,
          [
            d,
            'ZTE'
          ],
          [
            f,
            b
          ]
        ],
        [/android.+[;\/]\s*(gen\d{3})\s+build.*49h/i],
        [
          c,
          [
            d,
            'Swiss'
          ],
          [
            f,
            m
          ]
        ],
        [/android.+[;\/]\s*(zur\d{3})\s+build/i],
        [
          c,
          [
            d,
            'Swiss'
          ],
          [
            f,
            b
          ]
        ],
        [/android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i],
        [
          c,
          [
            d,
            'Zeki'
          ],
          [
            f,
            b
          ]
        ],
        [
          /(android).+[;\/]\s+([YR]\d{2})\s+build/i,
          /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i
        ],
        [
          [
            d,
            'Dragon Touch'
          ],
          c,
          [
            f,
            b
          ]
        ],
        [/android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i],
        [
          c,
          [
            d,
            'Insignia'
          ],
          [
            f,
            b
          ]
        ],
        [/android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i],
        [
          c,
          [
            d,
            'NextBook'
          ],
          [
            f,
            b
          ]
        ],
        [/android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i],
        [
          [
            d,
            'Voice'
          ],
          c,
          [
            f,
            m
          ]
        ],
        [/android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i],
        [
          [
            d,
            'LvTel'
          ],
          c,
          [
            f,
            m
          ]
        ],
        [/android.+;\s(PH-1)\s/i],
        [
          c,
          [
            d,
            'Essential'
          ],
          [
            f,
            m
          ]
        ],
        [/android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i],
        [
          c,
          [
            d,
            'Envizen'
          ],
          [
            f,
            b
          ]
        ],
        [/android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i],
        [
          d,
          c,
          [
            f,
            b
          ]
        ],
        [/android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i],
        [
          c,
          [
            d,
            'MachSpeed'
          ],
          [
            f,
            b
          ]
        ],
        [/android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i],
        [
          d,
          c,
          [
            f,
            b
          ]
        ],
        [/android.+[;\/]\s*TU_(1491)\s+build/i],
        [
          c,
          [
            d,
            'Rotor'
          ],
          [
            f,
            b
          ]
        ],
        [/android.+(KS(.+))\s+build/i],
        [
          c,
          [
            d,
            'Amazon'
          ],
          [
            f,
            b
          ]
        ],
        [/android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i],
        [
          d,
          c,
          [
            f,
            b
          ]
        ],
        [
          /\s(tablet|tab)[;\/]/i,
          /\s(mobile)(?:[;\/]|\ssafari)/i
        ],
        [
          [
            f,
            C.lowerize
          ],
          d,
          c
        ],
        [/[\s\/\(](smart-?tv)[;\)]/i],
        [[
            f,
            v
          ]],
        [/(android[\w\.\s\-]{0,9});.+build/i],
        [
          c,
          [
            d,
            'Generic'
          ]
        ]
      ],
      engine: [
        [/windows.+\sedge\/([\w\.]+)/i],
        [
          p,
          [
            u,
            'EdgeHTML'
          ]
        ],
        [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
        [
          p,
          [
            u,
            'Blink'
          ]
        ],
        [
          /(presto)\/([\w\.]+)/i,
          /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
          /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,
          /(icab)[\/\s]([23]\.[\d\.]+)/i
        ],
        [
          u,
          p
        ],
        [/rv\:([\w\.]{1,9}).+(gecko)/i],
        [
          p,
          u
        ]
      ],
      os: [
        [/microsoft\s(windows)\s(vista|xp)/i],
        [
          u,
          p
        ],
        [
          /(windows)\snt\s6\.2;\s(arm)/i,
          /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i,
          /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i
        ],
        [
          u,
          [
            p,
            w.str,
            x.os.windows.version
          ]
        ],
        [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],
        [
          [
            u,
            'Windows'
          ],
          [
            p,
            w.str,
            x.os.windows.version
          ]
        ],
        [/\((bb)(10);/i],
        [
          [
            u,
            'BlackBerry'
          ],
          p
        ],
        [
          /(blackberry)\w*\/?([\w\.]*)/i,
          /(tizen|kaios)[\/\s]([\w\.]+)/i,
          /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i
        ],
        [
          u,
          p
        ],
        [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i],
        [
          [
            u,
            'Symbian'
          ],
          p
        ],
        [/\((series40);/i],
        [u],
        [/mozilla.+\(mobile;.+gecko.+firefox/i],
        [
          [
            u,
            'Firefox OS'
          ],
          p
        ],
        [
          /(nintendo|playstation)\s([wids34portablevu]+)/i,
          /(mint)[\/\s\(]?(\w*)/i,
          /(mageia|vectorlinux)[;\s]/i,
          /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i,
          /(hurd|linux)\s?([\w\.]*)/i,
          /(gnu)\s?([\w\.]*)/i
        ],
        [
          u,
          p
        ],
        [/(cros)\s[\w]+\s([\w\.]+\w)/i],
        [
          [
            u,
            'Chromium OS'
          ],
          p
        ],
        [/(sunos)\s?([\w\.\d]*)/i],
        [
          [
            u,
            'Solaris'
          ],
          p
        ],
        [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i],
        [
          u,
          p
        ],
        [/(haiku)\s(\w+)/i],
        [
          u,
          p
        ],
        [
          /cfnetwork\/.+darwin/i,
          /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i
        ],
        [
          [
            p,
            /_/g,
            '.'
          ],
          [
            u,
            'iOS'
          ]
        ],
        [
          /(mac\sos\sx)\s?([\w\s\.]*)/i,
          /(macintosh|mac(?=_powerpc)\s)/i
        ],
        [
          [
            u,
            'Mac OS'
          ],
          [
            p,
            /_/g,
            '.'
          ]
        ],
        [
          /((?:open)?solaris)[\/\s-]?([\w\.]*)/i,
          /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i,
          /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i,
          /(unix)\s?([\w\.]*)/i
        ],
        [
          u,
          p
        ]
      ]
    }, UAParser = function (e, t) {
      if ('object' == typeof e && (t = e, e = a), !(this instanceof UAParser))
        return new UAParser(e, t).getResult();
      var n = e || (o && o.navigator && o.navigator.userAgent ? o.navigator.userAgent : ''), r = t ? C.extend(E, t) : E;
      return this.getBrowser = function () {
        var e = {
          name: a,
          version: a
        };
        return w.rgx.call(e, n, r.browser), e.major = C.major(e.version), e;
      }, this.getCPU = function () {
        var e = { architecture: a };
        return w.rgx.call(e, n, r.cpu), e;
      }, this.getDevice = function () {
        var e = {
          vendor: a,
          model: a,
          type: a
        };
        return w.rgx.call(e, n, r.device), e;
      }, this.getEngine = function () {
        var e = {
          name: a,
          version: a
        };
        return w.rgx.call(e, n, r.engine), e;
      }, this.getOS = function () {
        var e = {
          name: a,
          version: a
        };
        return w.rgx.call(e, n, r.os), e;
      }, this.getResult = function () {
        return {
          ua: this.getUA(),
          browser: this.getBrowser(),
          engine: this.getEngine(),
          os: this.getOS(),
          device: this.getDevice(),
          cpu: this.getCPU()
        };
      }, this.getUA = function () {
        return n;
      }, this.setUA = function (e) {
        return n = e, this;
      }, this;
    };
  UAParser.VERSION = '0.7.21', UAParser.BROWSER = {
    NAME: u,
    MAJOR: 'major',
    VERSION: p
  }, UAParser.CPU = { ARCHITECTURE: h }, UAParser.DEVICE = {
    MODEL: c,
    VENDOR: d,
    TYPE: f,
    CONSOLE: g,
    MOBILE: m,
    SMARTTV: v,
    TABLET: b,
    WEARABLE: y,
    EMBEDDED: 'embedded'
  }, UAParser.ENGINE = {
    NAME: u,
    VERSION: p
  }, UAParser.OS = {
    NAME: u,
    VERSION: p
  }, typeof t !== l ? (typeof e !== l && e.exports && (t = e.exports = UAParser), t.UAParser = UAParser) : (r = function () {
    return UAParser;
  }.call(t, n, t, e)) === a || (e.exports = r);
  var _ = o && (o.jQuery || o.Zepto);
  if (_ && !_.ua) {
    var O = new UAParser();
    _.ua = O.getResult(), _.ua.get = function () {
      return O.getUA();
    }, _.ua.set = function (e) {
      O.setUA(e);
      var t = O.getResult();
      for (var n in t)
        _.ua[n] = t[n];
    };
  }
}('object' == typeof window ? window : this);