import { Icon, iconButtonCss } from '@lib/Icons';
import React, { FC, ReactNode } from 'react';

export interface CodePenData {
  title?: string;
  description?: string;
  private?: boolean;
  /** If supplied, the Pen will save as a fork of this id. Note it's not the slug, but ID. You can find the ID of a Pen with `window.CP.pen.id` in the browser console.
   *
   */
  parent?: string;
  tags?: [string, string, string, string, string];
  /**
   * "101" Set which editors are open. In this example HTML open, CSS closed, JS open
   */
  editors?: string;
  layout?: 'top' | 'left' | 'right';
  /**
   *  "<div>HTML here.</div>"
   */
  html?: string;
  html_pre_processor?: 'none' | 'slim' | 'haml' | 'markdown';
  /**
   * "html { color: red; }"
   * */
  css?: string;
  css_pre_processor?: 'none' | 'less' | 'scss' | 'sass' | 'stylus';
  css_starter?: 'normalize' | 'reset' | 'neither';
  css_prefix?: 'autoprefixer' | 'prefixfree' | 'neither';
  /**
   * "alert('test');"
   */
  js?: string;
  js_pre_processor?:
    | 'none'
    | 'coffeescript'
    | 'babel'
    | 'livescript'
    | 'typescript';
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
  options?: Omit<CodePenData, 'html' | 'css' | 'js'>;
  code?: Pick<CodePenData, 'html' | 'css' | 'js'>;
  children?: React.ReactNode;
  className?: string;
  buttonStyle?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  icon?: ReactNode;
}

const CodePenButton: FC<CodePenButtonProps> = ({
  children,
  className,
  code,
  buttonStyle,
  onClick,
  icon,
  options,
}) => {
  const config = JSON.stringify({ ...options, ...code });
  return (
    <form
      action="https://codepen.io/pen/define"
      method="POST"
      target="_blank"
      className={className}
    >
      <input type="hidden" name="data" value={config} />
      <button
        id={CodePenButton.displayName}
        color="text"
        style={buttonStyle}
        css={iconButtonCss as any}
        type="submit"
        onClick={onClick}
      >
        {icon}

        <div style={{ paddingLeft: '5px' }}>{children}</div>
      </button>
    </form>
  );
};

CodePenButton.defaultProps = {
  options: {
    title: 'Super Grid 9k Creation',
    description: `Created With Super Grid 9k!\nCreate your at https://supergrid9k.dev`,
    tags: ['SuperGrid9k', 'css', 'grid', 'cssgrid', 'css-grid'],
    head: `<meta name="viewport" content="width=device-width, initial-scale=1">\n<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inconsolata:400,400i,700">`,
    css_external: 'https://supergrid9k.dev/codepen.css',
    editors: '110',
    layout: 'right',
    css_starter: 'normalize',
  },
  className: 'CodePenButton',
  children: 'Create CodePen',
  buttonStyle: { backgroundColor: '#2c303a', color: '#fff' },
  onClick: (e) => console.log(`${e.currentTarget.id} Clicked`),
  icon: (
    <Icon viewBox="0 0 1792 1792">
      <path d="M216 1169l603 402v-359l-334-223zm-62-144l193-129-193-129v258zm819 546l603-402-269-180-334 223v359zm-77-493l272-182-272-182-272 182zm-411-275l334-223v-359l-603 402zm960 93l193 129v-258zm-138-93l269-180-603-402v359zm485-180v546q0 41-34 64l-819 546q-21 13-43 13t-43-13l-819-546q-34-23-34-64v-546q0-41 34-64l819-546q21-13 43-13t43 13l819 546q34 23 34 64z" />
    </Icon>
  ),
};

CodePenButton.displayName = 'CodePenButton';

export default CodePenButton;
