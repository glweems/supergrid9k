import React from "react";
import Prism from "prismjs";

export interface PrismCodeProps {
  code: string;
  plugins?: string[];
  language?: string;
}

export default class PrismCode extends React.Component<PrismCodeProps> {
  ref: React.RefObject<HTMLElement>;

  constructor(
    props: PrismCodeProps = {
      plugins: ["line-numbers"],
      code: "",
    }
  ) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.highlight();
  }
  componentDidUpdate() {
    this.highlight();
  }

  highlight = () => {
    if (this.ref && this.ref.current) {
      Prism.highlightElement(this.ref.current);
    }
  };

  render() {
    const { code, plugins, language } = this.props;
    return (
      <pre className={!plugins ? "" : plugins.join(" ")}>
        <code ref={this.ref} className={`language-${language}`}>
          {code.trim()}
        </code>
      </pre>
    );
  }
}
