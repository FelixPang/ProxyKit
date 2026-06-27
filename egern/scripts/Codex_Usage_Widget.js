/**
 * Codex usage widget for Egern
 *
 * Required env:
 *   CODEX_ACCESS_TOKEN: ChatGPT/Codex OAuth access token
 *
 * Optional env:
 *   CODEX_ACCOUNT_ID: ChatGPT account ID
 *   CODEX_USAGE_URL: Usage API URL
 *   TIME_ZONE: Reset-time zone. Default: Asia/Shanghai
 *   REFRESH_MINUTES: Refresh interval. Default: 15
 */

const DEFAULT_USAGE_URL = 'https://chatgpt.com/backend-api/wham/usage';
const CACHE_KEY = 'codex-usage-widget-cache-v1';
const CODEX_ICON = 'data:image/png;base64,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';

const CODEX_MARK = 'data:image/png;base64,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';

const LAYOUT_WIDTH = {
  medium: 340,
  small: 126
};

const COLORS = {
  background: { light: '#FFFFFF', dark: '#111113' },
  panel: { light: '#FFFFFF', dark: '#1C1C1E' },
  primary: { light: '#111318', dark: '#F7F8FA' },
  secondary: { light: '#68707C', dark: '#A8AFBA' },
  border: { light: '#E4E5E7', dark: '#353539' },
  divider: { light: '#E8E9EB', dark: '#303034' },
  track: { light: '#E4E5E7', dark: '#3A3A3E' },
  progress: { light: '#202124', dark: '#F2F2F7' },
  warning: { light: '#D65A00', dark: '#FF9F4A' },
  danger: { light: '#D70015', dark: '#FF453A' }
};

export default async function(ctx) {
  const env = ctx.env || {};
  const token = normalizeToken(env.CODEX_ACCESS_TOKEN);
  const accountId = String(env.CODEX_ACCOUNT_ID || '').trim();
  const usageUrl = String(env.CODEX_USAGE_URL || DEFAULT_USAGE_URL).trim();
  const timeZone = String(env.TIME_ZONE || 'Asia/Shanghai').trim();
  const refreshMinutes = clampNumber(env.REFRESH_MINUTES, 15, 5, 60);
  const family = ctx.widgetFamily || 'systemMedium';

  if (!token) {
    return renderError(
      family,
      '缺少 CODEX_ACCESS_TOKEN',
      '请在模块 Env 中配置 Codex 访问令牌'
    );
  }

  let usage;
  let cached = false;

  try {
    const payload = await fetchUsage(ctx, usageUrl, token, accountId);
    usage = parseUsage(payload);
    ctx.storage?.setJSON?.(CACHE_KEY, usage);
  } catch (error) {
    usage = ctx.storage?.getJSON?.(CACHE_KEY);
    cached = Boolean(usage);
    if (!usage) {
      return renderError(
        family,
        'Codex 用量获取失败',
        humanizeError(error)
      );
    }
  }

  const viewModel = {
    ...usage,
    cached,
    timeZone,
    updatedAt: new Date().toISOString(),
    refreshAfter: new Date(Date.now() + refreshMinutes * 60 * 1000).toISOString()
  };

  if (String(family).startsWith('accessory')) {
    return renderAccessory(viewModel, family);
  }
  if (family === 'systemSmall') return renderSmall(viewModel);
  return renderMedium(viewModel);
}

async function fetchUsage(ctx, url, token, accountId) {
  if (!ctx.http?.get) throw new Error('当前环境不支持 ctx.http.get');

  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
  };
  if (accountId) headers['ChatGPT-Account-Id'] = accountId;

  const response = await ctx.http.get(url, {
    headers,
    timeout: 10000,
    credentials: 'omit'
  });

  if (response?.status === 401 || response?.status === 403) {
    throw new Error('访问令牌无效或已过期');
  }
  if (response?.status && (response.status < 200 || response.status >= 300)) {
    throw new Error(`接口返回 HTTP ${response.status}`);
  }

  if (typeof response?.json === 'function') return await response.json();
  if (typeof response?.body === 'string') return JSON.parse(response.body);
  if (typeof response === 'string') return JSON.parse(response);
  throw new Error('接口响应格式异常');
}

function parseUsage(payload) {
  const root = payload?.rate_limit || payload?.rate_limits || payload?.codex?.rate_limit;
  if (!root || typeof root !== 'object') throw new Error('响应中没有 Codex 用量数据');

  const windows = collectWindows(root);
  const fiveHour = selectWindow(windows, 5 * 60 * 60, ['primary_window', 'primary']);
  const weekly = selectWindow(windows, 7 * 24 * 60 * 60, ['secondary_window', 'secondary']);

  if (!fiveHour || !weekly) throw new Error('无法识别 5 小时或一周用量窗口');

  return {
    plan: normalizePlan(payload?.plan_type || payload?.plan || payload?.subscription?.plan_type),
    fiveHour: normalizeWindow(fiveHour.value),
    weekly: normalizeWindow(weekly.value)
  };
}

function collectWindows(root) {
  const result = [];

  for (const [key, value] of Object.entries(root)) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) continue;
    if (hasUsageFields(value)) result.push({ key, value });
  }

  if (Array.isArray(root.windows)) {
    root.windows.forEach((value, index) => {
      if (value && typeof value === 'object') {
        result.push({ key: String(value.name || value.type || index), value });
      }
    });
  }

  return result;
}

function hasUsageFields(value) {
  return [
    value.used_percent,
    value.usedPercent,
    value.remaining_percent,
    value.remainingPercent,
    value.reset_at,
    value.resetAt
  ].some(item => item !== undefined && item !== null);
}

function selectWindow(windows, targetSeconds, preferredKeys) {
  for (const preferred of preferredKeys) {
    const exact = windows.find(window => window.key === preferred);
    if (exact) return exact;
  }

  const withDuration = windows
    .map(window => ({
      ...window,
      duration: numberOrNull(
        window.value.limit_window_seconds ??
        window.value.window_seconds ??
        window.value.limitWindowSeconds
      )
    }))
    .filter(window => window.duration !== null);

  if (!withDuration.length) return null;
  return withDuration.sort(
    (a, b) => Math.abs(a.duration - targetSeconds) - Math.abs(b.duration - targetSeconds)
  )[0];
}

function normalizeWindow(window) {
  const used = numberOrNull(window.used_percent ?? window.usedPercent);
  const remaining = numberOrNull(window.remaining_percent ?? window.remainingPercent);
  const remainingPercent = remaining === null
    ? clampNumber(100 - (used ?? 0), 0, 0, 100)
    : clampNumber(remaining, 0, 0, 100);

  return {
    remainingPercent: Math.round(remainingPercent),
    resetAt: normalizeResetTime(
      window.reset_at ??
      window.resetAt ??
      secondsFromNow(window.reset_after_seconds ?? window.resetAfterSeconds)
    )
  };
}

function normalizeResetTime(value) {
  if (value === null || value === undefined || value === '') return null;

  if (typeof value === 'number' || /^\d+(\.\d+)?$/.test(String(value))) {
    const numeric = Number(value);
    const milliseconds = numeric < 100000000000 ? numeric * 1000 : numeric;
    const date = new Date(milliseconds);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function secondsFromNow(value) {
  const seconds = numberOrNull(value);
  return seconds === null ? null : Date.now() + seconds * 1000;
}

function renderMedium(model) {
  return {
    type: 'widget',
    padding: 12,
    gap: 8,
    backgroundColor: COLORS.background,
    refreshAfter: model.refreshAfter,
    children: [
      createHeader(model, false),
      createUsageList(model, false)
    ]
  };
}

function renderSmall(model) {
  return {
    type: 'widget',
    padding: 14,
    gap: 9,
    backgroundColor: COLORS.background,
    refreshAfter: model.refreshAfter,
    children: [
      createHeader(model, true),
      createUsageList(model, true)
    ]
  };
}

function renderAccessory(model, family) {
  if (family === 'accessoryInline') {
    return {
      type: 'widget',
      refreshAfter: model.refreshAfter,
      children: [
        {
          type: 'text',
          text: `Codex ${model.plan} · 5小时 ${model.fiveHour.remainingPercent}% · 周 ${model.weekly.remainingPercent}%`
        }
      ]
    };
  }

  return {
    type: 'widget',
    padding: 6,
    gap: 2,
    refreshAfter: model.refreshAfter,
    children: [
      {
        type: 'text',
        text: `Codex ${model.plan}`,
        font: { size: 'caption1', weight: 'semibold' },
        maxLines: 1,
        minScale: 0.7
      },
      {
        type: 'text',
        text: `5小时 ${model.fiveHour.remainingPercent}%  ·  周 ${model.weekly.remainingPercent}%`,
        font: { size: 'caption2', weight: 'medium' },
        maxLines: 1,
        minScale: 0.65
      }
    ]
  };
}

function createHeader(model, compact) {
  return {
    type: 'stack',
    direction: 'row',
    alignItems: 'center',
    gap: 7,
    children: [
      {
        type: 'image',
        src: CODEX_MARK,
        width: compact ? 19 : 21,
        height: compact ? 19 : 21,
        resizeMode: 'contain'
      },
      {
        type: 'text',
        text: 'Codex剩余用量',
        font: { size: compact ? 12 : 13, weight: 'semibold' },
        textColor: COLORS.primary,
        maxLines: 1,
        minScale: 0.75
      },
      { type: 'spacer' },
      {
        type: 'text',
        text: model.cached ? `${model.plan} · 缓存` : model.plan,
        font: { size: compact ? 10 : 11, weight: 'medium' },
        textColor: model.cached ? COLORS.warning : COLORS.secondary,
        maxLines: 1
      }
    ]
  };
}

function createUsageList(model, compact) {
  const width = compact ? LAYOUT_WIDTH.small : LAYOUT_WIDTH.medium;

  return {
    type: 'stack',
    direction: 'column',
    alignItems: 'start',
    flex: 1,
    width,
    backgroundColor: COLORS.panel,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    children: [
      createLimitRow('5 小时使用限额', model.fiveHour, model.timeZone, 'time', compact, width),
      {
        type: 'stack',
        width,
        height: 1,
        backgroundColor: COLORS.divider,
        children: []
      },
      createLimitRow('每周使用限制', model.weekly, model.timeZone, 'date', compact, width)
    ]
  };
}

function createLimitRow(title, usage, timeZone, resetStyle, compact, width) {
  const remaining = usage.remainingPercent;

  if (compact) {
    return {
      type: 'stack',
      direction: 'column',
      alignItems: 'start',
      flex: 1,
      width,
      padding: [7, 9],
      gap: 4,
      children: [
        {
          type: 'stack',
          direction: 'row',
          alignItems: 'center',
          children: [
            {
              type: 'text',
              text: title,
              font: { size: 11, weight: 'semibold' },
              textColor: COLORS.primary,
              maxLines: 1,
              minScale: 0.8
            },
            { type: 'spacer' },
            {
              type: 'text',
              text: `剩余 ${remaining}%`,
              font: { size: 10, weight: 'medium' },
              textColor: quotaColor(remaining),
              maxLines: 1
            }
          ]
        },
        createProgressBar(remaining, 112, 5),
        {
          type: 'text',
          text: `重置时间：${formatReset(usage.resetAt, timeZone, resetStyle)}`,
          font: { size: 9 },
          textColor: COLORS.secondary,
          maxLines: 1,
          minScale: 0.75
        }
      ]
    };
  }

  return {
    type: 'stack',
    direction: 'row',
    alignItems: 'center',
    flex: 1,
    width,
    padding: [8, 11],
    children: [
      {
        type: 'stack',
        direction: 'column',
        alignItems: 'start',
        gap: 3,
        children: [
          {
            type: 'text',
            text: title,
            font: { size: 12, weight: 'semibold' },
            textColor: COLORS.primary,
            maxLines: 1
          },
          {
            type: 'text',
            text: `重置时间：${formatReset(usage.resetAt, timeZone, resetStyle)}`,
            font: { size: 10 },
            textColor: COLORS.secondary,
            maxLines: 1
          }
        ]
      },
      { type: 'spacer' },
      {
        type: 'stack',
        direction: 'row',
        alignItems: 'center',
        gap: 9,
        children: [
          createProgressBar(remaining, 92, 5),
          {
            type: 'stack',
            direction: 'row',
            width: 56,
            children: [
              { type: 'spacer' },
              {
                type: 'text',
                text: `剩余 ${remaining}%`,
                font: { size: 10, weight: 'medium' },
                textColor: quotaColor(remaining),
                maxLines: 1
              }
            ]
          }
        ]
      }
    ]
  };
}

function createProgressBar(percent, width, height) {
  const fillWidth = Math.max(3, Math.round(width * percent / 100));

  return {
    type: 'stack',
    width,
    height,
    backgroundColor: COLORS.track,
    borderRadius: 4,
    children: [
      {
        type: 'stack',
        width: fillWidth,
        height,
        backgroundColor: quotaColor(percent),
        borderRadius: 4,
        children: []
      },
      { type: 'spacer' }
    ]
  };
}

function renderError(family, title, detail) {
  const compact = family === 'systemSmall' || String(family).startsWith('accessory');

  return {
    type: 'widget',
    padding: compact ? 12 : 15,
    gap: 7,
    backgroundColor: COLORS.background,
    children: [
      {
        type: 'stack',
        direction: 'row',
        alignItems: 'center',
        gap: 7,
        children: [
          {
            type: 'image',
            src: 'sf-symbol:exclamationmark.triangle.fill',
            width: 17,
            height: 17,
            color: COLORS.danger
          },
          {
            type: 'text',
            text: title,
            font: { size: compact ? 13 : 16, weight: 'bold' },
            textColor: COLORS.primary,
            maxLines: 1,
            minScale: 0.7
          }
        ]
      },
      {
        type: 'text',
        text: detail,
        font: { size: compact ? 10 : 12 },
        textColor: COLORS.secondary,
        maxLines: compact ? 3 : 2,
        minScale: 0.75
      }
    ]
  };
}

function quotaColor(percent) {
  if (percent <= 10) return COLORS.danger;
  if (percent <= 25) return COLORS.warning;
  return COLORS.progress;
}

function formatReset(value, timeZone, style) {
  if (!value) return '未知';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '未知';

  try {
    const options = style === 'time'
      ? {
          timeZone,
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }
      : {
          timeZone,
          month: 'long',
          day: 'numeric'
        };
    return new Intl.DateTimeFormat('zh-CN', options).format(date);
  } catch {
    if (style === 'time') {
      return `${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
    }
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  }
}

function normalizePlan(value) {
  const plan = String(value || '未知').trim();
  const key = plan.toLowerCase().replace(/^chatgpt[\s_-]*/, '');
  const labels = {
    free: 'Free',
    plus: 'Plus',
    pro: 'Pro',
    team: 'Team',
    business: 'Business',
    enterprise: 'Enterprise',
    edu: 'Edu'
  };
  return labels[key] || plan;
}

function normalizeToken(value) {
  return String(value || '').trim().replace(/^Bearer\s+/i, '');
}

function numberOrNull(value) {
  if (value === null || value === undefined || value === '') return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function clampNumber(value, fallback, min, max) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, number));
}

function humanizeError(error) {
  const message = String(error?.message || error || '未知错误');
  return message.length > 72 ? `${message.slice(0, 72)}...` : message;
}

function pad2(value) {
  return String(value).padStart(2, '0');
}
