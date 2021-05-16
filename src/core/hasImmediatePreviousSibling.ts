import type { IOutline } from "../publicApi";
import { getIndexOfImmediatePreviousSibling } from "./getIndexOfImmediatePreviousSibling";

/**
 * @description It returns a predicate on whether the provided outline node has an immediate previous sibling.
 */
export function hasImmediatePreviousSibling(outline: IOutline, i: number): boolean {
    try {
        getIndexOfImmediatePreviousSibling(outline, i);
        return true;
    } catch (e) {
        return false;
    }
}
