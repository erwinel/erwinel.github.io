/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="sys.d.ts" />
/// <reference path="app.d.ts" />
declare namespace cards {
    /**
     * Defines the {@link ng.IScope.$parent} scope of {@link cardController} objects.
     *
     * @interface ICardParentScope
     * @extends {ng.IScope}
     */
    interface ICardContainerScope extends ng.IScope {
        selectedCardIndex: number;
        collapseSelectedCard(): boolean;
        collapseCard(index: ICardScope | number): boolean;
        expandCard(index: ICardScope | number): boolean;
        toggleCard(index: ICardScope | number): boolean;
        indexOfCard(scopeId: number): number;
        scopeIdOfCard(index: number): number;
        addCard(card: ICardScope): number;
    }
    function isCardContainerScope(scope: ng.IScope): scope is ICardContainerScope;
    /**
     * Manages a collection of nested collapsible cards.
     *
     * @abstract
     * @class CardParentController
     * @extends {cardController}
     */
    class CardParentController implements ng.IController {
        protected $scope: ICardContainerScope;
        private _scopeIds;
        private _childCards;
        private _selectedCardIndex;
        selectedCardScopeId: number | undefined;
        selectedCardIndex: number | undefined;
        /**
         * Creates an instance of topLevelCardController.
         * @param {ICardContainerScope} $scope The {@link ng.IScope} object for the new card, which implements {@link ICardParentScope}.
         */
        constructor($scope: ICardContainerScope);
        addCard(card: ICardScope): number;
        collapseSelectedCard(): boolean;
        collapseCard(index: ICardScope | number): boolean;
        expandCard(index: ICardScope | number): boolean;
        toggleCard(index: ICardScope | number): boolean;
        indexOfCard(scopeId: number): number;
        scopeIdOfCard(index: number): number | undefined;
        $doCheck(): void;
    }
    /**
     * Options for the relative icon URL of collapsible items.
     *
     * @enum {string}
     */
    enum CollapsibleIconUrl {
        collapse = "images/collapse.svg",
        expand = "images/expand.svg"
    }
    /**
     * Options for the verb name of collapsible items.
     *
     * @enum {string}
     */
    enum CollapsibleActionVerb {
        collapse = "Collapse",
        expand = "Expand"
    }
    /**
     * Interface for the angular {@link ng.IScope} for collapsible cards using a {@link cardController}.
     *
     * @interface ICardScope
     * @extends {ng.IScope}
     */
    interface ICardScope extends ICardContainerScope {
        currentCardName: string;
        currentCardNumber: number;
        cardHeadingText: string;
        cardIconUrl: CollapsibleIconUrl;
        cardActionVerb: CollapsibleActionVerb;
        currentCardIsExpanded: boolean;
        expandCurrentCard(): boolean;
        collapseCurrentCard(): boolean;
        toggleCurrentCard(): boolean;
        currentCardParent: ICardContainerScope;
    }
    /**
     * The base class for collapsible cards.
     *
     * @abstract
     * @class cardController
     * @implements {ng.IController}
     */
    abstract class CardController extends CardParentController {
        protected $scope: ICardScope;
        private _parentScope;
        private _currentCardIsExpanded;
        readonly currentCardId: number;
        /**
         * Creates an instance of cardController to represent a new collapsible card.
         * @param {TScope extends ICardScope} $scope The {@link ng.IScope} object for the new card, which implements {@link ICardScope}.
         * @param {string} headingText The heading text for the new card.
         * @memberof cardController
         */
        constructor($scope: ICardScope, headingText: string);
        $doCheck(): void;
        /**
         * Makes the body of the current card visible.
         *
         * @memberof cardController
         */
        expandCurrentCard(): boolean;
        /**
         * Hides the body of the current card.
         *
         * @memberof cardController
         */
        collapseCurrentCard(): boolean;
        /**
         * Toggles the visibility of the current card's body.
         *
         * @returns {boolean} true if the current card was changed to being expanded; otherwise, false if the card was changed to being collapsed.
         * @memberof cardController
         */
        toggleCurrentCard(): boolean;
    }
}
