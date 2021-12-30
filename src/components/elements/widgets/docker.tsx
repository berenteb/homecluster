import { useContext, useEffect, useState } from "react";
import {
  SettingsContext,
  SettingsContextType,
} from "../../../utils/settings-context";
import { useInterval } from "../../../utils/use-interval";
import { Widget, WidgetDescription, WidgetText } from "../widget";
import {
  DockerContainersCategorized,
  getContainersByCategories,
  getDockerData,
} from "../../../utils/docker";
import { CheckCircle } from "@styled-icons/bootstrap/CheckCircle";
import { Cross } from "@styled-icons/icomoon/Cross";
import { Warning } from "@styled-icons/fluentui-system-filled/Warning";
import { colors } from "../../../theme/theme";

function DockerDataDisplay({
  dockerData,
}: {
  dockerData: DockerContainersCategorized;
}) {
  let Symbol = <CheckCircle fill={colors.green} />;
  if (dockerData.stopped.length > 0) {
    Symbol =
      dockerData.running.length === 0 ? (
        <Cross fill={colors.danger} />
      ) : (
        <Warning fill={colors.warning} />
      );
  }
  return (
    <>
      {Symbol}
      <WidgetDescription>
        {dockerData.running.length}/
        {dockerData.running.length + dockerData.stopped.length} tároló fut.
      </WidgetDescription>
    </>
  );
}

export function DockerWidget() {
  const [dockerData, setDockerData] = useState<DockerContainersCategorized>();
  const [error, setError] = useState<string | undefined>();
  const { dockerUrl } = useContext<SettingsContextType>(SettingsContext);
  const dockerApiCall = () => {
    if (dockerUrl === "") return;
    let url;
    try {
      url = new URL(dockerUrl);
    } catch (e) {
      return;
    }
    getDockerData({ url: url })
      .then((data) => {
        setDockerData(getContainersByCategories(data));
        setError(undefined);
      })
      .catch((error) => {
        setError(error.toString());
      });
  };
  // Interval for 10s and initial API call
  useInterval(() => {
    dockerApiCall();
  }, 10000);
  useEffect(() => {
    dockerApiCall();
  }, []);
  if (!dockerData || error) return null;
  return (
    <>
      <Widget>
        <DockerDataDisplay dockerData={dockerData} />
        <WidgetText>Docker</WidgetText>
      </Widget>
      {dockerData.stopped.length > 0 && (
        <Widget>
          <WidgetDescription>A következő tárolók nem futnak:</WidgetDescription>
          {dockerData.stopped.map((container) => (
            <WidgetDescription>{container.Image}</WidgetDescription>
          ))}
          <WidgetText>Docker</WidgetText>
        </Widget>
      )}
    </>
  );
}
