import { ShowModalBtn } from "@client";

export function StartAnswerBtn({ nextPage }: { nextPage: () => void }) {
  return (
    <ShowModalBtn
      text="开始答题"
      nextPage={nextPage}
      content="在答题过程中不显示对错，且答题算入报告分数，请认真检查回答后确定提交，提交后将跳转答错题目并显示题目解析。"
    />
  );
}
