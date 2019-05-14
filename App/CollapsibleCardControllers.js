/// <reference path="Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="MainModule.ts" />
var cards;
(function (cards) {
    // #region CardParentController
    /**
     * Manages a collection of nested collapsible cards.
     *
     * @abstract
     * @class CardParentController
     * @extends {cardController}
     */
    class CardParentController extends app.MainControllerChild {
        /**
         * Creates an instance of topLevelCardController.
         * @param {ICardContainerScope} $scope The {@link ng.IScope} object for the new card, which implements {@link ICardParentScope}.
         */
        constructor($scope) {
            super($scope);
            $scope.cardNames = [];
            $scope.selectedCardName = this._selectedCardName = undefined;
            $scope.selectedCardIndex = this._selectedCardIndex = -1;
            let controller = this;
            $scope.collapseSelectedCard = () => { return controller.collapseSelectedCard(); };
            $scope.collapseCard = (name) => { return controller.collapseCard(name); };
            $scope.expandCard = (name) => { return controller.expandCard(name); };
            $scope.toggleCard = (name) => { return controller.toggleCard(name); };
            $scope.indexOfCard = (name) => { return controller.indexOfCard(name); };
        }
        collapseSelectedCard() {
            this.$doCheck();
            if (this._selectedCardIndex < 0)
                return false;
            let previousIndex = this._selectedCardIndex;
            let previousName = this._selectedCardName;
            this.$scope.selectedCardIndex = this._selectedCardIndex = -1;
            this.$scope.selectedCardName = this._selectedCardName = undefined;
            if (!app.isNil(previousName))
                this.onCardNameChanged(previousName);
            this.onCardIndexChanged(previousIndex);
            return true;
        }
        collapseCard(name) {
            this.$doCheck();
            let index = this.indexOfCard(name);
            if (index < 0)
                return true;
            if (index !== this._selectedCardIndex)
                return false;
            name = this.$scope.cardNames[index];
            this.$scope.selectedCardIndex = this._selectedCardIndex = -1;
            this.$scope.selectedCardName = this._selectedCardName = undefined;
            this.onCardNameChanged(name);
            this.onCardIndexChanged(index);
            return true;
        }
        indexOfCard(name) {
            let i = this.$scope.cardNames.indexOf(name);
            if (i < 0 && !app.isNilOrEmpty(name)) {
                let lc = name.toLowerCase();
                if (lc !== name || name.toUpperCase() !== name) {
                    while (++i < this.$scope.cardNames.length) {
                        if (this.$scope.cardNames[i].toLowerCase() === lc)
                            return i;
                    }
                    return -1;
                }
            }
            return i;
        }
        expandCard(name) {
            this.$doCheck();
            let index = this.indexOfCard(name);
            if (index < 0)
                return false;
            if (index === this._selectedCardIndex)
                return true;
            let previousIndex = this._selectedCardIndex;
            let previousName = this._selectedCardName;
            this.$scope.selectedCardIndex = this._selectedCardIndex = index;
            this.$scope.selectedCardName = this._selectedCardName = name = this.$scope.cardNames[index];
            if (previousName !== name)
                this.onCardNameChanged(previousName);
            this.onCardIndexChanged(previousIndex);
            return true;
        }
        toggleCard(name) {
            this.$doCheck();
            let index = this.indexOfCard(name);
            if (index < 0)
                return false;
            name = this.$scope.cardNames[index];
            if (index !== this._selectedCardIndex) {
                let previousIndex = this._selectedCardIndex;
                let previousName = this._selectedCardName;
                this.$scope.selectedCardIndex = this._selectedCardIndex = index;
                this.$scope.selectedCardName = this._selectedCardName = name;
                if (previousName !== name)
                    this.onCardNameChanged(previousName);
                this.onCardIndexChanged(previousIndex);
                return true;
            }
            this.$scope.selectedCardIndex = this._selectedCardIndex = -1;
            this.$scope.selectedCardName = this._selectedCardName = undefined;
            this.onCardNameChanged(name);
            this.onCardIndexChanged(index);
            return false;
        }
        onCardNameChanged(previousName) { }
        onCardIndexChanged(previousIndex) { }
        $doCheck() {
            if (app.isNil(this.$scope.cardNames))
                this.$scope.cardNames = [];
            let previousIndex = this._selectedCardIndex;
            let previousName = this._selectedCardName;
            if (this.$scope.selectedCardName !== previousName) {
                if (app.isNil(this.$scope.selectedCardName))
                    this.$scope.selectedCardIndex = -1;
                else {
                    let index = this.indexOfCard(this.$scope.selectedCardName);
                    if (index < 0) {
                        if (this.$scope.selectedCardIndex === previousIndex || this.$scope.selectedCardIndex < 0 || this.$scope.selectedCardIndex >= this.$scope.cardNames.length) {
                            this.$scope.selectedCardIndex = -1;
                            this.$scope.selectedCardName = undefined;
                        }
                        else
                            this.$scope.selectedCardName = this.$scope.cardNames[this.$scope.selectedCardIndex];
                    }
                    else {
                        this.$scope.selectedCardIndex = index;
                        this.$scope.selectedCardName = this.$scope.cardNames[index];
                    }
                }
            }
            else if (this.$scope.selectedCardIndex !== this._selectedCardIndex) {
                if (this.$scope.selectedCardIndex < 0 || this.$scope.selectedCardIndex >= this.$scope.cardNames.length) {
                    this.$scope.selectedCardIndex = -1;
                    this.$scope.selectedCardName = undefined;
                }
                else
                    this.$scope.selectedCardName = this.$scope.cardNames[this.$scope.selectedCardIndex];
            }
            else
                return;
            this._selectedCardName = this.$scope.selectedCardName;
            this._selectedCardIndex = this.$scope.selectedCardIndex;
            if (previousName !== this._selectedCardName)
                this.onCardNameChanged(previousName);
            if (previousIndex !== this._selectedCardIndex)
                this.onCardIndexChanged(previousIndex);
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
         * @param {string} name The name which uniquely identifies the new card.
         * @param {string} headingText The heading text for the new card.
         * @memberof cardController
         */
        constructor($scope, _name, headingText) {
            super($scope);
            this.$scope = $scope;
            this._name = _name;
            $scope.currentCardName = name;
            $scope.cardHeadingText = headingText;
            let i = $scope.$parent.indexOfCard(_name);
            if (i < 0) {
                $scope.currentCardNumber = $scope.$parent.cardNames.length + 1;
                $scope.$parent.cardNames.push(name);
            }
            else
                $scope.currentCardNumber = i + 1;
            let controller = this;
            $scope.expandCurrentCard = () => { return controller.expandCurrentCard(); };
            $scope.collapseCurrentCard = () => { return controller.collapseCurrentCard(); };
            $scope.toggleCurrentCard = () => { return controller.toggleCurrentCard(); };
            if ($scope.$parent.selectedCardName === name || (i < 1 && typeof ($scope.$parent.selectedCardName) === 'undefined'))
                this.expandCurrentCard();
            else
                this.collapseCurrentCard();
        }
        get currentCardName() { return this._name; }
        $doCheck() {
            if (this.$scope.$parent.selectedCardName === this._name) {
                if (!this.$scope.currentCardIsExpanded)
                    this.expandCurrentCard();
            }
            else if (this.$scope.currentCardIsExpanded)
                this.collapseCurrentCard();
        }
        /**
         * Makes the body of the current card visible.
         *
         * @memberof cardController
         */
        expandCurrentCard() {
            this.$scope.cardIconUrl = CollapsibleIconUrl.collapse;
            this.$scope.cardActionVerb = CollapsibleActionVerb.collapse;
            this.$scope.currentCardIsExpanded = true;
            return this.$scope.$parent.expandCard(this._name);
        }
        /**
         * Hides the body of the current card.
         *
         * @memberof cardController
         */
        collapseCurrentCard() {
            this.$scope.cardIconUrl = CollapsibleIconUrl.expand;
            this.$scope.cardActionVerb = CollapsibleActionVerb.expand;
            this.$scope.currentCardIsExpanded = false;
            return this.$scope.$parent.collapseCard(this._name);
        }
        /**
         * Toggles the visibility of the current card's body.
         *
         * @returns {boolean} true if the current card was changed to being expanded; otherwise, false if the card was changed to being collapsed.
         * @memberof cardController
         */
        toggleCurrentCard() {
            this.$scope.currentCardIsExpanded = this.$scope.$parent.toggleCard(this._name);
            return this.$scope.currentCardIsExpanded;
        }
    }
    cards.CardController = CardController;
    // #endregion
})(cards || (cards = {}));
