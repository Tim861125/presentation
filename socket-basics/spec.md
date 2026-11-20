# Socket 入門 技術深剖

## 注意

- 手寫風格（rough.js 手繪圖、白底藍＋琥珀；見 skill 的「手寫風格」段落）
- 不要使用 icon
- 注意每一頁的高度不要超過螢幕高度
- 用繁體中文（技術名詞保留原文）
- 對象：初學者。獨立 deck（不屬於 docker-basics），Docker 的 `/var/run/docker.sock` 只在後段當真實案例
- Running example：兩個程式透過 `/tmp/demo.sock`（Unix socket）與 `localhost:9000`（TCP）互相說話

## 來源文件 / 參考連結

- socket(7)：https://man7.org/linux/man-pages/man7/socket.7.html
- unix(7)：https://man7.org/linux/man-pages/man7/unix.7.html
- ip(7)：https://man7.org/linux/man-pages/man7/ip.7.html
- tcp(7)：https://man7.org/linux/man-pages/man7/tcp.7.html
- socket(2)：https://man7.org/linux/man-pages/man2/socket.2.html
- bind(2)：https://man7.org/linux/man-pages/man2/bind.2.html
- listen(2)：https://man7.org/linux/man-pages/man2/listen.2.html
- accept(2)：https://man7.org/linux/man-pages/man2/accept.2.html
- connect(2)：https://man7.org/linux/man-pages/man2/connect.2.html
- curl `--unix-socket`：https://curl.se/docs/manpage.html#--unix-socket
- Docker post-install（docker group）：https://docs.docker.com/engine/install/linux-postinstall/
- dockerd reference（預設 socket）：https://docs.docker.com/reference/cli/dockerd/
- Docker Engine security：https://docs.docker.com/engine/security/
- docker/cli `opts/hosts.go`（預設 socket / named pipe 常數）：https://github.com/docker/cli/blob/master/opts/hosts.go
- Microsoft：Pipe Names：https://learn.microsoft.com/en-us/windows/win32/ipc/pipe-names
- Microsoft：AF_UNIX comes to Windows：https://devblogs.microsoft.com/commandline/af_unix-comes-to-windows/

## 摘要

Socket 是兩個程式交換資料的「端點」，就像服務窗口或電話線的兩頭。Linux 裡 socket 透過 file descriptor 存取，所以 `read(2)` / `write(2)` / `close(2)` 都能用（socket(7)：「the standard I/O operations like write(2), … read(2) … can be used」）。

### 1. 兩大家族（address family）

| | Network socket | Unix domain socket |
|---|---|---|
| family | `AF_INET` / `AF_INET6` | `AF_UNIX`（= `AF_LOCAL`） |
| 位址 | IP + 16-bit port（ip(7)） | 檔案系統路徑，`sun_path` 最長 108 bytes（unix(7)） |
| 範圍 | 可跨機器 | 只限同一台機器（unix(7)：「communicate between processes on the same machine efficiently」） |
| 存取控制 | 防火牆 / 應用層認證；< 1024 port 需特權（ip(7)） | 檔案權限：connect 需要對 socket 檔有 write 權限（unix(7)） |
| 例子 | `nginx :80`、`postgres :5432` | `/var/run/docker.sock`、`/run/systemd/journal/socket` |

Linux 另有 abstract namespace（不在檔案系統上，權限無效）— 只提一句即可。

### 2. 型別（socket type）

- `SOCK_STREAM`：sequenced, reliable, two-way, connection-based byte streams（socket(2)）。在 IP 上 = TCP。TCP「does not preserve record boundaries」（tcp(7)）。
- `SOCK_DGRAM`：datagrams, connectionless（socket(2)）。在 IP 上 = UDP，不保證送達。
- 注意：Unix domain 的 `SOCK_DGRAM`「are always reliable and don't reorder datagrams」（unix(7)），且保留訊息邊界。
- 另有 `SOCK_SEQPACKET`（unix 自 Linux 2.6.4）。

### 3. 生命週期（stream socket）

Server：`socket()` → `bind()` → `listen()` → `accept()`；Client：`socket()` → `connect()`；之後雙方 `read`/`write`（`send`/`recv`），最後 `close()`。

- `bind(2)`：把 socket 綁到本地位址（Unix socket 會在此時建立檔案）。
- `listen(2)`：標記為 passive socket；`backlog` 是等待佇列長度，佇列滿時 client 可能收到 `ECONNREFUSED`。
- `accept(2)`：從佇列取出第一個連線，**回傳一個新的 fd**；原本的 listening socket 不受影響（繼續接下一位）。
- `connect(2)`：stream socket 上若沒人在聽 → `ECONNREFUSED`。

### 4. 動手玩（本機實測：Ubuntu, kernel 7.0, OpenBSD netcat 1.226 Debian patch）

```console
$ ls -l /tmp/demo.sock
srwxrwxr-x 1 tim tim 0 Nov 20 11:46 /tmp/demo.sock      # 開頭 s = socket 檔
$ ss -lx | grep demo.sock
u_str LISTEN 0 5  /tmp/demo.sock 11071631  * 0
$ ss -lnt
LISTEN 0 4096  0.0.0.0:22  0.0.0.0:*
$ cat /tmp/demo.sock
cat: /tmp/demo.sock: No such device or address          # ENXIO：socket 檔不能 open()
```

- `ss -l` listening、`-x` unix、`-t` tcp、`-n` 不解析名稱。
- Unix socket 對話：終端 A `nc -lU /tmp/demo.sock`、終端 B `nc -U /tmp/demo.sock`；雙向互打字（實測 OK）。
- TCP：`nc -l 9000` / `nc localhost 9000`（實測 OK）。
- netcat 變體差異：
  - OpenBSD netcat（Debian/Ubuntu 預設 `netcat-openbsd`）：`nc -l 9000`、`-U` 支援 Unix socket。Debian 版本 `nc -lU` 會先 `unlink()` 既有檔案再 `bind()`（strace 實測）。
  - 傳統 netcat（`netcat-traditional`）：listen 要寫 `nc -l -p 9000`，**沒有** `-U`。
  - Nmap `ncat`：`ncat -l 9000`、`ncat -U path`。
  - 不確定時用 `socat`：`socat - UNIX-CONNECT:/tmp/demo.sock`、`socat UNIX-LISTEN:/tmp/demo.sock -`。

### 5. Socket 上跑 HTTP

Socket 只負責搬 bytes；HTTP 是兩邊約定好的文字格式。curl：`--unix-socket <path>`「Connect to the server through this Unix domain socket, instead of using the network.」

本機實測（用 `nc -lU` 假裝 server，抓下 curl 送出的內容）：

```console
$ curl --unix-socket /tmp/http.sock http://localhost/version
GET /version HTTP/1.1
Host: localhost
User-Agent: curl/8.19.0
Accept: */*
```

- URL 裡的 `localhost` 不會被拿去 DNS / 連線，只會變成 `Host:` header（HTTP/1.1 必須有 Host header）。換成 `http://anything/version` 也照樣送到同一個 socket（實測 → `Host: anything`）。
- 案例：Docker。`docker` CLI 是 client，dockerd 預設 listen `unix:///var/run/docker.sock`（dockerd docs）。`curl --unix-socket /var/run/docker.sock http://localhost/version` 會拿到 Engine 版本 JSON（Docker Engine API `GET /version`）。（本次環境限制，未實際呼叫 docker.sock。）

### 6. 權限與安全

- unix(7)：Linux 上 connect stream socket 需要對 socket 檔有 write 權限；建立 socket 需要對目錄有 write + search 權限；POSIX 不保證，舊 BSD 會忽略權限。
- 本機 `ls -l /run/docker.sock` → `srw-rw---- 1 root docker`：root 與 docker 群組可連，其他人 `EACCES`。
- Docker docs：「The `docker` group grants root-level privileges to the user.」→ docker group ≈ root（可以 `docker run -v /:/host` 改主機檔案）。
- `/run` 是 tmpfs，重開機 socket 檔消失，由服務啟動時重建。
- 程式異常結束後 socket 檔留著（stale）：再 `bind()` 同路徑 → `EADDRINUSE`（unix(7)：「the filesystem socket object already exists」）。正確作法：啟動前 `unlink()`。實測 Python：`EADDRINUSE [Errno 98] Address already in use`；socat：`E "/tmp/demo.sock" exists`。
- 對 stale 檔 `connect` → `Connection refused`（實測 `nc -U`）。

### 7. Windows

- Named pipe：`\\.\pipe\PipeName`（Microsoft Learn Pipe Names）。Docker 預設 `npipe:////./pipe/docker_engine`（docker/cli `defaultNamedPipe = //./pipe/docker_engine`）。
- Windows 10 Insider Build 17063 起支援 `AF_UNIX`（初版只支援 `SOCK_STREAM`，無 ancillary data、無 socketpair）。

### 8. 常見錯誤

| errno | 訊息 | 原因 | 怎麼辦 |
|---|---|---|---|
| `ECONNREFUSED` | Connection refused | 位址上沒人 listen（服務沒起、port 錯、stale socket 檔、backlog 滿） | 先 `ss -lnt` / `ss -lx` 看有沒有人在聽 |
| `ENOENT` | No such file or directory | Unix socket 路徑不存在 | 服務沒啟動或路徑寫錯 |
| `EACCES` | Permission denied | 對 socket 檔沒 write 權限 / 目錄沒 search 權限 | `ls -l` 看 owner/group，加群組或用 sudo |
| `EADDRINUSE` | Address already in use | port 被佔用，或 socket 檔已存在 | 找出佔用者；Unix socket 先 `unlink` |

## 大綱 (Slide Plan)

1. 封面 — TitleSketch：client ⇄ socket ⇄ server
2. 問題 — `ProblemScene`：兩個 process 記憶體隔離 → 共用檔案輪詢很笨 → 一條「電話線」
3. 定義 — big-quote：端點 + file descriptor；callout：服務窗口 / 一切皆檔案
4. Part 1 兩大家族 — `FamilyScene`（跨機器 IP:port vs 同機器路徑）→ 比較表 → stream vs datagram 表
5. Part 2 生命週期 — `LifecycleScene`（逐 click 畫 socket→bind→listen→accept / socket→connect / 資料 / close）→ Python 最小 server/client
6. Part 3 動手玩 — `ls -l` / `ss` / `cat` 失敗 → nc Unix & TCP 對話 + netcat 變體
7. Part 4 HTTP over socket — `HttpScene`（curl → HTTP 文字 → socket → server）→ curl 實測 request + Docker 案例
8. Part 5 權限與安全 — `PermScene`（srw-rw---- root docker）→ stale socket / EADDRINUSE → Windows named pipe
9. 常見錯誤表
10. Takeaways
11. 參考資料
