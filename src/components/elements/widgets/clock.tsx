import { useState } from "react";
import { useInterval } from "../../../utils/use-interval";
import { DataWrapper, Widget, WidgetSubText, WidgetText } from "../widget";
import { BiTime } from "react-icons/bi";

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
