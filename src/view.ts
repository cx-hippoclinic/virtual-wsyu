import { renderVseView } from "@ancademy/vse-client";
import { adjustRem, Color } from "@client";
import { ConfigProvider } from "antd";
import { mainView, subViewList } from "./Main/View";

ConfigProvider.config({
  theme: {
    primaryColor: Color.primary,
  },
});

window.addEventListener("resize", adjustRem());

renderVseView({
  mainView,
  subViewList,
});
