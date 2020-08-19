const parser = require("@babel/parser")
const t = require("@babel/types")
const { default: traverse } = require("@babel/traverse")
const { default: generate } = require("@babel/generator")

const testStrReg = /(\.scss|\.sass)$/g

const relaceStr = ".css"
const TestString = `
    import "../test.scss"
    // import "../test2.scss"
    var aa = require.ensure('../haha.sass')
    console.log('haha')
`
let ast = parser.parse(TestString, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
})
// console.log(ast.program.body)
const visitor = {
    // enter(path) {
    // },
    VariableDeclaration(path) {
        const { node /* listKey */ } = path
        let declaration = node?.declarations[0]
        if (
            declaration &&
            (t.isIdentifier(declaration?.init?.callee, {
                // require
                name: "require",
            }) ||
                t.isIdentifier(declaration?.init.callee?.object, {
                    // require.ensure ...
                    name: "require",
                })) &&
            testStrReg.test(declaration?.init.arguments[0].value)
        ) {
            declaration.init.arguments[0].value = declaration.init.arguments[0].value.replace(
                testStrReg,
                relaceStr
            )
        }
    },
    ImportDeclaration(path) {
        //
        const { node } = path
        if (node.source && testStrReg.test(node.source.value)) {
            let value = node.source.value
            node.source.value = value.replace(testStrReg, relaceStr)
        }
        // path.stop()
    },
}

traverse(ast, visitor)

const { code } = generate(
    ast,
    {
        /* options */
    },
    TestString
)

/**
 * 判断字符串是不是以字符串数组中某一个结尾
 * @param str
 * @param endArr
 * @returns boolean
 */
/* function endsWithOneof(str, endArr) {
    if (!Array.isArray(endArr) || !endArr.length) {
        return false
    }
    let num = endArr.length - 1
    while (num--) {
        if (str.endsWith(endArr[num])) {
            return true
        }
    }
    return false
} */

// function createMemberExpression() {
//     return t.memberExpression(t.identifier("console"), t.identifier("log"))
// }
