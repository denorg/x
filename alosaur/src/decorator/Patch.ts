import { getMetadataArgsStorage } from "../mod.ts";

/**
 * Registers an action to be executed when PATCH request comes on a given route.
 * Must be applied on a controller action.
 */
export function Patch(route?: RegExp): Function;

/**
 * Registers an action to be executed when PATCH request comes on a given route.
 * Must be applied on a controller action.
 */
export function Patch(route?: string): Function;

/**
 * Registers an action to be executed when PATCH request comes on a given route.
 * Must be applied on a controller action.
 */
export function Patch(route?: string|RegExp): Function {
    return function (object: Object, methodName: string) {
        getMetadataArgsStorage().actions.push({
            type: "PATCH",
            target: object.constructor,
            method: methodName,
            route: route
        });
    };
}