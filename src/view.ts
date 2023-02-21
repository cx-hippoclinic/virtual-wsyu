import { renderVseView } from "@ancademy/vse-client";
import { initTheme, testTheme } from "@client";
import { injectGlobal } from "@emotion/css";
import { mainView, subViewList } from "./Main/View";

initTheme();
testTheme();

injectGlobal`
  .ant-tabs-nav {
    margin: 0 !important;
    .ant-tabs-tab {
      padding: 0.7rem 3.14rem;
      color: #ffffff !important;
      background: #2b4c7d !important;
      border-bottom-color: #23549e !important;
      border-radius: 1rem 1rem 0 0 !important;
      letter-spacing: 0.5rem;
      &.ant-tabs-tab-active {
        background: #2e6ee0!important;
        box-shadow: 0 0 12px rgba(0, 0, 0, 0.25);
        & .ant-tabs-tab-btn {
          color: #ffffff !important;
        }
      }
    }
  }
`;

renderVseView({
  mainView,
  subViewList,
});
