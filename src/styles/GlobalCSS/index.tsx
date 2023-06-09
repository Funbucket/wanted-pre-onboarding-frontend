import { css, Global } from "@emotion/react";

export const GlobalCSS = () => {
  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body,
        input,
        textarea,
        button {
          font-family: Inter, Pretendard, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
            Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }
      `}
    />
  );
};
