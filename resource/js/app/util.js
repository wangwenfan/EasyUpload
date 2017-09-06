!
    function(window) {
        function getQuery(a) {
            var b = "";
            if ( - 1 != a.indexOf("?")) var b = a.split("?")[1];
            return b
        }
        var util = {};
        util.iconBrowser = function(a) {
            require(["fontawesome"],
                function() {
                    var b = '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>',
                        c = util.dialog("请选择图标", window.util.templates["fontawesome-content.tpl"], b, {
                            containerName: "icon-container"
                        });
                    c.modal({
                        keyboard: !1
                    }),
                        c.find(".modal-dialog").css({
                            width: "70%"
                        }),
                        c.find(".modal-body").css({
                            height: "70%",
                            "overflow-y": "scroll"
                        }),
                        c.modal("show"),
                        window.selectIconComplete = function(b) {
                            $.isFunction(a) && (a(b), c.modal("hide"))
                        }
                })
        },
            util.emojiBrowser = function(a) {
                require(["emoji"],
                    function() {
                        var b = '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>',
                            c = util.dialog("请选择表情", window.util.templates["emoji-content-emoji.tpl"], b, {
                                containerName: "icon-container"
                            });
                        c.modal({
                            keyboard: !1
                        }),
                            c.find(".modal-dialog").css({
                                width: "70%"
                            }),
                            c.find(".modal-body").css({
                                height: "70%",
                                "overflow-y": "scroll"
                            }),
                            c.modal("show"),
                            window.selectEmojiComplete = function(b) {
                                $.isFunction(a) && (a(b), c.modal("hide"))
                            }
                    })
            },
            util.qqEmojiBrowser = function(a, b, c) {
                require(["emoji"],
                    function() {
                        var d = window.util.templates["emoji-content-qq.tpl"];
                        $(a).popover({
                            html: !0,
                            content: d,
                            placement: "bottom"
                        }),
                            $(a).one("shown.bs.popover",
                                function() {
                                    $(a).next().mouseleave(function() {
                                        $(a).popover("hide")
                                    }),
                                        $(a).next().delegate(".eItem", "mouseover",
                                            function() {
                                                var b = '<img src="' + $(this).attr("data-gifurl") + '" alt="mo-' + $(this).attr("data-title") + '" />';
                                                "/" + $(this).attr("data-code");
                                                $(a).next().find(".emotionsGif").html(b)
                                            }),
                                        $(a).next().delegate(".eItem", "click",
                                            function() {
                                                var d = "/" + $(this).attr("data-code");
                                                $(a).popover("hide"),
                                                $.isFunction(c) && c(d, a, b)
                                            })
                                })
                    })
            },
            util.emotion = function(a, b, c) {
                util.qqEmojiBrowser(a, b, c)
            },
            util.linkBrowser = function(a) {
                var b = '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>',
                    c = util.dialog("请选择链接", ["./index.php?c=utility&a=link&callback=selectLinkComplete"], b, {
                        containerName: "link-container"
                    });
                c.modal({
                    keyboard: !1
                }),
                    c.find(".modal-body").css({
                        height: "300px",
                        "overflow-y": "auto"
                    }),
                    c.modal("show"),
                    window.selectLinkComplete = function(b) {
                        $.isFunction(a) && (a(b), c.modal("hide"))
                    }
            },
            util.pageBrowser = function(a, b) {
                var c = "",
                    d = util.dialog("", ["./index.php?c=utility&a=link&do=page&callback=pageLinkComplete&page=" + b], c, {
                        containerName: "link-container"
                    });
                d.modal({
                    keyboard: !1
                }),
                    d.find(".modal-body").css({
                        height: "700px",
                        "overflow-y": "auto"
                    }),
                    d.modal("show"),
                    window.pageLinkComplete = function(b, c) {
                        $.isFunction(a) && (a(b, c), "" != c && void 0 != c || d.modal("hide"))
                    }
            },
            util.newsBrowser = function(a, b) {
                var c = "",
                    d = util.dialog("", ["./index.php?c=utility&a=link&do=news&callback=newsLinkComplete&page=" + b], c, {
                        containerName: "link-container"
                    });
                d.modal({
                    keyboard: !1
                }),
                    d.find(".modal-body").css({
                        height: "700px",
                        "overflow-y": "auto"
                    }),
                    d.modal("show"),
                    window.newsLinkComplete = function(b, c) {
                        $.isFunction(a) && (a(b, c), "" != c && void 0 != c || d.modal("hide"))
                    }
            },
            util.articleBrowser = function(a, b) {
                var c = "",
                    d = util.dialog("", ["./index.php?c=utility&a=link&do=article&callback=articleLinkComplete&page=" + b], c, {
                        containerName: "link-container"
                    });
                d.modal({
                    keyboard: !1
                }),
                    d.find(".modal-body").css({
                        height: "700px",
                        "overflow-y": "auto"
                    }),
                    d.modal("show"),
                    window.articleLinkComplete = function(b, c) {
                        $.isFunction(a) && (a(b, c), "" != c && void 0 != c || d.modal("hide"))
                    }
            },
            util.phoneBrowser = function(a, b) {
                var c = "",
                    d = util.dialog("一键拨号", ["./index.php?c=utility&a=link&do=phone&callback=phoneLinkComplete&page=" + b], c, {
                        containerName: "link-container"
                    });
                d.modal({
                    keyboard: !1
                }),
                    d.find(".modal-body").css({
                        height: "700px",
                        "overflow-y": "auto"
                    }),
                    d.modal("show"),
                    window.phoneLinkComplete = function(b, c) {
                        $.isFunction(a) && (a(b, c), "" != c && void 0 != c || d.modal("hide"))
                    }
            },
            util.showModuleLink = function(a) {
                var b = util.dialog("模块链接选择", ["./index.php?c=utility&a=link&do=modulelink&callback=moduleLinkComplete"], "");
                b.modal({
                    keyboard: !1
                }),
                    b.find(".modal-body").css({
                        height: "700px",
                        "overflow-y": "auto"
                    }),
                    b.modal("show"),
                    window.moduleLinkComplete = function(c, d) {
                        $.isFunction(a) && (a(c, d), b.modal("hide"))
                    }
            },
            util.colorpicker = function(a, b) {
                require(["colorpicker"],
                    function() {
                        $(a).spectrum({
                            className: "colorpicker",
                            showInput: !0,
                            showInitial: !0,
                            showPalette: !0,
                            maxPaletteSize: 10,
                            preferredFormat: "hex",
                            change: function(a) {
                                $.isFunction(b) && b(a)
                            },
                            palette: [["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)", "rgb(153, 153, 153)", "rgb(183, 183, 183)", "rgb(204, 204, 204)", "rgb(217, 217, 217)", "rgb(239, 239, 239)", "rgb(243, 243, 243)", "rgb(255, 255, 255)"], ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)", "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"], ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)", "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)", "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)", "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)", "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)", "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)", "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)", "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)", "rgb(133, 32, 12)", "rgb(153, 0, 0)", "rgb(180, 95, 6)", "rgb(191, 144, 0)", "rgb(56, 118, 29)", "rgb(19, 79, 92)", "rgb(17, 85, 204)", "rgb(11, 83, 148)", "rgb(53, 28, 117)", "rgb(116, 27, 71)", "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)", "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]]
                        })
                    })
            },
            util.tomedia = function(a, b) {
                if (0 == a.indexOf("http://") || 0 == a.indexOf("https://") || 0 == a.indexOf("./resource")) return a;
                if (0 == a.indexOf("./addons")) {
                    var c = window.document.location.href,
                        d = window.document.location.pathname,
                        e = c.indexOf(d),
                        f = c.substring(0, e);
                    return "." == a.substr(0, 1) && (a = a.substr(1)),
                    f + a
                }
                return b ? window.sysinfo.attachurl_local + a: window.sysinfo.attachurl + a
            },
            util.clip = function(a, b) {
                require(["clipboard"],
                    function(c) {
                        var d = new c(a, {
                            text: function() {
                                return b
                            }
                        });
                        d.on("success",
                            function(a) {
                                util.message("复制成功", "", "success"),
                                    a.clearSelection()
                            }),
                            d.on("error",
                                function(a) {
                                    util.message("复制失败，请重试", "", "error")
                                })
                    })
            },
            util.uploadMultiPictures = function(a, b) {
                var c = {
                    type: "image",
                    tabs: {
                        upload: "active",
                        browser: "",
                        crawler: ""
                    },
                    path: "",
                    direct: !1,
                    multiple: !0,
                    dest_dir: ""
                };
                c = $.extend({},
                    c, b),
                    require(["fileUploader"],
                        function(b) {
                            b.show(function(b) {
                                    if (b.length > 0) {
                                        for (i in b) b[i].filename = b[i].attachment;
                                        $.isFunction(a) && a(b)
                                    }
                                },
                                c)
                        })
            },
            util.editor = function(a, b) {
                if (!a && "" != a) return "";
                var c = "string" == typeof a ? a: a.id;
                c || (c = "editor-" + Math.random(), a.id = c);
                var d = {
                    height: "200",
                    dest_dir: "",
                    image_limit: "1024",
                    allow_upload_video: 1,
                    audio_limit: "1024",
                    callback: null
                };
                $.isFunction(b) && (b = {
                    callback: b
                }),
                    b = $.extend({},
                        d, b),
                    window.UEDITOR_HOME_URL = window.sysinfo.siteroot + "web/resource/components/ueditor/";
                var e = function(d, e) {
                    var f = {
                            autoClearinitialContent: !1,
                            toolbars: [["fullscreen", "source", "preview", "|", "bold", "italic", "underline", "strikethrough", "forecolor", "backcolor", "|", "justifyleft", "justifycenter", "justifyright", "|", "insertorderedlist", "insertunorderedlist", "blockquote", "emotion", "link", "removeformat", "|", "rowspacingtop", "rowspacingbottom", "lineheight", "indent", "paragraph", "fontfamily", "fontsize", "|", "inserttable", "deletetable", "insertparagraphbeforetable", "insertrow", "deleterow", "insertcol", "deletecol", "mergecells", "mergeright", "mergedown", "splittocells", "splittorows", "splittocols", "|", "anchor", "map", "print", "drafts"]],
                            elementPathEnabled: !1,
                            catchRemoteImageEnable: !1,
                            initialFrameHeight: b.height,
                            focus: !1,
                            maximumWords: 9999999999999
                        },
                        g = {
                            type: "image",
                            direct: !1,
                            multiple: !0,
                            tabs: {
                                upload: "active",
                                browser: "",
                                crawler: ""
                            },
                            path: "",
                            dest_dir: b.dest_dir,
                            global: !1,
                            thumb: !1,
                            width: 0,
                            fileSizeLimit: 1024 * b.image_limit
                        };
                    if (d.registerUI("myinsertimage",
                            function(a, b) {
                                a.registerCommand(b, {
                                    execCommand: function() {
                                        e.show(function(b) {
                                                if (0 != b.length) if (1 == b.length) a.execCommand("insertimage", {
                                                    src: b[0].url,
                                                    _src: b[0].attachment,
                                                    width: "100%",
                                                    alt: b[0].filename
                                                });
                                                else {
                                                    var c = [];
                                                    for (i in b) c.push({
                                                        src: b[i].url,
                                                        _src: b[i].attachment,
                                                        width: "100%",
                                                        alt: b[i].filename
                                                    });
                                                    a.execCommand("insertimage", c)
                                                }
                                            },
                                            g)
                                    }
                                });
                                var c = new d.ui.Button({
                                    name: "插入图片",
                                    title: "插入图片",
                                    cssRules: "background-position: -726px -77px",
                                    onclick: function() {
                                        a.execCommand(b)
                                    }
                                });
                                return a.addListener("selectionchange",
                                    function() {
                                        var d = a.queryCommandState(b); - 1 == d ? (c.setDisabled(!0), c.setChecked(!1)) : (c.setDisabled(!1), c.setChecked(d))
                                    }),
                                    c
                            },
                            19), d.registerUI("myinsertvideo",
                            function(a, c) {
                                a.registerCommand(c, {
                                    execCommand: function() {
                                        e.show(function(b) {
                                                if (b) {
                                                    var c = b.isRemote ? "iframe": "video";
                                                    a.execCommand("insertvideo", {
                                                            url: b.url,
                                                            width: 300,
                                                            height: 200
                                                        },
                                                        c)
                                                }
                                            },
                                            {
                                                fileSizeLimit: 1024 * b.audio_limit,
                                                type: "video",
                                                allowUploadVideo: b.allow_upload_video
                                            })
                                    }
                                });
                                var f = new d.ui.Button({
                                    name: "插入视频",
                                    title: "插入视频",
                                    cssRules: "background-position: -320px -20px",
                                    onclick: function() {
                                        a.execCommand(c)
                                    }
                                });
                                return a.addListener("selectionchange",
                                    function() {
                                        var b = a.queryCommandState(c); - 1 == b ? (f.setDisabled(!0), f.setChecked(!1)) : (f.setDisabled(!1), f.setChecked(b))
                                    }),
                                    f
                            },
                            20), c) {
                        var h = d.getEditor(c, f);
                        $("#" + c).removeClass("form-control"),
                            $("#" + c).data("editor", h),
                            $("#" + c).parents("form").submit(function() {
                                h.queryCommandState("source") && h.execCommand("source")
                            }),
                        $.isFunction(b.callback) && b.callback(a, h)
                    }
                };
                require(["ueditor", "fileUploader"],
                    function(a, b) {
                        e(a, b)
                    },
                    function(a) {
                        var b = a.requireModules && a.requireModules[0];
                        "ueditor" === b && (requirejs.undef(b), requirejs.config({
                            paths: {
                                ueditor: "../../components/ueditor/ueditor.all.min"
                            },
                            shim: {
                                ueditor: {
                                    deps: ["../components/ueditor/third-party/zeroclipboard/ZeroClipboard.min.js", "../components/ueditor/ueditor.config.js"],
                                    exports: "UE",
                                    init: function(a) {
                                        window.ZeroClipboard = a
                                    }
                                }
                            }
                        }), require(["ueditor", "fileUploader"],
                            function(a, b) {
                                e(a, b)
                            }))
                    })
            },
            util.loading = function() {
                var a = "modal-loading",
                    b = $("#" + a);
                return 0 == b.length && ($(document.body).append('<div id="' + a + '" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true"></div>'), b = $("#" + a), html = '<div class="modal-dialog">	<div style="text-align:center; background-color: transparent;">		<img style="width:48px; height:48px; margin-top:100px;" src="../attachment/images/global/loading.gif" title="正在努力加载...">	</div></div>', b.html(html), b.modal("show"), b.next().css("z-index", 999999)),
                    b
            },
            util.loaded = function() {
                var a = "modal-loading",
                    b = $("#" + a);
                b.length > 0 && (b.modal("hide"), b.hide())
            },
            util.dialog = function(a, b, c, d) {
                d || (d = {}),
                d.containerName || (d.containerName = "modal-message");
                var e = $("#" + d.containerName);
                if (0 == e.length && ($(document.body).append('<div id="' + d.containerName + '" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true"></div>'), e = $("#" + d.containerName)), html = '<div class="modal-dialog we7-modal-dialog">	<div class="modal-content">', a && (html += '<div class="modal-header">	<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>	<h3>' + a + "</h3></div>"), b && ($.isArray(b) ? html += '<div class="modal-body">正在加载中</div>': html += '<div class="modal-body">' + b + "</div>"), c && (html += '<div class="modal-footer">' + c + "</div>"), html += "	</div></div>", e.html(html), b && $.isArray(b)) {
                    var f = function(a) {
                        e.find(".modal-body").html(a)
                    };
                    2 == b.length ? $.post(b[0], b[1]).success(f) : $.get(b[0]).success(f)
                }
                return e
            },
            util.message = function(a, b, c) {
                b || c || (c = "info"),
                -1 == $.inArray(c, ["success", "error", "info", "warning"]) && (c = ""),
                "" == c && (c = "" == b ? "error": "success");
                var d = {
                        success: "right-sign",
                        error: "error-sign",
                        danger: "error-sign",
                        info: "info-sign",
                        warning: "warning-sign"
                    },
                    e = "";
                if (b && b.length > 0) {
                    if ("success" == c) {
                        var f = new Object;
                        return f.type = c,
                            f.msg = a,
                            util.cookie.set("message", JSON.stringify(f), 600),
                            "back" == b ? window.history.back( - 1) : "refresh" == b ? (b = location.href, window.location.href = b) : window.location.href = b
                    }
                    "back" == b ? b = "javascript:history.back(-1)": "refresh" == b && (b = location.href);
                    var g = "			<a href=" + b + ' class="btn btn-primary">确认</a>'
                } else var g = '			<button type="button" class="btn btn-primary" data-dismiss="modal">确认</button>';
                var h = '			<div class="text-center">				<p>					<i class="text-' + c + " wi wi-" + d[c] + '"></i>' + a + "				</p>" + e + '			</div>			<div class="clearfix"></div>',
                    i = util.dialog("系统提示", h, g, {
                        containerName: "modal-message"
                    });
                return b && b.length > 0 && "success" != c && i.on("hidden.bs.modal",
                    function() {
                        return window.location.href = b
                    }),
                    i.on("hidden.bs.modal",
                        function() {
                            $("body").css("padding-right", 0)
                        }),
                    i.modal("show"),
                    i
            },
            util.cookie_message = function(time) {
                var message = util.cookie.get("message");
                if (message) {
                    var del = util.cookie.del("message");
                    message = eval("(" + message + ")");
                    var msg = message.msg;
                    msg = decodeURIComponent(msg),
                        util.modal_message(message.title, msg, message.redirect, message.type, time)
                }
            },
            util.modal_message = function(a, b, c, d, e) {
                function f() {
                    setTimeout(function() {
                            l.modal("hide")
                        },
                        1e3 * e)
                }
                if (!c || getQuery(c) == getQuery(window.location.href)) {
                    var g = {
                            success: "right-sign",
                            error: "error-sign",
                            danger: "error-sign",
                            info: "info-sign",
                            warning: "warning-sign"
                        },
                        h = !1,
                        i = "";
                    d || (d = "info"),
                    -1 == $.inArray(d, ["success", "error", "info", "warning", "danger"]) && (d = ""),
                    "" == d && (d = "success"),
                    -1 != $.inArray(d, ["success"]) && (h = !0, e = e ? e: 3);
                    var j = '			<div class="text-center">					<i class="text-' + d + " wi wi-" + g[d] + '"></i>' + b + '			</div>			<div class="clearfix"></div>';
                    h || (c = c ? c: "./?refresh", a = a ? a: "系统提示", i = '		<a href="' + c + '" class="btn btn-primary">确认</a>');
                    var k = Math.floor(1e4 * Math.random()),
                        l = util.dialog(a, j, i, {
                            containerName: "modal-message-" + k
                        });
                    return h ? (l.modal({
                        backdrop: !1
                    }), l.addClass("modal-" + d), l.on("show.bs.modal",
                        function() {
                            f()
                        }), l.on("hidden.bs.modal",
                        function() {
                            l.remove()
                        })) : l.on("hidden.bs.modal",
                        function() {
                            return window.location.href = c
                        }),
                        l.modal("show"),
                        l
                }
            },
            util.map = function(a, b) {
                function c(a) {
                    e.getPoint(a,
                        function(a) {
                            map.panTo(a),
                                marker.setPosition(a),
                                marker.setAnimation(BMAP_ANIMATION_BOUNCE),
                                setTimeout(function() {
                                        marker.setAnimation(null)
                                    },
                                    3600)
                        })
                }
                a || (a = {}),
                a.lng || (a.lng = 116.403851),
                a.lat || (a.lat = 39.915177);
                var d = new BMap.Point(a.lng, a.lat),
                    e = new BMap.Geocoder,
                    f = $("#map-dialog");
                if (0 == f.length) {
                    var g = '<div class="form-group"><div class="input-group"><input type="text" class="form-control" placeholder="请输入地址来直接查找相关位置"><div class="input-group-btn"><button class="btn btn-default"><i class="icon-search"></i> 搜索</button></div></div></div><div id="map-container" style="height:400px;"></div>',
                        h = '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button><button type="button" class="btn btn-primary">确认</button>';
                    f = util.dialog("请选择地点", g, h, {
                        containerName: "map-dialog"
                    }),
                        f.find(".modal-dialog").css("width", "80%"),
                        f.modal({
                            keyboard: !1
                        }),
                        map = util.map.instance = new BMap.Map("map-container"),
                        map.centerAndZoom(d, 12),
                        map.enableScrollWheelZoom(),
                        map.enableDragging(),
                        map.enableContinuousZoom(),
                        map.addControl(new BMap.NavigationControl),
                        map.addControl(new BMap.OverviewMapControl),
                        marker = util.map.marker = new BMap.Marker(d),
                        marker.setLabel(new BMap.Label("请您移动此标记，选择您的坐标！", {
                            offset: new BMap.Size(10, -20)
                        })),
                        map.addOverlay(marker),
                        marker.enableDragging(),
                        marker.addEventListener("dragend",
                            function(a) {
                                var b = marker.getPosition();
                                e.getLocation(b,
                                    function(a) {
                                        f.find(".input-group :text").val(a.address)
                                    })
                            }),
                        f.find(".input-group :text").keydown(function(a) {
                            if (13 == a.keyCode) {
                                var b = $(this).val();
                                c(b)
                            }
                        }),
                        f.find(".input-group button").click(function() {
                            var a = $(this).parent().prev().val();
                            c(a)
                        })
                }
                f.off("shown.bs.modal"),
                    f.on("shown.bs.modal",
                        function() {
                            marker.setPosition(d),
                                map.panTo(marker.getPosition())
                        }),
                    f.find("button.btn-primary").off("click"),
                    f.find("button.btn-primary").on("click",
                        function() {
                            if ($.isFunction(b)) {
                                var a = util.map.marker.getPosition();
                                e.getLocation(a,
                                    function(c) {
                                        var d = {
                                            lng: a.lng,
                                            lat: a.lat,
                                            label: c.address
                                        };
                                        b(d)
                                    })
                            }
                            f.modal("hide")
                        }),
                    f.modal("show")
            },
            util.image = function(a, b, c, d) {
                var e = {
                    type: "image",
                    direct: !1,
                    multiple: !1,
                    path: a,
                    dest_dir: "",
                    global: !1,
                    thumb: !1,
                    width: 0
                }; ! c && d && (c = d),
                    e = $.extend({},
                        e, c),
                    e.type = "image",
                    require(["fileUploader"],
                        function(a) {
                            a.show(function(a) {
                                    a && $.isFunction(b) && b(a)
                                },
                                e)
                        })
            },
            util.wechat_image = function(a, b, c) {
                var d = {
                    type: "image",
                    direct: !1,
                    multiple: !1,
                    acid: 0,
                    path: a,
                    dest_dir: "",
                    isWechat: !0
                };
                d = $.extend({},
                    d, c),
                    require(["fileUploader"],
                        function(a) {
                            a.show(function(a) {
                                    a && $.isFunction(b) && b(a)
                                },
                                d)
                        })
            },
            util.audio = function(a, b, c, d) {
                var e = {
                    type: "audio",
                    direct: !1,
                    multiple: !1,
                    path: "",
                    dest_dir: ""
                };
                a && (e.path = a),
                !c && d && (c = d),
                    e = $.extend({},
                        e, c),
                    require(["fileUploader"],
                        function(a) {
                            a.show(function(a) {
                                    a && $.isFunction(b) && b(a)
                                },
                                e)
                        })
            },
            util.wechat_audio = function(a, b, c) {
                var d = {
                    type: "voice",
                    direct: !1,
                    multiple: !1,
                    path: "",
                    dest_dir: "",
                    isWechat: !0
                };
                a && (d.path = a),
                    d = $.extend({},
                        d, c),
                    require(["fileUploader"],
                        function(a) {
                            a.show(function(a) {
                                    a && $.isFunction(b) && b(a)
                                },
                                d)
                        })
            },
            util.ajaxshow = function(a, b, c, d) {
                var e = {
                        show: !0
                    },
                    f = {},
                    g = $.extend({},
                        e, c),
                    d = $.extend({},
                        f, d),
                    h = ("function" == typeof d.confirm ? '<a href="#" class="btn btn-primary confirm">确定</a>': "") + '<a href="#" class="btn" data-dismiss="modal" aria-hidden="true">关闭</a><iframe id="_formtarget" style="display:none;" name="_formtarget"></iframe>',
                    j = util.dialog(b ? b: "系统信息", "正在加载中", h, {
                        containerName: "modal-panel-ajax"
                    });
                if ("undeinfed" != typeof g.width && g.width > 0 && j.find(".modal-dialog").css({
                        width: g.width
                    }), d) for (i in d)"function" == typeof d[i] && j.on(i, d[i]);
                var k;
                return j.find(".modal-body").load(a,
                    function(a) {
                        try {
                            k = $.parseJSON(a),
                                j.find(".modal-body").html('<div class="modal-body"><i class="pull-left fa fa-4x ' + (k.message.errno ? "fa-info-circle": "fa-check-circle") + '"></i><div class="pull-left"><p>' + k.message.message + '</p></div><div class="clearfix"></div></div>')
                        } catch(b) {
                            j.find(".modal-body").html(a)
                        }
                        $("form.ajaxfrom").each(function() {
                            $(this).attr("action", $(this).attr("action") + "&isajax=1&target=formtarget"),
                                $(this).attr("target", "_formtarget")
                        })
                    }),
                    j.on("hidden.bs.modal",
                        function() {
                            return k && k.redirect ? (location.href = k.redirect, !1) : void j.remove()
                        }),
                "function" == typeof d.confirm && j.find(".confirm", j).on("click", d.confirm),
                    j.modal(g)
            },
            util.cookie = {
                prefix: window.sysinfo ? window.sysinfo.cookie.pre: "",
                set: function(a, b, c) {
                    expires = new Date,
                        expires.setTime(expires.getTime() + 1e3 * c),
                        document.cookie = this.name(a) + "=" + escape(b) + "; expires=" + expires.toGMTString() + "; path=/"
                },
                get: function(a) {
                    for (cookie_name = this.name(a) + "=", cookie_length = document.cookie.length, cookie_begin = 0; cookie_begin < cookie_length;) {
                        if (value_begin = cookie_begin + cookie_name.length, document.cookie.substring(cookie_begin, value_begin) == cookie_name) {
                            var b = document.cookie.indexOf(";", value_begin);
                            return - 1 == b && (b = cookie_length),
                                unescape(document.cookie.substring(value_begin, b))
                        }
                        if (cookie_begin = document.cookie.indexOf(" ", cookie_begin) + 1, 0 == cookie_begin) break
                    }
                    return null
                },
                del: function(a) {
                    new Date;
                    document.cookie = this.name(a) + "=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/"
                },
                name: function(a) {
                    return this.prefix + a
                }
            },
            util.coupon = function(a, b) {
                var c = {
                    type: "all",
                    multiple: !0
                };
                c = $.extend({},
                    c, b),
                    require(["coupon"],
                        function(b) {
                            b.init(function(b) {
                                    b && $.isFunction(a) && a(b)
                                },
                                c)
                        })
            },
            util.material = function(a, b) {
                var c = {
                    type: "news",
                    multiple: !1,
                    ignore: {}
                };
                c = $.extend({},
                    c, b),
                    require(["material"],
                        function(b) {
                            b.init(function(b) {
                                    b && $.isFunction(a) && a(b)
                                },
                                c)
                        })
            },
            util.encrypt = function(a) {
                if (a = $.trim(a), "string" == typeof a && a.length > 3) {
                    for (var b = /^./,
                             c = b.exec(a), b = /.$/, d = b.exec(a)[0], e = "", f = 0; f < a.length - 2; f++) e += "*";
                    return a = c + e + d
                }
                return a
            },
            util.toast = function(a, b, c) {
                util.modal_message(c, a, "", b, "")
            },
            "function" == typeof define && define.amd ? define(function() {
                return util
            }) : window.util = util
    } (window),
    function(a, b) {
        a["util.map.content.html"] = '<div class="form-group"><div class="input-group"><input type="text" class="form-control" placeholder="请输入地址来直接查找相关位置"><div class="input-group-btn"><button class="btn btn-default"><i class="icon-search"></i> 搜索</button></div></div></div><div id="map-container" style="height:400px"></div>'
    } (this.window.util.templates = this.window.util.templates || {});