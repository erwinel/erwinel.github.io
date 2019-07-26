/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="sys.ts" />
/// <reference path="app.ts" />
var imageIndex;
(function (imageIndex) {
    const rootFolder = {
        "name": "images", "folders": [
            {
                "name": "adminSetup", "folders": [], "images": [
                    { "title": "DeveloperSettings", "fileName": "DeveloperSettings.png", "sprites": [], "width": 915, "height": 514 },
                    { "title": "SelectScope", "fileName": "SelectScope.png", "sprites": [], "width": 667, "height": 188 },
                    { "title": "SettingsGear", "fileName": "SettingsGear.PNG", "sprites": [], "width": 350, "height": 93 }
                ]
            }, {
                "name": "initialConfig", "folders": [], "images": [
                    { "title": "bannerImageSetting_lg", "fileName": "bannerImageSetting_lg.png", "sprites": [], "width": 651, "height": 248 },
                    { "title": "bannerImageSetting_sm", "fileName": "bannerImageSetting_sm.png", "sprites": [], "width": 262, "height": 100 },
                    { "title": "chooseFile_lg", "fileName": "chooseFile_lg.png", "sprites": [], "width": 506, "height": 243 },
                    { "title": "chooseFile_sm", "fileName": "chooseFile_sm.png", "sprites": [], "width": 208, "height": 100 },
                    { "title": "commitSuccess_lg", "fileName": "commitSuccess_lg.png", "sprites": [], "width": 801, "height": 503 },
                    { "title": "commitSuccess_sm", "fileName": "commitSuccess_sm.png", "sprites": [], "width": 159, "height": 100 },
                    { "title": "ElevateRoles", "fileName": "ElevateRoles.PNG", "sprites": [], "width": 531, "height": 257 },
                    { "title": "ExampleProgressWorkerSuccess", "fileName": "ExampleProgressWorkerSuccess.PNG", "sprites": [], "width": 708, "height": 390 },
                    { "title": "gitImportProgress_lg", "fileName": "gitImportProgress_lg.png", "sprites": [], "width": 948, "height": 164 },
                    { "title": "gitImportProgress_sm", "fileName": "gitImportProgress_sm.png", "sprites": [], "width": 578, "height": 100 },
                    { "title": "gitImportSuccess_lg", "fileName": "gitImportSuccess_lg.png", "sprites": [], "width": 914, "height": 227 },
                    { "title": "gitImportSuccess_sm", "fileName": "gitImportSuccess_sm.png", "sprites": [], "width": 402, "height": 100 },
                    { "title": "globalApplicationWarning", "fileName": "globalApplicationWarning.png", "sprites": [], "width": 596, "height": 53 },
                    { "title": "GroupNameRegiestryNavItem_lg", "fileName": "GroupNameRegiestryNavItem_lg.png", "sprites": [], "width": 280, "height": 159 },
                    { "title": "GroupNameRegiestryNavItem_sm", "fileName": "GroupNameRegiestryNavItem_sm.png", "sprites": [], "width": 176, "height": 100 },
                    { "title": "importApplicationComplete_lg", "fileName": "importApplicationComplete_lg.png", "sprites": [], "width": 376, "height": 394 },
                    { "title": "importApplicationComplete_sm", "fileName": "importApplicationComplete_sm.png", "sprites": [], "width": 95, "height": 100 },
                    { "title": "importApplicationDialog_lg", "fileName": "importApplicationDialog_lg.png", "sprites": [], "width": 906, "height": 361 },
                    { "title": "importApplicationDialog_sm", "fileName": "importApplicationDialog_sm.png", "sprites": [], "width": 250, "height": 100 },
                    { "title": "importFromSourceControl_lg", "fileName": "importFromSourceControl_lg.png", "sprites": [], "width": 1181, "height": 234 },
                    { "title": "importFromSourceControl_sm", "fileName": "importFromSourceControl_sm.png", "sprites": [], "width": 504, "height": 100 },
                    { "title": "initialArmyConfigSuccess_lg", "fileName": "initialArmyConfigSuccess_lg.png", "sprites": [], "width": 630, "height": 572 },
                    { "title": "initialArmyConfigSuccess_sm", "fileName": "initialArmyConfigSuccess_sm.png", "sprites": [], "width": 110, "height": 100 },
                    { "title": "previewSuccess_lg", "fileName": "previewSuccess_lg.png", "sprites": [], "width": 808, "height": 312 },
                    { "title": "previewSuccess_sm", "fileName": "previewSuccess_sm.png", "sprites": [], "width": 258, "height": 100 },
                    { "title": "relatedLinks_lg", "fileName": "relatedLinks_lg.png", "sprites": [], "width": 654, "height": 487 },
                    { "title": "relatedLinks_sm", "fileName": "relatedLinks_sm.png", "sprites": [], "width": 134, "height": 100 },
                    { "title": "selectApplicationDialog_lg", "fileName": "selectApplicationDialog_lg.png", "sprites": [], "width": 911, "height": 310 },
                    { "title": "selectApplicationDialog_sm", "fileName": "selectApplicationDialog_sm.png", "sprites": [], "width": 293, "height": 100 },
                    { "title": "systemApplicationsStudio_lg", "fileName": "systemApplicationsStudio_lg.png", "sprites": [], "width": 298, "height": 351 },
                    { "title": "systemApplicationsStudio_sm", "fileName": "systemApplicationsStudio_sm.png", "sprites": [], "width": 84, "height": 100 },
                    { "title": "uploaded_lg", "fileName": "uploaded_lg.png", "sprites": [], "width": 716, "height": 486 },
                    { "title": "uploaded_sm", "fileName": "uploaded_sm.png", "sprites": [], "width": 147, "height": 100 }
                ]
            }, {
                "name": "open-iconic", "folders": [], "images": [
                    { "title": "account-login", "fileName": "account-login.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "account-logout", "fileName": "account-logout.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "action-redo", "fileName": "action-redo.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "action-undo", "fileName": "action-undo.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "align-center", "fileName": "align-center.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "align-left", "fileName": "align-left.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "align-right", "fileName": "align-right.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "aperture", "fileName": "aperture.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "arrow-bottom", "fileName": "arrow-bottom.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "arrow-circle-bottom", "fileName": "arrow-circle-bottom.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "arrow-circle-left", "fileName": "arrow-circle-left.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "arrow-circle-right", "fileName": "arrow-circle-right.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "arrow-circle-top", "fileName": "arrow-circle-top.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "arrow-left", "fileName": "arrow-left.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "arrow-right", "fileName": "arrow-right.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "arrow-thick-bottom", "fileName": "arrow-thick-bottom.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "arrow-thick-left", "fileName": "arrow-thick-left.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "arrow-thick-right", "fileName": "arrow-thick-right.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "arrow-thick-top", "fileName": "arrow-thick-top.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "arrow-top", "fileName": "arrow-top.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "audio-spectrum", "fileName": "audio-spectrum.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "audio", "fileName": "audio.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "badge", "fileName": "badge.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "ban", "fileName": "ban.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "bar-chart", "fileName": "bar-chart.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "basket", "fileName": "basket.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "battery-empty", "fileName": "battery-empty.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "battery-full", "fileName": "battery-full.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "beaker", "fileName": "beaker.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "bell", "fileName": "bell.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "bluetooth", "fileName": "bluetooth.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "bold", "fileName": "bold.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "bolt", "fileName": "bolt.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "book", "fileName": "book.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "bookmark", "fileName": "bookmark.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "box", "fileName": "box.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "briefcase", "fileName": "briefcase.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "british-pound", "fileName": "british-pound.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "browser", "fileName": "browser.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "brush", "fileName": "brush.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "bug", "fileName": "bug.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "bullhorn", "fileName": "bullhorn.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "calculator", "fileName": "calculator.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "calendar", "fileName": "calendar.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "camera-slr", "fileName": "camera-slr.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "caret-bottom", "fileName": "caret-bottom.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "caret-left", "fileName": "caret-left.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "caret-right", "fileName": "caret-right.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "caret-top", "fileName": "caret-top.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "cart", "fileName": "cart.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "chat", "fileName": "chat.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "check", "fileName": "check.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "chevron-bottom", "fileName": "chevron-bottom.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "chevron-left", "fileName": "chevron-left.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "chevron-right", "fileName": "chevron-right.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "chevron-top", "fileName": "chevron-top.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "circle-check", "fileName": "circle-check.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "circle-x", "fileName": "circle-x.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "clipboard", "fileName": "clipboard.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "clock", "fileName": "clock.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "cloud-download", "fileName": "cloud-download.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "cloud-upload", "fileName": "cloud-upload.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "cloud", "fileName": "cloud.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "cloudy", "fileName": "cloudy.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "code", "fileName": "code.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "cog", "fileName": "cog.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "collapse-down", "fileName": "collapse-down.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "collapse-left", "fileName": "collapse-left.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "collapse-right", "fileName": "collapse-right.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "collapse-up", "fileName": "collapse-up.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "command", "fileName": "command.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "comment-square", "fileName": "comment-square.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "compass", "fileName": "compass.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "contrast", "fileName": "contrast.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "copywriting", "fileName": "copywriting.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "credit-card", "fileName": "credit-card.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "crop", "fileName": "crop.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "dashboard", "fileName": "dashboard.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "data-transfer-download", "fileName": "data-transfer-download.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "data-transfer-upload", "fileName": "data-transfer-upload.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "delete", "fileName": "delete.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "dial", "fileName": "dial.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "document", "fileName": "document.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "dollar", "fileName": "dollar.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "double-quote-sans-left", "fileName": "double-quote-sans-left.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "double-quote-sans-right", "fileName": "double-quote-sans-right.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "double-quote-serif-left", "fileName": "double-quote-serif-left.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "double-quote-serif-right", "fileName": "double-quote-serif-right.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "droplet", "fileName": "droplet.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "eject", "fileName": "eject.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "elevator", "fileName": "elevator.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "ellipses", "fileName": "ellipses.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "envelope-closed", "fileName": "envelope-closed.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "envelope-open", "fileName": "envelope-open.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "euro", "fileName": "euro.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "excerpt", "fileName": "excerpt.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "expand-down", "fileName": "expand-down.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "expand-left", "fileName": "expand-left.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "expand-right", "fileName": "expand-right.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "expand-up", "fileName": "expand-up.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "external-link", "fileName": "external-link.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "eye", "fileName": "eye.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "eyedropper", "fileName": "eyedropper.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "file", "fileName": "file.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "fire", "fileName": "fire.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "flag", "fileName": "flag.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "flash", "fileName": "flash.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "folder", "fileName": "folder.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "fork", "fileName": "fork.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "fullscreen-enter", "fileName": "fullscreen-enter.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "fullscreen-exit", "fileName": "fullscreen-exit.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "globe", "fileName": "globe.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "graph", "fileName": "graph.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "grid-four-up", "fileName": "grid-four-up.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "grid-three-up", "fileName": "grid-three-up.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "grid-two-up", "fileName": "grid-two-up.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "hard-drive", "fileName": "hard-drive.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "header", "fileName": "header.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "headphones", "fileName": "headphones.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "heart", "fileName": "heart.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "home", "fileName": "home.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "image", "fileName": "image.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "inbox", "fileName": "inbox.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "infinity", "fileName": "infinity.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "info", "fileName": "info.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "italic", "fileName": "italic.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "justify-center", "fileName": "justify-center.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "justify-left", "fileName": "justify-left.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "justify-right", "fileName": "justify-right.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "key", "fileName": "key.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "laptop", "fileName": "laptop.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "layers", "fileName": "layers.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "lightbulb", "fileName": "lightbulb.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "link-broken", "fileName": "link-broken.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "link-intact", "fileName": "link-intact.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "list-rich", "fileName": "list-rich.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "list", "fileName": "list.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "location", "fileName": "location.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "lock-locked", "fileName": "lock-locked.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "lock-unlocked", "fileName": "lock-unlocked.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "loop-circular", "fileName": "loop-circular.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "loop-square", "fileName": "loop-square.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "loop", "fileName": "loop.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "magnifying-glass", "fileName": "magnifying-glass.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "map-marker", "fileName": "map-marker.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "map", "fileName": "map.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "media-pause", "fileName": "media-pause.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "media-play", "fileName": "media-play.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "media-record", "fileName": "media-record.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "media-skip-backward", "fileName": "media-skip-backward.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "media-skip-forward", "fileName": "media-skip-forward.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "media-step-backward", "fileName": "media-step-backward.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "media-step-forward", "fileName": "media-step-forward.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "media-stop", "fileName": "media-stop.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "medical-cross", "fileName": "medical-cross.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "menu", "fileName": "menu.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "microphone", "fileName": "microphone.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "minus", "fileName": "minus.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "monitor", "fileName": "monitor.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "moon", "fileName": "moon.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "move", "fileName": "move.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "musical-note", "fileName": "musical-note.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "paperclip", "fileName": "paperclip.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "pencil", "fileName": "pencil.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "people", "fileName": "people.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "person", "fileName": "person.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "phone", "fileName": "phone.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "pie-chart", "fileName": "pie-chart.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "pin", "fileName": "pin.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "play-circle", "fileName": "play-circle.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "plus", "fileName": "plus.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "power-standby", "fileName": "power-standby.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "print", "fileName": "print.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "project", "fileName": "project.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "pulse", "fileName": "pulse.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "puzzle-piece", "fileName": "puzzle-piece.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "question-mark", "fileName": "question-mark.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "rain", "fileName": "rain.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "random", "fileName": "random.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "reload", "fileName": "reload.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "resize-both", "fileName": "resize-both.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "resize-height", "fileName": "resize-height.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "resize-width", "fileName": "resize-width.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "rss-alt", "fileName": "rss-alt.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "rss", "fileName": "rss.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "script", "fileName": "script.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "share-boxed", "fileName": "share-boxed.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "share", "fileName": "share.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "shield", "fileName": "shield.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "signal", "fileName": "signal.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "signpost", "fileName": "signpost.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "sort-ascending", "fileName": "sort-ascending.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "sort-descending", "fileName": "sort-descending.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "spreadsheet", "fileName": "spreadsheet.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "star", "fileName": "star.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "sun", "fileName": "sun.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "tablet", "fileName": "tablet.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "tag", "fileName": "tag.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "tags", "fileName": "tags.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "target", "fileName": "target.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "task", "fileName": "task.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "terminal", "fileName": "terminal.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "text", "fileName": "text.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "thumb-down", "fileName": "thumb-down.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "thumb-up", "fileName": "thumb-up.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "timer", "fileName": "timer.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "transfer", "fileName": "transfer.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "trash", "fileName": "trash.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "underline", "fileName": "underline.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "vertical-align-bottom", "fileName": "vertical-align-bottom.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "vertical-align-center", "fileName": "vertical-align-center.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "vertical-align-top", "fileName": "vertical-align-top.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "video", "fileName": "video.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "volume-high", "fileName": "volume-high.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "volume-low", "fileName": "volume-low.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "volume-off", "fileName": "volume-off.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "warning", "fileName": "warning.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "wifi", "fileName": "wifi.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "wrench", "fileName": "wrench.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "x", "fileName": "x.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "yen", "fileName": "yen.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "zoom-in", "fileName": "zoom-in.svg", "sprites": [], "width": 8, "height": 8 },
                    { "title": "zoom-out", "fileName": "zoom-out.svg", "sprites": [], "width": 8, "height": 8 }
                ]
            }, {
                "name": "snippets", "folders": [], "images": [
                    { "title": "form_menu", "fileName": "form_menu.png", "sprites": [], "width": 179, "height": 248 },
                    { "title": "new_ui_action", "fileName": "new_ui_action.png", "sprites": [], "width": 163, "height": 77 },
                    { "title": "ui_action_form", "fileName": "ui_action_form.png", "sprites": [], "width": 611, "height": 460 }
                ]
            }
        ], "images": [
            { "title": "collapse", "fileName": "collapse.svg", "sprites": [], "width": 8, "height": 8 },
            { "title": "expand", "fileName": "expand.svg", "sprites": [], "width": 8, "height": 8 },
            { "title": "icons", "fileName": "icons.svg", "sprites": [
                    { "id": "clipboard", "width": 16, "height": 16 },
                    { "id": "collapse", "width": 16, "height": 16 },
                    { "id": "expand", "width": 16, "height": 16 },
                    { "id": "clipboard", "width": 16, "height": 16 },
                    { "id": "clipboard", "width": 16, "height": 16 },
                    { "id": "clipboard", "width": 16, "height": 16 },
                    { "id": "clipboard", "width": 16, "height": 16 },
                    { "id": "clipboard", "width": 16, "height": 16 }
                ], "width": 0, "height": 0 },
            { "title": "moreInfo", "fileName": "moreInfo.svg", "sprites": [], "width": 12, "height": 12 },
            { "title": "subnav", "fileName": "subnav.svg", "sprites": [], "width": 16, "height": 8 }
        ]
    };
    function toThumbnailDimensions(width, height) {
        if (isNaN(width) || width < 1 || isNaN(height) || height < 1)
            return { width: 32, height: 32 };
        if (height > width) {
            if (width != 32)
                return { width: ((width = Math.round((32.0 / height) * width)) < 1) ? 1 : width, height: 32 };
        }
        else if (width != 32)
            return { width: 32, height: ((height = Math.round((32.0 / width) * height)) < 1) ? 1 : height };
        return { width: width, height: height };
    }
    function importImageInfo(imageArray, relativeUrl) {
        let resultArray = [];
        let dim;
        imageArray.forEach((imageInfo) => {
            let url = relativeUrl + "/" + encodeURIComponent(imageInfo.fileName);
            if (imageInfo.sprites.length > 0) {
                dim = toThumbnailDimensions((imageInfo.sprites[0].width < 1) ? imageInfo.width : imageInfo.sprites[0].width, (imageInfo.sprites[0].height < 1) ? imageInfo.height : imageInfo.sprites[0].height);
                let isSpriteList = imageInfo.sprites.length > 1;
                resultArray.push({
                    colSpan: imageInfo.sprites.length,
                    fileName: imageInfo.fileName,
                    height: (imageInfo.sprites[0].height < 1) ? imageInfo.height : imageInfo.sprites[0].height,
                    isImageTag: false,
                    isSpriteList: isSpriteList,
                    isSvgLink: true,
                    thumbnailHeight: dim.height,
                    thumbnailWidth: dim.width,
                    title: imageInfo.sprites[0].id,
                    url: url + "#" + imageInfo.sprites[0].id,
                    width: (imageInfo.sprites[0].width < 1) ? imageInfo.width : imageInfo.sprites[0].width
                });
                if (isSpriteList) {
                    for (let i = 1; i < imageInfo.sprites.length; i++) {
                        dim = toThumbnailDimensions((imageInfo.sprites[i].width < 1) ? imageInfo.width : imageInfo.sprites[0].width, (imageInfo.sprites[i].height < 1) ? imageInfo.height : imageInfo.sprites[i].height);
                        resultArray.push({
                            colSpan: imageInfo.sprites.length,
                            fileName: imageInfo.fileName,
                            height: (imageInfo.sprites[i].height < 1) ? imageInfo.height : imageInfo.sprites[i].height,
                            isImageTag: false,
                            isSpriteList: false,
                            isSvgLink: true,
                            thumbnailHeight: dim.height,
                            thumbnailWidth: dim.width,
                            title: imageInfo.sprites[i].id,
                            url: url + "#" + imageInfo.sprites[i].id,
                            width: (imageInfo.sprites[i].width < 1) ? imageInfo.width : imageInfo.sprites[i].width
                        });
                    }
                }
            }
            else {
                dim = toThumbnailDimensions(imageInfo.width, imageInfo.height);
                resultArray.push({
                    colSpan: 1,
                    fileName: imageInfo.fileName,
                    height: imageInfo.height,
                    isImageTag: true,
                    isSpriteList: false,
                    isSvgLink: false,
                    thumbnailHeight: dim.height,
                    thumbnailWidth: dim.width,
                    title: imageInfo.title,
                    url: url,
                    width: imageInfo.width
                });
            }
        }, this);
        return resultArray;
    }
    function preventDefault(event) {
        if (sys.isNil(event))
            return;
        if (!event.isDefaultPrevented)
            event.preventDefault();
        if (!event.isPropagationStopped)
            event.stopPropagation();
    }
    class ImageIndexController {
        constructor($scope) {
            this.$scope = $scope;
            this._data = [];
            rootFolder.folders.forEach((f) => { this.importImageData(f, '.'); });
            $scope.imageListController = this;
        }
        toImageDataLink(folder) {
            return {
                name: folder.name,
                selectFolder: (event) => {
                    preventDefault(event);
                    this.selectFolder(folder.id);
                }
            };
        }
        getSubFolderLinks(id) {
            return this._data.filter((d) => d.parentId === id).map((d) => { return this.toImageDataLink(d); }, this);
        }
        selectFolder(id) {
            let folder = this.getImageData(id);
            this.$scope.isTopLevel = typeof folder === "undefined";
            if (this.$scope.isTopLevel) {
                this.$scope.folderName = rootFolder.name;
                this.$scope.subFolders = this.getSubFolderLinks();
                this.$scope.images = importImageInfo(rootFolder.images, ".");
                this.$scope.breadcrumb = [];
            }
            else {
                this.$scope.folderName = folder.name;
                this.$scope.subFolders = this.getSubFolderLinks(folder.id);
                this.$scope.images = importImageInfo(folder.images, ".");
                let controller = this;
                this.$scope.breadcrumb = [{
                        name: rootFolder.name,
                        selectFolder: (event) => {
                            preventDefault(event);
                            controller.selectFolder();
                        }
                    }];
                folder = this.getImageData(folder.parentId);
                while (typeof folder !== "undefined") {
                    this.$scope.breadcrumb.push(this.toImageDataLink(folder));
                    folder = this.getImageData(folder.parentId);
                }
                this.$scope.isTopLevel = true;
            }
            this.$scope.hasFolders = this.$scope.subFolders.length > 0;
            this.$scope.hasImages = this.$scope.images.length > 0;
        }
        getImageData(id) {
            if (typeof id === "number") {
                for (let i = 0; i < this._data.length; i++) {
                    if (this._data[i].id === id)
                        return this._data[i];
                }
            }
        }
        importImageData(folder, relativeUrl, parent) {
            relativeUrl += "/" + folder.name;
            let id = this._data.length;
            let current = {
                id: this._data.length,
                name: folder.name,
                images: folder.images,
                relativeUrl: relativeUrl + "/" + folder.name
            };
            this._data.push(current);
            if (typeof parent !== "undefined")
                current.parentId = parent.id;
        }
        $onInit() { }
    }
    app.appModule.controller("imageIndex", ['$scope', ImageIndexController]);
})(imageIndex || (imageIndex = {}));
