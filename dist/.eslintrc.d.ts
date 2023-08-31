export declare let root: boolean;
export declare namespace env {
    let browser: boolean;
    let es2021: boolean;
    let node: boolean;
}
declare let _extends: string[];
export { _extends as extends };
export declare namespace parserOptions {
    namespace ecmaFeatures {
        let jsx: boolean;
    }
    let ecmaVersion: string;
    let sourceType: string;
}
export declare let plugins: string[];
export declare let overrides: {
    files: string[];
    plugins: string[];
    extends: string[];
    parser: string;
    parserOptions: {
        project: string[];
    };
}[];
export declare let rules: {
    indent: string[];
    'linebreak-style': string[];
    'no-mixed-spaces-and-tabs': (string | boolean)[];
    'no-multiple-empty-lines': string[];
    'func-style': string[];
    semi: (string | {
        beforeStatementContinuationChars: string;
    })[];
    'semi-spacing': (string | {
        before: boolean;
        after: boolean;
    })[];
    quotes: (string | {
        allowTemplateLiterals: boolean;
    })[];
    'no-trailing-spaces': string[];
    'comma-dangle': string[];
    'space-in-parens': string[];
    'object-curly-spacing': string[];
    'array-bracket-spacing': string[];
    'computed-property-spacing': string[];
    'func-call-spacing': string[];
    'space-before-blocks': string[];
    'keyword-spacing': (string | {
        before: boolean;
        after: boolean;
    })[];
    'comma-spacing': (string | {
        before: boolean;
        after: boolean;
    })[];
    'object-curly-newline': (string | {
        consistent: boolean;
    })[];
    'array-bracket-newline': string[];
    'no-unused-vars': (string | {
        caughtErrors: string;
        vars: string;
        ignoreRestSiblings: boolean;
    })[];
    'no-console': (string | {
        allow: string[];
    })[];
    'react/react-in-jsx-scope': string;
    'react/prop-types': number;
};
