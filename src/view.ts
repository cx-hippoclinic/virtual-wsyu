import { renderVseView } from "@ancademy/vse-client";
import { initTheme, testTheme } from "@client";
import { mainView, subViewList } from "./Main/View";

initTheme();
testTheme();

renderVseView({
  mainView,
  subViewList,
});
