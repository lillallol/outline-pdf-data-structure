const { format } = require("prettier");
const { tsDocGenMd } = require("ts-doc-gen-md");
const path = require("path");

tsDocGenMd({
    output: path.resolve(__dirname, "./documentation.md"),
    input: path.resolve(__dirname, "./dist/index.d.ts"),
    format: (src) =>
        format(src, {
            tabWidth: 4,
            printWidth: 80,
            parser : "typescript"
        }),
});
