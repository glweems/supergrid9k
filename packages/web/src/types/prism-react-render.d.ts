import React from "react";
declare module "prism-react-renderer" {
  export type Language =
    | "markup"
    | "bash"
    | "clike"
    | "c"
    | "cpp"
    | "css"
    | "javascript"
    | "jsx"
    | "coffeescript"
    | "actionscript"
    | "css-extr"
    | "diff"
    | "git"
    | "go"
    | "graphql"
    | "handlebars"
    | "json"
    | "less"
    | "makefile"
    | "markdown"
    | "objectivec"
    | "ocaml"
    | "python"
    | "reason"
    | "sass"
    | "scss"
    | "sql"
    | "stylus"
    | "tsx"
    | "typescript"
    | "wasm"
    | "yaml";

  export type PrismGrammar = {
    [key: string]: any;
  };

  export type LanguageDict = { [key: Language]: PrismGrammar };

  export type PrismLib = {
    languages: LanguageDict;
    tokenize: (
      code: string,
      grammar: PrismGrammar,
      language: Language
    ) => PrismToken[] | string[];
    highlight: (
      code: string,
      grammar: PrismGrammar,
      language: Language
    ) => string;
  };

  export type PrismThemeEntry = {
    color?: string;
    backgroundColor?: string;
    fontStyle?: "normal" | "italic";
    fontWeight?:
      | "normal"
      | "bold"
      | "100"
      | "200"
      | "300"
      | "400"
      | "500"
      | "600"
      | "700"
      | "800"
      | "900";
    textDecorationLine?:
      | "none"
      | "underline"
      | "line-through"
      | "underline line-through";
    opacity?: number;
    [styleKey: string]: string | number | void;
  };

  export type PrismTheme = {
    plain: PrismThemeEntry;
    styles: Array<{
      types: string[];
      style: PrismThemeEntry;
      languages?: Language[];
    }>;
  };

  export type ThemeDict = {
    root: StyleObj;
    plain: StyleObj;
    [type: string]: StyleObj;
  };

  export type Token = {
    types: string[];
    content: string;
    empty?: boolean;
  };

  export type PrismToken = {
    type: string;
    content: Array<PrismToken | string> | string;
  };

  export type StyleObj = {
    [key: string]: string | number | null;
  };

  export type LineInputProps = {
    key?: React.Key;
    style?: StyleObj;
    className?: string;
    line: Token[];
    [otherProp: string]: any;
  };

  export type LineOutputProps = {
    key?: React.Key;
    style?: StyleObj;
    className: string;
    [otherProps: string]: any;
  };

  export type TokenInputProps = {
    key?: React.Key;
    style?: StyleObj;
    className?: string;
    token: Token;
    [otherProp: string]: any;
  };

  export type TokenOutputProps = {
    key?: React.Key;
    style?: StyleObj;
    className: string;
    children: string;
    [otherProp: string]: any;
  };

  export type RenderProps = {
    tokens: Token[][];
    className: string;
    style: StyleObj;
    getLineProps: (input: LineInputProps) => LineOutputProps;
    getTokenProps: (input: TokenInputProps) => TokenOutputProps;
  };

  export type DefaultProps = {
    Prism: PrismLib;
    theme: PrismTheme;
  };

  export interface HighlightProps {
    Prism: PrismLib;
    theme?: PrismTheme;
    language: Language;
    code: string;
    children: (props: RenderProps) => React.ReactNode;
  }

  export default class Highlight extends React.Component<HighlightProps> {
    themeDict: ThemeDict;
    getLineProps: (lineInputProps: LineInputProps) => LineOutputProps;
    getStyleForToken: (token: Token) => { [inlineStyle: string]: string };
    getTokenProps: (tokenInputPropsL: TokenInputProps) => TokenOutputProps;
  }

  export const defaultProps: DefaultProps;

  export const Prism: PrismLib;
}

declare module "prism-react-renderer/themes/*" {
  import { PrismTheme } from "prism-react-renderer";
  const theme: PrismTheme;
  export default theme;
}
