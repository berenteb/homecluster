import { useEffect, useState } from "react";
import { useSettingsContext } from "./settings-context";
import axios from "axios";
import { useInterval } from "./use-interval";

export const useDocker = () => {
  const [dockerData, setDockerData] = useState<DockerContainersCategorized>();
  const [error, setError] = useState<string>();
  const { dockerUrl } = useSettingsContext();

  const apiCall = () => {
    if (!dockerUrl) return;
    const url = new URL(dockerUrl);
    url.searchParams.set("all", "true");
    axios
      .get<DockerContainer[]>(url.toString())
      .then((response) => {
        setError(undefined);
        setDockerData(getContainersByCategories(response.data));
      })
      .catch((err) => setError(err));
  };

  useEffect(apiCall, []);
  useInterval(apiCall, 10000);

  return { dockerData, error };
};

export function getContainersByCategories(containers: DockerContainer[]) {
  let result: DockerContainersCategorized = {
    running: [],
    stopped: [],
  };
  containers.forEach((container) => {
    if (container.State === "running") {
      result.running.push(container);
    } else {
      result.stopped.push(container);
    }
  });
  return result;
}

export interface DockerContainersCategorized {
  running: DockerContainer[];
  stopped: DockerContainer[];
}

export interface DockerContainer {
  Id: string;
  Names?: string[] | null;
  Image: string;
  ImageID: string;
  Command: string;
  Created: number;
  Ports?: (PortsEntity | null)[] | null;
  Labels: Labels;
  State: string;
  Status: string;
  HostConfig: HostConfig;
  NetworkSettings: NetworkSettings;
  Mounts?: unknown[] | null;
}
export interface PortsEntity {
  IP: string;
  PrivatePort: number;
  PublicPort: number;
  Type: string;
}
export interface Labels {
  "com.docker.compose.config-hash": string;
  "com.docker.compose.container-number": string;
  "com.docker.compose.oneoff": string;
  "com.docker.compose.project": string;
  "com.docker.compose.project.config_files": string;
  "com.docker.compose.project.working_dir": string;
  "com.docker.compose.service": string;
  "com.docker.compose.version": string;
  maintainer?: string | null;
}
export interface HostConfig {
  NetworkMode: string;
}
export interface NetworkSettings {
  Networks: Record<string, NetworkInterface>;
}
export interface NetworkInterface {
  IPAMConfig?: unknown;
  Links?: unknown;
  Aliases?: unknown;
  NetworkID: string;
  EndpointID: string;
  Gateway: string;
  IPAddress: string;
  IPPrefixLen: number;
  IPv6Gateway: string;
  GlobalIPv6Address: string;
  GlobalIPv6PrefixLen: number;
  MacAddress: string;
  DriverOpts?: unknown;
}
