declare const parser: any;
declare const t: any;
declare const traverse: any;
declare const generate: any;
declare const testStrReg: RegExp;
declare const relaceStr = ".css";
declare const TestString = "\n    import \"../test.scss\"\n    // import \"../test2.scss\"\n    var aa = require.ensure('../haha.sass')\n    console.log('haha')\n";
declare let ast: any;
declare const visitor: {
    VariableDeclaration(path: any): void;
    ImportDeclaration(path: any): void;
};
declare const code: any;
