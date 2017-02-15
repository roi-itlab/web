// Typings reference file, see links for more information
// https://github.com/typings/typings
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

declare var System: any;
declare var require: any;

declare namespace L {

    export interface DomEvent {

        /**
          * Adds a listener fn to the element's DOM event of the specified type. this keyword
          * inside the listener will point to context, or to the element if not specified.
          */
        addListener(el: HTMLElement, type: string, fn: (e: Event) => void, context?: any): DomEvent;
        on(el: HTMLElement, type: string, fn: (e: Event) => void, context?: any): DomEvent;

        /**
          * Removes an event listener from the element.
          */
        removeListener(el: HTMLElement, type: string, fn: (e: Event) => void, context?: any): DomEvent;
        off(el: HTMLElement, type: string, fn: (e: Event) => void, context?: any): DomEvent;

        /**
          * Stop the given event from propagation to parent elements. Used inside the
          * listener functions:
          * L.DomEvent.addListener(div, 'click', function
          * (e) {
          * L.DomEvent.stopPropagation(e);
          * });
          */
        stopPropagation(e: Event): DomEvent;

        /**
          * Prevents the default action of the event from happening (such as following
          * a link in the href of the a element, or doing a POST request with page reload
          * when form is submitted). Use it inside listener functions.
          */
        preventDefault(e: Event): DomEvent;

        /**
          * Does stopPropagation and preventDefault at the same time.
          */
        stop(e: Event): DomEvent;

        /**
          * Adds stopPropagation to the element's 'click', 'doubleclick', 'mousedown'
          * and 'touchstart' events.
          */
        disableClickPropagation(el: HTMLElement): DomEvent;

        /**
          * Gets normalized mouse position from a DOM event relative to the container
          * or to the whole page if not specified.
          */
        getMousePosition(e: Event, container?: HTMLElement): Point;

        /**
          * Gets normalized wheel delta from a mousewheel DOM event.
          */
        getWheelDelta(e: Event): number;

    }

    export var DomEvent: DomEvent;
}

declare namespace L {

    namespace DomUtil {

        /**
          * Returns an element with the given id if a string was passed, or just returns
          * the element if it was passed directly.
          */
        export function get(id: string): HTMLElement;

        /**
          * Returns the value for a certain style attribute on an element, including
          * computed values or values set through CSS.
          */
        export function getStyle(el: HTMLElement, style: string): string;

        /**
          * Returns the offset to the viewport for the requested element.
          */
        export function getViewportOffset(el: HTMLElement): Point;

        /**
          * Creates an element with tagName, sets the className, and optionally appends
          * it to container element.
          */
        export function create(tagName: string, className: string, container?: HTMLElement): HTMLElement;

        /**
          * Makes sure text cannot be selected, for example during dragging.
          */
        export function disableTextSelection(): void;

        /**
          * Makes text selection possible again.
          */
        export function enableTextSelection(): void;

        /**
          * Returns true if the element class attribute contains name.
          */
        export function hasClass(el: HTMLElement, name: string): boolean;

        /**
          * Adds name to the element's class attribute.
          */
        export function addClass(el: HTMLElement, name: string): void;

        /**
          * Removes name from the element's class attribute.
          */
        export function removeClass(el: HTMLElement, name: string): void;

        /**
          * Set the opacity of an element (including old IE support). Value must be from
          * 0 to 1.
          */
        export function setOpacity(el: HTMLElement, value: number): void;

        /**
          * Goes through the array of style names and returns the first name that is a valid
          * style name for an element. If no such name is found, it returns false. Useful
          * for vendor-prefixed styles like transform.
          */
        export function testProp(props: string[]): any;

        /**
          * Returns a CSS transform string to move an element by the offset provided in
          * the given point. Uses 3D translate on WebKit for hardware-accelerated transforms
          * and 2D on other browsers.
          */
        export function getTranslateString(point: Point): string;

        /**
          * Returns a CSS transform string to scale an element (with the given scale origin).
          */
        export function getScaleString(scale: number, origin: Point): string;

        /**
          * Sets the position of an element to coordinates specified by point, using
          * CSS translate or top/left positioning depending on the browser (used by
          * Leaflet internally to position its layers). Forces top/left positioning
          * if disable3D is true.
          */
        export function setPosition(el: HTMLElement, point: Point, disable3D?: boolean): void;

        /**
          * Returns the coordinates of an element previously positioned with setPosition.
          */
        export function getPosition(el: HTMLElement): Point;

        /**
          * Vendor-prefixed transition style name (e.g. 'webkitTransition' for WebKit).
          */
        export var TRANSITION: string;

        /**
          * Vendor-prefixed transform style name.
          */
        export var TRANSFORM: string;

    }
}
