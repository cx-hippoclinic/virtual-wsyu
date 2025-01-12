import { api, useApiPlay } from "@ancademy/vse-client";
import { Asset, Background, Header, PageContent, Theme } from "@client";
import { css, injectGlobal } from "@emotion/css";
import { Button, message, Upload } from "antd";
import { Axis, Chart, Coordinate, Interaction, Interval, Tooltip } from "bizcharts";
import { useEffect, useRef } from "react";
import { introPhases, IPlayerState, questionList } from "../config";

const calcScore = (apiState: IPlayerState, phases: introPhases[]) => {
  return Math.round(
    phases.reduce((score, it) => {
      let number = 0;
      apiState?.introPhases?.questionChose[it].forEach((choose, index) => {
        if (questionList[it][index].current === choose) number += 11.1;
      });
      return score + number;
    }, 0)
  );
};
export const ReportContent = (props) => {
  const data = [
    {
      type: "环节一",
      value: calcScore(props.apiState, [introPhases.currency]),
    },
    {
      type: "环节二",
      value: calcScore(props.apiState, [introPhases.risk]),
    },
    {
      type: "环节三",
      value: calcScore(props.apiState, [introPhases.securities]),
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
          <p>系统评分（满分100）：{data[0].value + data[1].value + data[2].value}</p>
          <p> 环节一：信息转换与存储</p>
          <p>得分：{data[0].value}</p>
          <p> 环节二：校验码编解码</p>
          <p>得分：{data[1].value}</p>
          <p> 环节三：信息传输</p>
          <p>得分：{data[2].value}</p>
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
  const saveStepData = async () => {
    console.log(props.gameId);
    let result = await api.getMyResult(props.gameId);
    if (!result) {
      result = await api.initResult(props.gameId);
    }
    // await api.saveMainAnswer(props.gameId, [{ score: score.current, answer: "res" }]);
    // await api.mockAndUploadResult(props.gameId);
    await api.saveStepResult({
      id: result.id,
      stepResult: {
        seq: 1, //步骤序号
        score: score.current, //得分
        expectTime: 60 * 8, //预计用时(秒)
        title: "制定计划", //标题
        scoringModel: "实验计划制定100%", //得分标准描述
        maxScore: 100, //步骤满分
      },
      stepAmount: 1,
    });
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
        saveStepData();
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
  const { apiState, setApiState } = useApiPlay<IPlayerState>();

  const score = useRef(calcScore(apiState, [introPhases.currency, introPhases.risk, introPhases.securities]));
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
        <ReportContent apiState={apiState} />
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
