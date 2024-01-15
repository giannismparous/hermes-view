(function(){
var translateObjs = {};
function trans(a, b) {
    var c = arguments['length'] === 0x1 ? [arguments[0x0]] : Array['apply'](null, arguments);
    translateObjs[c[0x0]] = c;
    return '';
}
function regTextVar(a, b) {
    var c = ![];
    return d(b);
    function d(k, l) {
        switch (k['toLowerCase']()) {
        case 'title':
        case 'subtitle':
        case 'photo.title':
        case 'photo.description':
            var n = function () {
                switch (k['toLowerCase']()) {
                case 'title':
                case 'photo.title':
                    return 'media.label';
                case 'subtitle':
                    return 'media.data.subtitle';
                case 'photo.description':
                    return 'media.data.description';
                }
            }();
            if (n) {
                return function () {
                    var s, t;
                    var u = (l && l['viewerName'] ? this['getComponentByName'](l['viewerName']) : undefined) || this['getMainViewer']();
                    if (k['toLowerCase']()['startsWith']('photo'))
                        s = this['getByClassName']('PhotoAlbumPlayListItem')['filter'](function (w) {
                            var x = w['get']('player');
                            return x && x['get']('viewerArea') == u;
                        })['map'](function (w) {
                            return w['get']('media')['get']('playList');
                        });
                    else {
                        s = this['_getPlayListsWithViewer'](u);
                        t = j['bind'](this, u);
                    }
                    if (!c) {
                        for (var v = 0x0; v < s['length']; ++v) {
                            s[v]['bind']('changing', f, this);
                        }
                        c = !![];
                    }
                    return i['call'](this, s, n, t);
                };
            }
            break;
        case 'tour.name':
        case 'tour.description':
            return function () {
                return this['get']('data')['tour']['locManager']['trans'](k);
            };
        default:
            if (k['toLowerCase']()['startsWith']('viewer.')) {
                var o = k['split']('.');
                var p = o[0x1];
                if (p) {
                    var q = o['slice'](0x2)['join']('.');
                    return d(q, { 'viewerName': p });
                }
            } else if (k['toLowerCase']()['startsWith']('quiz.') && 'Quiz' in TDV) {
                var r = undefined;
                var n = function () {
                    switch (k['toLowerCase']()) {
                    case 'quiz.questions.answered':
                        return TDV['Quiz']['PROPERTY']['QUESTIONS_ANSWERED'];
                    case 'quiz.question.count':
                        return TDV['Quiz']['PROPERTY']['QUESTION_COUNT'];
                    case 'quiz.items.found':
                        return TDV['Quiz']['PROPERTY']['ITEMS_FOUND'];
                    case 'quiz.item.count':
                        return TDV['Quiz']['PROPERTY']['ITEM_COUNT'];
                    case 'quiz.score':
                        return TDV['Quiz']['PROPERTY']['SCORE'];
                    case 'quiz.score.total':
                        return TDV['Quiz']['PROPERTY']['TOTAL_SCORE'];
                    case 'quiz.time.remaining':
                        return TDV['Quiz']['PROPERTY']['REMAINING_TIME'];
                    case 'quiz.time.elapsed':
                        return TDV['Quiz']['PROPERTY']['ELAPSED_TIME'];
                    case 'quiz.time.limit':
                        return TDV['Quiz']['PROPERTY']['TIME_LIMIT'];
                    case 'quiz.media.items.found':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_ITEMS_FOUND'];
                    case 'quiz.media.item.count':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_ITEM_COUNT'];
                    case 'quiz.media.questions.answered':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_QUESTIONS_ANSWERED'];
                    case 'quiz.media.question.count':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_QUESTION_COUNT'];
                    case 'quiz.media.score':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_SCORE'];
                    case 'quiz.media.score.total':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_TOTAL_SCORE'];
                    case 'quiz.media.index':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_INDEX'];
                    case 'quiz.media.count':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_COUNT'];
                    case 'quiz.media.visited':
                        return TDV['Quiz']['PROPERTY']['PANORAMA_VISITED_COUNT'];
                    default:
                        var s = /quiz\.([\w_]+)\.(.+)/['exec'](k);
                        if (s) {
                            r = s[0x1];
                            switch ('quiz.' + s[0x2]) {
                            case 'quiz.score':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['SCORE'];
                            case 'quiz.score.total':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['TOTAL_SCORE'];
                            case 'quiz.media.items.found':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_ITEMS_FOUND'];
                            case 'quiz.media.item.count':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_ITEM_COUNT'];
                            case 'quiz.media.questions.answered':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_QUESTIONS_ANSWERED'];
                            case 'quiz.media.question.count':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_QUESTION_COUNT'];
                            case 'quiz.questions.answered':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['QUESTIONS_ANSWERED'];
                            case 'quiz.question.count':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['QUESTION_COUNT'];
                            case 'quiz.items.found':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['ITEMS_FOUND'];
                            case 'quiz.item.count':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['ITEM_COUNT'];
                            case 'quiz.media.score':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_SCORE'];
                            case 'quiz.media.score.total':
                                return TDV['Quiz']['OBJECTIVE_PROPERTY']['PANORAMA_TOTAL_SCORE'];
                            }
                        }
                    }
                }();
                if (n) {
                    return function () {
                        var s = this['get']('data')['quiz'];
                        if (s) {
                            if (!c) {
                                if (r != undefined)
                                    if (r == 'global') {
                                        var u = this['get']('data')['quizConfig'];
                                        var w = u['objectives'];
                                        for (var y = 0x0, A = w['length']; y < A; ++y) {
                                            s['bind'](TDV['Quiz']['EVENT_OBJECTIVE_PROPERTIES_CHANGE'], h['call'](this, w[y]['id'], n), this);
                                        }
                                    } else {
                                        s['bind'](TDV['Quiz']['EVENT_OBJECTIVE_PROPERTIES_CHANGE'], h['call'](this, r, n), this);
                                    }
                                else
                                    s['bind'](TDV['Quiz']['EVENT_PROPERTIES_CHANGE'], g['call'](this, n), this);
                                c = !![];
                            }
                            try {
                                var B = 0x0;
                                if (r != undefined) {
                                    if (r == 'global') {
                                        var u = this['get']('data')['quizConfig'];
                                        var w = u['objectives'];
                                        for (var y = 0x0, A = w['length']; y < A; ++y) {
                                            B += s['getObjective'](w[y]['id'], n);
                                        }
                                    } else {
                                        B = s['getObjective'](r, n);
                                    }
                                } else {
                                    B = s['get'](n);
                                    if (n == TDV['Quiz']['PROPERTY']['PANORAMA_INDEX'])
                                        B += 0x1;
                                }
                                return B;
                            } catch (C) {
                                return undefined;
                            }
                        }
                    };
                }
            }
            break;
        }
        return function () {
            return '';
        };
    }
    function e() {
        var k = this['get']('data');
        k['updateText'](k['translateObjs'][a]);
    }
    function f(k) {
        var l = k['data']['nextSelectedIndex'];
        if (l >= 0x0) {
            var m = k['source']['get']('items')[l];
            var n = function () {
                m['unbind']('begin', n, this);
                e['call'](this);
            };
            m['bind']('begin', n, this);
        }
    }
    function g(k) {
        return function (l) {
            if (k in l) {
                e['call'](this);
            }
        }['bind'](this);
    }
    function h(k, l) {
        return function (m, n) {
            if (k == m && l in n) {
                e['call'](this);
            }
        }['bind'](this);
    }
    function i(k, l, m) {
        for (var n = 0x0; n < k['length']; ++n) {
            var o = k[n];
            var p = o['get']('selectedIndex');
            if (p >= 0x0) {
                var q = l['split']('.');
                var r = o['get']('items')[p];
                if (m !== undefined && !m['call'](this, r))
                    continue;
                for (var s = 0x0; s < q['length']; ++s) {
                    if (r == undefined)
                        return '';
                    r = 'get' in r ? r['get'](q[s]) : r[q[s]];
                }
                return r;
            }
        }
        return '';
    }
    function j(k, l) {
        var m = l['get']('player');
        return m !== undefined && m['get']('viewerArea') == k;
    }
}
var script = {"gap":10,"id":"rootPlayer","minHeight":0,"backgroundColor":["#FFFFFF"],"start":"this.init()","data":{"history":{},"textToSpeechConfig":{"volume":1,"speechOnQuizQuestion":false,"speechOnTooltip":false,"rate":1,"speechOnInfoWindow":false,"pitch":1,"stopBackgroundAudio":false},"defaultLocale":"en","locales":{"en":"locale/en.txt"},"name":"Player1261"},"children":["this.MainViewer"],"watermark":false,"scrollBarColor":"#000000","scripts":{"getMediaFromPlayer":TDV.Tour.Script.getMediaFromPlayer,"setOverlaysVisibilityByTags":TDV.Tour.Script.setOverlaysVisibilityByTags,"getAudioByTags":TDV.Tour.Script.getAudioByTags,"setOverlaysVisibility":TDV.Tour.Script.setOverlaysVisibility,"getPlayListItemByMedia":TDV.Tour.Script.getPlayListItemByMedia,"initAnalytics":TDV.Tour.Script.initAnalytics,"getPixels":TDV.Tour.Script.getPixels,"downloadFile":TDV.Tour.Script.downloadFile,"setPanoramaCameraWithCurrentSpot":TDV.Tour.Script.setPanoramaCameraWithCurrentSpot,"startModel3DWithCameraSpot":TDV.Tour.Script.startModel3DWithCameraSpot,"quizStart":TDV.Tour.Script.quizStart,"setPanoramaCameraWithSpot":TDV.Tour.Script.setPanoramaCameraWithSpot,"toggleTextToSpeechComponent":TDV.Tour.Script.toggleTextToSpeechComponent,"initOverlayGroupRotationOnClick":TDV.Tour.Script.initOverlayGroupRotationOnClick,"getPlayListItemIndexByMedia":TDV.Tour.Script.getPlayListItemIndexByMedia,"quizFinish":TDV.Tour.Script.quizFinish,"openEmbeddedPDF":TDV.Tour.Script.openEmbeddedPDF,"getMediaWidth":TDV.Tour.Script.getMediaWidth,"triggerOverlay":TDV.Tour.Script.triggerOverlay,"setDirectionalPanoramaAudio":TDV.Tour.Script.setDirectionalPanoramaAudio,"getMediaHeight":TDV.Tour.Script.getMediaHeight,"autotriggerAtStart":TDV.Tour.Script.autotriggerAtStart,"quizPauseTimer":TDV.Tour.Script.quizPauseTimer,"pauseCurrentPlayers":TDV.Tour.Script.pauseCurrentPlayers,"executeAudioAction":TDV.Tour.Script.executeAudioAction,"startPanoramaWithCamera":TDV.Tour.Script.startPanoramaWithCamera,"getQuizTotalObjectiveProperty":TDV.Tour.Script.getQuizTotalObjectiveProperty,"getCurrentPlayerWithMedia":TDV.Tour.Script.getCurrentPlayerWithMedia,"getCurrentPlayers":TDV.Tour.Script.getCurrentPlayers,"textToSpeech":TDV.Tour.Script.textToSpeech,"pauseGlobalAudio":TDV.Tour.Script.pauseGlobalAudio,"pauseGlobalAudiosWhilePlayItem":TDV.Tour.Script.pauseGlobalAudiosWhilePlayItem,"getModel3DInnerObject":TDV.Tour.Script.getModel3DInnerObject,"changeOpacityWhilePlay":TDV.Tour.Script.changeOpacityWhilePlay,"getKey":TDV.Tour.Script.getKey,"startPanoramaWithModel":TDV.Tour.Script.startPanoramaWithModel,"changeBackgroundWhilePlay":TDV.Tour.Script.changeBackgroundWhilePlay,"quizResumeTimer":TDV.Tour.Script.quizResumeTimer,"startMeasurement":TDV.Tour.Script.startMeasurement,"executeJS":TDV.Tour.Script.executeJS,"setMainMediaByName":TDV.Tour.Script.setMainMediaByName,"setPlayListSelectedIndex":TDV.Tour.Script.setPlayListSelectedIndex,"initQuiz":TDV.Tour.Script.initQuiz,"resumePlayers":TDV.Tour.Script.resumePlayers,"init":TDV.Tour.Script.init,"translate":TDV.Tour.Script.translate,"createTween":TDV.Tour.Script.createTween,"setMediaBehaviour":TDV.Tour.Script.setMediaBehaviour,"updateDeepLink":TDV.Tour.Script.updateDeepLink,"_getObjectsByTags":TDV.Tour.Script._getObjectsByTags,"getRootOverlay":TDV.Tour.Script.getRootOverlay,"setStartTimeVideo":TDV.Tour.Script.setStartTimeVideo,"changePlayListWithSameSpot":TDV.Tour.Script.changePlayListWithSameSpot,"_initSplitViewer":TDV.Tour.Script._initSplitViewer,"_initTwinsViewer":TDV.Tour.Script._initTwinsViewer,"getGlobalAudio":TDV.Tour.Script.getGlobalAudio,"executeAudioActionByTags":TDV.Tour.Script.executeAudioActionByTags,"getOverlays":TDV.Tour.Script.getOverlays,"setMainMediaByIndex":TDV.Tour.Script.setMainMediaByIndex,"setStartTimeVideoSync":TDV.Tour.Script.setStartTimeVideoSync,"getComponentByName":TDV.Tour.Script.getComponentByName,"stopGlobalAudios":TDV.Tour.Script.stopGlobalAudios,"pauseGlobalAudios":TDV.Tour.Script.pauseGlobalAudios,"visibleComponentsIfPlayerFlagEnabled":TDV.Tour.Script.visibleComponentsIfPlayerFlagEnabled,"setModel3DCameraSpot":TDV.Tour.Script.setModel3DCameraSpot,"setSurfaceSelectionHotspotMode":TDV.Tour.Script.setSurfaceSelectionHotspotMode,"executeFunctionWhenChange":TDV.Tour.Script.executeFunctionWhenChange,"skip3DTransitionOnce":TDV.Tour.Script.skip3DTransitionOnce,"updateVideoCues":TDV.Tour.Script.updateVideoCues,"stopGlobalAudio":TDV.Tour.Script.stopGlobalAudio,"cleanAllMeasurements":TDV.Tour.Script.cleanAllMeasurements,"getOverlaysByGroupname":TDV.Tour.Script.getOverlaysByGroupname,"setModel3DCameraSequence":TDV.Tour.Script.setModel3DCameraSequence,"resumeGlobalAudios":TDV.Tour.Script.resumeGlobalAudios,"getOverlaysByTags":TDV.Tour.Script.getOverlaysByTags,"stopMeasurement":TDV.Tour.Script.stopMeasurement,"getPanoramaOverlayByName":TDV.Tour.Script.getPanoramaOverlayByName,"playAudioList":TDV.Tour.Script.playAudioList,"setLocale":TDV.Tour.Script.setLocale,"getPanoramaOverlaysByTags":TDV.Tour.Script.getPanoramaOverlaysByTags,"clone":TDV.Tour.Script.clone,"isCardboardViewMode":TDV.Tour.Script.isCardboardViewMode,"updateMediaLabelFromPlayList":TDV.Tour.Script.updateMediaLabelFromPlayList,"toggleMeasurement":TDV.Tour.Script.toggleMeasurement,"isPanorama":TDV.Tour.Script.isPanorama,"setMeasurementsVisibility":TDV.Tour.Script.setMeasurementsVisibility,"getMediaByName":TDV.Tour.Script.getMediaByName,"setObjectsVisibility":TDV.Tour.Script.setObjectsVisibility,"shareSocial":TDV.Tour.Script.shareSocial,"assignObjRecursively":TDV.Tour.Script.assignObjRecursively,"showComponentsWhileMouseOver":TDV.Tour.Script.showComponentsWhileMouseOver,"cleanSelectedMeasurements":TDV.Tour.Script.cleanSelectedMeasurements,"toggleMeasurementsVisibility":TDV.Tour.Script.toggleMeasurementsVisibility,"unregisterKey":TDV.Tour.Script.unregisterKey,"setObjectsVisibilityByID":TDV.Tour.Script.setObjectsVisibilityByID,"stopTextToSpeech":TDV.Tour.Script.stopTextToSpeech,"getActiveMediaWithViewer":TDV.Tour.Script.getActiveMediaWithViewer,"cloneBindings":TDV.Tour.Script.cloneBindings,"getStateTextToSpeech":TDV.Tour.Script.getStateTextToSpeech,"setCameraSameSpotAsMedia":TDV.Tour.Script.setCameraSameSpotAsMedia,"clonePanoramaCamera":TDV.Tour.Script.clonePanoramaCamera,"registerKey":TDV.Tour.Script.registerKey,"sendAnalyticsData":TDV.Tour.Script.sendAnalyticsData,"historyGoBack":TDV.Tour.Script.historyGoBack,"showPopupMedia":TDV.Tour.Script.showPopupMedia,"getMediaByTags":TDV.Tour.Script.getMediaByTags,"setMapLocation":TDV.Tour.Script.setMapLocation,"mixObject":TDV.Tour.Script.mixObject,"playGlobalAudioWhilePlayActiveMedia":TDV.Tour.Script.playGlobalAudioWhilePlayActiveMedia,"showPopupImage":TDV.Tour.Script.showPopupImage,"existsKey":TDV.Tour.Script.existsKey,"setObjectsVisibilityByTags":TDV.Tour.Script.setObjectsVisibilityByTags,"keepCompVisible":TDV.Tour.Script.keepCompVisible,"setMeasurementUnits":TDV.Tour.Script.setMeasurementUnits,"playGlobalAudioWhilePlay":TDV.Tour.Script.playGlobalAudioWhilePlay,"setComponentVisibility":TDV.Tour.Script.setComponentVisibility,"_initItemWithComps":TDV.Tour.Script._initItemWithComps,"copyObjRecursively":TDV.Tour.Script.copyObjRecursively,"restartTourWithoutInteraction":TDV.Tour.Script.restartTourWithoutInteraction,"htmlToPlainText":TDV.Tour.Script.htmlToPlainText,"setComponentsVisibilityByTags":TDV.Tour.Script.setComponentsVisibilityByTags,"syncPlaylists":TDV.Tour.Script.syncPlaylists,"fixTogglePlayPauseButton":TDV.Tour.Script.fixTogglePlayPauseButton,"setValue":TDV.Tour.Script.setValue,"historyGoForward":TDV.Tour.Script.historyGoForward,"getActivePlayerWithViewer":TDV.Tour.Script.getActivePlayerWithViewer,"copyToClipboard":TDV.Tour.Script.copyToClipboard,"_initTTSTooltips":TDV.Tour.Script._initTTSTooltips,"setOverlayBehaviour":TDV.Tour.Script.setOverlayBehaviour,"_getPlayListsWithViewer":TDV.Tour.Script._getPlayListsWithViewer,"playGlobalAudio":TDV.Tour.Script.playGlobalAudio,"getActivePlayersWithViewer":TDV.Tour.Script.getActivePlayersWithViewer,"getMainViewer":TDV.Tour.Script.getMainViewer,"openLink":TDV.Tour.Script.openLink,"stopAndGoCamera":TDV.Tour.Script.stopAndGoCamera,"getComponentsByTags":TDV.Tour.Script.getComponentsByTags,"getPlayListWithItem":TDV.Tour.Script.getPlayListWithItem,"quizSetItemFound":TDV.Tour.Script.quizSetItemFound,"loadFromCurrentMediaPlayList":TDV.Tour.Script.loadFromCurrentMediaPlayList,"textToSpeechComponent":TDV.Tour.Script.textToSpeechComponent,"quizShowQuestion":TDV.Tour.Script.quizShowQuestion,"showPopupPanoramaOverlay":TDV.Tour.Script.showPopupPanoramaOverlay,"quizShowScore":TDV.Tour.Script.quizShowScore,"getFirstPlayListWithMedia":TDV.Tour.Script.getFirstPlayListWithMedia,"takeScreenshot":TDV.Tour.Script.takeScreenshot,"showPopupPanoramaVideoOverlay":TDV.Tour.Script.showPopupPanoramaVideoOverlay,"showWindow":TDV.Tour.Script.showWindow,"quizShowTimeout":TDV.Tour.Script.quizShowTimeout,"setEndToItemIndex":TDV.Tour.Script.setEndToItemIndex,"getPlayListsWithMedia":TDV.Tour.Script.getPlayListsWithMedia,"getPlayListItems":TDV.Tour.Script.getPlayListItems},"hash": "ddf104ab3f94c88cae7878a7f24ba710406e39c80ac4be31d88ba99ebfe93a23", "definitions": [{"id":"model_021351E5_0EB0_C691_419A_C0E4035CBAE5","surfaceSelectionCoef":2,"label":trans('model_021351E5_0EB0_C691_419A_C0E4035CBAE5.label'),"backgroundColor":"#333333","lights":["this.light_02099299_0EB0_CABE_41A4_28CEE62AAACA","this.light_020F4299_0EB0_CABE_4182_03A7DE867C6B"],"objects":["this.model_021351E5_0EB0_C691_419A_C0E4035CBAE5_0","this.model_021351E5_0EB0_C691_419A_C0E4035CBAE5_1","this.model_021351E5_0EB0_C691_419A_C0E4035CBAE5_2","this.model_021351E5_0EB0_C691_419A_C0E4035CBAE5_3","this.model_021351E5_0EB0_C691_419A_C0E4035CBAE5_4","this.model_021351E5_0EB0_C691_419A_C0E4035CBAE5_5"],"model":"this.res_02062295_0EB0_CAB6_418E_135829E70825","castShadow":true,"surfaceReticleRadius":0.02,"thumbnailUrl":"media/model_021351E5_0EB0_C691_419A_C0E4035CBAE5_t.jpg","class":"Model3D","data":{"showOnlyHotspotsLineSightInPanoramas":true,"showOnlyHotspotsLineSight":true,"label":"test"},"surfaceReticleMaxRadius":50,"floorRadius":3.4,"surfaceReticleMinRadius":15,"camera":"this.cam_02051295_0EB0_CAB6_4153_2A1FC5228E0C","environmentIntensity":0.5,"environmentURL":"media/model_021351E5_0EB0_C691_419A_C0E4035CBAE5/bg_020D2299_0EB0_CABE_41A6_2169AF2AFA9E.jpg"},{"id":"MainViewerModel3DPlayer","class":"Model3DPlayer","viewerArea":"this.MainViewer"},{"id":"MainViewer","playbackBarLeft":0,"surfaceReticleSelectionColor":"#FFFFFF","playbackBarHeadShadowColor":"#000000","playbackBarHeadHeight":15,"progressBorderColor":"#000000","playbackBarHeadBorderRadius":0,"data":{"name":"Main Viewer"},"progressBarBackgroundColor":["#3399FF"],"subtitlesFontFamily":"Arial","playbackBarHeadBackgroundColorRatios":[0,1],"playbackBarHeadShadow":true,"subtitlesBottom":50,"playbackBarHeadBorderSize":0,"progressBarBorderSize":0,"playbackBarHeadShadowBlurRadius":3,"progressBackgroundColor":["#000000"],"playbackBarHeadBorderColor":"#000000","playbackBarHeadBackgroundColor":["#111111","#666666"],"subtitlesTextShadowColor":"#000000","propagateClick":false,"progressBottom":10,"vrPointerColor":"#FFFFFF","playbackBarBottom":5,"playbackBarBorderSize":0,"subtitlesTop":0,"toolTipPaddingBottom":4,"toolTipBorderColor":"#767676","subtitlesFontSize":"3vmin","toolTipBackgroundColor":"#F6F6F6","subtitlesBackgroundColor":"#000000","height":"100%","playbackBarHeight":10,"playbackBarBackgroundColor":["#FFFFFF"],"progressBorderRadius":2,"progressLeft":"33%","subtitlesBackgroundOpacity":0.2,"playbackBarHeadWidth":6,"vrThumbstickRotationStep":20,"subtitlesTextShadowOpacity":1,"subtitlesTextShadowHorizontalLength":1,"playbackBarProgressBorderSize":0,"minHeight":50,"minWidth":100,"playbackBarBackgroundColorDirection":"vertical","toolTipTextShadowColor":"#000000","playbackBarProgressBorderRadius":0,"toolTipPaddingRight":6,"playbackBarRight":0,"progressHeight":2,"toolTipShadowColor":"#333138","playbackBarHeadShadowOpacity":0.7,"toolTipFontSize":"1.11vmin","progressBackgroundColorRatios":[0],"playbackBarProgressBackgroundColor":["#3399FF"],"toolTipFontFamily":"Arial","width":"100%","surfaceReticleColor":"#FFFFFF","toolTipPaddingLeft":6,"playbackBarBackgroundOpacity":1,"progressRight":"33%","progressOpacity":0.7,"progressBarBackgroundColorDirection":"horizontal","playbackBarProgressBackgroundColorRatios":[0],"subtitlesBorderColor":"#FFFFFF","subtitlesFontColor":"#FFFFFF","playbackBarBorderColor":"#FFFFFF","subtitlesGap":0,"vrPointerSelectionColor":"#FF6600","subtitlesTextShadowVerticalLength":1,"toolTipPaddingTop":4,"vrPointerSelectionTime":2000,"playbackBarBorderRadius":0,"class":"ViewerArea","progressBorderSize":0,"progressBarBorderColor":"#000000","toolTipFontColor":"#606060","progressBarBackgroundColorRatios":[0],"playbackBarProgressBorderColor":"#000000","firstTransitionDuration":0,"progressBarBorderRadius":2},{"id":"mainPlayList","class":"PlayList","items":[{"end":"this.trigger('tourEnded')","class":"Model3DPlayListItem","player":"this.MainViewerModel3DPlayer","start":"this.MainViewerModel3DPlayer.set('displayPlaybackBar', true)","media":"this.model_021351E5_0EB0_C691_419A_C0E4035CBAE5"}]},{"id":"light_02099299_0EB0_CABE_41A4_28CEE62AAACA","class":"OrbitLight","shadowTolerance":2,"pitch":45,"yaw":-45,"intensity":0.5,"castShadow":true},{"id":"light_020F4299_0EB0_CABE_4182_03A7DE867C6B","class":"OrbitLight","shadowTolerance":2,"pitch":75,"yaw":135,"intensity":0.3,"castShadow":true},{"id":"model_021351E5_0EB0_C691_419A_C0E4035CBAE5_0","objectId":"0","class":"InnerModel3DObject","data":{"label":"image0"}},{"id":"model_021351E5_0EB0_C691_419A_C0E4035CBAE5_1","objectId":"1","class":"InnerModel3DObject","data":{"label":"image1"}},{"id":"model_021351E5_0EB0_C691_419A_C0E4035CBAE5_2","objectId":"2","class":"InnerModel3DObject","data":{"label":"image2"}},{"id":"model_021351E5_0EB0_C691_419A_C0E4035CBAE5_3","objectId":"3","class":"InnerModel3DObject","data":{"label":"image3"}},{"id":"model_021351E5_0EB0_C691_419A_C0E4035CBAE5_4","objectId":"4","class":"InnerModel3DObject","data":{"label":"image4"}},{"id":"model_021351E5_0EB0_C691_419A_C0E4035CBAE5_5","objectId":"5","class":"InnerModel3DObject","data":{"label":"image4.001"}},{"id":"res_02062295_0EB0_CAB6_418E_135829E70825","levels":[{"url":"media/model_021351E5_0EB0_C691_419A_C0E4035CBAE5/scene.glb","class":"Model3DResourceLevel"},{"url":"media/model_021351E5_0EB0_C691_419A_C0E4035CBAE5/scene_mobile.glb","class":"Model3DResourceLevel","tags":"mobile"}],"class":"Model3DResource"},{"id":"cam_02051295_0EB0_CAB6_4153_2A1FC5228E0C","maxY":9.58,"maxZ":5.01,"autoNearFar":true,"minY":-11.71,"initialX":0.46,"initialPitch":-30,"minDistance":1.46,"maxX":5.56,"minZ":-4.88,"class":"OrbitModel3DCamera","initialY":-1.06,"initialDistance":5.83,"minX":-4.63,"initialZ":0.06,"maxDistance":11.66}],"propagateClick":false,"backgroundColorRatios":[0],"scrollBarMargin":2,"height":"100%","layout":"absolute","width":"100%","class":"Player","defaultMenu":["fullscreen","mute","rotation"],"minWidth":0};
if (script['data'] == undefined)
    script['data'] = {};
script['data']['translateObjs'] = translateObjs;
script['data']['createQuizConfig'] = function () {
    var a = {};
    this['get']('data')['translateObjs'] = translateObjs;
    return a;
};
TDV['PlayerAPI']['defineScript'](script);
//# sourceMappingURL=script_device_v2023.2.0.js.map
})();
//Generated with v2023.2.0, Mon Jan 15 2024