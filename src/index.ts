module.exports = function (babel) {
    let { types: t } = babel
    const visitor = {
        VariableDeclaration(path, config) {
            const { node } = path,
                {
                    opts: { matchSuffixArr, relaceStrSuffix },
                } = config // plugin params
            let regStr = matchSuffixArr.map((v) => `\\${v}`).join("|"),
                reg = new RegExp(`(${regStr})$`, "ig")
    
            let declaration = node?.declarations[0]
            if (
                declaration &&
                (t.isIdentifier(declaration?.init?.callee, {
                    // require
                    name: "require",
                }) ||
                    t.isIdentifier(declaration?.init?.callee?.object, {
                        // require.ensure ...
                        name: "require",
                    })) &&
                reg.test(declaration?.init.arguments[0].value)
            ) {
                declaration.init.arguments[0].value = declaration.init.arguments[0].value.replace(
                    reg,
                    relaceStrSuffix
                )
            }
        },
        ImportDeclaration(path, config) {
            const { node } = path,
                {
                    opts: { matchSuffixArr, relaceStrSuffix },
                } = config // plugin params
            let regStr = matchSuffixArr.map((v) => `\\${v}`).join("|"),
                reg = new RegExp(`(${regStr})$`, "ig")
            if (node.source && reg.test(node.source.value)) {
                let value = node.source.value
                node.source.value = value.replace(reg, relaceStrSuffix)
            }
            // path.stop()
        },
    }
    return {
        name: "bable-import-style-suffix",
        visitor,
    }
}
