import type { IOutline } from "./types";

/**
 * @description It returns the index of the parent of the provided outline node.
 * It returns `-1` when the provided outline node has zero depth.
 */
export function getIndexOfImmediateParent(outline: IOutline, i: number): number {
    const contextDepth = outline[i].depth;
    for (let ii = i; ii > -1; ii--) {
        if (contextDepth - 1 === outline[ii].depth) return ii;
    }
    return -1;
}
