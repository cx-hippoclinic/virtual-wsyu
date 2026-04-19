import { useApiPlay, useApiState } from "@ancademy/vse-client";
import { css, injectGlobal } from "@emotion/css";
import { Table, Tabs } from "antd";
import _ from "lodash";
import { useEffect, useState } from "react";

import { Asset } from "@client";
import { useTimer } from "@client/component/Countdown";
import Joyride, { ACTIONS, EVENTS, Step } from "react-joyride"; // 引入 react-joyride
import { goodsType } from "../../common/config";
import { IPageTradeState, IPlayerState, Role, TradeStatue, User } from "../config";
import { TPlayPageProps } from "../interface";
import { goodPriceRefer, randomCount } from "../util";

const Column = Table.Column;
const TabPane = Tabs.TabPane;
const maxRound = 12;
const roundTime = 60;

export function Trade({ ...props }: TPlayPageProps & { nextPage: () => void; prePage: () => void }) {
  // TTS 函数
  const speakText = (text) => {
    const voices = window.speechSynthesis.getVoices();
    const utterance = new SpeechSynthesisUtterance(text);
    console.log(utterance);
    utterance.voice = voices.find((voice) => voice.lang === "zh-CN" && voice.localService);
    window.speechSynthesis.speak(utterance);
  };
  const getStepItem = (text: string) => ({
    target: "#image-guide", // 图片引导
    content: (
      <div>
        <p>{text}</p>
      </div>
    ),
    disableBeacon: true,
  });
  const [stepIndex, setStepIndex] = useState(0);

  // 定义引导步骤
  const defaultSteps: Step[] = [
    "通过前面的知识学习，相信你已经掌握了信息传输的基本的知识，下面我们一起开始实验吧！",
    "实验分成三阶段实验层次开展：首先是信息的转换与存储实验模块，通过这个实验了解信息在计算机内是如何存储的。",
    "查找汉字对应国标码。",
    "输入一个符号或者汉字，然后确定。",
  ].map(getStepItem);
  const [steps, setSteps] = useState(defaultSteps);
  // Joyride 的回调函数
  const handleJoyrideCallback = (data) => {
    const { action, index, origin, status, type } = data;
    if (type === EVENTS.TOUR_START) {
      const stepContent = steps[index].content;
      speakText(stepContent["props"]["children"]["props"]["children"]);
    }
    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      window.speechSynthesis.cancel();
      if (stepIndex >= steps.length - 1) {
        return;
      }
      const newIndex = index + (action === ACTIONS.PREV ? -1 : 1);
      const stepContent = steps[newIndex].content;
      speakText(stepContent["props"]["children"]["props"]["children"]);
      // Update state to advance the tour
      setStepIndex(newIndex);
    }
  };
  const { game, nextPage, prePage } = props;
  const gameId = game.id;
  const { loading, apiState, setApiState } = useApiState<IPageTradeState>(gameId, "schedulerKey");
  const { setApiState: setApiPlayState } = useApiPlay<IPlayerState>();
  useEffect(() => {
    if (loading) {
      return;
    }
    if (apiState.inited) {
      return;
    }
    setApiState({
      inited: true,
      tradeRecodes: [getTradeRecodes()],
      leftTime: roundTime,
      round: 1,
      myAccount: {
        money: 1000000,
        have: {
          [goodsType.hocus]: 0,
          [goodsType.breathe]: 0,
          [goodsType.ultrasound]: 0,
        },
      },
    });
  }, [loading]);
  const [role, setRole] = useState(Role.buyer),
    [price, setPrice] = useState(null as number),
    [count, setAmount] = useState(null as number),
    [type, setType] = useState<goodsType>(goodsType.hocus),
    totalAmount = price * count;
  const [showPopover, setShowPopover] = useState(false),
    hidePopover = () => {
      setShowPopover(false);
      setPrice(null);
      setAmount(null);
    };
  const disabled =
    (role === Role.buyer && totalAmount > apiState?.myAccount?.money) ||
    (role === Role.seller && count > apiState?.myAccount?.have?.[type]);
  const myActiveShoutList = apiState?.tradeRecodes?.filter(
    (it) => it.owner === User.me && it.statue === TradeStatue.waiting
  );
  useEffect(() => {
    injectGlobal`
      .ant-table{
        background: transparent !important;
      }
      
      .ant-table-thead tr th {
        background: transparent !important;
        color: #ffffff; !important;
      }

      .ant-table-tbody tr td ,.ant-table-tbody tr td:hover {
        background: transparent !important;
        color: #ffffff; !important;
      }
      .ant-table-cell-scrollbar:not([rowspan]) {
         box-shadow: unset!important;
      }
      .ant-table-placeholder .ant-table-cell {
        background: transparent!important;
      }
    `;
    window.addEventListener("message", (event) => {
      switch (event.data) {
        case "phase1":
          nextPage();
          break;
        case "phase1-0":
          setStepIndex(0);
          setSteps([getStepItem("在国标码信息表中的位置，根据查表，能查看到输入汉字的国标码。")]);
          break;
        case "phase1-1":
          setStepIndex(0);
          setSteps([
            getStepItem(
              "汉字在系统中进行存储的是机内码，在电路设计界面完成转换电路的设计，实现国际码到机内码的转换。试一试吧。"
            ),
          ]);
          break;
        case "phase1-2":
          setStepIndex(0);
          setSteps([
            getStepItem(
              "转换后的机内码存入到内存，现在显示的是机内码转换的结果。（存储界面）  我们选用了国产存储芯片模型，你认识这个芯片吗？。"
            ),
          ]);
          break;
      }
    });
  }, []);
  const getTradeRecodes = () => {
    const type = _.sample(Object.values(goodsType)) as goodsType;
    const data = goodPriceRefer[type];
    return {
      id: (apiState?.tradeRecodes?.length || 0) + 1,
      owner: User.other,
      count: randomCount(data.minCount, data.maxCount),
      price: Math.floor(randomCount(data.minPrice, data.maxPrice) / 100) * 100,
      type,
      statue: TradeStatue.waiting,
      role: Role.seller,
      round: apiState.round,
      time: roundTime,
    };
  };
  const publishSell = () => {
    setApiState((s) => {
      s.tradeRecodes = [...s.tradeRecodes, getTradeRecodes()];
    });
  };
  const t = useTimer(apiState?.leftTime || roundTime);
  if (loading || !apiState.inited) {
    return null;
  }
  return (
    <div
      className={css`
        width: 100rem;
        height: 55rem;
        border: 3px solid #0055a5;
        border-radius: 2.14rem;
        overflow: hidden;
      `}
    >
      <iframe src={`//${window.location.hostname}:8001`} width="100%" height="100%" frameBorder={0} />
      {/* 引入 react-joyride 组件 */}
      <Joyride
        steps={steps}
        stepIndex={stepIndex}
        continuous={true}
        scrollToFirstStep={true}
        disableOverlay={true}
        callback={handleJoyrideCallback} // 添加回调函数
        locale={{
          last: "完成", // 将最后一步的按钮文本改为“完成”
          next: "下一步", // 设置下一步按钮的文本
          back: "上一步", // 设置上一步按钮的文本
        }}
      />
      {/* 图片引导部分 */}
      <div
        style={{ width: "42rem" }}
        className={css`
          position: absolute;
          right: 0rem;
          top: 55%;
          transform: translateY(-50%);
          width: 150px;
        `}
      >
        <img
          src={Asset.DP}
          alt=""
          className={css`
            width: 100%;
            height: auto;
            object-fit: contain;
          `}
          style={{ marginLeft: "40px" }}
          id="image-guide" // 添加 class 用于引导
        />
      </div>
    </div>
  );
}
