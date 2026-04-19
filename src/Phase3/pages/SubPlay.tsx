import { Asset } from "@client";
import { css } from "@emotion/css";
import Lottie from "lottie-react-web";
import { useEffect, useState } from "react";
import Joyride, { ACTIONS, EVENTS, Step } from "react-joyride";
import computer from "../../Phase3/animation/computer.json";

export function SubPlay(props) {
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
  const defaultSteps: Step[] = [].map(getStepItem);
  const [steps, setSteps] = useState(defaultSteps);
  const handleJoyrideCallback = (data) => {
    const { action, index, origin, status, type } = data;
    if (type === EVENTS.TOUR_START) {
      const stepContent = steps[index].content;
      speakText(stepContent["props"]["children"]["props"]["children"]);
    }
    console.log(type);
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
      setStepIndex(0);
      if (event.data === "phase3") {
        history.back();
      } else if (event.data === "phase3-1") {
        setSteps([
          getStepItem(
            "在实际的信息传输中会遇到各种的信号的干扰，通过增加干扰模块模拟信号干扰对信息传输的影响、已经校验码的功能。"
          ),
        ]);
      } else if (event.data === "phase3-2") {
        setSteps([
          getStepItem("可以进行随机加扰的测试仿真，请认真观察不同干扰情况下信息传递的质量。"),
          getStepItem("完成试验后请下载实验报告模版，完成本次实验的实验报告并提交。"),
        ]);
      } else if (event.data === "phase3-0") {
        setSteps([]);
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
      <iframe src={`//${window.location.hostname}:8001/inner/stepThree`} width="100%" height="100%" frameBorder={0} />
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
