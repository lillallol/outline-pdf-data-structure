import type { IOutline } from "../publicApi";
import { getIndexOfImmediateNextSibling } from "./getIndexOfImmediateNextSibling";

/**
 * @description It returns a predicate on whether the provided outline node has an immediate next sibling.
 */
export function hasImmediateNextSibling(outline: IOutline, i: number): boolean {
    try {
        getIndexOfImmediateNextSibling(outline, i);
        return true;
    } catch (e) {
        return false;
    }
}
