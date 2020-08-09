import React from "react";
import { Button } from "rebass/styled-components";
export interface CodePenData {
  title?: string;
  description?: string;
  private?: boolean;
  /** If supplied, the Pen will save as a fork of this id. Note it's not the slug, but ID. You can find the ID of a Pen with `window.CP.pen.id` in the browser console.
   *
   */
  parent?: string;
  tags?: string[];
  /**
   * "101" Set which editors are open. In this example HTML open, CSS closed, JS open
   */
  editors?: string;
  layout?: "top" | "left" | "right";
  /**
   *  "<div>HTML here.</div>"
   */
  html?: string;
  html_pre_processor?: "none" | "slim" | "haml" | "markdown";
  /**
   * "html { color: red; }"
   * */
  css?: string;
  css_pre_processor?: "none" | "less" | "scss" | "sass" | "stylus";
  css_starter?: "normalize" | "reset" | "neither";
  css_prefix?: "autoprefixer" | "prefixfree" | "neither";
  /**
   * "alert('test');"
   */
  js?: string;
  js_pre_processor?:
    | "none"
    | "coffeescript"
    | "babel"
    | "livescript"
    | "typescript";
  /**
   * "loading"
   */
  html_classes?: string;
  /**
   *  "<meta name='viewport' content='width=device-width'>"
   */
  head?: string;
  /**
   * "http://yoursite.com/style.css", // semi-colon separate multiple files
   */
  css_external?: string;
  /**
   * "http://yoursite.com/script.js" // semi-colon separate multiple files
   */
  js_external?: string;
}

interface CodePenButtonProps {
  data: CodePenData;
  children?: React.ReactNode;
  className?: string;
}

const CodePenButton: React.FC<CodePenButtonProps> = ({
  children,
  className,
  data,
}) => {
  const values = JSON.stringify(data);
  return (
    <form
      action="https://codepen.io/pen/define"
      method="POST"
      target="_blank"
      className={className}
    >
      <input type="hidden" name="data" value={values} />
      <Button
        css={`
          text-align: center;
          font-family: Avenir, Helvetica, Arial, sans-serif;
          display: flex;
          align-items: center;
          text-transform: unset;
          cursor: pointer;
        `}
        type="submit"
      >
        <div>
          <svg
            data-v-5ac57822=""
            width="20"
            height="20"
            viewBox="0 0 1792 1792"
          >
            <path
              data-v-5ac57822=""
              d="M216 1169l603 402v-359l-334-223zm-62-144l193-129-193-129v258zm819 546l603-402-269-180-334 223v359zm-77-493l272-182-272-182-272 182zm-411-275l334-223v-359l-603 402zm960 93l193 129v-258zm-138-93l269-180-603-402v359zm485-180v546q0 41-34 64l-819 546q-21 13-43 13t-43-13l-819-546q-34-23-34-64v-546q0-41 34-64l819-546q21-13 43-13t43 13l819 546q34 23 34 64z"
              fill="#fff"
            />
          </svg>
          {children}
        </div>
      </Button>
    </form>
  );
};

CodePenButton.defaultProps = { children: "Create CodePen" };

export default CodePenButton;
