// PDF鑑定書生成コンポーネント
const { useRef: pdfUseRef, useEffect: pdfUseEffect } = React;

function PersonalReadingPDFContent({ reading }) {
  if (!reading) return null;

  return (
    <div id="pdf-content" style={{
      width: "794px",
      padding: "0",
      fontFamily: "'Noto Serif JP', 'Noto Sans JP', serif",
      color: "#ece4d2",
      backgroundColor: "#14082e",
      position: "absolute",
      left: "-9999px",
      top: "0",
    }}>
      {/* ── 表紙ページ ── */}
      <div className="pdf-page pdf-cover" style={{
        width: "794px",
        minHeight: "1123px",
        backgroundColor: "#1a0e38",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "80px 60px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* 装飾ボーダー */}
        <div style={{
          position: "absolute",
          inset: "20px",
          border: "1px solid rgba(212,175,55,0.3)",
          borderRadius: "4px",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute",
          inset: "28px",
          border: "0.5px solid rgba(212,175,55,0.15)",
          borderRadius: "2px",
          pointerEvents: "none",
        }} />

        {/* 上部装飾 */}
        <svg viewBox="0 0 200 200" width="120" height="120" style={{ marginBottom: "40px", opacity: 0.8 }}>
          <circle cx="100" cy="100" r="80" fill="none" stroke="#d4af37" strokeWidth="0.8" opacity="0.6" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="#d4af37" strokeWidth="0.5" opacity="0.4" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return <line key={i} x1={100 + Math.cos(a) * 62} y1={100 + Math.sin(a) * 62} x2={100 + Math.cos(a) * 80} y2={100 + Math.sin(a) * 80} stroke="#d4af37" strokeWidth="0.6" opacity="0.5" />;
          })}
          <circle cx="100" cy="100" r="12" fill="#d4af37" opacity="0.8" />
          <circle cx="100" cy="100" r="28" fill="none" stroke="#d4af37" strokeWidth="0.5" />
          {Array.from({ length: 8 }).map((_, i) => {
            const a = (i / 8) * Math.PI * 2;
            return <circle key={i} cx={100 + Math.cos(a) * 80} cy={100 + Math.sin(a) * 80} r="2" fill="#d4af37" opacity="0.7" />;
          })}
        </svg>

        <div style={{ fontSize: "14px", letterSpacing: "0.5em", color: "#d4af37", marginBottom: "16px", fontStyle: "italic" }}>
          MOONLIT TAROT
        </div>
        <h1 style={{ fontSize: "42px", color: "#f0d57a", margin: "0 0 8px", letterSpacing: "0.2em", fontWeight: "500" }}>
          月夜のタロット
        </h1>
        <div style={{
          width: "200px",
          height: "1px",
          backgroundColor: "rgba(212,175,55,0.4)",
          margin: "24px auto",
        }} />
        <div style={{ fontSize: "18px", letterSpacing: "0.15em", color: "#f0d57a", marginBottom: "8px" }}>
          パーソナル鑑定書
        </div>
        <div style={{ fontSize: "13px", letterSpacing: "0.3em", color: "rgba(212,175,55,0.7)", fontStyle: "italic", marginBottom: "60px" }}>
          Personal Reading
        </div>

        <div style={{ fontSize: "24px", color: "#f0d57a", letterSpacing: "0.15em", marginBottom: "12px" }}>
          {reading.customerName} 様
        </div>
        {reading.zodiac && (
          <div style={{ fontSize: "15px", color: "rgba(236,228,210,0.7)", marginBottom: "8px" }}>
            {reading.zodiac.symbol} {reading.zodiac.name}
          </div>
        )}
        <div style={{ fontSize: "16px", color: "#d4af37", letterSpacing: "0.1em", marginBottom: "40px" }}>
          {reading.theme}
        </div>
        <div style={{ fontSize: "12px", color: "rgba(236,228,210,0.5)", letterSpacing: "0.15em" }}>
          {reading.date}
        </div>

        {/* 下部装飾 */}
        <div style={{
          position: "absolute",
          bottom: "50px",
          display: "flex",
          gap: "30px",
          justifyContent: "center",
        }}>
          {reading.cards.map((c, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                width: "80px",
                height: "128px",
                border: "1px solid rgba(212,175,55,0.4)",
                borderRadius: "6px",
                backgroundColor: "rgba(30,15,60,0.7)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "8px",
              }}>
                <div style={{ fontSize: "11px", color: "#d4af37", letterSpacing: "0.15em", marginBottom: "4px" }}>
                  {toRoman(c.card.n)}
                </div>
                <div style={{ fontSize: "14px", color: "#f0d57a" }}>{c.card.name}</div>
                {c.reversed && <div style={{ fontSize: "9px", color: "#c89b9b", marginTop: "4px" }}>逆位置</div>}
              </div>
              <div style={{ fontSize: "10px", color: "rgba(236,228,210,0.5)", letterSpacing: "0.2em" }}>
                {c.posLabel}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 鑑定内容ページ ── */}
      {reading.sections.map((section, idx) => (
        <div key={idx} className="pdf-page pdf-section" style={{
          width: "794px",
          backgroundColor: "#160a30",
          padding: "60px 70px",
          position: "relative",
          pageBreakBefore: idx > 0 ? "always" : "auto",
          minHeight: section.isLucky ? "auto" : "auto",
        }}>
          {/* 上部装飾ライン */}
          <div style={{
            position: "absolute",
            top: "20px",
            left: "40px",
            right: "40px",
            height: "0.5px",
            backgroundColor: "rgba(212,175,55,0.15)",
          }} />
          <div style={{
            position: "absolute",
            bottom: "20px",
            left: "40px",
            right: "40px",
            height: "0.5px",
            backgroundColor: "rgba(212,175,55,0.15)",
          }} />

          {/* セクションタイトル */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              marginBottom: "8px",
            }}>
              <div style={{ flex: "0 0 60px", height: "0.5px", backgroundColor: "rgba(212,175,55,0.4)" }} />
              <span style={{ fontSize: "10px", color: "#d4af37", letterSpacing: "0.4em", fontStyle: "italic" }}>
                {section.isLucky ? "LUCKY POINTS" : `SECTION ${String(idx + 1).padStart(2, "0")}`}
              </span>
              <div style={{ flex: "0 0 60px", height: "0.5px", backgroundColor: "rgba(212,175,55,0.4)" }} />
            </div>
            <h2 style={{ fontSize: "22px", color: "#f0d57a", margin: "0", letterSpacing: "0.1em", fontWeight: "500" }}>
              {section.title}
            </h2>
            {section.subtitle && (
              <div style={{ fontSize: "11px", color: "#d4af37", letterSpacing: "0.3em", fontStyle: "italic", marginTop: "4px" }}>
                {section.subtitle}
              </div>
            )}
          </div>

          {/* キーワードバッジ */}
          {section.keywords && (
            <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
              {section.keywords.map((kw, ki) => (
                <span key={ki} style={{
                  fontSize: "11px",
                  color: "rgba(236,228,210,0.8)",
                  background: "rgba(212,175,55,0.1)",
                  border: "0.5px solid rgba(212,175,55,0.3)",
                  padding: "4px 14px",
                  borderRadius: "999px",
                  letterSpacing: "0.08em",
                }}>
                  {kw}
                </span>
              ))}
            </div>
          )}

          {/* 本文 */}
          <div style={{
            fontSize: "14px",
            lineHeight: "2.2",
            color: "#ece4d2",
            whiteSpace: "pre-wrap",
            textAlign: "justify",
            letterSpacing: "0.03em",
            ...(section.isLucky ? {
              background: "rgba(212,175,55,0.05)",
              border: "0.5px solid rgba(212,175,55,0.2)",
              borderRadius: "12px",
              padding: "24px 32px",
              fontSize: "15px",
              lineHeight: "2.4",
            } : {}),
          }}>
            {section.body}
          </div>
        </div>
      ))}

      {/* ── 最終ページ：クロージング ── */}
      <div className="pdf-page pdf-closing" style={{
        width: "794px",
        minHeight: "400px",
        backgroundColor: "#1a0e38",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "60px",
        position: "relative",
        pageBreakBefore: "always",
      }}>
        <div style={{
          position: "absolute",
          inset: "20px",
          border: "0.5px solid rgba(212,175,55,0.2)",
          borderRadius: "4px",
          pointerEvents: "none",
        }} />
        <svg viewBox="0 0 100 100" width="60" height="60" style={{ marginBottom: "24px", opacity: 0.6 }}>
          <circle cx="50" cy="50" r="40" fill="none" stroke="#d4af37" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="8" fill="#d4af37" opacity="0.6" />
        </svg>
        <div style={{ fontSize: "13px", color: "rgba(236,228,210,0.5)", letterSpacing: "0.15em", marginBottom: "16px" }}>
          この鑑定書は {reading.customerName} 様のために
        </div>
        <div style={{ fontSize: "13px", color: "rgba(236,228,210,0.5)", letterSpacing: "0.15em", marginBottom: "24px" }}>
          月夜のタロットが心を込めてお届けしました
        </div>
        <div style={{
          width: "120px",
          height: "0.5px",
          backgroundColor: "rgba(212,175,55,0.4)",
          marginBottom: "24px",
        }} />
        <div style={{ fontSize: "11px", color: "rgba(212,175,55,0.5)", letterSpacing: "0.4em", fontStyle: "italic" }}>
          MOONLIT TAROT
        </div>
        <div style={{ fontSize: "11px", color: "rgba(236,228,210,0.3)", marginTop: "12px" }}>
          {reading.date}
        </div>
      </div>
    </div>
  );
}

async function exportPDF(customerName) {
  const src = document.getElementById("pdf-content");
  if (!src) { alert("鑑定内容が見つかりません"); return; }

  const loadingDiv = document.createElement("div");
  loadingDiv.id = "pdf-loading";
  loadingDiv.style.cssText = "position:fixed;inset:0;background:rgba(10,4,24,0.85);display:flex;align-items:center;justify-content:center;z-index:9999;flex-direction:column;gap:16px;";
  loadingDiv.innerHTML = `<div style="color:#f0d57a;font-size:18px;font-family:'Noto Serif JP',serif;letter-spacing:0.15em;">鑑定書を生成しています…</div><div style="color:rgba(236,228,210,0.5);font-size:13px;font-style:italic;">Generating your personal reading…</div>`;
  document.body.appendChild(loadingDiv);

  const PAGE_W = 794;
  const PAGE_H = 1123;

  try {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: "px", format: [PAGE_W, PAGE_H], orientation: "portrait" });

    const pages = src.querySelectorAll(".pdf-page");
    const wrapper = document.createElement("div");
    wrapper.style.cssText = "position:absolute;left:0;top:0;z-index:9998;background:#0a0418;";
    document.body.appendChild(wrapper);
    window.scrollTo(0, 0);

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const clone = page.cloneNode(true);
      clone.style.position = "relative";
      clone.style.left = "0";
      clone.style.top = "0";
      clone.style.pageBreakBefore = "auto";
      wrapper.innerHTML = "";
      wrapper.appendChild(clone);

      await new Promise(r => setTimeout(r, 200));

      const canvas = await html2canvas(wrapper, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0a0418",
        logging: false,
        width: PAGE_W,
        windowWidth: PAGE_W,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const imgH = (canvas.height / canvas.width) * PAGE_W;

      if (i > 0) pdf.addPage([PAGE_W, Math.max(imgH, PAGE_H)]);
      else if (imgH > PAGE_H) {
        pdf.deletePage(1);
        pdf.addPage([PAGE_W, imgH]);
      }
      pdf.addImage(imgData, "JPEG", 0, 0, PAGE_W, imgH);
    }

    wrapper.remove();

    pdf.save(`月夜のタロット_鑑定書_${customerName || "reading"}.pdf`);
  } catch (e) {
    console.error("PDF generation error:", e);
    alert("PDF生成に失敗しました。もう一度お試しください。");
  } finally {
    document.getElementById("pdf-loading")?.remove();
  }
}

window.PersonalReadingPDFContent = PersonalReadingPDFContent;
window.exportPDF = exportPDF;
