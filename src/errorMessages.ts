import { constants } from "./constants";
import { tagUnindent } from "./es-utils";

export const errorMessages = {
    nodeIsCollapsedWithoutChildren: (line: string): string => tagUnindent`
        Outline node:

            ${line}

        has no children and it is collapsed. You have to un collapse it or add children.
    `,
    emptyOutline: "no outline has been provided",
    wrongDepthDisplacement: (oldLine: string, newLine: string): string => tagUnindent`
        Wrong depth displacement for the following part of the outline:
            
            ${oldLine}
        
            ${newLine}
        
    `,
    zeroPageInOutlineIsNotAllowed: (line: string): string => tagUnindent`
        Zero page number is not allowed in outline:
        
            ${line}
        
    `,
    pageNumberInOutlineExceedsMaximum: (line: string, max: number): string => tagUnindent`
        Pdf file has:

            ${max}
        
        number of pages and outline points out of this range: 
        
            ${line}
        
    `,
    depthOfOutlineHasToStartWithZero: `The outline should start with zero depth.`,
    wrongPatternInLine: (line: string): string => tagUnindent`
        The line:
        
            ${line}
            
        has wrong pattern. It does satisfy the following regular expression:

            ${constants.trimmedTocLineValidPattern.source}
        
    `,
    invalidDisplacementOfPage: (oldLine: string, newLine: string): string => tagUnindent`
        The page is not displaced correctly:

            ${oldLine}
        
            ${newLine}
        
    `
};

export const internalErrorMessages = {
    internalLibraryError: tagUnindent`
        Something went wrong. If you have not used the library in a way
        it is not supposed to be used, then copy this error message and
        open an issue here:

            https://github.com/lillallol/outline-pdf-data-structure/issues
        
    `,
};
