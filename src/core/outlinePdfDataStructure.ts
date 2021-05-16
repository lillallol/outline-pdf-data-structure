import { hasChild } from "./hasChild";
import { getIndexOfLastImmediateChild } from "./getIndexOfImmediateLastChild";
import { getIndexOfImmediateNextSibling } from "./getIndexOfImmediateNextSibling";
import { getIndexOfImmediatePreviousSibling } from "./getIndexOfImmediatePreviousSibling";
import { hasImmediatePreviousSibling } from "./hasImmediatePreviousSibling";
import { hasImmediateNextSibling } from "./hasImmediateNextSibling";
import { getIndexOfImmediateParent } from "./getIndexOfImmediateParentFactory";
import { printedToOutline } from "./printedToOutline";
import { getNumberOfDescendants } from "./getNumberOfDescendants";

import type { IOutline, outlineItem, outlinePdfDataStructureReturnType } from "../publicApi";

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

    outline.forEach((node, i) => {
        node.count = getNumberOfDescendants(outline, i) * (node.collapse ? -1 : 1);
    });

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
        outlineRootCount: outline.length,
    };
}
