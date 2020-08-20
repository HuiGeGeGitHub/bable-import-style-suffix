module.exports = function (babel) {
    var t = babel.types;
    var visitor = {
        VariableDeclaration: function (path, config) {
            var _a, _b, _c;
            var node = path.node, _d = config.opts, matchSuffixArr = _d.matchSuffixArr, relaceStrSuffix = _d.relaceStrSuffix;
            var regStr = matchSuffixArr.map(function (v) { return "\\" + v; }).join("|"), reg = new RegExp("(" + regStr + ")$", "ig");
            var declaration = node === null || node === void 0 ? void 0 : node.declarations[0];
            if (declaration &&
                (t.isIdentifier((_a = declaration === null || declaration === void 0 ? void 0 : declaration.init) === null || _a === void 0 ? void 0 : _a.callee, {
                    name: "require",
                }) ||
                    t.isIdentifier((_c = (_b = declaration === null || declaration === void 0 ? void 0 : declaration.init) === null || _b === void 0 ? void 0 : _b.callee) === null || _c === void 0 ? void 0 : _c.object, {
                        name: "require",
                    })) &&
                reg.test(declaration === null || declaration === void 0 ? void 0 : declaration.init.arguments[0].value)) {
                declaration.init.arguments[0].value = declaration.init.arguments[0].value.replace(reg, relaceStrSuffix);
            }
        },
        ImportDeclaration: function (path, config) {
            var node = path.node, _a = config.opts, matchSuffixArr = _a.matchSuffixArr, relaceStrSuffix = _a.relaceStrSuffix;
            var regStr = matchSuffixArr.map(function (v) { return "\\" + v; }).join("|"), reg = new RegExp("(" + regStr + ")$", "ig");
            if (node.source && reg.test(node.source.value)) {
                var value = node.source.value;
                node.source.value = value.replace(reg, relaceStrSuffix);
            }
        },
    };
    return {
        name: "bable-import-style-suffix",
        visitor: visitor,
    };
};
