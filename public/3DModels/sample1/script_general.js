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
var script = {"gap":10,"propagateClick":false,"scrollBarMargin":2,"backgroundColor":["#FFFFFF"],"start":"this.init()","data":{"textToSpeechConfig":{"speechOnTooltip":false,"rate":1,"speechOnQuizQuestion":false,"volume":1,"stopBackgroundAudio":false,"speechOnInfoWindow":false,"pitch":1},"history":{},"defaultLocale":"en","name":"Player508","locales":{"en":"locale/en.txt"}},"children":["this.MainViewer"],"id":"rootPlayer","hash": "347f1c30c895fa15b859905edd884e383eba366cf22cabbf337ba4b693f11821", "definitions": [{"toolTipFontSize":"1.11vmin","progressBorderSize":0,"id":"MainViewer","progressBarBorderSize":0,"toolTipTextShadowColor":"#000000","progressBarBorderRadius":2,"subtitlesBorderColor":"#FFFFFF","playbackBarProgressBorderRadius":0,"subtitlesBackgroundOpacity":0.2,"playbackBarLeft":0,"playbackBarHeadShadowBlurRadius":3,"playbackBarProgressBackgroundColor":["#3399FF"],"data":{"name":"Main Viewer"},"playbackBarHeadHeight":15,"toolTipPaddingRight":6,"progressBackgroundColorRatios":[0],"playbackBarHeadShadowOpacity":0.7,"subtitlesTextShadowColor":"#000000","playbackBarHeadShadowColor":"#000000","toolTipPaddingBottom":4,"playbackBarHeadBackgroundColorRatios":[0,1],"playbackBarHeadBorderSize":0,"progressRight":"33%","subtitlesTextShadowOpacity":1,"minHeight":50,"minWidth":100,"progressOpacity":0.7,"toolTipBorderColor":"#767676","playbackBarHeadShadow":true,"subtitlesBottom":50,"progressBarBorderColor":"#000000","progressBarBackgroundColorDirection":"horizontal","progressBarBackgroundColorRatios":[0],"toolTipFontFamily":"Arial","playbackBarProgressBackgroundColorRatios":[0],"width":"100%","playbackBarHeadBackgroundColor":["#111111","#666666"],"playbackBarBorderColor":"#FFFFFF","progressBorderRadius":2,"playbackBarBottom":5,"playbackBarProgressBorderColor":"#000000","playbackBarBorderRadius":0,"subtitlesFontColor":"#FFFFFF","surfaceReticleColor":"#FFFFFF","surfaceReticleSelectionColor":"#FFFFFF","height":"100%","playbackBarBackgroundOpacity":1,"progressLeft":"33%","vrPointerSelectionColor":"#FF6600","subtitlesTextShadowVerticalLength":1,"progressBorderColor":"#000000","toolTipBackgroundColor":"#F6F6F6","toolTipFontColor":"#606060","toolTipPaddingTop":4,"playbackBarHeadBorderRadius":0,"playbackBarBackgroundColor":["#FFFFFF"],"playbackBarHeadBorderColor":"#000000","subtitlesBackgroundColor":"#000000","subtitlesTop":0,"subtitlesGap":0,"progressBarBackgroundColor":["#3399FF"],"subtitlesFontSize":"3vmin","playbackBarHeight":10,"playbackBarBorderSize":0,"toolTipPaddingLeft":6,"vrPointerSelectionTime":2000,"vrThumbstickRotationStep":20,"playbackBarHeadWidth":6,"subtitlesFontFamily":"Arial","playbackBarProgressBorderSize":0,"progressBackgroundColor":["#000000"],"firstTransitionDuration":0,"subtitlesTextShadowHorizontalLength":1,"progressBottom":10,"playbackBarBackgroundColorDirection":"vertical","propagateClick":false,"class":"ViewerArea","vrPointerColor":"#FFFFFF","toolTipShadowColor":"#333138","progressHeight":2,"playbackBarRight":0},{"id":"MainViewerModel3DPlayer","class":"Model3DPlayer","viewerArea":"this.MainViewer"},{"id":"mainPlayList","class":"PlayList","items":[{"class":"Model3DPlayListItem","player":"this.MainViewerModel3DPlayer","end":"this.trigger('tourEnded')","start":"this.MainViewerModel3DPlayer.set('displayPlaybackBar', true)","media":"this.model_0249DE60_0EDE_D981_4197_5B0A8DB4CFDA"}]},{"id":"model_0249DE60_0EDE_D981_4197_5B0A8DB4CFDA","surfaceReticleMaxRadius":50,"backgroundColor":"#333333","surfaceSelectionCoef":2,"label":trans('model_0249DE60_0EDE_D981_4197_5B0A8DB4CFDA.label'),"surfaceReticleMinRadius":15,"objects":["this.model_0249DE60_0EDE_D981_4197_5B0A8DB4CFDA_0","this.model_0249DE60_0EDE_D981_4197_5B0A8DB4CFDA_1","this.model_0249DE60_0EDE_D981_4197_5B0A8DB4CFDA_2","this.model_0249DE60_0EDE_D981_4197_5B0A8DB4CFDA_3","this.model_0249DE60_0EDE_D981_4197_5B0A8DB4CFDA_4"],"thumbnailUrl":"media/model_0249DE60_0EDE_D981_4197_5B0A8DB4CFDA_t.jpg","environmentIntensity":0.5,"lights":["this.light_026B9F01_0EDE_D783_4194_A1983D03D4EC","this.light_026ABF02_0EDE_D781_4194_015C1A461C28"],"model":"this.res_0274BF00_0EDE_D781_41AB_361F023C9458","floorColor":"#999999","floorHeight":-2.23,"surfaceReticleRadius":0.02,"data":{"showOnlyHotspotsLineSightInPanoramas":true,"label":"test_no_glasses_no_floor","showOnlyHotspotsLineSight":true},"class":"Model3D","floorRadius":4.59,"castShadow":true,"camera":"this.cam_02707F01_0EDE_D783_4178_19F8B63326B3"},{"id":"model_0249DE60_0EDE_D981_4197_5B0A8DB4CFDA_0","class":"InnerModel3DObject","objectId":"0","data":{"label":"image1"}},{"id":"model_0249DE60_0EDE_D981_4197_5B0A8DB4CFDA_1","class":"InnerModel3DObject","objectId":"1","data":{"label":"image2"}},{"id":"model_0249DE60_0EDE_D981_4197_5B0A8DB4CFDA_2","class":"InnerModel3DObject","objectId":"2","data":{"label":"image3"}},{"id":"model_0249DE60_0EDE_D981_4197_5B0A8DB4CFDA_3","class":"InnerModel3DObject","objectId":"3","data":{"label":"image4"}},{"id":"model_0249DE60_0EDE_D981_4197_5B0A8DB4CFDA_4","class":"InnerModel3DObject","objectId":"4","data":{"label":"image4.001"}},{"id":"light_026B9F01_0EDE_D783_4194_A1983D03D4EC","shadowTolerance":2,"intensity":0.5,"class":"OrbitLight","pitch":45,"castShadow":true,"yaw":-45},{"id":"light_026ABF02_0EDE_D781_4194_015C1A461C28","shadowTolerance":2,"intensity":0.3,"class":"OrbitLight","pitch":75,"castShadow":true,"yaw":135},{"class":"Model3DResource","id":"res_0274BF00_0EDE_D781_41AB_361F023C9458","levels":[{"class":"Model3DResourceLevel","url":"media/model_0249DE60_0EDE_D981_4197_5B0A8DB4CFDA/scene.glb"},{"class":"Model3DResourceLevel","url":"media/model_0249DE60_0EDE_D981_4197_5B0A8DB4CFDA/scene_mobile.glb","tags":"mobile"}]},{"id":"cam_02707F01_0EDE_D783_4178_19F8B63326B3","maxZ":5.01,"maxDistance":11.66,"maxPitch":0,"minY":-11.71,"minZ":-4.88,"initialZ":0.06,"maxX":5.56,"initialDistance":5.83,"minPitch":-90,"minX":-4.63,"initialPitch":-30,"minDistance":1.46,"class":"OrbitModel3DCamera","autoNearFar":true,"initialY":-1.06,"initialX":0.46,"maxY":9.58}],"scripts":{"setDirectionalPanoramaAudio":TDV.Tour.Script.setDirectionalPanoramaAudio,"getCurrentPlayers":TDV.Tour.Script.getCurrentPlayers,"executeFunctionWhenChange":TDV.Tour.Script.executeFunctionWhenChange,"getPlayListItemByMedia":TDV.Tour.Script.getPlayListItemByMedia,"openEmbeddedPDF":TDV.Tour.Script.openEmbeddedPDF,"stopGlobalAudio":TDV.Tour.Script.stopGlobalAudio,"cleanAllMeasurements":TDV.Tour.Script.cleanAllMeasurements,"changeBackgroundWhilePlay":TDV.Tour.Script.changeBackgroundWhilePlay,"getCurrentPlayerWithMedia":TDV.Tour.Script.getCurrentPlayerWithMedia,"_getObjectsByTags":TDV.Tour.Script._getObjectsByTags,"quizShowTimeout":TDV.Tour.Script.quizShowTimeout,"setSurfaceSelectionHotspotMode":TDV.Tour.Script.setSurfaceSelectionHotspotMode,"quizShowScore":TDV.Tour.Script.quizShowScore,"restartTourWithoutInteraction":TDV.Tour.Script.restartTourWithoutInteraction,"getPlayListItems":TDV.Tour.Script.getPlayListItems,"toggleMeasurement":TDV.Tour.Script.toggleMeasurement,"stopGlobalAudios":TDV.Tour.Script.stopGlobalAudios,"setModel3DCameraSpot":TDV.Tour.Script.setModel3DCameraSpot,"loadFromCurrentMediaPlayList":TDV.Tour.Script.loadFromCurrentMediaPlayList,"showComponentsWhileMouseOver":TDV.Tour.Script.showComponentsWhileMouseOver,"executeJS":TDV.Tour.Script.executeJS,"getModel3DInnerObject":TDV.Tour.Script.getModel3DInnerObject,"resumeGlobalAudios":TDV.Tour.Script.resumeGlobalAudios,"quizStart":TDV.Tour.Script.quizStart,"_initTTSTooltips":TDV.Tour.Script._initTTSTooltips,"getFirstPlayListWithMedia":TDV.Tour.Script.getFirstPlayListWithMedia,"stopMeasurement":TDV.Tour.Script.stopMeasurement,"getKey":TDV.Tour.Script.getKey,"resumePlayers":TDV.Tour.Script.resumePlayers,"clonePanoramaCamera":TDV.Tour.Script.clonePanoramaCamera,"toggleTextToSpeechComponent":TDV.Tour.Script.toggleTextToSpeechComponent,"_initItemWithComps":TDV.Tour.Script._initItemWithComps,"setObjectsVisibilityByID":TDV.Tour.Script.setObjectsVisibilityByID,"setPlayListSelectedIndex":TDV.Tour.Script.setPlayListSelectedIndex,"startMeasurement":TDV.Tour.Script.startMeasurement,"createTween":TDV.Tour.Script.createTween,"cloneBindings":TDV.Tour.Script.cloneBindings,"keepCompVisible":TDV.Tour.Script.keepCompVisible,"getPlayListWithItem":TDV.Tour.Script.getPlayListWithItem,"executeAudioActionByTags":TDV.Tour.Script.executeAudioActionByTags,"setCameraSameSpotAsMedia":TDV.Tour.Script.setCameraSameSpotAsMedia,"quizResumeTimer":TDV.Tour.Script.quizResumeTimer,"textToSpeechComponent":TDV.Tour.Script.textToSpeechComponent,"setPanoramaCameraWithSpot":TDV.Tour.Script.setPanoramaCameraWithSpot,"init":TDV.Tour.Script.init,"getMediaHeight":TDV.Tour.Script.getMediaHeight,"autotriggerAtStart":TDV.Tour.Script.autotriggerAtStart,"getAudioByTags":TDV.Tour.Script.getAudioByTags,"isPanorama":TDV.Tour.Script.isPanorama,"shareSocial":TDV.Tour.Script.shareSocial,"getMediaWidth":TDV.Tour.Script.getMediaWidth,"setComponentsVisibilityByTags":TDV.Tour.Script.setComponentsVisibilityByTags,"translate":TDV.Tour.Script.translate,"isCardboardViewMode":TDV.Tour.Script.isCardboardViewMode,"_getPlayListsWithViewer":TDV.Tour.Script._getPlayListsWithViewer,"startPanoramaWithModel":TDV.Tour.Script.startPanoramaWithModel,"quizPauseTimer":TDV.Tour.Script.quizPauseTimer,"executeAudioAction":TDV.Tour.Script.executeAudioAction,"startPanoramaWithCamera":TDV.Tour.Script.startPanoramaWithCamera,"setMediaBehaviour":TDV.Tour.Script.setMediaBehaviour,"skip3DTransitionOnce":TDV.Tour.Script.skip3DTransitionOnce,"_initTwinsViewer":TDV.Tour.Script._initTwinsViewer,"getMediaFromPlayer":TDV.Tour.Script.getMediaFromPlayer,"quizFinish":TDV.Tour.Script.quizFinish,"_initSplitViewer":TDV.Tour.Script._initSplitViewer,"getActivePlayersWithViewer":TDV.Tour.Script.getActivePlayersWithViewer,"setLocale":TDV.Tour.Script.setLocale,"setPanoramaCameraWithCurrentSpot":TDV.Tour.Script.setPanoramaCameraWithCurrentSpot,"downloadFile":TDV.Tour.Script.downloadFile,"getMainViewer":TDV.Tour.Script.getMainViewer,"initQuiz":TDV.Tour.Script.initQuiz,"setEndToItemIndex":TDV.Tour.Script.setEndToItemIndex,"clone":TDV.Tour.Script.clone,"getComponentsByTags":TDV.Tour.Script.getComponentsByTags,"quizShowQuestion":TDV.Tour.Script.quizShowQuestion,"initOverlayGroupRotationOnClick":TDV.Tour.Script.initOverlayGroupRotationOnClick,"syncPlaylists":TDV.Tour.Script.syncPlaylists,"startModel3DWithCameraSpot":TDV.Tour.Script.startModel3DWithCameraSpot,"textToSpeech":TDV.Tour.Script.textToSpeech,"setValue":TDV.Tour.Script.setValue,"quizSetItemFound":TDV.Tour.Script.quizSetItemFound,"setOverlaysVisibilityByTags":TDV.Tour.Script.setOverlaysVisibilityByTags,"initAnalytics":TDV.Tour.Script.initAnalytics,"changePlayListWithSameSpot":TDV.Tour.Script.changePlayListWithSameSpot,"existsKey":TDV.Tour.Script.existsKey,"mixObject":TDV.Tour.Script.mixObject,"unregisterKey":TDV.Tour.Script.unregisterKey,"showWindow":TDV.Tour.Script.showWindow,"setStartTimeVideoSync":TDV.Tour.Script.setStartTimeVideoSync,"getPlayListsWithMedia":TDV.Tour.Script.getPlayListsWithMedia,"stopAndGoCamera":TDV.Tour.Script.stopAndGoCamera,"setOverlaysVisibility":TDV.Tour.Script.setOverlaysVisibility,"playGlobalAudio":TDV.Tour.Script.playGlobalAudio,"setMainMediaByName":TDV.Tour.Script.setMainMediaByName,"registerKey":TDV.Tour.Script.registerKey,"getActivePlayerWithViewer":TDV.Tour.Script.getActivePlayerWithViewer,"showPopupPanoramaVideoOverlay":TDV.Tour.Script.showPopupPanoramaVideoOverlay,"playGlobalAudioWhilePlay":TDV.Tour.Script.playGlobalAudioWhilePlay,"setObjectsVisibility":TDV.Tour.Script.setObjectsVisibility,"getMediaByTags":TDV.Tour.Script.getMediaByTags,"sendAnalyticsData":TDV.Tour.Script.sendAnalyticsData,"htmlToPlainText":TDV.Tour.Script.htmlToPlainText,"historyGoForward":TDV.Tour.Script.historyGoForward,"playGlobalAudioWhilePlayActiveMedia":TDV.Tour.Script.playGlobalAudioWhilePlayActiveMedia,"copyToClipboard":TDV.Tour.Script.copyToClipboard,"getPanoramaOverlaysByTags":TDV.Tour.Script.getPanoramaOverlaysByTags,"setComponentVisibility":TDV.Tour.Script.setComponentVisibility,"setMapLocation":TDV.Tour.Script.setMapLocation,"getMediaByName":TDV.Tour.Script.getMediaByName,"getActiveMediaWithViewer":TDV.Tour.Script.getActiveMediaWithViewer,"visibleComponentsIfPlayerFlagEnabled":TDV.Tour.Script.visibleComponentsIfPlayerFlagEnabled,"setMeasurementUnits":TDV.Tour.Script.setMeasurementUnits,"historyGoBack":TDV.Tour.Script.historyGoBack,"playAudioList":TDV.Tour.Script.playAudioList,"stopTextToSpeech":TDV.Tour.Script.stopTextToSpeech,"setOverlayBehaviour":TDV.Tour.Script.setOverlayBehaviour,"getPanoramaOverlayByName":TDV.Tour.Script.getPanoramaOverlayByName,"updateVideoCues":TDV.Tour.Script.updateVideoCues,"setStartTimeVideo":TDV.Tour.Script.setStartTimeVideo,"setMainMediaByIndex":TDV.Tour.Script.setMainMediaByIndex,"pauseGlobalAudios":TDV.Tour.Script.pauseGlobalAudios,"toggleMeasurementsVisibility":TDV.Tour.Script.toggleMeasurementsVisibility,"getComponentByName":TDV.Tour.Script.getComponentByName,"setModel3DCameraSequence":TDV.Tour.Script.setModel3DCameraSequence,"getStateTextToSpeech":TDV.Tour.Script.getStateTextToSpeech,"getRootOverlay":TDV.Tour.Script.getRootOverlay,"getOverlaysByGroupname":TDV.Tour.Script.getOverlaysByGroupname,"updateMediaLabelFromPlayList":TDV.Tour.Script.updateMediaLabelFromPlayList,"changeOpacityWhilePlay":TDV.Tour.Script.changeOpacityWhilePlay,"copyObjRecursively":TDV.Tour.Script.copyObjRecursively,"pauseGlobalAudio":TDV.Tour.Script.pauseGlobalAudio,"showPopupPanoramaOverlay":TDV.Tour.Script.showPopupPanoramaOverlay,"openLink":TDV.Tour.Script.openLink,"getQuizTotalObjectiveProperty":TDV.Tour.Script.getQuizTotalObjectiveProperty,"setMeasurementsVisibility":TDV.Tour.Script.setMeasurementsVisibility,"fixTogglePlayPauseButton":TDV.Tour.Script.fixTogglePlayPauseButton,"getGlobalAudio":TDV.Tour.Script.getGlobalAudio,"pauseGlobalAudiosWhilePlayItem":TDV.Tour.Script.pauseGlobalAudiosWhilePlayItem,"setObjectsVisibilityByTags":TDV.Tour.Script.setObjectsVisibilityByTags,"assignObjRecursively":TDV.Tour.Script.assignObjRecursively,"getOverlaysByTags":TDV.Tour.Script.getOverlaysByTags,"showPopupImage":TDV.Tour.Script.showPopupImage,"pauseCurrentPlayers":TDV.Tour.Script.pauseCurrentPlayers,"getPlayListItemIndexByMedia":TDV.Tour.Script.getPlayListItemIndexByMedia,"takeScreenshot":TDV.Tour.Script.takeScreenshot,"triggerOverlay":TDV.Tour.Script.triggerOverlay,"cleanSelectedMeasurements":TDV.Tour.Script.cleanSelectedMeasurements,"showPopupMedia":TDV.Tour.Script.showPopupMedia,"getOverlays":TDV.Tour.Script.getOverlays,"updateDeepLink":TDV.Tour.Script.updateDeepLink,"getPixels":TDV.Tour.Script.getPixels},"defaultMenu":["fullscreen","mute","rotation"],"watermark":false,"layout":"absolute","minHeight":0,"scrollBarColor":"#000000","minWidth":0,"width":"100%","height":"100%","class":"Player","backgroundColorRatios":[0]};
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