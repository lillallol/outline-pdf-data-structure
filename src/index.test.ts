import { outlinePdfDataStructure } from "./index";


describe(outlinePdfDataStructure.name, () => {
    describe("returns low level information about the provided outline", () => {
        it("works for outline without collapsed parts", () => {
            expect(
                outlinePdfDataStructure(
                    `
                        1||Document
                        2|-|Section 1
                       	3|-|Section 2
                        4|--|Subsection 1
                        5|-|Section 3
                        6||Summary
                    `,
                    6
                )
            ).toEqual({
                outlineRootCount: 6,
                outlineItems: [
                    {
                        Title: "Document",
                        Parent: -1,
                        Next: 5,
                        First: 1,
                        Last: 4,
                        Count: 4,
                        Dest: 1 - 1,
                    },
                    {
                        Title: "Section 1",
                        Parent: 0,
                        Next: 2,
                        Dest: 2 - 1,
                    },
                    {
                        Title: "Section 2",
                        Parent: 0,
                        Prev: 1,
                        Next: 4,
                        First: 3,
                        Last: 3,
                        Count: 1,
                        Dest: 3 - 1,
                    },
                    {
                        Title: "Subsection 1",
                        Parent: 2,
                        Dest: 4 - 1,
                    },
                    {
                        Title: "Section 3",
                        Parent: 0,
                        Prev: 2,
                        Dest: 5 - 1,
                    },
                    {
                        Title: "Summary",
                        Parent: -1,
                        Prev: 0,
                        Dest: 6 - 1,
                    },
                ],
            });
        });
        it("works for outline with collapsed parts", () => {
            expect(
                outlinePdfDataStructure(
                    `
                        1||Document
                        2|-|Section 1
                       -3|-|Section 2
                        4|--|Subsection 1
                        5|-|Section 3
                        6||Summary
                    `,
                    6
                )
            ).toEqual({
                outlineRootCount: 5,
                outlineItems: [
                    {
                        Title: "Document",
                        Parent: -1,
                        Next: 5,
                        First: 1,
                        Last: 4,
                        Count: 3,
                        Dest: 1 - 1,
                    },
                    {
                        Title: "Section 1",
                        Parent: 0,
                        Next: 2,
                        Dest: 2 - 1,
                    },
                    {
                        Title: "Section 2",
                        Parent: 0,
                        Prev: 1,
                        Next: 4,
                        First: 3,
                        Last: 3,
                        Count: -1,
                        Dest: 3 - 1,
                    },
                    {
                        Title: "Subsection 1",
                        Parent: 2,
                        Dest: 4 - 1,
                    },
                    {
                        Title: "Section 3",
                        Parent: 0,
                        Prev: 2,
                        Dest: 5 - 1,
                    },
                    {
                        Title: "Summary",
                        Parent: -1,
                        Prev: 0,
                        Dest: 6 - 1,
                    },
                ],
            });
        });
    });
});
