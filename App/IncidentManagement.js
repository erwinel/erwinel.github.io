/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="commonServiceNowDefinitions.ts" />
/// <reference path="sys.ts" />
/// <reference path="app.ts" />
var inicidentManagment;
(function (inicidentManagment) {
    const ImpactUrgencyNames = ["High", "Medium", "Low"];
    const IncidentPriorityNames = ["Critical", "High", "Moderate", "Low", "Planning"];
    const PriorityMatcherRuleValues = [
        { order: 100, impact: 1, urgency: 1, is_mission_related: true, vip_priority: true, incident_priority: 1 },
        { order: 200, impact: 1, urgency: 1, is_mission_related: false, vip_priority: true, incident_priority: 1 },
        { order: 300, impact: 1, urgency: 1, is_mission_related: true, vip_priority: false, incident_priority: 1 },
        { order: 400, impact: 1, urgency: 2, is_mission_related: true, vip_priority: true, incident_priority: 1 },
        { order: 500, impact: 2, urgency: 1, is_mission_related: true, vip_priority: true, incident_priority: 1 },
        { order: 600, impact: 1, urgency: 1, is_mission_related: false, vip_priority: false, incident_priority: 2 },
        { order: 700, impact: 1, urgency: 2, is_mission_related: false, vip_priority: true, incident_priority: 2 },
        { order: 800, impact: 1, urgency: 2, is_mission_related: true, vip_priority: false, incident_priority: 2 },
        { order: 900, impact: 2, urgency: 1, is_mission_related: false, vip_priority: true, incident_priority: 2 },
        { order: 1000, impact: 2, urgency: 1, is_mission_related: true, vip_priority: false, incident_priority: 2 },
        { order: 1100, impact: 1, urgency: 3, is_mission_related: true, vip_priority: true, incident_priority: 2 },
        { order: 1200, impact: 2, urgency: 2, is_mission_related: true, vip_priority: true, incident_priority: 2 },
        { order: 1300, impact: 3, urgency: 1, is_mission_related: true, vip_priority: true, incident_priority: 2 },
        { order: 1400, impact: 1, urgency: 2, is_mission_related: false, vip_priority: false, incident_priority: 3 },
        { order: 1500, impact: 2, urgency: 1, is_mission_related: false, vip_priority: false, incident_priority: 3 },
        { order: 1600, impact: 1, urgency: 3, is_mission_related: false, vip_priority: true, incident_priority: 3 },
        { order: 1700, impact: 1, urgency: 3, is_mission_related: true, vip_priority: false, incident_priority: 3 },
        { order: 1800, impact: 2, urgency: 2, is_mission_related: false, vip_priority: true, incident_priority: 3 },
        { order: 1900, impact: 2, urgency: 2, is_mission_related: true, vip_priority: false, incident_priority: 3 },
        { order: 2000, impact: 3, urgency: 1, is_mission_related: false, vip_priority: true, incident_priority: 3 },
        { order: 2100, impact: 3, urgency: 1, is_mission_related: true, vip_priority: false, incident_priority: 3 },
        { order: 2200, impact: 2, urgency: 3, is_mission_related: true, vip_priority: true, incident_priority: 3 },
        { order: 2300, impact: 3, urgency: 2, is_mission_related: true, vip_priority: true, incident_priority: 3 },
        { order: 2400, impact: 1, urgency: 3, is_mission_related: false, vip_priority: false, incident_priority: 4 },
        { order: 2500, impact: 2, urgency: 2, is_mission_related: false, vip_priority: false, incident_priority: 4 },
        { order: 2600, impact: 3, urgency: 1, is_mission_related: false, vip_priority: false, incident_priority: 4 },
        { order: 2700, impact: 2, urgency: 3, is_mission_related: false, vip_priority: true, incident_priority: 4 },
        { order: 2800, impact: 2, urgency: 3, is_mission_related: true, vip_priority: false, incident_priority: 4 },
        { order: 2900, impact: 3, urgency: 2, is_mission_related: false, vip_priority: true, incident_priority: 4 },
        { order: 3000, impact: 3, urgency: 2, is_mission_related: true, vip_priority: false, incident_priority: 4 },
        { order: 3100, impact: 3, urgency: 3, is_mission_related: true, vip_priority: true, incident_priority: 4 },
        { order: 3200, impact: 2, urgency: 3, is_mission_related: false, vip_priority: false, incident_priority: 5 },
        { order: 3300, impact: 3, urgency: 2, is_mission_related: false, vip_priority: false, incident_priority: 5 },
        { order: 3400, impact: 3, urgency: 3, is_mission_related: false, vip_priority: true, incident_priority: 5 },
        { order: 3500, impact: 3, urgency: 3, is_mission_related: true, vip_priority: false, incident_priority: 5 },
        { order: 3600, impact: 3, urgency: 3, is_mission_related: false, vip_priority: false, incident_priority: 5 }
    ];
    class SortableColumnController {
        constructor(_id, callback) {
            this._id = _id;
            this.callback = callback;
            this._effectiveDirAscending = false;
        }
        get id() { return this._id; }
        get label() { return this._label; }
        get alt() { return this._alt; }
        get showArrow() { return this._showArrow; }
        get arrowUrl() { return this._arrowUrl; }
        get isAscending() { return this._isAscending; }
        set isAscending(value) {
            if (typeof value === "undefined" || value === null) {
                if (typeof this._isAscending === "undefined")
                    return;
                this._isAscending = undefined;
                this._showArrow = false;
            }
            else if (value == true) {
                if (this._isAscending === true)
                    return;
                this._isAscending = this._effectiveDirAscending = true;
                this._arrowUrl = "images/open-iconic/arrow-bottom.svg";
                this._showArrow = true;
            }
            else if (value !== false) {
                this._isAscending = this._effectiveDirAscending = false;
                this._arrowUrl = "images/open-iconic/arrow-top.svg";
                this._showArrow = true;
            }
        }
        get effectiveDirAscending() { return this._effectiveDirAscending; }
        sort() { this.callback(this._id); }
    }
    const ICONURL_SORT_ASC = "./images/open-iconic/arrow-bottom.svg";
    const ICONURL_SORT_DESC = "./images/open-iconic/arrow-top.svg";
    const IMG_ALT_SORT_ASC = "Column sorted in ascending order";
    const IMG_ALT_SORT_DESC = "Column sortedin descending order";
    const BUTTON_TOOLTIP_SORT_ASC = "Sort ascending";
    const BUTTON_TOOLTIP_SORT_DESC = "Sort descending";
    const BUTTON_CLASS_SORT_CURRENT = ["btn", "btn-primary", "p-1", "w-100"];
    const BUTTON_CLASS_SORT_OTHER = ["btn", "btn-outline-secondary", "p-1", "w-100"];
    const ROW_CLASS_EVEN = ["row", "flex-nowrap", "bg-white"];
    const ROW_CLASS_ODD = ["row", "flex-nowrap", "bg-gray"];
    //class EmulatedIncidentRecord extends sn_emulation_helpers.Emulated_GlideRecord {
    //    constructor() {
    //        super({ comment: <sn.GlideElement>{ getLabel: () => "Comment", getName(): () => "comment" }, u_is_mission_related: false, impact: 0, urgency: 0 });
    //    }
    //}
    class IncidentManagmentController {
        constructor($scope) {
            this.$scope = $scope;
            $scope.users_impacted = {
                label: "Users Impacted",
                selected: 0,
                options: [
                    { value: 0, text: "Unspecified / Unknown" },
                    { value: 1, text: "More than 100 people" },
                    { value: 2, text: "50 to 100 people" },
                    { value: 3, text: "10 to 49 people" },
                    { value: 4, text: "Less than 10 people" }
                ],
                isAutoValue: false,
                valueClass: "",
                explanation: {
                    class: "",
                    colSpan: 2
                }
            };
            $scope.productivity_impact = {
                label: "Productivity Impact",
                selected: 0,
                isAutoValue: false,
                options: [
                    { value: 0, text: "Unspecified / Unknown" },
                    { value: 1, text: "Complete work stoppage" },
                    { value: 2, text: "Partial work stoppage" },
                    { value: 3, text: "Effects execution of time-sensitive activities" },
                    { value: 4, text: "Currently using a work-around / alternate method to perform affected duties" }
                ],
                valueClass: "",
                explanationClass: ""
            };
            $scope.is_mission_related = {
                label: "Is Mission Related",
                value: "No",
                operand: 1.125,
                explanation: {
                    colSpan: 2,
                    class: ""
                }
            };
            $scope.caller_vip = {
                label: "Is VIP",
                value: false,
                operand: 1.375
            };
            let controller = this;
            $scope.priorityMatcherColumns = [
                $scope.$new(),
                $scope.$new(),
                $scope.$new(),
                $scope.$new(),
                $scope.$new(),
                $scope.$new()
            ];
            $scope.priorityMatcherColumns[0].label = "Order";
            $scope.priorityMatcherColumns[0].sort = (a, b) => a.order - b.order;
            $scope.priorityMatcherColumns[1].label = "Impact";
            $scope.priorityMatcherColumns[1].sort = (a, b) => a.impact - b.impact;
            $scope.priorityMatcherColumns[2].label = "Urgency";
            $scope.priorityMatcherColumns[2].sort = (a, b) => a.urgency - b.urgency;
            $scope.priorityMatcherColumns[3].label = "Is Mission Related?";
            $scope.priorityMatcherColumns[3].sort = (a, b) => (a.is_mission_related == b.is_mission_related) ? 0 : ((a.is_mission_related) ? -1 : 1);
            $scope.priorityMatcherColumns[4].label = "Is Caller VIP?";
            $scope.priorityMatcherColumns[4].sort = (a, b) => (a.vip_priority == b.vip_priority) ? 0 : ((a.vip_priority) ? -1 : 1);
            $scope.priorityMatcherColumns[5].label = "Priority Assignment";
            $scope.priorityMatcherColumns[5].sort = (a, b) => a.incident_priority - b.incident_priority;
            $scope.priorityMatcherColumns.forEach((currentCol) => {
                currentCol.alt = IMG_ALT_SORT_ASC;
                currentCol.tooltip = BUTTON_TOOLTIP_SORT_ASC;
                currentCol.showArrow = false;
                currentCol.arrowUrl = ICONURL_SORT_ASC;
                currentCol.isAscending = true;
                currentCol.isCurrent = false;
                currentCol.buttonClass = BUTTON_CLASS_SORT_OTHER;
                currentCol.toggle = () => {
                    let sorted = controller.$scope.priorityMatcherRules.sort(currentCol.sort);
                    if (currentCol.isCurrent) {
                        if (currentCol.isAscending) {
                            controller.$scope.priorityMatcherRules = sorted.reverse();
                            currentCol.tooltip = BUTTON_TOOLTIP_SORT_ASC;
                            currentCol.alt = IMG_ALT_SORT_DESC;
                            currentCol.arrowUrl = ICONURL_SORT_DESC;
                            currentCol.isAscending = false;
                        }
                        else {
                            controller.$scope.priorityMatcherRules = sorted;
                            currentCol.tooltip = BUTTON_TOOLTIP_SORT_DESC;
                            currentCol.alt = IMG_ALT_SORT_ASC;
                            currentCol.arrowUrl = ICONURL_SORT_ASC;
                            currentCol.isAscending = true;
                        }
                    }
                    else {
                        controller.$scope.priorityMatcherColumns.filter((cs) => cs.isCurrent).forEach((cs) => {
                            cs.tooltip = (cs.isAscending) ? BUTTON_TOOLTIP_SORT_ASC : BUTTON_TOOLTIP_SORT_DESC;
                            cs.showArrow = cs.isCurrent = false;
                            cs.buttonClass = BUTTON_CLASS_SORT_OTHER;
                        });
                        if (currentCol.isAscending) {
                            controller.$scope.priorityMatcherRules = sorted;
                            currentCol.tooltip = BUTTON_TOOLTIP_SORT_DESC;
                        }
                        else {
                            controller.$scope.priorityMatcherRules = sorted.reverse();
                            currentCol.tooltip = BUTTON_TOOLTIP_SORT_ASC;
                        }
                        currentCol.isCurrent = currentCol.showArrow = true;
                        currentCol.buttonClass = BUTTON_CLASS_SORT_CURRENT;
                    }
                    $scope.priorityMatcherRules.forEach((v, i) => v.rowClass = (i % 2 == 0) ? ROW_CLASS_EVEN : ROW_CLASS_ODD);
                };
            });
            $scope.priorityMatcherColumns[0].tooltip = BUTTON_TOOLTIP_SORT_DESC;
            $scope.priorityMatcherColumns[0].showArrow = $scope.priorityMatcherColumns[0].isCurrent = true;
            $scope.priorityMatcherColumns[0].buttonClass = BUTTON_CLASS_SORT_CURRENT;
            $scope.priorityMatcherRules = PriorityMatcherRuleValues.map((v, i) => ({
                order: v.order,
                impact: v.impact, impactName: ImpactUrgencyNames[v.impact - 1],
                urgency: v.urgency, urgencyName: ImpactUrgencyNames[v.urgency - 1],
                is_mission_related: v.is_mission_related, is_mission_relatedText: (v.is_mission_related) ? "Yes" : "No",
                vip_priority: v.vip_priority, vip_priorityText: (v.vip_priority) ? "Yes" : "No",
                incident_priority: v.incident_priority, incident_priorityName: IncidentPriorityNames[v.incident_priority - 1],
                rowClass: []
            })).sort($scope.priorityMatcherColumns[0].sort);
            $scope.priorityMatcherRules.forEach((v, i) => v.rowClass = (i % 2 == 0) ? ROW_CLASS_EVEN : ROW_CLASS_ODD);
        }
        $doCheck() { }
    }
    class DropdownSelectionController {
        constructor(_options, _changeCallback) {
            this._options = _options;
            this._changeCallback = _changeCallback;
            if (typeof _options != "object" || _options === null || _options.length == 0)
                this._selectedIndex = -1;
            else {
                this._selectedIndex = 0;
                this._selectedText = _options[0].text;
                this._selectedValue = _options[0].value;
            }
        }
        get options() { return this._options; }
        get selectedIndex() { return this._selectedIndex; }
        set selectedIndex(value) {
            if (typeof value != "number" || isNaN(value) || value < 0 || value >= this._options.length)
                value = -1;
            if (value === this._selectedIndex)
                return;
            let option;
            this._selectedIndex = value;
            if (value < 0) {
                this._selectedValue = undefined;
                this._selectedText = undefined;
            }
            else {
                option = this._options[value];
                this._selectedText = option.text;
                this._selectedValue = option.value;
            }
            if (typeof this._changeCallback === "function")
                this._changeCallback(option, value);
        }
        get selectedValue() { return this._selectedValue; }
        set selectedValue(value) {
            for (var i = 0; i < this._options.length; i++) {
                if (this._options[i].value === value) {
                    this.selectedIndex = i;
                    return;
                }
            }
            this.selectedIndex = -1;
        }
        get selectedText() { return this._selectedText; }
        set selectedText(value) {
            for (var i = 0; i < this._options.length; i++) {
                if (this._options[i].text === value) {
                    this.selectedIndex = i;
                    return;
                }
            }
            this.selectedIndex = -1;
        }
    }
    app.appModule.controller("incidentManagmentController", ['$scope', IncidentManagmentController]);
    class ProducerEmulatorController {
        constructor() {
            this._is_caller_vip = false;
            let controller = this;
            this._users_impacted = new DropdownSelectionController([
                { value: "0", text: "Unspecified / Unknown", id: "usersImpacted0" },
                { value: "1", text: "More than 100 people", id: "usersImpacted1" },
                { value: "2", text: "50 to 100 people", id: "usersImpacted2" },
                { value: "3", text: "10 to 49 people", id: "usersImpacted3" },
                { value: "4", text: "Less than 10 people", id: "usersImpacted4" }
            ], () => {
                controller.emulateCalculation();
            });
            this._productivity_impact = new DropdownSelectionController([
                { value: "0", text: "Unspecified / Unknown", id: "productivityImpact0" },
                { value: "1", text: "Complete work stoppage", id: "productivityImpact1" },
                { value: "2", text: "Partial work stoppage", id: "productivityImpact2" },
                { value: "3", text: "Effects execution of time-sensitive activities", id: "productivityImpact3" },
                { value: "4", text: "Currently using a work-around / alternate method to perform affected duties", id: "productivityImpact4" }
            ], () => {
                controller.emulateCalculation();
            });
            this._is_mission_related = new DropdownSelectionController([
                { value: "0", text: "Yes", id: "isMissionRelated" },
                { value: "1", text: "No", id: "isMissionRelated" }
            ], () => {
                controller.emulateCalculation();
            });
            this._is_mission_related.selectedIndex = 1;
            this.emulateCalculation();
        }
        get users_impacted() { return this._users_impacted; }
        get productivity_impact() { return this._productivity_impact; }
        get is_mission_related() { return this._is_mission_related; }
        get is_caller_vip() { return this._is_caller_vip; }
        set is_caller_vip(value) {
            if (this._is_caller_vip === (value = value === true))
                return;
            this._is_caller_vip = value;
            this.emulateCalculation();
        }
        get impact() { return this._impact; }
        get urgency() { return this._urgency; }
        get priority() { return this._priority; }
        get comment() { return this._comment; }
        get noUserImpactSelection() { return this._noUserImpactSelection; }
        get noProductivityImpactSelection() { return this._noProductivityImpactSelection; }
        get noImpactSelection() { return this._noImpactSelection; }
        get effective_productivity_impact() { return this._effective_productivity_impact; }
        get effective_user_impact() { return this._effective_user_impact; }
        get baseFormulas() { return this._baseFormulas; }
        get vipOrMission() { return this._vipOrMission; }
        get vipAndMission() { return this._vipAndMission; }
        get missionAndNotVip() { return this._missionAndNotVip; }
        emulateCalculation() {
            let current = new sn_emulation_helpers.Emulated_GlideRecord({
                u_is_mission_related: false,
                impact: 3,
                urgency: 3,
                comment: ""
            });
            ProducerEmulatorController.emulateSubmitAnIncidentBusinessRule({
                is_mission_related: this._is_mission_related.selectedText,
                productivity_impact: parseInt(this._productivity_impact.selectedValue),
                users_impacted: parseInt(this._users_impacted.selectedValue)
            }, current, new sn_emulation_helpers.Emulated_GlideRecord({ vip: false }));
            let s = current.impact.toString();
            let i = parseInt(s);
            this._impact = s + " - " + ImpactUrgencyNames[i - 1];
            s = current.urgency.toString();
            let u = parseInt(s);
            this._urgency = s + " - " + ImpactUrgencyNames[u - 1];
            let isMissionRelated = parseInt(this._is_mission_related.selectedValue) === 0;
            let p = PriorityMatcherRuleValues.filter((v) => v.impact === i && v.urgency === u && v.is_mission_related === isMissionRelated && v.vip_priority === this.is_caller_vip)[0].incident_priority;
            this._priority = p + " - " + IncidentPriorityNames[p - 1];
            this._comment = current.comment.toString();
            if (isMissionRelated) {
                this._baseFormulas = false;
                if (this._is_caller_vip) {
                    this._baseFormulas = this._vipOrMission = this._missionAndNotVip = false;
                    this._vipAndMission = true;
                }
                else {
                    this._vipOrMission = this._missionAndNotVip = true;
                    this._vipAndMission = false;
                }
            }
            else {
                this._vipAndMission = this._missionAndNotVip = false;
                if (this._is_caller_vip) {
                    this._vipOrMission = true;
                    this._baseFormulas = false;
                }
                else {
                    this._baseFormulas = true;
                    this._vipOrMission = false;
                }
            }
            if (parseInt(this._productivity_impact.selectedValue) === 0) {
                if (parseInt(this._users_impacted.selectedValue) === 0) {
                    this._noImpactSelection = true;
                    this._noUserImpactSelection = this._noProductivityImpactSelection = false;
                    this._effective_productivity_impact = this._effective_user_impact = (this._is_caller_vip) ? 2 : ((isMissionRelated) ? 3 : 4);
                }
                else {
                    this._effective_user_impact = parseInt(this._users_impacted.selectedValue);
                    this._noProductivityImpactSelection = true;
                    this._noUserImpactSelection = this._noImpactSelection = false;
                    this._effective_productivity_impact = this._effective_user_impact;
                }
            }
            else {
                this._noImpactSelection = this._noProductivityImpactSelection = false;
                this._effective_productivity_impact = parseInt(this._productivity_impact.selectedValue);
                if (parseInt(this._users_impacted.selectedValue) === 0) {
                    this._noUserImpactSelection = true;
                    this._effective_user_impact = this._effective_productivity_impact;
                }
                else {
                    this._effective_user_impact = parseInt(this._users_impacted.selectedValue);
                    this._noUserImpactSelection = false;
                }
            }
        }
        static emulateSubmitAnIncidentBusinessRule(producer, current, caller) {
            let users_impacted = (typeof producer.users_impacted === "number") ? producer.users_impacted : parseInt(producer.users_impacted);
            current.u_is_mission_related = (producer.is_mission_related == "Yes");
            let notes = "User selected the following incident submission options:\n\nMission Related: " + producer.is_mission_related + "\nUsers Affected: ";
            if (caller.vip)
                notes = "VIP " + notes;
            switch (users_impacted) {
                case 1:
                    notes += "More than 100 people";
                    break;
                case 2:
                    notes += "50 to 100 people";
                    break;
                case 3:
                    notes += "10 to 49 people";
                    break;
                case 4:
                    notes += "Less than 10 people";
                    break;
                default:
                    notes += "Unspecified / Unknown";
                    break;
            }
            let productivity_impact = (typeof producer.productivity_impact === "number") ? producer.productivity_impact : parseInt(producer.productivity_impact);
            notes += "\nEffect on productivity: ";
            switch (productivity_impact) {
                case 1:
                    current.comment = notes + "Complete work stoppage";
                    break;
                case 2:
                    current.comment = notes + "Partial work stoppage";
                    break;
                case 3:
                    current.comment = notes + "Effects execution of time-sensitive activities";
                    break;
                case 4:
                    current.comment = notes + "Currently using a work-around / alternate method to perform affected duties";
                    break;
                default:
                    current.comment = notes + "Unspecified / Unknown";
                    break;
            }
            if (users_impacted < 1) {
                if (productivity_impact < 1)
                    productivity_impact = users_impacted = (caller.vip) ? 2 : ((current.u_is_mission_related) ? 3 : 4);
                else
                    users_impacted = productivity_impact;
            }
            else if (productivity_impact < 1)
                productivity_impact = users_impacted;
            current.impact = Math.round(((caller.vip) ? ((current.u_is_mission_related) ? (productivity_impact + users_impacted) :
                (productivity_impact + users_impacted) * 1.125) :
                (productivity_impact + users_impacted) * ((current.u_is_mission_related) ? 1.25 : 1.375)) / (11.0 / 3.0));
            current.urgency = Math.round((productivity_impact + ((caller.vip) ? ((current.u_is_mission_related) ? 1 : 2) : ((current.u_is_mission_related) ? 3 : 4))) * 0.35);
        }
        $doCheck() { }
    }
    app.appModule.controller("producerEmulatorController", [ProducerEmulatorController]);
    /*
var mainModule = angular.module("mainModule", []);
mainModule.controller("mainController", function ($scope) {
});
mainModule.controller("priorityExampleController", function ($scope) {
    $scope.users_impacted = {
        label: "Users Impacted",
        selected: 0,
        options: [
            { value: 0, text: "Unspecified / Unknown" },
            { value: 1, text: "More than 100 people" },
            { value: 2, text: "50 to 100 people" },
            { value: 3, text: "10 to 49 people" },
            { value: 4, text: "Less than 10 people" }
        ],
        isAutoValue: false,
        valueClass: "",
        explanation: {
            class: "",
            colSpan: 2
        }
    };
    $scope.productivity_impact = {
        label: "Productivity Impact",
        selected: 0,
        isAutoValue: false,
        options: [
            { value: 0, text: "Unspecified / Unknown" },
            { value: 1, text: "Complete work stoppage" },
            { value: 2, text: "Partial work stoppage" },
            { value: 3, text: "Effects execution of time-sensitive activities" },
            { value: 4, text: "Currently using a work-around / alternate method to perform affected duties" }
        ],
        valueClass: "",
        explanationClass: ""
    };
    $scope.is_mission_related = {
        label: "Is Mission Related",
        value: "No",
        operand: 1.125,
        explanation: {
            colSpan: 2,
            class: ""
        }
    };
    $scope.caller_vip = {
        label: "Is VIP",
        value: false,
        operand: 1.375
    };
    $scope.impact = {};
    $scope.urgency = {};
    $scope.comment = "";
    function emulateSubmitAnIncidentBusinessRule(producer, current, caller) {
        var users_impacted = parseInt(producer.users_impacted);
        current.u_is_mission_related = (producer.is_mission_related == "Yes");
        var notes = "User selected the following incident submission options:\n\nMission Related: " + producer.is_mission_related + "\nUsers Affected: ";
        switch (users_impacted) {
            case 1:
                current.comment = notes + "More than 100 people";
                break;
            case 2:
                current.comment = notes + "50 to 100 people";
                break;
            case 3:
                current.comment = notes + "10 to 49 people";
                break;
            case 4:
                current.comment = notes + "Less than 10 people";
                break;
            default:
                current.comment = notes + "Unspecified / Unknown";
                break;
        }
        notes = notes + "\nProductivity Impact: ";
        var productivity_impact = parseInt(producer.productivity_impact);
        switch (productivity_impact) {
            case 1:
                notes = notes + "Complete work stoppage";
                break;
            case 2:
                notes = notes + "Partial work stoppage";
                break;
            case 3:
                notes = notes + "Effects execution of time-sensitive activities";
                break;
            case 4:
                notes = notes + "Currently using a work-around / alternate method to perform affected duties";
                break;
            default:
                notes = notes + "Unspecified / Unknown";
                break;
        }
        if (users_impacted < 1) {
            if (productivity_impact < 1)
                productivity_impact = users_impacted = (caller.vip) ? 2 : ((current.u_is_mission_related) ? 3 : 4);
            else
                users_impacted = productivity_impact;
        } else if (productivity_impact < 1)
            productivity_impact = users_impacted;

        current.impact = Math.round(((caller.vip) ? ((current.u_is_mission_related) ? (productivity_impact + users_impacted) :
            (productivity_impact + users_impacted) * 1.125) :
            (productivity_impact + users_impacted) * ((current.u_is_mission_related) ? 1.25 : 1.375)) / (11.0 / 3.0));
        current.urgency = Math.round((productivity_impact + ((caller.vip) ? ((current.u_is_mission_related) ? 1 : 2) : ((current.u_is_mission_related) ? 3 : 4))) * 0.35);
    }
    $scope.onOptionChange = function () {
        var current = {};
        emulateSubmitAnIncidentBusinessRule({
            users_impacted: $scope.users_impacted.selected,
            productivity_impact: $scope.productivity_impact.selected,
            is_mission_related: $scope.is_mission_related.value
        }, current, { vip: $scope.caller_vip.value });

        $scope.users_impacted.value = parseFloat($scope.users_impacted.selected);
        $scope.productivity_impact.value = parseFloat($scope.productivity_impact.selected);
        $scope.users_impacted.isAutoValue = $scope.users_impacted.value < 1;
        $scope.productivity_impact.isAutoValue = $scope.productivity_impact.value < 1;
        if ($scope.users_impacted.isAutoValue) {
            $scope.users_impacted.valueClass = "autoValue";
            if ($scope.productivity_impact.isAutoValue)
                $scope.productivity_impact.value = ($scope.caller_vip.value) ? 2 : ((current.u_is_mission_related) ? 3 : 4);
            else
                $scope.productivity_impact.valueClass = "";
            $scope.productivity_impact.valueClass = $scope.productivity_impact.explanationClass = "";
            $scope.users_impacted.value = $scope.productivity_impact.value;
            $scope.users_impacted.explanation.class = "text-info";
            $scope.users_impacted.explanation.colSpan = 2;
        } else {
            $scope.users_impacted.explanation.colSpan = 1;
            $scope.users_impacted.valueClass = $scope.users_impacted.explanation.class = "";
            if ($scope.productivity_impact.isAutoValue) {
                $scope.productivity_impact.valueClass = "autoValue";
                $scope.productivity_impact.value = $scope.users_impacted.value;
                $scope.productivity_impact.explanationClass = "text-info";
            } else {
                $scope.productivity_impact.valueClass = $scope.productivity_impact.explanationClass = "";
            }
        }
        $scope.impact.value = $scope.users_impacted.value + $scope.productivity_impact.value;
        if ($scope.caller_vip.value) {
            $scope.is_mission_related.colSpan = 2;
            if (current.u_is_mission_related)
                $scope.is_mission_related.explanation.class = "";
            else {
                $scope.impact.value *= $scope.is_mission_related.operand;
                $scope.is_mission_related.explanation.class = "text-info";
            }
        } else {
            $scope.is_mission_related.colSpan = 1;
            if (current.u_is_mission_related) {
                $scope.impact.value *= ($scope.is_mission_related.operand + $scope.caller_vip.operand);
                $scope.is_mission_related.explanation.class = "text-info";
            } else {
                $scope.impact.value *= $scope.caller_vip.operand;
                $scope.is_mission_related.explanation.class = "";
            }
        }
        $scope.impact.value /= (11.0 / 3.0);
        $scope.impact.rounded = current.impact;
        $scope.urgency.value = ($scope.productivity_impact.value +
            (($scope.caller_vip.value) ? ((current.u_is_mission_related) ? 1 : 2) : ((current.u_is_mission_related) ? 3 : 4))) * 0.35;
        $scope.urgency.rounded = current.urgency;
        if ($scope.impact.rounded != Math.round($scope.impact.value))
            alert("Expected Impact: " + Math.round($scope.impact.value) + "; Actual: " + $scope.impact.rounded);
        if ($scope.urgency.rounded != Math.round($scope.urgency.value))
            alert("Expected Urgency: " + Math.round($scope.urgency.value) + "; Actual: " + $scope.urgency.rounded);
        $scope.comment = current.comment;
    };
    $scope.get3TierDescription = function (value) {
        switch (value) {
            case 1:
                return "1 - High";
            case 2:
                return "2 - Medium";
            case 3:
                return "3 - Low";
        }
        return "Unknown: " + value;
    }
    $scope.get5TierDescription = function (value) {
        switch (value) {
            case 1:
                return "1 - Critical";
            case 2:
                return "2 - High";
            case 3:
                return "3 - Moderate";
            case 4:
                return "4 - Low";
            case 5:
                return "5 - Planning";
        }
        return "Unknown: " + value;
    }
    $scope.onOptionChange();
});
     */
})(inicidentManagment || (inicidentManagment = {}));
