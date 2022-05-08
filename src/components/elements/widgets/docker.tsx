import { DataWrapper, Widget, WidgetSubText, WidgetText } from "../widget";
import { useDocker } from "../../../utils/docker";
import { FaCheckCircle, FaExclamationTriangle, FaTimes } from "react-icons/fa";
import { colors } from "../../../theme/theme";

export function DockerWidget() {
  const { dockerData, error } = useDocker();
  if (!dockerData || error) return null;
  let Symbol = <FaCheckCircle color={colors.green} />;
  if (dockerData.stopped.length > 0) {
    Symbol =
      dockerData.running.length === 0 ? (
        <FaTimes color={colors.danger} />
      ) : (
        <FaExclamationTriangle color={colors.warning} />
      );
  }
  return (
    <Widget>
      {Symbol}
      <DataWrapper>
        <WidgetText>
          {dockerData.running.length}/
          {dockerData.running.length + dockerData.stopped.length} tároló fut.
        </WidgetText>
        <WidgetSubText>Docker</WidgetSubText>
      </DataWrapper>
    </Widget>
  );
}
