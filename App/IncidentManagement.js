/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="commonServiceNowDefinitions.ts" />
/// <reference path="sys.ts" />
/// <reference path="app.ts" />
var inicidentManagment;
(function (inicidentManagment) {
    ;
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
        }
        $doCheck() { }
        emulateSubmitAnIncidentBusinessRule(producer, current, caller) {
            let users_impacted = (typeof producer.users_impacted === "number") ? producer.users_impacted : parseInt(producer.users_impacted);
            current.u_is_mission_related = (producer.is_mission_related == "Yes");
            let notes = "User selected the following incident submission options:\n\nMission Related: " + producer.is_mission_related + "\nUsers Affected: ";
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
            let productivity_impact = (typeof producer.productivity_impact === "number") ? producer.productivity_impact : parseInt(producer.productivity_impact);
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
    }
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
    app.appModule.controller("incidentManagmentController", ['$scope', IncidentManagmentController]);
})(inicidentManagment || (inicidentManagment = {}));
