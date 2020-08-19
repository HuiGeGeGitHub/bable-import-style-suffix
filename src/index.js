var parser = require("@babel/parser");
var t = require("@babel/types");
var traverse = require("@babel/traverse").default;
var generate = require("@babel/generator").default;
var testStrReg = /(\.scss|\.sass)$/g;
var relaceStr = ".css";
var TestString = "\n    import \"../test.scss\"\n    // import \"../test2.scss\"\n    var aa = require.ensure('../haha.sass')\n    console.log('haha')\n";
var ast = parser.parse(TestString, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
});
var visitor = {
    VariableDeclaration: function (path) {
        var _a, _b;
        var node = path.node;
        var declaration = node === null || node === void 0 ? void 0 : node.declarations[0];
        if (declaration &&
            (t.isIdentifier((_a = declaration === null || declaration === void 0 ? void 0 : declaration.init) === null || _a === void 0 ? void 0 : _a.callee, {
                name: "require",
            }) ||
                t.isIdentifier((_b = declaration === null || declaration === void 0 ? void 0 : declaration.init.callee) === null || _b === void 0 ? void 0 : _b.object, {
                    name: "require",
                })) &&
            testStrReg.test(declaration === null || declaration === void 0 ? void 0 : declaration.init.arguments[0].value)) {
            declaration.init.arguments[0].value = declaration.init.arguments[0].value.replace(testStrReg, relaceStr);
        }
    },
    ImportDeclaration: function (path) {
        var node = path.node;
        if (node.source && testStrReg.test(node.source.value)) {
            var value = node.source.value;
            node.source.value = value.replace(testStrReg, relaceStr);
        }
    },
};
traverse(ast, visitor);
var code = generate(ast, {}, TestString).code;
console.log(code);
