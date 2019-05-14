/// <reference path="../../Scripts/typings/angularjs/angular.d.ts" />
/// <reference path="../../Scripts/typings/bootstrap/index.d.ts" />
/// <reference path="../../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="MainModule.d.ts" />
declare namespace cards {
    /**
     * Defines the {@link ng.IScope.$parent} scope of {@link cardController} objects.
     *
     * @interface ICardParentScope
     * @extends {ng.IScope}
     */
    interface ICardContainerScope<TParent extends app.IMainControllerScope> extends app.INestedControllerScope<TParent> {
        cardNames: string[];
        selectedCardName?: string;
        selectedCardIndex?: number;
        collapseSelectedCard(): boolean;
        collapseCard(name: string): boolean;
        expandCard(name: string): boolean;
        toggleCard(name: string): boolean;
        indexOfCard(name: string): number;
        $parent: TParent;
    }
    /**
     * Manages a collection of nested collapsible cards.
     *
     * @abstract
     * @class CardParentController
     * @extends {cardController}
     */
    class CardParentController<TParentScope extends app.IMainControllerScope, TScope extends ICardContainerScope<TParentScope>> extends app.MainControllerChild<TScope> {
        private _selectedCardName?;
        private _selectedCardIndex;
        /**
         * Creates an instance of topLevelCardController.
         * @param {ICardContainerScope} $scope The {@link ng.IScope} object for the new card, which implements {@link ICardParentScope}.
         */
        constructor($scope: TScope);
        collapseSelectedCard(): boolean;
        collapseCard(name: string): boolean;
        indexOfCard(name: string): number;
        expandCard(name: string): boolean;
        toggleCard(name: string): boolean;
        onCardNameChanged(previousName: string | undefined): void;
        onCardIndexChanged(previousIndex: number): void;
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
    interface ICardScope<TParent extends ICardContainerScope<app.IMainControllerScope>> extends ICardContainerScope<app.IMainControllerScope> {
        currentCardName: string;
        currentCardNumber: number;
        cardHeadingText: string;
        cardIconUrl: CollapsibleIconUrl;
        cardActionVerb: CollapsibleActionVerb;
        currentCardIsExpanded: boolean;
        $parent: TParent;
        expandCurrentCard(): boolean;
        collapseCurrentCard(): boolean;
        toggleCurrentCard(): boolean;
    }
    /**
     * The base class for collapsible cards.
     *
     * @abstract
     * @class cardController
     * @implements {ng.IController}
     */
    abstract class CardController<TParentScope extends ICardContainerScope<app.IMainControllerScope>, TScope extends ICardScope<TParentScope>> extends CardParentController<TParentScope, TScope> {
        protected $scope: TScope;
        private _name;
        readonly currentCardName: string;
        /**
         * Creates an instance of cardController to represent a new collapsible card.
         * @param {TScope extends ICardScope} $scope The {@link ng.IScope} object for the new card, which implements {@link ICardScope}.
         * @param {string} name The name which uniquely identifies the new card.
         * @param {string} headingText The heading text for the new card.
         * @memberof cardController
         */
        constructor($scope: TScope, _name: string, headingText: string);
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
