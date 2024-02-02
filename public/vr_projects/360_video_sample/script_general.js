(function(){
var translateObjs = {};
function trans(c, d) {
    var e = arguments['length'] === 0x1 ? [arguments[0x0]] : Array['apply'](null, arguments);
    translateObjs[e[0x0]] = e;
    return '';
}
function regTextVar(f, g) {
    var h = ![];
    return i(g);
    function i(p, q) {
        switch (p['toLowerCase']()) {
        case 'title':
        case 'subtitle':
        case 'photo.title':
        case 'photo.description':
            var s = function () {
                switch (p['toLowerCase']()) {
                case 'title':
                case 'photo.title':
                    return 'media.label';
                case 'subtitle':
                    return 'media.data.subtitle';
                case 'photo.description':
                    return 'media.data.description';
                }
            }();
            if (s) {
                return function () {
                    var x, y;
                    var z = (q && q['viewerName'] ? this['getComponentByName'](q['viewerName']) : undefined) || this['getMainViewer']();
                    if (p['toLowerCase']()['startsWith']('photo'))
                        x = this['getByClassName']('PhotoAlbumPlayListItem')['filter'](function (B) {
                            var C = B['get']('player');
                            return C && C['get']('viewerArea') == z;
                        })['map'](function (D) {
                            return D['get']('media')['get']('playList');
                        });
                    else {
                        x = this['_getPlayListsWithViewer'](z);
                        y = o['bind'](this, z);
                    }
                    if (!h) {
                        for (var A = 0x0; A < x['length']; ++A) {
                            x[A]['bind']('changing', k, this);
                        }
                        h = !![];
                    }
                    return n['call'](this, x, s, y);
                };
            }
            break;
        case 'tour.name':
        case 'tour.description':
            return function () {
                return this['get']('data')['tour']['locManager']['trans'](p);
            };
        default:
            if (p['toLowerCase']()['startsWith']('viewer.')) {
                var t = p['split']('.');
                var u = t[0x1];
                if (u) {
                    var v = t['slice'](0x2)['join']('.');
                    return i(v, { 'viewerName': u });
                }
            } else if (p['toLowerCase']()['startsWith']('quiz.') && 'Quiz' in TDV) {
                var w = undefined;
                var s = function () {
                    switch (p['toLowerCase']()) {
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
                        var E = /quiz\.([\w_]+)\.(.+)/['exec'](p);
                        if (E) {
                            w = E[0x1];
                            switch ('quiz.' + E[0x2]) {
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
                if (s) {
                    return function () {
                        var F = this['get']('data')['quiz'];
                        if (F) {
                            if (!h) {
                                if (w != undefined)
                                    if (w == 'global') {
                                        var H = this['get']('data')['quizConfig'];
                                        var J = H['objectives'];
                                        for (var L = 0x0, N = J['length']; L < N; ++L) {
                                            F['bind'](TDV['Quiz']['EVENT_OBJECTIVE_PROPERTIES_CHANGE'], m['call'](this, J[L]['id'], s), this);
                                        }
                                    } else {
                                        F['bind'](TDV['Quiz']['EVENT_OBJECTIVE_PROPERTIES_CHANGE'], m['call'](this, w, s), this);
                                    }
                                else
                                    F['bind'](TDV['Quiz']['EVENT_PROPERTIES_CHANGE'], l['call'](this, s), this);
                                h = !![];
                            }
                            try {
                                var O = 0x0;
                                if (w != undefined) {
                                    if (w == 'global') {
                                        var H = this['get']('data')['quizConfig'];
                                        var J = H['objectives'];
                                        for (var L = 0x0, N = J['length']; L < N; ++L) {
                                            O += F['getObjective'](J[L]['id'], s);
                                        }
                                    } else {
                                        O = F['getObjective'](w, s);
                                    }
                                } else {
                                    O = F['get'](s);
                                    if (s == TDV['Quiz']['PROPERTY']['PANORAMA_INDEX'])
                                        O += 0x1;
                                }
                                return O;
                            } catch (P) {
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
    function j() {
        var Q = this['get']('data');
        Q['updateText'](Q['translateObjs'][f]);
    }
    function k(R) {
        var S = R['data']['nextSelectedIndex'];
        if (S >= 0x0) {
            var T = R['source']['get']('items')[S];
            var U = function () {
                T['unbind']('begin', U, this);
                j['call'](this);
            };
            T['bind']('begin', U, this);
        }
    }
    function l(V) {
        return function (W) {
            if (V in W) {
                j['call'](this);
            }
        }['bind'](this);
    }
    function m(X, Y) {
        return function (Z, a0) {
            if (X == Z && Y in a0) {
                j['call'](this);
            }
        }['bind'](this);
    }
    function n(a1, a2, a3) {
        for (var a4 = 0x0; a4 < a1['length']; ++a4) {
            var a5 = a1[a4];
            var a6 = a5['get']('selectedIndex');
            if (a6 >= 0x0) {
                var a7 = a2['split']('.');
                var a8 = a5['get']('items')[a6];
                if (a3 !== undefined && !a3['call'](this, a8))
                    continue;
                for (var a9 = 0x0; a9 < a7['length']; ++a9) {
                    if (a8 == undefined)
                        return '';
                    a8 = 'get' in a8 ? a8['get'](a7[a9]) : a8[a7[a9]];
                }
                return a8;
            }
        }
        return '';
    }
    function o(aa, ab) {
        var ac = ab['get']('player');
        return ac !== undefined && ac['get']('viewerArea') == aa;
    }
}
var script = {"id":"rootPlayer","minHeight":0,"children":["this.MainViewer"],"backgroundColor":["#FFFFFF"],"start":"this.init()","data":{"history":{},"defaultLocale":"en","textToSpeechConfig":{"speechOnTooltip":false,"speechOnInfoWindow":false,"volume":1,"rate":1,"speechOnQuizQuestion":false,"stopBackgroundAudio":false,"pitch":1},"locales":{"en":"locale/en.txt"},"name":"Player564"},"scrollBarMargin":2,"scripts":{"downloadFile":TDV.Tour.Script.downloadFile,"getPlayListWithItem":TDV.Tour.Script.getPlayListWithItem,"pauseGlobalAudiosWhilePlayItem":TDV.Tour.Script.pauseGlobalAudiosWhilePlayItem,"registerKey":TDV.Tour.Script.registerKey,"getPanoramaOverlaysByTags":TDV.Tour.Script.getPanoramaOverlaysByTags,"setMediaBehaviour":TDV.Tour.Script.setMediaBehaviour,"getGlobalAudio":TDV.Tour.Script.getGlobalAudio,"setMeasurementUnits":TDV.Tour.Script.setMeasurementUnits,"getPlayListItemByMedia":TDV.Tour.Script.getPlayListItemByMedia,"isCardboardViewMode":TDV.Tour.Script.isCardboardViewMode,"setMapLocation":TDV.Tour.Script.setMapLocation,"loadFromCurrentMediaPlayList":TDV.Tour.Script.loadFromCurrentMediaPlayList,"getCurrentPlayers":TDV.Tour.Script.getCurrentPlayers,"getPanoramaOverlayByName":TDV.Tour.Script.getPanoramaOverlayByName,"unregisterKey":TDV.Tour.Script.unregisterKey,"showPopupPanoramaOverlay":TDV.Tour.Script.showPopupPanoramaOverlay,"showPopupPanoramaVideoOverlay":TDV.Tour.Script.showPopupPanoramaVideoOverlay,"sendAnalyticsData":TDV.Tour.Script.sendAnalyticsData,"htmlToPlainText":TDV.Tour.Script.htmlToPlainText,"shareSocial":TDV.Tour.Script.shareSocial,"getOverlaysByGroupname":TDV.Tour.Script.getOverlaysByGroupname,"quizSetItemFound":TDV.Tour.Script.quizSetItemFound,"getCurrentPlayerWithMedia":TDV.Tour.Script.getCurrentPlayerWithMedia,"fixTogglePlayPauseButton":TDV.Tour.Script.fixTogglePlayPauseButton,"setPlayListSelectedIndex":TDV.Tour.Script.setPlayListSelectedIndex,"stopAndGoCamera":TDV.Tour.Script.stopAndGoCamera,"showWindow":TDV.Tour.Script.showWindow,"setCameraSameSpotAsMedia":TDV.Tour.Script.setCameraSameSpotAsMedia,"quizShowQuestion":TDV.Tour.Script.quizShowQuestion,"clonePanoramaCamera":TDV.Tour.Script.clonePanoramaCamera,"setObjectsVisibilityByTags":TDV.Tour.Script.setObjectsVisibilityByTags,"pauseGlobalAudio":TDV.Tour.Script.pauseGlobalAudio,"startModel3DWithCameraSpot":TDV.Tour.Script.startModel3DWithCameraSpot,"getKey":TDV.Tour.Script.getKey,"getAudioByTags":TDV.Tour.Script.getAudioByTags,"getActivePlayersWithViewer":TDV.Tour.Script.getActivePlayersWithViewer,"getOverlaysByTags":TDV.Tour.Script.getOverlaysByTags,"getQuizTotalObjectiveProperty":TDV.Tour.Script.getQuizTotalObjectiveProperty,"getPlayListItems":TDV.Tour.Script.getPlayListItems,"existsKey":TDV.Tour.Script.existsKey,"setMainMediaByName":TDV.Tour.Script.setMainMediaByName,"_getPlayListsWithViewer":TDV.Tour.Script._getPlayListsWithViewer,"setModel3DCameraSequence":TDV.Tour.Script.setModel3DCameraSequence,"isPanorama":TDV.Tour.Script.isPanorama,"setSurfaceSelectionHotspotMode":TDV.Tour.Script.setSurfaceSelectionHotspotMode,"createTween":TDV.Tour.Script.createTween,"startPanoramaWithCamera":TDV.Tour.Script.startPanoramaWithCamera,"setComponentVisibility":TDV.Tour.Script.setComponentVisibility,"getOverlays":TDV.Tour.Script.getOverlays,"autotriggerAtStart":TDV.Tour.Script.autotriggerAtStart,"_getObjectsByTags":TDV.Tour.Script._getObjectsByTags,"translate":TDV.Tour.Script.translate,"pauseGlobalAudios":TDV.Tour.Script.pauseGlobalAudios,"initQuiz":TDV.Tour.Script.initQuiz,"syncPlaylists":TDV.Tour.Script.syncPlaylists,"init":TDV.Tour.Script.init,"setComponentsVisibilityByTags":TDV.Tour.Script.setComponentsVisibilityByTags,"getMainViewer":TDV.Tour.Script.getMainViewer,"startPanoramaWithModel":TDV.Tour.Script.startPanoramaWithModel,"setLocale":TDV.Tour.Script.setLocale,"setOverlayBehaviour":TDV.Tour.Script.setOverlayBehaviour,"showComponentsWhileMouseOver":TDV.Tour.Script.showComponentsWhileMouseOver,"mixObject":TDV.Tour.Script.mixObject,"setStartTimeVideo":TDV.Tour.Script.setStartTimeVideo,"playAudioList":TDV.Tour.Script.playAudioList,"copyObjRecursively":TDV.Tour.Script.copyObjRecursively,"setDirectionalPanoramaAudio":TDV.Tour.Script.setDirectionalPanoramaAudio,"getActiveMediaWithViewer":TDV.Tour.Script.getActiveMediaWithViewer,"getModel3DInnerObject":TDV.Tour.Script.getModel3DInnerObject,"setModel3DCameraSpot":TDV.Tour.Script.setModel3DCameraSpot,"takeScreenshot":TDV.Tour.Script.takeScreenshot,"_initSplitViewer":TDV.Tour.Script._initSplitViewer,"clone":TDV.Tour.Script.clone,"changeBackgroundWhilePlay":TDV.Tour.Script.changeBackgroundWhilePlay,"getMediaHeight":TDV.Tour.Script.getMediaHeight,"startMeasurement":TDV.Tour.Script.startMeasurement,"stopMeasurement":TDV.Tour.Script.stopMeasurement,"getActivePlayerWithViewer":TDV.Tour.Script.getActivePlayerWithViewer,"quizResumeTimer":TDV.Tour.Script.quizResumeTimer,"quizPauseTimer":TDV.Tour.Script.quizPauseTimer,"setOverlaysVisibility":TDV.Tour.Script.setOverlaysVisibility,"initAnalytics":TDV.Tour.Script.initAnalytics,"setStartTimeVideoSync":TDV.Tour.Script.setStartTimeVideoSync,"toggleMeasurement":TDV.Tour.Script.toggleMeasurement,"setObjectsVisibilityByID":TDV.Tour.Script.setObjectsVisibilityByID,"assignObjRecursively":TDV.Tour.Script.assignObjRecursively,"openEmbeddedPDF":TDV.Tour.Script.openEmbeddedPDF,"playGlobalAudioWhilePlayActiveMedia":TDV.Tour.Script.playGlobalAudioWhilePlayActiveMedia,"getFirstPlayListWithMedia":TDV.Tour.Script.getFirstPlayListWithMedia,"getMediaWidth":TDV.Tour.Script.getMediaWidth,"copyToClipboard":TDV.Tour.Script.copyToClipboard,"setPanoramaCameraWithSpot":TDV.Tour.Script.setPanoramaCameraWithSpot,"keepCompVisible":TDV.Tour.Script.keepCompVisible,"getComponentByName":TDV.Tour.Script.getComponentByName,"getPlayListItemIndexByMedia":TDV.Tour.Script.getPlayListItemIndexByMedia,"historyGoForward":TDV.Tour.Script.historyGoForward,"getPlayListsWithMedia":TDV.Tour.Script.getPlayListsWithMedia,"changeOpacityWhilePlay":TDV.Tour.Script.changeOpacityWhilePlay,"getMediaFromPlayer":TDV.Tour.Script.getMediaFromPlayer,"showPopupMedia":TDV.Tour.Script.showPopupMedia,"resumePlayers":TDV.Tour.Script.resumePlayers,"playGlobalAudioWhilePlay":TDV.Tour.Script.playGlobalAudioWhilePlay,"setEndToItemIndex":TDV.Tour.Script.setEndToItemIndex,"cleanAllMeasurements":TDV.Tour.Script.cleanAllMeasurements,"changePlayListWithSameSpot":TDV.Tour.Script.changePlayListWithSameSpot,"pauseCurrentPlayers":TDV.Tour.Script.pauseCurrentPlayers,"executeFunctionWhenChange":TDV.Tour.Script.executeFunctionWhenChange,"getComponentsByTags":TDV.Tour.Script.getComponentsByTags,"resumeGlobalAudios":TDV.Tour.Script.resumeGlobalAudios,"textToSpeechComponent":TDV.Tour.Script.textToSpeechComponent,"triggerOverlay":TDV.Tour.Script.triggerOverlay,"_initItemWithComps":TDV.Tour.Script._initItemWithComps,"updateDeepLink":TDV.Tour.Script.updateDeepLink,"setValue":TDV.Tour.Script.setValue,"setPanoramaCameraWithCurrentSpot":TDV.Tour.Script.setPanoramaCameraWithCurrentSpot,"_initTwinsViewer":TDV.Tour.Script._initTwinsViewer,"quizShowScore":TDV.Tour.Script.quizShowScore,"executeJS":TDV.Tour.Script.executeJS,"stopGlobalAudios":TDV.Tour.Script.stopGlobalAudios,"setObjectsVisibility":TDV.Tour.Script.setObjectsVisibility,"cleanSelectedMeasurements":TDV.Tour.Script.cleanSelectedMeasurements,"getStateTextToSpeech":TDV.Tour.Script.getStateTextToSpeech,"skip3DTransitionOnce":TDV.Tour.Script.skip3DTransitionOnce,"playGlobalAudio":TDV.Tour.Script.playGlobalAudio,"initOverlayGroupRotationOnClick":TDV.Tour.Script.initOverlayGroupRotationOnClick,"restartTourWithoutInteraction":TDV.Tour.Script.restartTourWithoutInteraction,"quizShowTimeout":TDV.Tour.Script.quizShowTimeout,"getMediaByTags":TDV.Tour.Script.getMediaByTags,"executeAudioActionByTags":TDV.Tour.Script.executeAudioActionByTags,"getMediaByName":TDV.Tour.Script.getMediaByName,"quizStart":TDV.Tour.Script.quizStart,"quizFinish":TDV.Tour.Script.quizFinish,"updateMediaLabelFromPlayList":TDV.Tour.Script.updateMediaLabelFromPlayList,"_initTTSTooltips":TDV.Tour.Script._initTTSTooltips,"stopGlobalAudio":TDV.Tour.Script.stopGlobalAudio,"openLink":TDV.Tour.Script.openLink,"executeAudioAction":TDV.Tour.Script.executeAudioAction,"getRootOverlay":TDV.Tour.Script.getRootOverlay,"toggleTextToSpeechComponent":TDV.Tour.Script.toggleTextToSpeechComponent,"setMeasurementsVisibility":TDV.Tour.Script.setMeasurementsVisibility,"cloneBindings":TDV.Tour.Script.cloneBindings,"setOverlaysVisibilityByTags":TDV.Tour.Script.setOverlaysVisibilityByTags,"setMainMediaByIndex":TDV.Tour.Script.setMainMediaByIndex,"textToSpeech":TDV.Tour.Script.textToSpeech,"updateVideoCues":TDV.Tour.Script.updateVideoCues,"getPixels":TDV.Tour.Script.getPixels,"visibleComponentsIfPlayerFlagEnabled":TDV.Tour.Script.visibleComponentsIfPlayerFlagEnabled,"historyGoBack":TDV.Tour.Script.historyGoBack,"showPopupImage":TDV.Tour.Script.showPopupImage,"toggleMeasurementsVisibility":TDV.Tour.Script.toggleMeasurementsVisibility,"stopTextToSpeech":TDV.Tour.Script.stopTextToSpeech},"watermark":false,"propagateClick":false,"hash": "4b91452f75228e1c14f739fa7a145b84156e632ac8f03ee79dab705ab15fb3a2", "definitions": [{"id":"panorama_65A685F9_692B_540D_41B4_21C33B8C75E1_camera","class":"PanoramaCamera","initialSequence":"this.sequence_622A6078_692B_4C0B_41CD_1139104526F0","enterPointingToHorizon":true,"initialPosition":{"class":"PanoramaCameraPosition","yaw":0,"pitch":0}},{"id":"MainViewerPanoramaPlayer","arrowKeysAction":"translate","viewerArea":"this.MainViewer","class":"PanoramaPlayer","touchControlMode":"drag_rotation","aaEnabled":true,"displayPlaybackBar":true,"mouseControlMode":"drag_rotation"},{"id":"video_6711128B_693D_4C0D_41D5_DF55A1C7B783","label":trans('video_6711128B_693D_4C0D_41D5_DF55A1C7B783.label'),"thumbnailUrl":"media/video_6711128B_693D_4C0D_41D5_DF55A1C7B783_t.jpg","video":"this.videores_662D1D74_6935_541B_41D1_724F75AEF425","height":700,"data":{"label":"panorama (VR2 Edit 1)"},"width":500,"class":"Video"},{"id":"panorama_65A685F9_692B_540D_41B4_21C33B8C75E1","label":trans('panorama_65A685F9_692B_540D_41B4_21C33B8C75E1.label'),"hfovMin":"135%","thumbnailUrl":"media/panorama_65A685F9_692B_540D_41B4_21C33B8C75E1_t.jpg","data":{"label":"panorama"},"overlays":["this.overlay_674BE2D9_693D_4C0D_41C0_8FBF920725EA"],"hfovMax":130,"frames":[{"thumbnailUrl":"media/panorama_65A685F9_692B_540D_41B4_21C33B8C75E1_t.jpg","cube":{"class":"ImageResource","levels":[{"height":2048,"rowCount":4,"colCount":24,"class":"TiledImageResourceLevel","url":"media/panorama_65A685F9_692B_540D_41B4_21C33B8C75E1_0/{face}/0/{row}_{column}.jpg","width":12288,"tags":"ondemand"},{"height":1024,"rowCount":2,"colCount":12,"class":"TiledImageResourceLevel","url":"media/panorama_65A685F9_692B_540D_41B4_21C33B8C75E1_0/{face}/1/{row}_{column}.jpg","width":6144,"tags":"ondemand"},{"height":512,"rowCount":1,"colCount":6,"class":"TiledImageResourceLevel","url":"media/panorama_65A685F9_692B_540D_41B4_21C33B8C75E1_0/{face}/2/{row}_{column}.jpg","width":3072,"tags":["ondemand","preload"]}]},"class":"CubicPanoramaFrame"}],"hfov":360,"class":"Panorama","vfov":180},{"id":"MainViewer","subtitlesTextShadowOpacity":1,"toolTipBorderColor":"#767676","subtitlesBorderColor":"#FFFFFF","vrPointerColor":"#FFFFFF","progressBottom":10,"subtitlesGap":0,"progressBorderRadius":2,"playbackBarHeadShadowBlurRadius":3,"playbackBarBorderColor":"#FFFFFF","playbackBarLeft":0,"playbackBarBorderRadius":0,"data":{"name":"Main Viewer"},"toolTipFontFamily":"Arial","playbackBarProgressBorderColor":"#000000","toolTipBackgroundColor":"#F6F6F6","toolTipFontColor":"#606060","progressHeight":2,"playbackBarHeadBorderColor":"#000000","playbackBarHeadShadowColor":"#000000","progressBarBorderRadius":2,"toolTipShadowColor":"#333138","playbackBarHeadBackgroundColorRatios":[0,1],"playbackBarHeadBorderRadius":0,"toolTipPaddingRight":6,"playbackBarBorderSize":0,"playbackBarHeadBorderSize":0,"vrPointerSelectionColor":"#FF6600","progressBackgroundColorRatios":[0],"progressLeft":"33%","progressBorderSize":0,"surfaceReticleColor":"#FFFFFF","progressBarBorderSize":0,"height":"100%","playbackBarHeadShadow":true,"subtitlesBackgroundColor":"#000000","playbackBarHeadHeight":15,"vrPointerSelectionTime":2000,"vrThumbstickRotationStep":20,"toolTipTextShadowColor":"#000000","progressRight":"33%","toolTipPaddingLeft":6,"playbackBarBackgroundOpacity":1,"progressOpacity":0.7,"progressBarBackgroundColorDirection":"horizontal","minHeight":50,"toolTipPaddingBottom":4,"progressBarBorderColor":"#000000","minWidth":100,"width":"100%","progressBarBackgroundColorRatios":[0],"playbackBarHeadBackgroundColor":["#111111","#666666"],"subtitlesFontColor":"#FFFFFF","subtitlesTop":0,"playbackBarBottom":5,"surfaceReticleSelectionColor":"#FFFFFF","toolTipFontSize":"1.11vmin","propagateClick":false,"subtitlesBottom":50,"playbackBarBackgroundColor":["#FFFFFF"],"progressBorderColor":"#000000","subtitlesFontFamily":"Arial","subtitlesTextShadowHorizontalLength":1,"playbackBarHeight":10,"firstTransitionDuration":0,"playbackBarProgressBorderSize":0,"playbackBarHeadWidth":6,"playbackBarBackgroundColorDirection":"vertical","subtitlesBackgroundOpacity":0.2,"playbackBarRight":0,"progressBarBackgroundColor":["#3399FF"],"playbackBarProgressBorderRadius":0,"subtitlesTextShadowColor":"#000000","playbackBarProgressBackgroundColor":["#3399FF"],"toolTipPaddingTop":4,"subtitlesFontSize":"3vmin","subtitlesTextShadowVerticalLength":1,"playbackBarHeadShadowOpacity":0.7,"progressBackgroundColor":["#000000"],"class":"ViewerArea","playbackBarProgressBackgroundColorRatios":[0]},{"id":"mainPlayList","class":"PlayList","items":[{"player":"this.MainViewerPanoramaPlayer","end":"this.trigger('tourEnded')","camera":"this.panorama_65A685F9_692B_540D_41B4_21C33B8C75E1_camera","class":"PanoramaPlayListItem","media":"this.panorama_65A685F9_692B_540D_41B4_21C33B8C75E1"}]},{"id":"sequence_622A6078_692B_4C0B_41CD_1139104526F0","class":"PanoramaCameraSequence","movements":[{"yawSpeed":7.96,"easing":"cubic_in","class":"DistancePanoramaCameraMovement","yawDelta":18.5},{"yawSpeed":7.96,"class":"DistancePanoramaCameraMovement","yawDelta":323},{"yawSpeed":7.96,"easing":"cubic_out","class":"DistancePanoramaCameraMovement","yawDelta":18.5}]},{"id":"videores_662D1D74_6935_541B_41D1_724F75AEF425","class":"VideoResource","height":700,"width":500,"levels":["this.videolevel_66D8A054_692B_4C1B_41D3_EA841D23AC1B"]},{"image":"this.res_67D8AA5F_6935_7C05_41CB_6E40AFE7724A","id":"overlay_674BE2D9_693D_4C0D_41C0_8FBF920725EA","video":"this.videores_662D1D74_6935_541B_41D1_724F75AEF425","distance":50,"data":{"label":"Video"},"useHandCursor":true,"vertices":[{"class":"PanoramaPoint","yaw":-22.34,"pitch":11.52},{"class":"PanoramaPoint","yaw":20.99,"pitch":11.55},{"class":"PanoramaPoint","yaw":32.31,"pitch":-48.61},{"class":"PanoramaPoint","yaw":-33.93,"pitch":-48.49}],"class":"QuadVideoPanoramaOverlay","cues":[],"click":"this.overlay_674BE2D9_693D_4C0D_41C0_8FBF920725EA.play()"},{"id":"videolevel_66D8A054_692B_4C1B_41D3_EA841D23AC1B","class":"VideoResourceLevel","codec":"h264","framerate":29.97,"type":"video/mp4","posterURL":trans('videolevel_66D8A054_692B_4C1B_41D3_EA841D23AC1B.posterURL'),"height":700,"url":trans('videolevel_66D8A054_692B_4C1B_41D3_EA841D23AC1B.url'),"bitrate":786,"width":500},{"id":"res_67D8AA5F_6935_7C05_41CB_6E40AFE7724A","class":"ImageResource","levels":[{"height":700,"class":"ImageResourceLevel","url":"media/res_67D8AA5F_6935_7C05_41CB_6E40AFE7724A_0.jpg","width":500}]}],"backgroundColorRatios":[0],"width":"100%","height":"100%","defaultMenu":["fullscreen","mute","rotation"],"layout":"absolute","gap":10,"scrollBarColor":"#000000","class":"Player","minWidth":0};
if (script['data'] == undefined)
    script['data'] = {};
script['data']['translateObjs'] = translateObjs;
script['data']['createQuizConfig'] = function () {
    var ad = {};
    this['get']('data')['translateObjs'] = translateObjs;
    return ad;
};
TDV['PlayerAPI']['defineScript'](script);
//# sourceMappingURL=script_device_v2023.2.7.js.map
})();
//Generated with v2023.2.7, Fri Feb 2 2024