import { Asset, Style } from "@client";
import { css } from "@emotion/css";
import { Table } from "antd";
import Lottie from "lottie-react-web";
import { useEffect, useState } from "react";
import Joyride, { ACTIONS, EVENTS, Step } from "react-joyride"; // 引入 react-joyride
import computer from "../../Phase3/animation/computer.json";
import tableHeaderClass = Style.tableHeaderClass;

const Column = Table.Column;
function Loan(props) {
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
    "完成存储后，进入第二模块校验码编解码实验环节，对存储的信息进行海明码的编解码操作。",
    "打开编解码实验模块，请可以选取多位输入器、封装的海明码模块，完成模块连线。",
    "如果你愿意，可以试一试采用最基本的逻辑设计方式，结合海明码的编码原理进行基本逻辑的电路设计与实现。可以调整一下自己！记得完成逻辑电路设计后及时封装成编码模块，后面可以直接调用。",
  ].map(getStepItem);
  const [steps, setSteps] = useState(defaultSteps);
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

  useEffect(() => {
    window.addEventListener("message", (event) => {
      switch (event.data) {
        case "phase2":
          history.back();
          break;
        case "phase2-0":
          setStepIndex(0);
          setSteps([
            getStepItem(
              "采用封装模块，在上一步的基础上，增加解码模块，并将解码模块的输出与字库显示相连，将编码的输出直接连接，显示的与输入一致。"
            ),
            getStepItem(
              "如果你愿意，也可以试一试采用最基本的逻辑设计方式，结合海明码的解码原理进行基本逻辑的电路设计与实现。可以调整一下自己！记得完成逻辑电路设计后及时封装成解码模块，后面可以直接调用。"
            ),
          ]);
          break;
        case "phase2-1":
          setStepIndex(0);
          setSteps([
            getStepItem("进行海明检验码验证。"),
            getStepItem("通过增加了字库显示，便于进行比较。运行后，通过海明编码模块可以显示海明校验码。"),
          ]);
          break;
      }
    });
  }, []);
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
      <iframe src={`//${window.location.hostname}:8001/inner/stepTwo`} width="100%" height="100%" frameBorder={0} />
      <div
        className={css`
          position: absolute;
          left: 20rem;
          bottom: 0rem;
        `}
      >
        <Lottie options={{ animationData: computer }} width={400} height={400} />
      </div>
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

export default Loan;
