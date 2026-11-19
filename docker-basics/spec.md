# Docker 底層入門（spec）

> 目的：給「會打 `docker run`，但不知道底下發生什麼」的人。只講 Docker 本身。
> 貫穿全場的例子：`docker run --rm alpine true`，網路段落再加一個 `docker run -d -p 8080:80 --name web nginx`。

## 注意

- 手寫風格（rough.js 手繪圖、白底藍＋琥珀；見 skill 的「手寫風格」段落）
- 不要使用 icon
- 注意每一頁的高度不要超過螢幕高度
- 用繁體中文（技術名詞保留原文）

## 來源文件 / 參考連結

- Docker overview（架構、client / daemon / registry / image / container / namespaces）：<https://docs.docker.com/get-started/docker-overview/>
- Storage drivers（layer、writable layer、copy-on-write、overlay2）：<https://docs.docker.com/engine/storage/drivers/>
- Docker Engine security（namespaces、cgroups、daemon 需 root、capabilities）：<https://docs.docker.com/engine/security/>
- Seccomp security profiles（預設 allowlist，擋約 44 個 syscall）：<https://docs.docker.com/engine/security/seccomp/>
- Bridge network driver（docker0、iptables、port publishing）：<https://docs.docker.com/engine/network/drivers/bridge/>
- Linux post-install（docker group 等同 root）：<https://docs.docker.com/engine/install/linux-postinstall/>
- Docker Engine API：<https://docs.docker.com/reference/api/engine/>
- Docker contexts：<https://docs.docker.com/engine/manage-resources/contexts/>
- containerd：<https://containerd.io/> · runc：<https://github.com/opencontainers/runc>
- Linux man pages：namespaces(7)、cgroups(7)、clone(2)（`clone3`、`CLONE_INTO_CGROUP` 自 Linux 5.7）

## 摘要

### 1. 容器 vs VM

- VM：每台都有自己的 guest kernel，靠 hypervisor 模擬硬體，開機要秒級。
- 容器：**所有容器共用主機的 Linux kernel**，容器只是主機上的一個 process，被 kernel 隔離（namespaces）和限制（cgroups）。啟動就是 fork/exec 一個 process，毫秒級。
- 結論：**容器 = 被隔離、被限制的普通 Linux process**。因為依賴 Linux kernel，Mac / Windows 必須先有一台 Linux VM。

### 2. Image 與 Container

- Image：唯讀模板。Dockerfile 每一條指令產生一層 layer，每層只記錄和上一層的差異。
- Container：image 的可執行實例。建立時在最上面加一層**可寫 layer**；刪除容器時可寫 layer 也一起刪，image 不變。
- 多個容器共用同一份 image layers，各自有自己的可寫層。
- Copy-on-write：容器第一次改某個檔案時，overlay2 才把它從下層 `copy_up` 到可寫層。
- Registry（例如 Docker Hub）存放 image；`pull` / `push`。
- 要保留資料 → volume 或 bind mount。

### 3. Linux kernel 的四個機制

| 機制 | 做什麼 |
|---|---|
| namespaces | 隔離「看得到什麼」：pid、net、mnt、uts（hostname）、ipc、user、cgroup |
| cgroups | 限制「能用多少」：CPU、記憶體、IO、pids；也做資源統計 |
| seccomp | 限制「能呼叫哪些 syscall」：Docker 預設 allowlist，300 多個中擋約 44 個 |
| capabilities | 限制「root 能做哪些事」：把 root 權限拆開，預設只留必要的 |

- 建立 process 時用 `clone()` 帶 `CLONE_NEWPID | CLONE_NEWNET | ...` 等旗標開新的 namespaces；`clone3` 的 `CLONE_INTO_CGROUP`（Linux 5.7+）可在建立的同時放進指定 cgroup。
- 容器裡的程式看到自己是 PID 1，看不到主機上其他 process。
- 不用 Docker 也能做：`sudo unshare --pid --fork --mount-proc --uts sh` 後 `ps` 只看到自己。

#### `unshare` 指令拆解（依 man unshare(1)、pid_namespaces(7)、uts_namespaces(7)）

| 零件 | 意思 | 沒有它會怎樣 |
|---|---|---|
| `sudo` | superuser do，用 root 執行；建立 namespace 需要 CAP_SYS_ADMIN | `Operation not permitted` |
| `unshare` | un-share，不再共用：把指定的 namespaces 換成新的，再執行後面的程式 | — |
| `--pid` | 新的 PID namespace，裡面從 PID 1 開始編號 | 看得到主機所有 process |
| `--fork` | 先 fork 子 process 再執行程式。呼叫者不會搬進新的 PID namespace，它之後的第一個子 process 才是 PID 1 | sh 不是 PID 1；第一個子 process 結束後再 fork 會 ENOMEM |
| `--mount-proc` | 執行前在 /proc 掛載新的 proc 檔案系統；隱含開新的 mount namespace，不影響主機 | ps 讀到主機的 /proc，列出主機全部 process |
| `--uts` | UTS（UNIX Time-Sharing，名稱來自 uname 的 utsname 結構）namespace，隔離 hostname 和 NIS domain name | 在裡面改 hostname，主機也跟著改 |
| `sh` | 要執行的程式；省略時執行 `$SHELL` | — |

### 4. Docker 的分層架構（一個 `docker run` 穿過幾層）

```
docker CLI ──HTTP over /var/run/docker.sock (Engine API)──► dockerd
dockerd ──gRPC──► containerd ──► containerd-shim-runc-v2 ──► runc ──clone──► container
```

| 元件 | 角色 |
|---|---|
| `docker` CLI | client。把指令翻成 Engine API（REST）請求 |
| `dockerd` | daemon。管 image、container、network、volume，實作 Engine API |
| `containerd` | 容器生命週期管理（拉 image、快照、啟停） |
| `containerd-shim` | 每個容器一支。當容器的 parent，保留 stdio、收 exit code；daemon 重啟也不影響容器 |
| `runc` | OCI runtime。真正呼叫 clone / 設 cgroup / seccomp / pivot_root，然後 exec 你的程式；建完就結束 |

- Engine API 就是 HTTP：`curl --unix-socket /var/run/docker.sock http://localhost/containers/json`。
- Compose、buildx、Testcontainers、各種 GUI 都是 Engine API 的 client → **只要有人實作 Engine API，這些工具都能用**（OrbStack、Colima 都是這個思路）。
- docker context：CLI 要連哪個 daemon。`docker context ls` / `docker context use` / `docker --context x` / `DOCKER_HOST`。
- 安全：daemon 以 root 執行，能存取 socket 就等於 root；`docker` group 等同 root。

### 5. Mac / Windows 為什麼要 VM

- 容器要 Linux kernel，macOS / Windows 沒有 → 先開一台輕量 Linux VM，dockerd 跑在 VM 裡。
- host 上的 docker CLI 透過轉發的 socket 連到 VM 裡的 daemon；host ↔ VM 常見通道是 **vsock**（虛擬機專用 socket）。
- Docker Desktop（Mac：Apple Virtualization framework；Windows：WSL2）、OrbStack、Colima 都是「Linux VM + Engine API」，差在 VM 多輕、中間多少層、檔案分享和網路怎麼做。
- 所以「VM 開機多快」「VM 常駐多少記憶體」「閒置能不能休眠」都是這類產品的比較重點。
- Linux 主機：不需要 VM，直接用主機 kernel。

### 6. 網路、儲存、建置

- 預設 bridge 網路 `docker0`：每個容器有自己的 net namespace，用一對 **veth** 把容器的 `eth0` 接到主機上的 bridge。
- `-p 8080:80`（port publishing）：Docker 在主機裝 iptables 規則（DNAT）把 host:8080 轉到容器 :80；另有 user-space 的 `docker-proxy` 補足 iptables 處理不到的情況。
- 容器刪除時要清掉 veth、規則等網路資源。
- 儲存：bind mount（把主機資料夾掛進去）、volume（Docker 管理的資料區）。Mac 上 bind mount 要跨 VM 分享檔案，所以比較慢。
- 建置：BuildKit 是建置引擎，`docker buildx` 是它的 CLI。
- Compose：用 YAML 描述多個容器，也是 Engine API client。
- Kubernetes：管理大量容器的編排系統；k3s 是輕量版。

## 大綱 (Slide Plan)

1. 封面：Docker 底層入門（TitleSketch：image → container → kernel）
2. 問題：`docker run --rm alpine true` 按下 Enter 之後？ — VM vs 容器 scene（VmVsContainerScene）
3. 定義：容器 = 被隔離、被限制的普通 Linux process
4. Part 1 Image 與 Container
   - LayerScene：layers 疊起來 + 兩個容器各自的可寫層 + copy-on-write
   - 程式碼頁：Dockerfile ↔ layer；名詞表
5. Part 2 容器其實是 process
   - NamespaceScene：同一個 kernel 上，容器 process 看到的世界（PID 1）vs 主機
   - 表格：namespaces / cgroups / seccomp / capabilities
   - 程式碼頁：不用 Docker 做容器（unshare）＋ docker run 參數對照
6. Part 3 一個 docker run 穿過幾層
   - ChainScene：CLI → socket → dockerd → containerd → shim → runc → clone
   - 表格：每層角色
   - 程式碼頁：Engine API 就是 HTTP；docker context；socket = root
7. Part 4 Mac / Windows 的 VM
   - VmScene：host CLI → socket 轉發 → vsock → Linux VM → dockerd → containers
   - 表格：三平台 + Docker Desktop / OrbStack / Colima
8. Part 5 網路與周邊
   - NetScene：browser → host:8080 → iptables DNAT → docker0 → veth → 容器 :80
   - 名詞速查：bind mount、volume、BuildKit/buildx、Compose、Testcontainers、k3s
9. Takeaways
10. 參考資料
