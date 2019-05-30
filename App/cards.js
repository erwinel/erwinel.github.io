/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="sys.ts" />
/// <reference path="app.ts" />
var cards;
(function (cards) {
    // #region CardParentController
    function isCardContainerScope(scope) {
        return !((sys.isNil(scope) || sys.isNil(scope.selectedCardIndex) || sys.isNil(scope.collapseCard) || sys.isNil(scope.collapseSelectedCard) ||
            sys.isNil(scope.expandCard) || sys.isNil(scope.toggleCard) || sys.isNil(scope.addCard))) && sys.isNumber(scope.selectedCardIndex) &&
            (typeof scope.collapseCard === "function") && (typeof scope.collapseSelectedCard === "function") &&
            (typeof scope.expandCard === "function") && (typeof scope.toggleCard === "function" && (typeof scope.addCard === "function"));
    }
    cards.isCardContainerScope = isCardContainerScope;
    /**
     * Manages a collection of nested collapsible cards.
     *
     * @abstract
     * @class CardParentController
     * @extends {cardController}
     */
    class CardParentController {
        /**
         * Creates an instance of topLevelCardController.
         * @param {ICardContainerScope} $scope The {@link ng.IScope} object for the new card, which implements {@link ICardParentScope}.
         */
        constructor($scope) {
            this.$scope = $scope;
            this._scopeIds = [];
            this._childCards = [];
            this._selectedCardIndex = -1;
            let controller = this;
            $scope.selectedCardIndex = this.selectedCardIndex;
            $scope.addCard = (card) => { return controller.addCard(card); };
            $scope.collapseSelectedCard = () => { return controller.collapseSelectedCard(); };
            $scope.collapseCard = (index) => { return controller.collapseCard(index); };
            $scope.expandCard = (index) => { return controller.expandCard(index); };
            $scope.toggleCard = (index) => { return controller.toggleCard(index); };
            $scope.indexOfCard = (scopeId) => { return controller.indexOfCard(scopeId); };
        }
        get selectedCardScopeId() {
            if (this._selectedCardIndex > -1)
                return this._scopeIds[this._selectedCardIndex];
        }
        set selectedCardScopeId(scopeId) { this.selectedCardIndex = (typeof (scopeId) === "number") ? this._scopeIds.indexOf(scopeId) : -1; }
        get selectedCardIndex() { return this._selectedCardIndex; }
        set selectedCardIndex(index) {
            if (index < 0) {
                if (this._selectedCardIndex > -1)
                    this.collapseCard(this._selectedCardIndex);
            }
            else
                this.expandCard(index);
        }
        addCard(card) {
            if (sys.isNil(card) || !sys.isNumber(card.$id))
                throw new Error("Invalid card.");
            if (!sys.isNil(card.currentCardParent))
                throw new Error("Card \"" + card.cardHeadingText + "\" belongs to another collection");
            let index = this._scopeIds.indexOf(card.$id);
            if (index > -1)
                throw new Error("A card with the name scope ID has already been added.");
            index = this._childCards.length;
            this._scopeIds.push(card.$id);
            this._childCards.push(card);
            card.currentCardNumber = index + 1;
            card.currentCardParent = this.$scope;
            if (this._selectedCardIndex < 0) {
                this._selectedCardIndex = this.$scope.selectedCardIndex = index;
                card.cardActionVerb = CollapsibleActionVerb.collapse;
                card.cardIconUrl = CollapsibleIconUrl.collapse;
                card.currentCardIsExpanded = true;
            }
            else {
                card.cardActionVerb = CollapsibleActionVerb.expand;
                card.cardIconUrl = CollapsibleIconUrl.expand;
                card.currentCardIsExpanded = false;
            }
            return index;
        }
        collapseSelectedCard() { return this._selectedCardIndex > -1 && this.collapseCard(this._selectedCardIndex); }
        collapseCard(index) {
            let card;
            if (typeof (index) === "number") {
                if (isNaN(index) || index !== this._selectedCardIndex)
                    return false;
                card = this._childCards[index];
            }
            else {
                card = index;
                if (sys.isNil(index) || !sys.isNumber(index.$id) || (index = this._scopeIds.indexOf(index.$id)) < 0 || index !== this._selectedCardIndex)
                    return false;
            }
            this._selectedCardIndex = this.$scope.selectedCardIndex = -1;
            card.cardActionVerb = CollapsibleActionVerb.expand;
            card.cardIconUrl = CollapsibleIconUrl.expand;
            card.currentCardIsExpanded = false;
            return true;
        }
        expandCard(index) {
            let oldIndex = this._selectedCardIndex;
            let card;
            if (typeof (index) === "number") {
                if (isNaN(index) || index === this._selectedCardIndex || index < 0 || index >= this._childCards.length)
                    return false;
                index = name;
                card = this._childCards[index];
            }
            else {
                card = index;
                if (sys.isNil(index) || (index = this._scopeIds.indexOf(index.$id)) < 0 || index == this._selectedCardIndex)
                    return false;
            }
            this._selectedCardIndex = this.$scope.selectedCardIndex = index;
            card.cardActionVerb = CollapsibleActionVerb.collapse;
            card.cardIconUrl = CollapsibleIconUrl.collapse;
            card.currentCardIsExpanded = true;
            if (oldIndex > -1) {
                card = this._childCards[oldIndex];
                card.cardActionVerb = CollapsibleActionVerb.expand;
                card.cardIconUrl = CollapsibleIconUrl.expand;
                card.currentCardIsExpanded = false;
            }
            return true;
        }
        toggleCard(index) {
            let card;
            if (typeof (index) === "number") {
                if (isNaN(name) || name < 0 || name >= this._childCards.length)
                    return false;
                card = this._childCards[index];
            }
            else {
                card = index;
                if (sys.isNil(index) || (index = this._scopeIds.indexOf(index.$id)) < 0)
                    return false;
            }
            if (index == this._selectedCardIndex) {
                this._selectedCardIndex = this.$scope.selectedCardIndex = -1;
                card.cardActionVerb = CollapsibleActionVerb.expand;
                card.cardIconUrl = CollapsibleIconUrl.expand;
                card.currentCardIsExpanded = false;
            }
            else {
                let oldIndex = this._selectedCardIndex;
                this._selectedCardIndex = this.$scope.selectedCardIndex = index;
                card.cardActionVerb = CollapsibleActionVerb.collapse;
                card.cardIconUrl = CollapsibleIconUrl.collapse;
                card.currentCardIsExpanded = true;
                if (oldIndex > -1) {
                    card = this._childCards[oldIndex];
                    card.cardActionVerb = CollapsibleActionVerb.expand;
                    card.cardIconUrl = CollapsibleIconUrl.expand;
                    card.currentCardIsExpanded = false;
                }
            }
            return true;
        }
        indexOfCard(scopeId) { return (typeof (scopeId) === "string") ? this._scopeIds.indexOf(scopeId) : -1; }
        scopeIdOfCard(index) {
            if (index > -1 && index < this._scopeIds.length)
                return this._scopeIds[index];
        }
        $doCheck() {
            if (typeof (this.$scope.selectedCardIndex) !== "number" || isNaN(this.$scope.selectedCardIndex) || this.$scope.selectedCardIndex >= this._childCards.length || this.$scope.selectedCardIndex < -2)
                this.$scope.selectedCardIndex = -1;
            if (this.$scope.selectedCardIndex === this._selectedCardIndex) {
                if (this.$scope.selectedCardIndex > -1) {
                    let card = this._childCards[this.$scope.selectedCardIndex];
                    if (!card.currentCardIsExpanded) {
                        this._selectedCardIndex = this.$scope.selectedCardIndex = -1;
                        card.cardActionVerb = CollapsibleActionVerb.expand;
                        card.cardIconUrl = CollapsibleIconUrl.expand;
                    }
                }
            }
            else if (this.$scope.selectedCardIndex < 0)
                this.collapseCard(this._selectedCardIndex);
            else
                this.expandCard(this.$scope.selectedCardIndex);
        }
    }
    cards.CardParentController = CardParentController;
    // #endregion
    // #region CardController
    /**
     * Options for the relative icon URL of collapsible items.
     *
     * @enum {string}
     */
    let CollapsibleIconUrl;
    (function (CollapsibleIconUrl) {
        CollapsibleIconUrl["collapse"] = "images/collapse.svg";
        CollapsibleIconUrl["expand"] = "images/expand.svg";
    })(CollapsibleIconUrl = cards.CollapsibleIconUrl || (cards.CollapsibleIconUrl = {}));
    /**
     * Options for the verb name of collapsible items.
     *
     * @enum {string}
     */
    let CollapsibleActionVerb;
    (function (CollapsibleActionVerb) {
        CollapsibleActionVerb["collapse"] = "Collapse";
        CollapsibleActionVerb["expand"] = "Expand";
    })(CollapsibleActionVerb = cards.CollapsibleActionVerb || (cards.CollapsibleActionVerb = {}));
    /**
     * The base class for collapsible cards.
     *
     * @abstract
     * @class cardController
     * @implements {ng.IController}
     */
    class CardController extends CardParentController {
        /**
         * Creates an instance of cardController to represent a new collapsible card.
         * @param {TScope extends ICardScope} $scope The {@link ng.IScope} object for the new card, which implements {@link ICardScope}.
         * @param {string} headingText The heading text for the new card.
         * @memberof cardController
         */
        constructor($scope, headingText) {
            super($scope);
            this.$scope = $scope;
            this.headingText = headingText;
            let parentScope;
            for (let ps = $scope.$parent; !sys.isNil(ps); ps = ps.$parent) {
                if (isCardContainerScope(ps)) {
                    parentScope = ps;
                    break;
                }
            }
            $scope.cardHeadingText = headingText;
            let controller = this;
            $scope.expandCurrentCard = () => { return controller.expandCurrentCard(); };
            $scope.collapseCurrentCard = () => { return controller.collapseCurrentCard(); };
            $scope.toggleCurrentCard = () => { return controller.toggleCurrentCard(); };
            if (sys.isNil(parentScope)) {
                let parentController = new CardParentController(($scope.$parent.$new(true)));
                parentController.addCard($scope);
            }
            else
                parentScope.addCard($scope);
            this._parentScope = $scope.currentCardParent;
            this._currentCardIsExpanded = $scope.currentCardIsExpanded;
        }
        get currentCardId() { return this.$scope.$id; }
        $doCheck() {
            super.$doCheck();
            if (sys.isNil(this.$scope.currentCardParent) || this.$scope.currentCardParent.$id !== this._parentScope.$id)
                this.$scope.currentCardParent = this._parentScope;
            if (this._currentCardIsExpanded !== this.$scope.currentCardIsExpanded) {
                if (this._parentScope.selectedCardIndex < 0 || this.$scope.$id !== this._parentScope.scopeIdOfCard(this._parentScope.selectedCardIndex)) {
                    if (this._currentCardIsExpanded)
                        this._currentCardIsExpanded = false;
                    else
                        this._parentScope.expandCard(this.$scope);
                }
                else if (this._currentCardIsExpanded)
                    this._parentScope.collapseCard(this.$scope);
                else
                    this._currentCardIsExpanded = true;
            }
        }
        /**
         * Makes the body of the current card visible.
         *
         * @memberof cardController
         */
        expandCurrentCard() { return this._parentScope.expandCard(this.$scope); }
        /**
         * Hides the body of the current card.
         *
         * @memberof cardController
         */
        collapseCurrentCard() { return this._parentScope.collapseCard(this.$scope); }
        /**
         * Toggles the visibility of the current card's body.
         *
         * @returns {boolean} true if the current card was changed to being expanded; otherwise, false if the card was changed to being collapsed.
         * @memberof cardController
         */
        toggleCurrentCard() { return this._parentScope.toggleCard(this.$scope); }
    }
    cards.CardController = CardController;
    // #endregion
})(cards || (cards = {}));
