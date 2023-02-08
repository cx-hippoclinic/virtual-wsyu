import { renderVseView } from "@ancademy/vse-client";
import { mainView, subViewList } from "./Main/View";
import { ConfigProvider } from "antd";
import { adjustRem, Color } from "@client";

ConfigProvider.config({
  theme: {
    primaryColor: Color.main,
  },
});

window.addEventListener("resize", adjustRem());

renderVseView({
  mainView,
  subViewList,
});
