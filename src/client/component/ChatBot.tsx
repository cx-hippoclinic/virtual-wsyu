import { css } from "@emotion/css";

const ChatBot = () => {
  return (
    <div
      className={css`
        position: fixed;
        right: 20px;
        bottom: 20px;
        width: 200px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        padding: 10px;
      `}
    >
      <h4>机器人</h4>
      <p>你好！有什么我可以帮助你的吗？</p>
    </div>
  );
};

export default ChatBot;
