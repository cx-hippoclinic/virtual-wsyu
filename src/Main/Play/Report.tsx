import { Asset, Background, Header, PageContent } from "@client";
import { css } from "@emotion/css";
import { Axis, Chart, Coordinate, Interaction, Interval, Tooltip } from "bizcharts";
export function Report(props) {
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
          `}
        >
          <div>
            <p>系统评分（满分100）：85</p>
            <p> 环节一：xxxx</p>
            <p>得分：10</p>
            <p> 环节二：xxxx</p>
            <p>得分：20</p>
            <p> 环节三：xxxx</p>
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
        <div
          className={css`
            background: #07142e;
            height: 22.8rem;
            font-size: 1.7rem;
            padding: 2.1rem 4.2rem;
            margin-top: 2rem;
            width: 80rem;
            border-radius: 34px;
          `}
        >
          <p>指导教师</p>
          <p>xxx</p>
          <p>课时数4</p>
          <p>实验时间</p>
          <p>2022.2.1-2022.3.1</p>
        </div>
      </PageContent>
    </div>
  );
}
