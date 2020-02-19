/**
 * 模块：      工具类
 * 说明：      日期格式化、按照不同的时区显示日期
 * 开发人：    LiSuwan
 * 日期：      2018-05-16
 */

var HEMISPHERE_SOUTH = 's'
var consts = {
  DAY: 86400000,
  HOUR: 3600000,
  MINUTE: 60000,
  SECOND: 1000,
  BASELINE_YEAR: 2014,
  MAX_SCORE: 864000000, // 10 days
  AMBIGUITIES: {
    'America/Denver': ['America/Mazatlan'],
    'Europe/London': ['Africa/Casablanca'],
    'America/Chicago': ['America/Mexico_City'],
    'America/Asuncion': ['America/Campo_Grande', 'America/Santiago'],
    'America/Montevideo': ['America/Sao_Paulo', 'America/Santiago'],
    // Europe/Minsk should not be in this list... but Windows.
    'Asia/Beirut': ['Asia/Amman', 'Asia/Jerusalem', 'Europe/Helsinki', 'Asia/Damascus', 'Africa/Cairo', 'Asia/Gaza', 'Europe/Minsk'],
    'Pacific/Auckland': ['Pacific/Fiji'],
    'America/Los_Angeles': ['America/Santa_Isabel'],
    'America/New_York': ['America/Havana'],
    'America/Halifax': ['America/Goose_Bay'],
    'America/Godthab': ['America/Miquelon'],
    'Asia/Dubai': ['Asia/Yerevan'],
    'Asia/Jakarta': ['Asia/Krasnoyarsk'],
    'Asia/Shanghai': ['Asia/Irkutsk', 'Australia/Perth'],
    'Australia/Sydney': ['Australia/Lord_Howe'],
    'Asia/Tokyo': ['Asia/Yakutsk'],
    'Asia/Dhaka': ['Asia/Omsk'],
    // In the real world Yerevan is not ambigous for Baku... but Windows.
    'Asia/Baku': ['Asia/Yerevan'],
    'Australia/Brisbane': ['Asia/Vladivostok'],
    'Pacific/Noumea': ['Asia/Vladivostok'],
    'Pacific/Majuro': ['Asia/Kamchatka', 'Pacific/Fiji'],
    'Pacific/Tongatapu': ['Pacific/Apia'],
    'Asia/Baghdad': ['Europe/Minsk', 'Europe/Moscow'],
    'Asia/Karachi': ['Asia/Yekaterinburg'],
    'Africa/Johannesburg': ['Asia/Gaza', 'Africa/Cairo']
  }
}

/**
 * Gets the offset in minutes from UTC for a certain date.
 * @param {Date} date
 * @returns {Number}
 */
var getDateOffset = function getDateOffset (date) {
  var offset = -date.getTimezoneOffset()
  return (offset !== null ? offset : 0)
}

/**
     * This function does some basic calculations to create information about
     * the user's timezone. It uses REFERENCE_YEAR as a solid year for which
     * the script has been tested rather than depend on the year set by the
     * client device.
     *
     * Returns a key that can be used to do lookups in jstz.olson.timezones.
     * eg: "720,1,2".
     *
     * @returns {String}
     */
var lookupKey = function lookupKey () {
  var januaryOffset = getDateOffset(new Date(consts.BASELINE_YEAR, 0, 2))
  var juneOffset = getDateOffset(new Date(consts.BASELINE_YEAR, 5, 2))
  var diff = januaryOffset - juneOffset

  if (diff < 0) {
    return januaryOffset + ',1'
  } else if (diff > 0) {
    return juneOffset + ',1,' + HEMISPHERE_SOUTH
  }

  return januaryOffset + ',0'
}
/**
 * Tries to get the time zone key directly from the operating system for those
 * environments that support the ECMAScript Internationalization API.
 */
var getFromInternationalizationApi = function getFromInternationalizationApi () {
  var format, timezone
  if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
    return
  }
  format = Intl.DateTimeFormat()
  if (typeof format === 'undefined' || typeof format.resolvedOptions === 'undefined') {
    return
  }
  timezone = format.resolvedOptions().timeZone
  if (timezone && (timezone.indexOf('/') > -1 || timezone === 'UTC') && timezone.indexOf('Etc') !== 0) {
    return timezone
  }
}

/**
 * Starting point for getting all the DST rules for a specific year
 * for the current timezone (as described by the client system).
 *
 * Returns an object with start and end attributes, or false if no
 * DST rules were found for the year.
 *
 * @param year
 * @returns {Object} || {Boolean}
 */
var dstDates = function dstDates (year) {
  var yearstart = new Date(year, 0, 1, 0, 0, 1, 0).getTime()
  var yearend = new Date(year, 12, 31, 23, 59, 59).getTime()
  var current = yearstart
  var offset = (new Date(current)).getTimezoneOffset()
  var dstStart = null
  var dstEnd = null

  while (current < yearend - 86400000) {
    var dateToCheck = new Date(current)
    var dateToCheckOffset = dateToCheck.getTimezoneOffset()

    if (dateToCheckOffset !== offset) {
      if (dateToCheckOffset < offset) {
        dstStart = dateToCheck
      }
      if (dateToCheckOffset > offset) {
        dstEnd = dateToCheck
      }
      offset = dateToCheckOffset
    }

    current += 86400000
  }

  if (dstStart && dstEnd) {
    return {
      s: findDstfold(dstStart).getTime(),
      e: findDstfold(dstEnd).getTime()
    }
  }

  return false
}

/**
     * Probably completely unnecessary function that recursively finds the
     * exact (to the second) time when a DST rule was changed.
     *
     * @param aDate - The candidate Date.
     * @param padding - integer specifying the padding to allow around the candidate
     *                  date for finding the fold.
     * @param iterator - integer specifying how many milliseconds to iterate while
     *                   searching for the fold.
     *
     * @returns {Date}
     */
var findDstfold = function findDstfold (aDate, padding, iterator) {
  if (typeof padding === 'undefined') {
    padding = consts.DAY
    iterator = consts.HOUR
  }

  var dateStart = new Date(aDate.getTime() - padding).getTime()
  var dateEnd = aDate.getTime() + padding
  var offset = new Date(dateStart).getTimezoneOffset()

  var current = dateStart

  var dstChange = null
  while (current < dateEnd - iterator) {
    var dateToCheck = new Date(current)
    var dateToCheckOffset = dateToCheck.getTimezoneOffset()

    if (dateToCheckOffset !== offset) {
      dstChange = dateToCheck
      break
    }
    current += iterator
  }

  if (padding === consts.DAY) {
    return findDstfold(dstChange, consts.HOUR, consts.MINUTE)
  }

  if (padding === consts.HOUR) {
    return findDstfold(dstChange, consts.MINUTE, consts.SECOND)
  }

  return dstChange
}

var windows7Adaptations = function windows7Adaptions (ruleList, preliminaryTimezone, score, sample) {
  if (score !== 'N/A') {
    return score
  }
  if (preliminaryTimezone === 'Asia/Beirut') {
    if (sample.name === 'Africa/Cairo') {
      if (ruleList[6].s === 1398376800000 && ruleList[6].e === 1411678800000) {
        return 0
      }
    }
    if (sample.name === 'Asia/Jerusalem') {
      if (ruleList[6].s === 1395964800000 && ruleList[6].e === 1411858800000) {
        return 0
      }
    }
  } else if (preliminaryTimezone === 'America/Santiago') {
    if (sample.name === 'America/Asuncion') {
      if (ruleList[6].s === 1412481600000 && ruleList[6].e === 1397358000000) {
        return 0
      }
    }
    if (sample.name === 'America/Campo_Grande') {
      if (ruleList[6].s === 1413691200000 && ruleList[6].e === 1392519600000) {
        return 0
      }
    }
  } else if (preliminaryTimezone === 'America/Montevideo') {
    if (sample.name === 'America/Sao_Paulo') {
      if (ruleList[6].s === 1413687600000 && ruleList[6].e === 1392516000000) {
        return 0
      }
    }
  } else if (preliminaryTimezone === 'Pacific/Auckland') {
    if (sample.name === 'Pacific/Fiji') {
      if (ruleList[6].s === 1414245600000 && ruleList[6].e === 1396101600000) {
        return 0
      }
    }
  }

  return score
}

/**
     * Takes the DST rules for the current timezone, and proceeds to find matches
     * in the jstz.olson.dst_rules.zones array.
     *
     * Compares samples to the current timezone on a scoring basis.
     *
     * Candidates are ruled immediately if either the candidate or the current zone
     * has a DST rule where the other does not.
     *
     * Candidates are ruled out immediately if the current zone has a rule that is
     * outside the DST scope of the candidate.
     *
     * Candidates are included for scoring if the current zones rules fall within the
     * span of the samples rules.
     *
     * Low score is best, the score is calculated by summing up the differences in DST
     * rules and if the consts.MAX_SCORE is overreached the candidate is ruled out.
     *
     * Yah follow? :)
     *
     * @param ruleList
     * @param preliminaryTimezone
     * @returns {*}
     */
var bestDstMatch = function bestDstMatch (ruleList, preliminaryTimezone) {
  var scoreSample = function scoreSample (sample) {
    var score = 0

    for (var j = 0; j < ruleList.length; j++) {
      // Both sample and current time zone report DST during the year.
      if (!!sample.rules[j] && !!ruleList[j]) {
        // The current time zone's DST rules are inside the sample's. Include.
        if (ruleList[j].s >= sample.rules[j].s && ruleList[j].e <= sample.rules[j].e) {
          score = 0
          score += Math.abs(ruleList[j].s - sample.rules[j].s)
          score += Math.abs(sample.rules[j].e - ruleList[j].e)

          // The current time zone's DST rules are outside the sample's. Discard.
        } else {
          score = 'N/A'
          break
        }

        // The max score has been reached. Discard.
        if (score > consts.MAX_SCORE) {
          score = 'N/A'
          break
        }
      }
    }

    score = windows7Adaptations(ruleList, preliminaryTimezone, score, sample)

    return score
  }
  var scoreboard = {}
  var dstZones = jstz.olson.dst_rules.zones
  var dstZonesLength = dstZones.length
  var ambiguities = consts.AMBIGUITIES[preliminaryTimezone]

  for (var i = 0; i < dstZonesLength; i++) {
    var sample = dstZones[i]
    var score = scoreSample(dstZones[i])

    if (score !== 'N/A') {
      scoreboard[sample.name] = score
    }
  }

  for (var tz in scoreboard) {
    if (scoreboard.hasOwnProperty(tz)) {
      for (var j = 0; j < ambiguities.length; j++) {
        if (ambiguities[j] === tz) {
          return tz
        }
      }
    }
  }

  return preliminaryTimezone
}

/**
     * Takes the preliminaryTimezone as detected by lookupKey().
     *
     * Builds up the current timezones DST rules for the years defined
     * in the jstz.olson.dst_rules.years array.
     *
     * If there are no DST occurences for those years, immediately returns
     * the preliminary timezone. Otherwise proceeds and tries to solve
     * ambiguities.
     *
     * @param preliminaryTimezone
     * @returns {String} timezone_name
     */
var getByDst = function getByDst (preliminaryTimezone) {
  var getRules = function getRules () {
    var ruleList = []
    for (var i = 0; i < jstz.olson.dst_rules.years.length; i++) {
      var yearRules = dstDates(jstz.olson.dst_rules.years[i])
      ruleList.push(yearRules)
    }
    return ruleList
  }
  var checkHasDst = function checkHasDst (rules) {
    for (var i = 0; i < rules.length; i++) {
      if (rules[i] !== false) {
        return true
      }
    }
    return false
  }
  var rules = getRules()
  var hasDst = checkHasDst(rules)

  if (hasDst) {
    return bestDstMatch(rules, preliminaryTimezone)
  }

  return preliminaryTimezone
}

/**
     * Uses get_timezone_info() to formulate a key to use in the olson.timezones dictionary.
     *
     * Returns an object with one function ".name()"
     *
     * @returns Object
     */
var determine = function determine () {
  var preliminaryTz = getFromInternationalizationApi()

  if (!preliminaryTz) {
    preliminaryTz = jstz.olson.timezones[lookupKey()]

    if (typeof consts.AMBIGUITIES[preliminaryTz] !== 'undefined') {
      preliminaryTz = getByDst(preliminaryTz)
    }
  }

  return {
    name: function () {
      return preliminaryTz
    }
  }
}
var currentDetermine = function () {
  return window.localStorage.timeZone || determine().name()
}

var jstz = {}
jstz.olson = jstz.olson || {}

/**
 * The keys in this dictionary are comma separated as such:
 *
 * First the offset compared to UTC time in minutes.
 *
 * Then a flag which is 0 if the timezone does not take daylight savings into account and 1 if it
 * does.
 *
 * Thirdly an optional 's' signifies that the timezone is in the southern hemisphere,
 * only interesting for timezones with DST.
 *
 * The mapped arrays is used for constructing the jstz.TimeZone object from within
 * jstz.determine();
 */
jstz.olson.timezones = {
  '-720,0': 'Etc/GMT+12',
  '-660,0': 'Pacific/Pago_Pago',
  '-660,1,s': 'Pacific/Apia', // Why? Because windows... cry!
  '-600,1': 'America/Adak',
  '-600,0': 'Pacific/Honolulu',
  '-570,0': 'Pacific/Marquesas',
  '-540,0': 'Pacific/Gambier',
  '-540,1': 'America/Anchorage',
  '-480,1': 'America/Los_Angeles',
  '-480,0': 'Pacific/Pitcairn',
  '-420,0': 'America/Phoenix',
  '-420,1': 'America/Denver',
  '-360,0': 'America/Guatemala',
  '-360,1': 'America/Chicago',
  '-360,1,s': 'Pacific/Easter',
  '-300,0': 'America/Bogota',
  '-300,1': 'America/New_York',
  '-270,0': 'America/Caracas',
  '-240,1': 'America/Halifax',
  '-240,0': 'America/Santo_Domingo',
  '-240,1,s': 'America/Asuncion',
  '-210,1': 'America/St_Johns',
  '-180,1': 'America/Godthab',
  '-180,0': 'America/Argentina/Buenos_Aires',
  '-180,1,s': 'America/Montevideo',
  '-120,0': 'America/Noronha',
  '-120,1': 'America/Noronha',
  '-60,1': 'Atlantic/Azores',
  '-60,0': 'Atlantic/Cape_Verde',
  '0,0': 'UTC',
  '0,1': 'Europe/London',
  '60,1': 'Europe/Berlin',
  '60,0': 'Africa/Lagos',
  '60,1,s': 'Africa/Windhoek',
  '120,1': 'Asia/Beirut',
  '120,0': 'Africa/Johannesburg',
  '180,0': 'Asia/Baghdad',
  '180,1': 'Europe/Moscow',
  '210,1': 'Asia/Tehran',
  '240,0': 'Asia/Dubai',
  '240,1': 'Asia/Baku',
  '270,0': 'Asia/Kabul',
  '300,1': 'Asia/Yekaterinburg',
  '300,0': 'Asia/Karachi',
  '330,0': 'Asia/Kolkata',
  '345,0': 'Asia/Kathmandu',
  '360,0': 'Asia/Dhaka',
  '360,1': 'Asia/Omsk',
  '390,0': 'Asia/Rangoon',
  '420,1': 'Asia/Krasnoyarsk',
  '420,0': 'Asia/Jakarta',
  '480,0': 'Asia/Shanghai',
  '480,1': 'Asia/Irkutsk',
  '525,0': 'Australia/Eucla',
  '525,1,s': 'Australia/Eucla',
  '540,1': 'Asia/Yakutsk',
  '540,0': 'Asia/Tokyo',
  '570,0': 'Australia/Darwin',
  '570,1,s': 'Australia/Adelaide',
  '600,0': 'Australia/Brisbane',
  '600,1': 'Asia/Vladivostok',
  '600,1,s': 'Australia/Sydney',
  '630,1,s': 'Australia/Lord_Howe',
  '660,1': 'Asia/Kamchatka',
  '660,0': 'Pacific/Noumea',
  '690,0': 'Pacific/Norfolk',
  '720,1,s': 'Pacific/Auckland',
  '720,0': 'Pacific/Majuro',
  '765,1,s': 'Pacific/Chatham',
  '780,0': 'Pacific/Tongatapu',
  '780,1,s': 'Pacific/Apia',
  '840,0': 'Pacific/Kiritimati'
}

export default {
  determine: determine,
  currentDetermine: currentDetermine,
  setTimeZone: function (timeZone) {
    window.localStorage.timeZone = timeZone
    for (var a in jstz.olson.timezones) {
      if (jstz.olson.timezones[a] === timeZone) { window.localStorage.offtime = a.split(',')[0] }
    }
  },
  getOfftime: function () {
    if (!window.localStorage.offtime) {
      this.setTimeZone(currentDetermine())
    }
    return window.localStorage.offtime
  },
  getAllTimezone: function () {
    var list = []
    for (var a in jstz.olson.timezones) {
      list.push({ value: jstz.olson.timezones[a], text: jstz.olson.timezones[a] })
    }
    return list
  },
  /**
   * @Description: 时间戳转换成日期
   * @Author: LiSuwan
   * @param {Number} l:时间戳
   * @param {String} f:转换的日期格式，默认值是YYYY-MM-DD
   * @return:{String} 转换后的日期格式
   * @Date: 2019-04-17 10:08:38
   */
  formatL: function (l, f) {
    l *= 1
    var date = new Date()
    var offSet = date.getTimezoneOffset()// 偏移量 单位分钟 8时区为-480
    date.setTime(l)
    l = l + offSet * 60 * 1000 // 格林威治时间 = 本地时间 + 时差
    l = l + this.getOfftime() * 60 * 1000// 从格林威治时间转换成用户前端设置的时区.getOfftime 8时区为480
    date.setTime(l)
    if (!f) f = 'YYYY-MM-DD'
    return this.format(date, f)
  },
  /**
   * @Description: 把日期转换成时间戳
   * @Author: LiSuwan
   * @param {String} s：需要处理日期
   * @return:{Number} 转换后的时间戳
   * @Date: 2019-04-17 10:13:22
   */
  getTimeFromStr: function (s) {
    if (s && s.length <= 10) s = s + ' 00:00:00'
    var date = new Date(s)
    var l = date.getTime()// utc 时间
    var nowoffset = date.getTimezoneOffset()
    var standoffset = this.getOfftime()
    return l - nowoffset * 60000 - standoffset * 60000
  },
  /**
   * @Description: 把时间戳转换成日期
   * @Author: LiSuwan
   * @param {Number} d：需要处理时间戳
   * @param {String} f：处理的日期格式 默认值是YYYY-MM-DD HH:mm
   * @return:
   * @Date: 2019-04-17 10:15:25
   */
  formatD: function (d, f) {
    if (!f) f = 'YYYY-MM-DD HH:mm'
    return this.format(d, f)
  },
  /**
     * @Author      LiSuwan
     * @DateTime    2018-05-16
     * @description 格式化日期
     * @param       {Str}   date:日期
     * @param       {Str}   fmt:日期格式化方式
     * @return      {date}  fmt:返回格式化后的日期
     */
  format: function (date, fmt) {
    var time = new Date(date)
    var o = {
      'M+': time.getMonth() + 1, // 月份
      'D+': time.getDate(), // 日
      'H+': time.getHours(), // 小时
      'm+': time.getMinutes(), // 分
      's+': time.getSeconds(), // 秒
      'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
      'S': time.getMilliseconds() // 毫秒
    }

    if (/(Y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }

    return fmt
  },
  /**
     * @Author      LiSuwan
     * @DateTime    2018-07-25
     * @description 格式化日期
     * @param       {stt}   date:需要转换的日期字符串
     * @param       {number}type:0:年-月-日 1 年 2月 3 日
     * @return      {str}  str:返回格式化后的日期
     */
  formatSplitDate: function (date, type) {
    type = type || 0

    let year = ''; let month = ''; let day = ''; let str = ''

    if (date.length >= 4) { // 取4位数字表示的年
      year = date.slice(0, 4)
    }
    if (date.length === 5) { // 取2位数字标识的月份
      month = '0' + date.slice(4)
    } else if (date.length >= 6) {
      month = date.slice(4, 6)
    }

    if (date.length === 7) {
      day = '0' + date.slice(6)
    } else if (date.length >= 8) {
      day = date.slice(6, 8)
    }

    switch (type) {
      case 0:
        str = year + '-' + month + '-' + day
        break
      case 1:
        str = year
        break
      case 2:
        str = month
        break
      case 3:
        str = day
        break
    }

    return str
  }
}
