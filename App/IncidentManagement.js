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
    class SortableColumnState {
        constructor(headingText, _propertyName, _onSortChangeCallback) {
            this._propertyName = _propertyName;
            this._onSortChangeCallback = _onSortChangeCallback;
            this._isDescending = false;
            this._isCurrent = false;
            if (typeof _propertyName !== "string" || _propertyName.trim().length == 0)
                throw new Error("Property name cannot be empty.");
            this._headingText = (typeof headingText != "string" || (headingText = headingText.trim()).length == 0) ? _propertyName.trim() : headingText;
            this.updateText();
        }
        get propertyName() { return this._propertyName; }
        get headingText() { return this._headingText; }
        get imageAltText() { return this._imageAltText; }
        get buttonTooltip() { return this._buttonTooltip; }
        get buttonImageUrl() { return this._buttonImageUrl; }
        get buttonClass() { return ["btn", this._buttonClass, "p-1", "w-100"]; }
        get isDescending() { return this._isDescending; }
        set isDescending(value) {
            if (this._isDescending === (value = sys.asBoolean(value, false)))
                return;
            this._isDescending = value;
            this.updateText();
            this._onSortChangeCallback(this);
        }
        get isCurrent() { return this._isCurrent; }
        set isCurrent(value) {
            if (this._isCurrent === (value = sys.asBoolean(value, false)))
                return;
            this._isCurrent = value;
            this.updateText();
        }
        compare(x, y) {
            let a, b;
            let t1 = typeof x;
            if (t1 === "object" && x !== null) {
                a = x[this._propertyName];
                t1 = typeof a;
            }
            else
                a = x;
            let t2 = typeof y;
            if (t2 === "object" && y !== null) {
                b = y[this._propertyName];
                t2 = typeof b;
            }
            else
                b = y;
            if (t1 === "undefined")
                return (t2 === "undefined") ? 0 : -1;
            if (t2 === "undefined")
                return 1;
            if (t1 === "boolean") {
                if (t2 === "boolean")
                    return (a === b) ? 0 : ((a) ? -1 : 1);
                if (t2 === "number")
                    return ((isNaN(b) || b === 0) === a) ? 0 : ((a) ? -1 : 1);
                if (t2 === "object" && b === null)
                    return 1;
            }
            else if (t1 === "number") {
                if (t2 === "number")
                    return a - b;
                if (t2 === "boolean")
                    return ((isNaN(a) || a === 0) === b) ? 0 : ((b) ? 1 : -1);
                if (t2 === "object" && b === null)
                    return 1;
            }
            else if (t1 === "object" && a === null)
                return (t2 === "object" && b === null) ? 0 : -1;
            return (a < b) ? -1 : ((a > b) ? 1 : 0);
        }
        toggleSort() {
            if (this._isCurrent)
                this.isDescending = !this._isDescending;
            else
                this._onSortChangeCallback(this);
        }
        updateText() {
            if (this._isDescending) {
                this._imageAltText = "Sorted by column in descending order";
                this._buttonImageUrl = "./images/open-iconic/arrow-top.svg";
            }
            else {
                this._imageAltText = "Sorted by column in ascending order";
                this._buttonImageUrl = "./images/open-iconic/arrow-bottom.svg";
            }
            this._buttonTooltip = (this._isCurrent == this._isDescending) ? "Sort ascending" : "Sort descending";
            this._buttonClass = (this._isCurrent) ? "btn-primary" : "btn-outline-secondary";
        }
    }
    class PriorityMatcherRule {
        constructor(_order, _impact, _urgency, _is_mission_related, _vip_priority, _incident_priority) {
            this._order = _order;
            this._impact = _impact;
            this._urgency = _urgency;
            this._is_mission_related = _is_mission_related;
            this._vip_priority = _vip_priority;
            this._incident_priority = _incident_priority;
        }
        get order() { return this._order; }
        get impact_value() { return this._impact; }
        get urgency_value() { return this._urgency; }
        get is_mission_related_value() { return this._is_mission_related; }
        get vip_priority_value() { return this._vip_priority; }
        get incident_priority_value() { return this._incident_priority; }
        get impact_display_text() { return ImpactUrgencyNames[this._impact - 1]; }
        get urgency_display_text() { return ImpactUrgencyNames[this._urgency - 1]; }
        get is_mission_related_display_text() { return (this._is_mission_related) ? "Yes" : "No"; }
        get vip_priority_display_text() { return (this._is_mission_related) ? "Yes" : "No"; }
        get incident_priority_display_text() { return IncidentPriorityNames[this._urgency - 1]; }
        get rowClass() { return ["row", "flex-nowrap", this._rowClass]; }
        static sortRules(sortColumn, rules) {
            ((sortColumn.isDescending) ?
                rules.sort((x, y) => sortColumn.compare(y, x)) :
                rules.sort((x, y) => sortColumn.compare(x, y))).forEach((value, index) => {
                value._rowClass = ((index % 2) === 0) ? "bg-white" : "bg-gray";
                rules[index] = value;
            });
        }
        static lookupPriority(impact, urgency, isMissionRelated, isVip) {
            return PriorityMatcherRule._priorityMatcherRules.filter((value) => { return impact === value._impact && urgency === value._urgency && isMissionRelated == value._is_mission_related && isVip == value._vip_priority; })[0]._incident_priority;
        }
        static getRules(sortColumn) {
            let result = PriorityMatcherRule._priorityMatcherRules.sort((x, y) => sortColumn.compare(x, y)).map((value) => {
                return new PriorityMatcherRule(value._order, value._impact, value._urgency, value._is_mission_related, value._vip_priority, value._incident_priority);
            });
            this.sortRules(sortColumn, result);
            return result;
        }
    }
    PriorityMatcherRule._priorityMatcherRules = [
        new PriorityMatcherRule(100, 1, 1, true, true, 1),
        new PriorityMatcherRule(200, 1, 1, false, true, 1),
        new PriorityMatcherRule(300, 1, 1, true, false, 1),
        new PriorityMatcherRule(400, 1, 2, true, true, 1),
        new PriorityMatcherRule(500, 2, 1, true, true, 1),
        new PriorityMatcherRule(600, 1, 1, false, false, 2),
        new PriorityMatcherRule(700, 1, 2, false, true, 2),
        new PriorityMatcherRule(800, 1, 2, true, false, 2),
        new PriorityMatcherRule(900, 2, 1, false, true, 2),
        new PriorityMatcherRule(1000, 2, 1, true, false, 2),
        new PriorityMatcherRule(1100, 1, 3, true, true, 2),
        new PriorityMatcherRule(1200, 2, 2, true, true, 2),
        new PriorityMatcherRule(1300, 3, 1, true, true, 2),
        new PriorityMatcherRule(1400, 1, 2, false, false, 3),
        new PriorityMatcherRule(1500, 2, 1, false, false, 3),
        new PriorityMatcherRule(1600, 1, 3, false, true, 3),
        new PriorityMatcherRule(1700, 1, 3, true, false, 3),
        new PriorityMatcherRule(1800, 2, 2, false, true, 3),
        new PriorityMatcherRule(1900, 2, 2, true, false, 3),
        new PriorityMatcherRule(2000, 3, 1, false, true, 3),
        new PriorityMatcherRule(2100, 3, 1, true, false, 3),
        new PriorityMatcherRule(2200, 2, 3, true, true, 3),
        new PriorityMatcherRule(2300, 3, 2, true, true, 3),
        new PriorityMatcherRule(2400, 1, 3, false, false, 4),
        new PriorityMatcherRule(2500, 2, 2, false, false, 4),
        new PriorityMatcherRule(2600, 3, 1, false, false, 4),
        new PriorityMatcherRule(2700, 2, 3, false, true, 4),
        new PriorityMatcherRule(2800, 2, 3, true, false, 4),
        new PriorityMatcherRule(2900, 3, 2, false, true, 4),
        new PriorityMatcherRule(3000, 3, 2, true, false, 4),
        new PriorityMatcherRule(3100, 3, 3, true, true, 4),
        new PriorityMatcherRule(3200, 2, 3, false, false, 5),
        new PriorityMatcherRule(3300, 3, 2, false, false, 5),
        new PriorityMatcherRule(3400, 3, 3, false, true, 5),
        new PriorityMatcherRule(3500, 3, 3, true, false, 5),
        new PriorityMatcherRule(3600, 3, 3, false, false, 5)
    ];
    class IncidentManagmentController {
        constructor() {
            let controller = this;
            function onSortChangeCallback(col) {
                if (!col.isCurrent) {
                    controller._priorityMatcherColumns.forEach((value) => value.isCurrent = false);
                    col.isCurrent = true;
                }
                PriorityMatcherRule.sortRules(col, controller._priorityMatcherRules);
            }
            this._priorityMatcherColumns = [
                new SortableColumnState("Order", "order", onSortChangeCallback),
                new SortableColumnState("Impact", "impact_value", onSortChangeCallback),
                new SortableColumnState("Urgency", "urgency_value", onSortChangeCallback),
                new SortableColumnState("Is Mission Related?", "is_mission_related_value", onSortChangeCallback),
                new SortableColumnState("Is Caller VIP?", "vip_priority_value", onSortChangeCallback),
                new SortableColumnState("Priority Assignment", "incident_priority_value", onSortChangeCallback)
            ];
            this._priorityMatcherColumns[0].isCurrent = true;
            this._priorityMatcherRules = PriorityMatcherRule.getRules(this._priorityMatcherColumns[0]);
        }
        get priorityMatcherColumns() { return this._priorityMatcherColumns; }
        get priorityMatcherRules() { return this._priorityMatcherRules; }
        $doCheck() { }
    }
    app.appModule.controller("incidentManagmentController", [IncidentManagmentController]);
    class DropdownSelectionState {
        constructor(_options, _changeCallback) {
            this._options = _options;
            this._changeCallback = _changeCallback;
            if (typeof _options != "object" || _options === null || _options.length == 0)
                this._selectedIndex = -1;
            else {
                this._selectedIndex = 0;
                this._selectedLabel = _options[0].label;
                this._selectedValue = _options[0].value;
                this._selectedText = sys.asString(_options[0].value, false, "");
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
                this._selectedLabel = undefined;
                this._selectedText = undefined;
            }
            else {
                option = this._options[value];
                this._selectedLabel = option.label;
                this._selectedValue = option.value;
                this._selectedText = sys.asString(option.value, false, "");
            }
            if (typeof this._changeCallback === "function")
                this._changeCallback(option, value);
        }
        get selectedValue() { return this._selectedValue; }
        set selectedValue(value) {
            if (typeof value !== "undefined") {
                for (let index = 0; index < this._options.length; index++) {
                    if (this._options[index].value === value) {
                        this.selectedIndex = index;
                        return;
                    }
                }
            }
            this.selectedIndex = -1;
        }
        get selectedText() { return this._selectedText; }
        set selectedText(value) {
            if (typeof value === "string") {
                for (let index = 0; index < this._options.length; index++) {
                    if (sys.asString(this._options[index].value, false, "") === value) {
                        this.selectedIndex = index;
                        return;
                    }
                }
            }
            this.selectedIndex = -1;
        }
        get selectedLabel() { return this._selectedLabel; }
        set selectedLabel(value) {
            if (typeof value === "string") {
                for (let index = 0; index < this._options.length; index++) {
                    if (this._options[index].label === value) {
                        this.selectedIndex = index;
                        return;
                    }
                }
            }
            this.selectedIndex = -1;
        }
    }
    class ProducerEmulatorController {
        constructor() {
            this._is_caller_vip = false;
            this._showCalculations = false;
            let controller = this;
            this._users_impacted = new DropdownSelectionState([
                { value: 0, label: "Unspecified / Unknown", id: "usersImpacted0" },
                { value: 1, label: "More than 100 people", id: "usersImpacted1" },
                { value: 2, label: "50 to 100 people", id: "usersImpacted2" },
                { value: 3, label: "10 to 49 people", id: "usersImpacted3" },
                { value: 4, label: "Less than 10 people", id: "usersImpacted4" }
            ], () => {
                controller.emulateCalculation();
            });
            this._productivity_impact = new DropdownSelectionState([
                { value: 0, label: "Unspecified / Unknown", id: "productivityImpact0" },
                { value: 1, label: "Complete work stoppage", id: "productivityImpact1" },
                { value: 2, label: "Partial work stoppage", id: "productivityImpact2" },
                { value: 3, label: "Effects execution of time-sensitive activities", id: "productivityImpact3" },
                { value: 4, label: "Currently using a work-around / alternate method to perform affected duties", id: "productivityImpact4" }
            ], () => {
                controller.emulateCalculation();
            });
            this._is_mission_related = new DropdownSelectionState([
                { value: true, label: "Yes", id: "isMissionRelated" },
                { value: false, label: "No", id: "isMissionRelated" }
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
        get noUserImpactSelection() { return this._users_impacted.selectedValue == 0 && this._productivity_impact.selectedValue > 0; }
        get noProductivityImpactSelection() { return this._productivity_impact.selectedValue == 0 && this._users_impacted.selectedValue > 0; }
        get noImpactSelection() { return this._productivity_impact.selectedValue == 0 && this._users_impacted.selectedValue == 0; }
        get effective_productivity_impact() { return this._effective_productivity_impact; }
        get effective_user_impact() { return this._effective_user_impact; }
        get vipOrMission() { return this._is_caller_vip || this._is_mission_related.selectedValue; }
        get vipAndMission() { return this._is_caller_vip && this._is_mission_related.selectedValue; }
        get missionAndNotVip() { return this._is_mission_related.selectedValue && !this._is_caller_vip; }
        get showCalculations() { return this._showCalculations; }
        set showCalculations(value) { this._showCalculations = value === true; }
        toggleShowCalculations() { this._showCalculations = !this._showCalculations; }
        emulateCalculation() {
            let current = new sn_emulation_helpers.Emulated_GlideRecord({
                u_is_mission_related: false,
                impact: 3,
                urgency: 3,
                comment: ""
            });
            ProducerEmulatorController.emulateSubmitAnIncidentBusinessRule({
                is_mission_related: this._is_mission_related.selectedText,
                productivity_impact: this._productivity_impact.selectedValue,
                users_impacted: this._users_impacted.selectedValue
            }, current, new sn_emulation_helpers.Emulated_GlideRecord({ vip: false }));
            let s = current.impact.toString();
            let i = parseInt(s);
            this._impact = s + " - " + ImpactUrgencyNames[i - 1];
            s = current.urgency.toString();
            let u = parseInt(s);
            this._urgency = s + " - " + ImpactUrgencyNames[u - 1];
            let p = PriorityMatcherRule.lookupPriority(i, u, this._is_mission_related.selectedValue, this._is_caller_vip);
            this._priority = p + " - " + IncidentPriorityNames[p - 1];
            this._comment = current.comment.toString();
            if (this._productivity_impact.selectedValue === 0) {
                if (this._users_impacted.selectedValue === 0) {
                    this._effective_productivity_impact = this._effective_user_impact = (this._is_caller_vip) ? 2 : ((this._is_mission_related.selectedValue) ? 3 : 4);
                }
                else {
                    this._effective_user_impact = this._users_impacted.selectedValue;
                    this._effective_productivity_impact = this._effective_user_impact;
                }
            }
            else {
                this._effective_productivity_impact = this._productivity_impact.selectedValue;
                if (this._users_impacted.selectedValue === 0) {
                    this._effective_user_impact = this._effective_productivity_impact;
                }
                else {
                    this._effective_user_impact = this._users_impacted.selectedValue;
                }
            }
        }
        static emulateSubmitAnIncidentBusinessRule(producer, current, caller) {
            let users_impacted = (typeof producer.users_impacted === "number") ? producer.users_impacted : parseInt(producer.users_impacted);
            let isMissionRelated = current.u_is_mission_related = (producer.is_mission_related == "Yes");
            let isVip = caller.getValue('vip') == 'true';
            let notes = "User selected the following incident submission options:\n\nMission Related: " + producer.is_mission_related + "\nUsers Affected: ";
            if (isVip)
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
                    productivity_impact = users_impacted = (caller.vip) ? 2 : ((isMissionRelated) ? 3 : 4);
                else
                    users_impacted = productivity_impact;
            }
            else if (productivity_impact < 1)
                productivity_impact = users_impacted;
            current.impact = Math.round(((isVip) ? ((isMissionRelated) ? (productivity_impact + users_impacted) :
                (productivity_impact + users_impacted) * 1.125) :
                (productivity_impact + users_impacted) * ((isMissionRelated) ? 1.25 : 1.375)) / (11.0 / 3.0));
            current.urgency = Math.round((productivity_impact + ((isVip) ? ((isMissionRelated) ? 1 : 2) : ((isMissionRelated) ? 3 : 4))) * 0.35);
        }
        $doCheck() { }
    }
    app.appModule.controller("producerEmulatorController", [ProducerEmulatorController]);
})(inicidentManagment || (inicidentManagment = {}));
