import styled from "styled-components";

interface GithubButtonProps {
  "data-color-scheme"?: string;
  "data-size"?: string;
}

const GithubButton = styled.a<GithubButtonProps>``;

GithubButton.defaultProps = {
  className: "github-button",
  href: "https://github.com/glweems/supergrid9k",
  "data-color-scheme": "no-preference: light; light: light; dark: light;",
  "aria-label": "Star glweems/supergrid9k on GitHub",
  "data-size": "large",
};

export default GithubButton;
