export function getDockerData({ url }: { url: URL }) {
  url.searchParams.set("all", "true");
  return new Promise<DockerContainer[]>(
    (resolve: (values: DockerContainer[]) => void, reject) => {
      fetch(url.toString())
        .then(async (response) => {
          if (response.status === 200) return response.json();
          reject(await response.text());
        })
        .then((data) => {
          resolve(data);
        })
        .catch((e) => {
          reject(e);
        });
    }
  );
}

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
