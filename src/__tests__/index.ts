import { config } from "process"

const testVisitor: any = require("../index")
const types = require("@babel/types")
const parser = require("@babel/parser")
const { default: traverse } = require("@babel/traverse")
const { default: generate } = require("@babel/generator")

const visitorPluginObj = testVisitor({ types })
const TestString = `
    import "../test.fix"
    var aa = require.ensure('../haha.fix')
`,
    testConfig = {
        matchSuffixArr: [".fix", ".ffx"],
        relaceStrSuffix: ".hello",
    }
describe("test babel-traverse visitor", () => {
    it("testVisitor has name", () => {
        expect(visitorPluginObj.name).toBeDefined()
    })
    it("test VariableDeclaration require", () => {
        let ast = parser.parse(TestString, {
            sourceType: "module",
            // plugins: ["jsx", "typescript"],
        })
        traverse(ast, {
            VariableDeclaration: (path) => {
                visitorPluginObj.visitor.VariableDeclaration(path, {
                    opts: testConfig,
                })
            },
        })
        const { code } = generate(ast, {}, TestString)
        expect(code).toEqual(
            expect.stringContaining(testConfig.relaceStrSuffix)
        )
    })

    it("test ImportDeclaration import ok", () => {
        let ast = parser.parse(TestString, {
            sourceType: "module",
        })
        traverse(ast, {
            ImportDeclaration: (path) => {
                visitorPluginObj.visitor.ImportDeclaration(path, {
                    opts: testConfig,
                })
            },
        })
        const { code } = generate(ast, {}, TestString)
        expect(code).toEqual(
            expect.stringContaining(testConfig.relaceStrSuffix)
        )
    })
})
