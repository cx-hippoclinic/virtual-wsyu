import { css } from "@emotion/css";
import { useEffect, useRef } from "react";

const ControllableRobot = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let robotX = 200;
  let robotY = 200;

  const drawRobot = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.clearRect(0, 0, 400, 400);
    ctx.fillStyle = "#7d82ff";
    ctx.fillRect(x - 30, y - 30, 60, 60); // 头部
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(x - 15, y - 10, 5, 0, Math.PI * 2, true); // 左眼
    ctx.arc(x + 15, y - 10, 5, 0, Math.PI * 2, true); // 右眼
    ctx.fill();
    ctx.fillStyle = "#2f82ff";
    ctx.fillRect(x - 40, y + 30, 80, 100); // 身体
  };

  const moveRobot = (e: KeyboardEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    switch (e.key) {
      case "ArrowUp":
        robotY -= 10;
        break;
      case "ArrowDown":
        robotY += 10;
        break;
      case "ArrowLeft":
        robotX -= 10;
        break;
      case "ArrowRight":
        robotX += 10;
        break;
    }
    drawRobot(ctx, robotX, robotY);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawRobot(ctx, robotX, robotY);
    window.addEventListener("keydown", moveRobot);

    return () => {
      window.removeEventListener("keydown", moveRobot);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width="400"
      height="400"
      className={css`
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      `}
    />
  );
};

export default ControllableRobot;
