import type { IOutline } from "../publicApi";

/**
 * @description Returns a predicate on whether the provided outline node has a child.
*/
export function hasChild(outline: IOutline, i: number): boolean {
    if (i === outline.length - 1) return false;
    return outline[i].depth + 1 === outline[i + 1].depth;
}
