import type { IOutline } from "./types";

import { hasChild } from "./hasChild";
import { getIndexOfLastImmediateChild } from "./getIndexOfImmediateLastChild";
import { getIndexOfImmediateNextSibling } from "./getIndexOfImmediateNextSibling";
import { getIndexOfImmediatePreviousSibling } from "./getIndexOfImmediatePreviousSibling";
import { hasImmediatePreviousSibling } from "./hasImmediatePreviousSibling";
import { hasImmediateNextSibling } from "./hasImmediateNextSibling";
import { getIndexOfImmediateParent } from "./getIndexOfImmediateParentFactory";
// import { calculateCount } from "./calculateCount";
import { printedToOutline } from "./printedToOutline";
import { getNumberOfDescendants } from "./getNumberOfDescendants";

/**
 * @description
 * It returns all the information needed to create a real pdf data structure.
 */
export function outlinePdfDataStructure(
    inputOutline: string,
    totalNumberOfPages: number
): outlinePdfDataStructureReturnType {
    const outlineItems: outlineItem[] = [];

    const outline: IOutline = printedToOutline(inputOutline, totalNumberOfPages);

    // const outlineRootCount =
    outline.forEach((node, i) => {
        node.count = getNumberOfDescendants(outline, i) * (node.collapse ? -1 : 1);
    });
    // calculateCount(outline, -1);
    for (let i = 0; i < outline.length; i++) {
        outlineItems[i] = {
            Title: outline[i].title,
            Parent: getIndexOfImmediateParent(outline, i),
            ...(hasImmediatePreviousSibling(outline, i) && {
                Prev: getIndexOfImmediatePreviousSibling(outline, i),
            }),
            ...(hasImmediateNextSibling(outline, i) && {
                Next: getIndexOfImmediateNextSibling(outline, i),
            }),
            ...(hasChild(outline, i) && {
                First: i + 1,
                Last: getIndexOfLastImmediateChild(outline, i),
                Count: outline[i].count,
            }),
            Dest: outline[i].pageNumber - 1,
        };
    }
    return {
        outlineItems: outlineItems,
        outlineRootCount: outline.length /* outlineRootCount */,
    };
}

export type outlinePdfDataStructureReturnType = {
    /**
     * @description
     * It returns a low level programmatic representation of the outline.
     */
    outlineItems: outlineItem[];
    // * The number of outline nodes with depth `0`.
    // * This number is needed to be added to the outline root pdf object.
    /**
     * @description
     * The total number of outline nodes.
     */
    outlineRootCount: number;
};

export type outlineItem = {
    /**
     * @description
     * The title that will be visible in the outline of the pdf for the context outline node.
     */
    Title: string;
    /**
     * @description
     * The index (of the array that contains all the outline nodes) of the parent
     * outline node of the context outline node.
     * Outline nodes of depth `0` have `-1` for this value.
     */
    Parent: number;
    /**
     * @description
     * The index (of the array that contains all the outline nodes) of the previous sibling of
     * the context outline node. It is `undefined` for the case there is no previous sibling.
     */
    Prev?: number;
    /**
     * @description
     * The index (of the array that contains all the outline nodes) of the next sibling of
     * the context outline node. It is `undefined` for the case there is no next sibling.
     */
    Next?: number;
    /**
     * @description
     * The index (of the array that contains all the outline nodes) of the first immediate child of
     * the context outline node. It is `undefined` for the case there is no immediate child.
     */
    First?: number;
    /**
     * @description
     * The index (of the array that contains all the outline nodes) of the last immediate child of
     * the context outline node. It is `undefined` for the case there is no immediate child.
     */
    Last?: number;
    /**
     * @description
     * Total number of outline nodes that are descendants to the context outline node.
     */
    Count?: number;
    /**
     * @description
     * The page of the pdf that the outline node hyper links to.
     */
    Dest: number;
};
