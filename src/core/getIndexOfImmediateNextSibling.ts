import { internalErrorMessages } from "../errorMessages";
import { IOutline } from "../publicApi";

/**
 * @description It returns the index of the immediate next sibling for the specified outline node.
 * It throws if it does not exist.
 */
export function getIndexOfImmediateNextSibling(outline: IOutline, i: number): number {
    const contextDepth = outline[i].depth;
    for (let ii = i + 1; ii < outline.length; ii++) {
        if (outline[ii].depth < contextDepth) break;
        if (outline[ii].depth === contextDepth) return ii;
    }
    throw Error(internalErrorMessages.internalLibraryError);
}
