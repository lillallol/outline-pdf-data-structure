import { internalErrorMessages } from "../errorMessages";
import type { IOutline } from "../publicApi";

/**
 * @description It returns the index of the immediate previous sibling for the provided outline node,
 * or throws if it does not find one.
 */
export function getIndexOfImmediatePreviousSibling(outline: IOutline, i: number): number {
    const contextDepth: number = outline[i].depth;
    for (let ii = i - 1; ii > -1; ii--) {
        if (outline[ii].depth < contextDepth) break;
        if (outline[ii].depth === contextDepth) return ii;
    }
    throw Error(internalErrorMessages.internalLibraryError);
}
