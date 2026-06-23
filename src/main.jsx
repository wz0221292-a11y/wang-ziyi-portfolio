import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";

function renderStartupError(error) {
  const root = document.getElementById("root");
  if (!root) return;

  const message = error instanceof Error ? error.message : String(error);
  root.innerHTML = `
    <main style="
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 32px;
      color: #fff2e8;
      background: radial-gradient(circle at 72% 28%, rgba(255,122,31,.24), transparent 32vw), linear-gradient(135deg, #080201, #170703 58%, #050201);
      font-family: Inter, 'SF Pro Display', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
    ">
      <section style="
        max-width: 720px;
        border: 1px solid rgba(255, 181, 102, .28);
        border-radius: 24px;
        padding: 28px;
        background: rgba(18, 6, 3, .72);
        box-shadow: 0 24px 100px rgba(0, 0, 0, .48), 0 0 54px rgba(255, 122, 31, .18);
      ">
        <p style="margin: 0 0 12px; color: #ff8a2f; font-size: 13px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase;">Portfolio startup error</p>
        <h1 style="margin: 0 0 14px; font-size: clamp(28px, 5vw, 54px); line-height: .98;">页面加载被拦截了</h1>
        <p style="margin: 0; color: rgba(255, 242, 232, .76); font-size: 16px; line-height: 1.7;">请刷新页面。若仍出现此提示，把下面错误发给我，我可以继续定位：</p>
        <pre style="margin: 18px 0 0; overflow: auto; white-space: pre-wrap; color: #ffd7bd; font-size: 13px; line-height: 1.55;">${message.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char])}</pre>
      </section>
    </main>
  `;
}

function bootstrap() {
  createRoot(document.getElementById("root")).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

try {
  bootstrap();
} catch (error) {
  console.error("Portfolio startup failed", error);
  renderStartupError(error);
}
