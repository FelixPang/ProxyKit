// Surge Panel: FIFA World Cup Schedule
// Data source: ESPN fifa.world scoreboard. No API key required.

var BEIJING_OFFSET_MS = 8 * 60 * 60 * 1000;
var ESPN_LEAGUE = 'fifa.world';

var TEAM_DATA = {
  ALB: team('阿尔巴尼亚', 'AL', ['Albania']),
  ALG: team('阿尔及利亚', 'DZ', ['Algeria']),
  ANG: team('安哥拉', 'AO', ['Angola']),
  ARG: team('阿根廷', 'AR', ['Argentina']),
  AUS: team('澳大利亚', 'AU', ['Australia']),
  AUT: team('奥地利', 'AT', ['Austria']),
  BEL: team('比利时', 'BE', ['Belgium']),
  BEN: team('贝宁', 'BJ', ['Benin']),
  BFA: team('布基纳法索', 'BF', ['Burkina Faso']),
  BIH: team('波黑', 'BA', ['Bosnia and Herzegovina', 'Bosnia-Herzegovina']),
  BOL: team('玻利维亚', 'BO', ['Bolivia']),
  BRA: team('巴西', 'BR', ['Brazil']),
  BUL: team('保加利亚', 'BG', ['Bulgaria']),
  CAN: team('加拿大', 'CA', ['Canada']),
  CHI: team('智利', 'CL', ['Chile']),
  CHN: team('中国', 'CN', ['China PR', 'China']),
  CIV: team('科特迪瓦', 'CI', ["Cote d'Ivoire", "Côte d'Ivoire", 'Ivory Coast']),
  CMR: team('喀麦隆', 'CM', ['Cameroon']),
  COD: team('民主刚果', 'CD', ['Congo DR', 'DR Congo', 'Congo-Kinshasa']),
  COL: team('哥伦比亚', 'CO', ['Colombia']),
  CPV: team('佛得角', 'CV', ['Cape Verde', 'Cabo Verde']),
  CRC: team('哥斯达黎加', 'CR', ['Costa Rica']),
  CRO: team('克罗地亚', 'HR', ['Croatia']),
  CUW: team('库拉索', 'CW', ['Curaçao', 'Curacao']),
  CZE: team('捷克', 'CZ', ['Czechia', 'Czech Republic']),
  DEN: team('丹麦', 'DK', ['Denmark']),
  DOM: team('多米尼加', 'DO', ['Dominican Republic']),
  ECU: team('厄瓜多尔', 'EC', ['Ecuador']),
  EGY: team('埃及', 'EG', ['Egypt']),
  ENG: team('英格兰', 'GB', ['England']),
  ESP: team('西班牙', 'ES', ['Spain']),
  SLV: team('萨尔瓦多', 'SV', ['El Salvador']),
  FIN: team('芬兰', 'FI', ['Finland']),
  FRA: team('法国', 'FR', ['France']),
  GAB: team('加蓬', 'GA', ['Gabon']),
  GEO: team('格鲁吉亚', 'GE', ['Georgia']),
  GER: team('德国', 'DE', ['Germany']),
  GHA: team('加纳', 'GH', ['Ghana']),
  GRE: team('希腊', 'GR', ['Greece']),
  GUA: team('危地马拉', 'GT', ['Guatemala']),
  HAI: team('海地', 'HT', ['Haiti']),
  HON: team('洪都拉斯', 'HN', ['Honduras']),
  HUN: team('匈牙利', 'HU', ['Hungary']),
  IDN: team('印度尼西亚', 'ID', ['Indonesia']),
  IND: team('印度', 'IN', ['India']),
  IRN: team('伊朗', 'IR', ['Iran', 'IR Iran']),
  IRQ: team('伊拉克', 'IQ', ['Iraq']),
  ISL: team('冰岛', 'IS', ['Iceland']),
  ISR: team('以色列', 'IL', ['Israel']),
  ITA: team('意大利', 'IT', ['Italy']),
  JAM: team('牙买加', 'JM', ['Jamaica']),
  JOR: team('约旦', 'JO', ['Jordan']),
  JPN: team('日本', 'JP', ['Japan']),
  KOR: team('韩国', 'KR', ['Korea Republic', 'South Korea', 'Republic of Korea']),
  KSA: team('沙特阿拉伯', 'SA', ['Saudi Arabia']),
  KUW: team('科威特', 'KW', ['Kuwait']),
  MAR: team('摩洛哥', 'MA', ['Morocco']),
  MAS: team('马来西亚', 'MY', ['Malaysia']),
  MEX: team('墨西哥', 'MX', ['Mexico']),
  MKD: team('北马其顿', 'MK', ['North Macedonia', 'Macedonia FYR']),
  MLI: team('马里', 'ML', ['Mali']),
  MNE: team('黑山', 'ME', ['Montenegro']),
  NED: team('荷兰', 'NL', ['Netherlands', 'Holland']),
  NGA: team('尼日利亚', 'NG', ['Nigeria']),
  NIR: team('北爱尔兰', 'GB', ['Northern Ireland']),
  NOR: team('挪威', 'NO', ['Norway']),
  NZL: team('新西兰', 'NZ', ['New Zealand']),
  OMA: team('阿曼', 'OM', ['Oman']),
  PAN: team('巴拿马', 'PA', ['Panama']),
  PAR: team('巴拉圭', 'PY', ['Paraguay']),
  PER: team('秘鲁', 'PE', ['Peru']),
  POL: team('波兰', 'PL', ['Poland']),
  POR: team('葡萄牙', 'PT', ['Portugal']),
  PRK: team('朝鲜', 'KP', ['Korea DPR', 'North Korea']),
  QAT: team('卡塔尔', 'QA', ['Qatar']),
  ROU: team('罗马尼亚', 'RO', ['Romania']),
  RSA: team('南非', 'ZA', ['South Africa']),
  RUS: team('俄罗斯', 'RU', ['Russia']),
  SCO: team('苏格兰', 'GB', ['Scotland']),
  SEN: team('塞内加尔', 'SN', ['Senegal']),
  SRB: team('塞尔维亚', 'RS', ['Serbia']),
  SUR: team('苏里南', 'SR', ['Suriname']),
  SUI: team('瑞士', 'CH', ['Switzerland']),
  SVK: team('斯洛伐克', 'SK', ['Slovakia']),
  SVN: team('斯洛文尼亚', 'SI', ['Slovenia']),
  SWE: team('瑞典', 'SE', ['Sweden']),
  THA: team('泰国', 'TH', ['Thailand']),
  TRI: team('特立尼达和多巴哥', 'TT', ['Trinidad and Tobago']),
  TUN: team('突尼斯', 'TN', ['Tunisia']),
  TUR: team('土耳其', 'TR', ['Turkey', 'Türkiye']),
  UAE: team('阿联酋', 'AE', ['United Arab Emirates', 'UAE']),
  UKR: team('乌克兰', 'UA', ['Ukraine']),
  URU: team('乌拉圭', 'UY', ['Uruguay']),
  USA: team('美国', 'US', ['United States', 'USA', 'United States of America']),
  UZB: team('乌兹别克斯坦', 'UZ', ['Uzbekistan']),
  VEN: team('委内瑞拉', 'VE', ['Venezuela']),
  VIE: team('越南', 'VN', ['Vietnam']),
  WAL: team('威尔士', 'GB', ['Wales']),
};

var TEAM_BY_NAME = buildTeamNameIndex();
var now = new Date();
var url = buildEspnUrl(now);

$httpClient.get({ url: url, timeout: 20 }, function(error, response, body) {
  if (error) return finish('世界杯赛程', '数据请求失败：' + error, '#D70015');

  var statusCode = response && response.status ? response.status : 0;
  if (statusCode < 200 || statusCode >= 300) {
    return finish('世界杯赛程', '数据请求失败：HTTP ' + statusCode, '#D70015');
  }

  try {
    var raw = JSON.parse(body || '{}');
    var matches = normalizeMatches(raw, now);
    var days = buildDays(matches, now);
    finish('世界杯赛程', panelContent(days), hasLiveMatch(matches) ? '#D70015' : '#D4A017');
  } catch (e) {
    finish('世界杯赛程', '数据解析失败：' + e.message, '#D70015');
  }
});

function finish(title, content, color) {
  $done({
    title: title,
    content: content || '暂无赛程',
    icon: 'trophy.fill',
    'icon-color': color
  });
}

function panelContent(days) {
  var lines = [];

  for (var i = 0; i < days.length; i += 1) {
    var day = days[i];
    lines.push(day.title + ' ' + day.dateLabel + '  ' + day.matches.length + ' 场');

    if (!day.matches.length) {
      lines.push('暂无比赛');
    } else {
      for (var j = 0; j < day.matches.length && j < 4; j += 1) {
        lines.push(matchText(day.matches[j]));
      }
      if (day.matches.length > 4) lines.push('另有 ' + (day.matches.length - 4) + ' 场');
    }

    if (i < days.length - 1) lines.push('');
  }

  return lines.join('\n');
}

function hasLiveMatch(matches) {
  for (var i = 0; i < matches.length; i += 1) {
    if (matches[i].status === 'live') return true;
  }
  return false;
}

function matchText(match) {
  var status = matchStatusLine(match);
  return formatTime(match.kickoff) + '  ' + status + '  ' + matchLine(match);
}

function matchLine(match) {
  var score = scoreText(match);
  if (score && (match.status === 'finished' || match.status === 'live')) {
    return homeDisplay(match) + score + awayDisplay(match);
  }
  return homeDisplay(match) + 'vs' + awayDisplay(match);
}

function matchStatusLine(match) {
  if (match.status === 'finished') return '已结束';
  if (match.status === 'live') {
    if (!match.minute) return '进行中';
    return /^\d+$/.test(match.minute) ? "进行中 " + match.minute + "'" : '进行中 ' + match.minute;
  }
  if (match.status === 'other') return '待定';
  return '未开赛';
}

function scoreText(match) {
  if (match.homeScore == null || match.awayScore == null) return '';
  return match.homeScore + '-' + match.awayScore;
}

function homeDisplay(match) {
  return match.home + (match.homeFlag ? match.homeFlag : '');
}

function awayDisplay(match) {
  return (match.awayFlag ? match.awayFlag : '') + match.away;
}

function normalizeMatches(raw, current) {
  var list = raw && raw.events && raw.events.length ? raw.events : [];
  var matches = [];

  for (var i = 0; i < list.length; i += 1) {
    var item = normalizeOne(list[i], current);
    if (item && item.kickoff && item.home && item.away) matches.push(item);
  }

  matches.sort(function(a, b) {
    return a.kickoff.getTime() - b.kickoff.getTime();
  });
  return matches;
}

function normalizeOne(item, current) {
  var homeCompetitor = findCompetitor(item, 'home');
  var awayCompetitor = findCompetitor(item, 'away');
  var kickoff = toDate(item.date);
  if (!kickoff) return null;

  var homeTeam = normalizeTeam(homeCompetitor);
  var awayTeam = normalizeTeam(awayCompetitor);
  var statusValue = get(item, 'status.type.state') || get(item, 'status.type.name') || get(item, 'status.type.description');
  var minute = get(item, 'status.displayClock') || get(item, 'status.type.detail') || get(item, 'status.type.shortDetail');

  return {
    kickoff: kickoff,
    home: homeTeam.name,
    homeFlag: homeTeam.flag,
    away: awayTeam.name,
    awayFlag: awayTeam.flag,
    status: normalizeStatus(statusValue, kickoff, current),
    minute: cleanMinute(minute),
    homeScore: toScore(homeCompetitor && homeCompetitor.score),
    awayScore: toScore(awayCompetitor && awayCompetitor.score)
  };
}

function findCompetitor(item, homeAway) {
  var competitors = get(item, 'competitions.0.competitors');
  if (!competitors || !competitors.length) return null;

  for (var i = 0; i < competitors.length; i += 1) {
    if (String(competitors[i].homeAway || '').toLowerCase() === homeAway) return competitors[i];
  }
  return null;
}

function normalizeStatus(value, kickoff, current) {
  var raw = String(value || '').toLowerCase();
  var compact = raw.replace(/[\s_-]+/g, '');

  if (compact === 'pre' || compact === 'scheduled') return 'scheduled';
  if (compact === 'in' || compact.indexOf('progress') >= 0 || compact.indexOf('half') >= 0) return 'live';
  if (compact === 'post' || compact.indexOf('fulltime') >= 0 || compact.indexOf('finished') >= 0) return 'finished';

  var elapsed = current.getTime() - kickoff.getTime();
  if (elapsed >= 0 && elapsed <= 135 * 60 * 1000) return 'live';
  if (elapsed > 135 * 60 * 1000) return 'finished';
  return 'scheduled';
}

function buildDays(matches, current) {
  var configs = [
    buildDayConfig(current, -1, '昨天'),
    buildDayConfig(current, 0, '今天'),
    buildDayConfig(current, 1, '明天')
  ];
  var result = [];

  for (var i = 0; i < configs.length; i += 1) {
    var day = configs[i];
    var dayMatches = [];
    for (var j = 0; j < matches.length; j += 1) {
      if (dayKey(matches[j].kickoff) === day.key) dayMatches.push(matches[j]);
    }
    result.push({
      title: day.title,
      dateLabel: day.dateLabel,
      matches: dayMatches
    });
  }

  return result;
}

function buildDayConfig(current, offset, title) {
  var date = addDays(current, offset);
  return {
    key: dayKey(date),
    title: title,
    dateLabel: formatDay(date)
  };
}

function buildEspnUrl(current) {
  var from = addDays(current, -2);
  var to = addDays(current, 1);
  return 'https://site.api.espn.com/apis/site/v2/sports/soccer/' + ESPN_LEAGUE + '/scoreboard?limit=500&dates=' + compactDay(from) + '-' + compactDay(to);
}

function normalizeTeam(value) {
  var rawName = rawTeamName(value);
  var code = rawTeamCode(value);
  var byCode = code ? TEAM_DATA[String(code).toUpperCase()] : null;
  var byName = rawName ? TEAM_BY_NAME[normalizeLookup(rawName)] : null;
  var info = byCode || byName;
  return {
    name: info ? info.name : rawName,
    flag: info ? info.flag : ''
  };
}

function rawTeamName(value) {
  return get(value, 'team.displayName') || get(value, 'team.shortDisplayName') || get(value, 'team.name') || '';
}

function rawTeamCode(value) {
  return get(value, 'team.abbreviation') || get(value, 'team.country') || '';
}

function get(obj, path) {
  var parts = String(path || '').split('.');
  var current = obj;
  for (var i = 0; i < parts.length; i += 1) {
    if (current == null) return undefined;
    current = /^\d+$/.test(parts[i]) ? current[Number(parts[i])] : current[parts[i]];
  }
  return current;
}

function cleanMinute(value) {
  if (!value || value === '0\'' || value === 'FT') return '';
  return String(value).replace(/'/g, '');
}

function toScore(value) {
  if (value === undefined || value === null || value === '') return null;
  var score = Number(value);
  return isFinite(score) ? score : null;
}

function toDate(value) {
  if (!value) return null;
  var date = new Date(value);
  return isNaN(date.getTime()) ? null : date;
}

function addDays(date, days) {
  var next = new Date(date.getTime());
  next.setDate(next.getDate() + days);
  return next;
}

function dayKey(date) {
  var beijing = new Date(date.getTime() + BEIJING_OFFSET_MS);
  return beijing.getUTCFullYear() + '-' + pad(beijing.getUTCMonth() + 1) + '-' + pad(beijing.getUTCDate());
}

function compactDay(date) {
  var beijing = new Date(date.getTime() + BEIJING_OFFSET_MS);
  return '' + beijing.getUTCFullYear() + pad(beijing.getUTCMonth() + 1) + pad(beijing.getUTCDate());
}

function formatDay(date) {
  var beijing = new Date(date.getTime() + BEIJING_OFFSET_MS);
  return pad(beijing.getUTCMonth() + 1) + '/' + pad(beijing.getUTCDate());
}

function formatTime(date) {
  var beijing = new Date(date.getTime() + BEIJING_OFFSET_MS);
  return pad(beijing.getUTCHours()) + ':' + pad(beijing.getUTCMinutes());
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function team(cnName, alpha2, aliases) {
  return {
    name: cnName,
    flag: flagEmoji(alpha2),
    aliases: aliases || []
  };
}

function buildTeamNameIndex() {
  var index = {};
  var codes = Object.keys(TEAM_DATA);
  for (var i = 0; i < codes.length; i += 1) {
    var code = codes[i];
    var item = TEAM_DATA[code];
    index[normalizeLookup(code)] = item;
    index[normalizeLookup(item.name)] = item;
    for (var j = 0; j < item.aliases.length; j += 1) {
      index[normalizeLookup(item.aliases[j])] = item;
    }
  }
  return index;
}

function normalizeLookup(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, ' ')
    .trim();
}

function flagEmoji(alpha2) {
  var code = String(alpha2 || '').toUpperCase();
  if (!/^[A-Z]{2}$/.test(code)) return '';
  return String.fromCodePoint(
    0x1F1E6 + code.charCodeAt(0) - 65,
    0x1F1E6 + code.charCodeAt(1) - 65
  );
}
