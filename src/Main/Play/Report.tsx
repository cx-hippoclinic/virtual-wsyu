import { api } from "@ancademy/vse-client";
import { Asset, Background, Header, PageContent, Theme } from "@client";
import { css, injectGlobal } from "@emotion/css";
import { Button, message, Upload } from "antd";
import { Axis, Chart, Coordinate, Interaction, Interval, Tooltip } from "bizcharts";
import { useEffect } from "react";

export const ReportContent = () => {
  const data = [
    {
      type: "环节一",
      value: 20,
    },
    {
      type: "环节二",
      value: 18,
    },
    {
      type: "环节三",
      value: 32,
    },
  ];
  return (
    <>
      <h2
        className={css`
          font-size: 2.3rem;
          color: #ffffff;
        `}
      >
        实验报告
      </h2>
      <div
        className={css`
          background: #07142e;
          height: 28.8rem;
          font-size: 1.7rem;
          margin-top: 2.5rem;
          padding: 2.1rem 4.2rem;
          width: 80rem;
          border-radius: 34px;
          display: flex;
          color: #ffffff;
        `}
      >
        <div
          className={css`
            width: 30rem;
          `}
        >
          <p>系统评分（满分100）：85</p>
          <p> 环节一：信息转换与存储</p>
          <p>得分：10</p>
          <p> 环节二：校验码编解码</p>
          <p>得分：20</p>
          <p> 环节三：信息传输</p>
          <p>得分：5</p>
        </div>
        <Chart data={data} height={320} autoFit>
          <Coordinate type="theta" radius={0.8} innerRadius={0.55} />
          <Axis visible={false} />
          <Tooltip showTitle={false} />
          <Interval adjust="stack" position="value" color="type" shape="sliceShape" />
          <Interaction type="element-single-selected" />
        </Chart>
      </div>
      {/*<div*/}
      {/*  className={css`*/}
      {/*    height: 22.8rem;*/}
      {/*    font-size: 1.7rem;*/}
      {/*    padding: 2.1rem 4.2rem;*/}
      {/*    margin-top: 2rem;*/}
      {/*    width: 80rem;*/}
      {/*    color: #ffffff;*/}
      {/*  `}*/}
      {/*/>*/}
    </>
  );
};

export function Report(props) {
  const { gameId } = props;
  const saveReport = async (path: string) => {
    const report = await api.getMyReport(gameId);
    console.log(report, 233);
    // console.log(report, 233);
    console.log(path);
    await api.submitReport(report.id, false);
    const res = await api.saveReport({
      gameId,
      data: {
        reportFile: path,
      },
    });
    console.log(res);
  };
  const uploadProps: any = {
    name: "file",
    action: "/file/upload",
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        console.log(info.file.response.data);
        saveReport(info.file.response.data);
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  useEffect(() => {
    injectGlobal`
      .ant-upload-list-item-info{
        color: cornflowerblue!important;
      }
    `;
  }, []);
  return (
    <div
      className={css`
        height: 100vh;
        overflow: hidden;
      `}
    >
      <Background src={Asset.play_phase1_res_bg} />
      <Header title="实验报告" />
      <PageContent
        className={css`
          flex-flow: column;
          color: #ffffff;
        `}
      >
        <ReportContent />
        <div
          className={css`
            height: 22.8rem;
          `}
        />
        <div
          className={css`
            margin-top: -20rem;
          `}
        >
          <Upload {...uploadProps}>
            <Button className={Theme.Btn.light.md}>点击上传实验报告</Button>
          </Upload>
        </div>
      </PageContent>
    </div>
  );
}
