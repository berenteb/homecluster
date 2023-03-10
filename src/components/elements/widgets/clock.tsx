import { BiTime } from "react-icons/bi";

import { useState } from "react";
import { useInterval } from "../../../hooks/useInterval";
import { DataWrapper, Widget, WidgetSubText, WidgetText } from "../widget";

export function ClockWidget() {
  return (
    <Widget>
      <BiTime />
      <Clock />
    </Widget>
  );
}

export function Clock() {
  const [time, setTime] = useState<Date>(new Date());
  useInterval(() => {
    setTime(new Date());
  }, 1000);
  return (
    <DataWrapper>
      <WidgetText>{time.toLocaleTimeString()}</WidgetText>
      <WidgetSubText>{time.toLocaleDateString()}</WidgetSubText>
    </DataWrapper>
  );
}
