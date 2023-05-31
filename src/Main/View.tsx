import { Core, IMainView, ISubView } from "@ancademy/vse-client";
import { injectGlobal } from "@emotion/css";
import { List } from "antd";
import { Phase1View } from "../Phase1";
import { Phase2View } from "../Phase2";
import { Phase3View } from "../Phase3";
import { Lobby } from "./Lobby";
import { Login } from "./Login";
import { Play } from "./Play";

injectGlobal`
  *::-webkit-scrollbar {
    width: 0.5rem;
  }

  *::-webkit-scrollbar-track {
    background-color: #0C275A;
    border-radius: 0.4rem;
  }

  *::-webkit-scrollbar-thumb {
    background-color: rgba(217, 217, 217, 0.38);
    border-radius: 0.4rem;
  }`;
function ReportViewer(props: Core.IReportViewerProps) {
  const { reportFile } = props.data || {};
  const renderFileItem = (key: "planFile" | "reportFile" | "negotiationFile", file: string) => {
    const label = {
      planFile: "实验计划书",
      reportFile: "实验报告",
      negotiationFile: "气候谈判ppt",
    };
    const fileName = file ? file.slice(file.lastIndexOf("/") + 1) : "";
  };
  return (
    <div>
      <List>
        <List.Item
          key={"reportFile"}
          title={"实验报告"}
          extra={
            (reportFile && (
              <a href={reportFile} download>
                下载
              </a>
            )) ||
            "未上传"
          }
        >
          <List.Item.Meta title={"实验报告"} />
        </List.Item>
      </List>
    </div>
  );
}
export const mainView: IMainView = {
  Login,
  Lobby,
  Play,
  ReportViewer,
};

export const subViewList: ISubView[] = [Phase1View, Phase2View, Phase3View];
