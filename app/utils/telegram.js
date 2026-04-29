const axios = require("axios");

const TELEGRAM_API = "https://api.telegram.org";
const CONTENT_PREVIEW_LIMIT = 1000;

const formatDate = (yyyymmdd) => {
    if (!yyyymmdd) return "-";
    const s = String(yyyymmdd);
    if (s.length !== 8) return s;
    return `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`;
};

const truncate = (text, max) => {
    if (!text) return "";
    return text.length > max ? `${text.slice(0, max)}...` : text;
};

const buildMessage = (type, { name, phone, option, resdate, reqdate, text }) => {
    const body = truncate(text, CONTENT_PREVIEW_LIMIT);

    if (type === "create") {
        return [
            "🆕 신규 상담 접수 [법무법인 정곡]",
            "",
            `📌 분류: ${option || "-"}`,
            `👤 성명: ${name || "-"}`,
            `📞 연락처: ${phone || "-"}`,
            `📅 상담 희망일: ${formatDate(resdate)}`,
            `🕒 접수일: ${formatDate(reqdate)}`,
            "",
            "────────",
            body || "(내용 없음)",
            "────────",
        ].join("\n");
    }

    if (type === "update") {
        return [
            "🔄 상담 정보 변경 [법무법인 정곡]",
            "",
            `📌 분류: ${option || "-"}`,
            `👤 성명: ${name || "-"}`,
            `📞 연락처: ${phone || "-"}`,
            `📅 상담 희망일: ${formatDate(resdate)}`,
            "",
            "────────",
            body || "(내용 없음)",
            "────────",
        ].join("\n");
    }

    if (type === "cancel") {
        return [
            "❌ 상담 취소 [법무법인 정곡]",
            "",
            `👤 ${name || "-"} (${phone || "-"})`,
            `📌 분류: ${option || "-"}`,
            `📅 예정일: ${formatDate(resdate)}`,
        ].join("\n");
    }

    return "";
};

exports.sendReservationNotification = async (type, reservation) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        console.warn("[Telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set, skipping notification");
        return;
    }

    try {
        const text = buildMessage(type, {
            name: reservation.name,
            phone: reservation.phone,
            option: reservation.option,
            resdate: reservation.resdate,
            reqdate: reservation.reqdate,
            text: reservation.text,
        });

        if (!text) {
            console.warn("[Telegram] unknown notification type:", type);
            return;
        }

        await axios.post(`${TELEGRAM_API}/bot${token}/sendMessage`, {
            chat_id: chatId,
            text,
        });
    } catch (err) {
        const detail = err.response ? `${err.response.status} ${JSON.stringify(err.response.data)}` : err.message;
        console.error("[Telegram] notification error:", detail);
    }
};
