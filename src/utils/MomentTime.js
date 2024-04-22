import moment from "moment";
import "moment-timezone";

const turnUTCintoShanghai = (utcTimeString) => {
  // 解析UTC时间
  const utcDate = moment.utc(utcTimeString).toDate();

  // 转换为上海时区
  const shanghaiDate = moment.tz(utcDate, "Asia/Shanghai");

  // 格式化为指定格式的字符串
  let shanghaiTime = shanghaiDate.format("YYYY-MM-DD");
  return shanghaiTime;
};

export default {
  turnUTCintoShanghai,
};
