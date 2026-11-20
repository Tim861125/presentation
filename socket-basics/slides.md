---
theme: sketch
title: Socket 入門
footer: Socket 入門 · RD 技術分享
info: |
  Socket 入門技術分享：程式之間怎麼說話
  丁吾心
layout: cover
---

# Socket 入門

兩個程式之間的 **電話線**，從系統呼叫一路講到 `docker.sock`。

丁吾心 · RD 技術分享

::brand::

RD Tech Talk

::art::

<TitleSketch />

---
clicks: 3
---

# 問題：兩個程式要怎麼說話？

<ProblemScene />

<div class="scene-caption">每個 process 都有自己的記憶體，彼此看不到；要傳資料，得靠 kernel 幫忙接一條線。</div>

<!--
開場：程式 A、B 是兩個獨立的 process，記憶體互相隔離。
[click] 土法煉鋼：寫到共用檔案，另一邊一直輪詢。慢、浪費、還有競爭問題。
[click] Socket：kernel 幫兩端接好一條雙向通道，訊息寫進去對面就收得到。
[click] 結論：有人在聽、資料一來就收到。
-->

---
layout: center
---

<div class="big-quote max-w-3xl">

Socket 是兩個程式交換資料的 <em>端點</em>；在 Linux 裡，它就是一個 <em>file descriptor</em>。

</div>

<div class="grid grid-cols-2 gap-6 mt-10 max-w-3xl">
<div class="callout blue">

**像服務窗口。** server 開窗口等人，client 走過來敲門，接通後一來一往地講。

</div>
<div class="callout">

**一切皆檔案。** 拿到 fd 之後，`read()` / `write()` / `close()` 照用，跟讀寫檔案一樣。

</div>
</div>

---
layout: section
---

<div class="eyebrow">Part 1</div>

# Socket 的兩大家族

位址長什麼樣，決定了它能走多遠

---
clicks: 2
---

# Network socket vs Unix domain socket

<FamilyScene />

<!--
[click] Network socket：位址是 IP + port，可以跨機器。
[click] Unix domain socket：位址是一個檔案路徑，只在同一台機器，資料不經過網路堆疊，比較快。
-->

---

# 兩大家族比較

| | Network socket | Unix domain socket |
|---|---|---|
| family | `AF_INET` / `AF_INET6` | `AF_UNIX`（又叫 `AF_LOCAL`） |
| 位址 | IP + port，例如 `127.0.0.1:9000` | 檔案路徑，例如 `/tmp/demo.sock` |
| 範圍 | 可以跨機器 | 只限同一台機器 |
| 速度 | 要走 TCP/IP 協定堆疊 | kernel 內部直接搬，較快 |
| 門禁 | 防火牆、應用層驗證 | 檔案權限（`rwx`、owner / group） |
| 例子 | nginx `:80`、PostgreSQL `:5432` | `/var/run/docker.sock` |

<div class="callout mt-6" v-click>

**位址長度：** Unix socket 路徑存在 `sun_path`，Linux 上只有 **108 bytes**，路徑別取太深。

</div>

---

# 另一個維度：Stream vs Datagram

| socket type | 特性 | 在 IP 上 | 像什麼 |
|---|---|---|---|
| `SOCK_STREAM` | 先連線、可靠、有順序的 **byte 串流** | TCP | 打電話 |
| `SOCK_DGRAM` | 不用連線，一次送一個 **封包** | UDP | 寄明信片 |

<div class="grid grid-cols-2 gap-6 mt-8">
<div class="callout blue" v-click>

**Stream 沒有訊息邊界。** 送兩次 `"hi"`，對面可能一次讀到 `"hihi"`，要自己切訊息。

</div>
<div class="callout" v-click>

**Unix 的 DGRAM 例外。** `AF_UNIX` 的 datagram 一定送達、不亂序（unix(7)），跟 UDP 不同。

</div>
</div>

---
layout: section
---

<div class="eyebrow">Part 2</div>

# Socket 的一生

server 開店、client 敲門、講完掛電話

---
clicks: 7
---

# 生命週期：server 與 client

<LifecycleScene />

<!--
[click] server 先 socket()，跟 kernel 要一個 socket，拿到 fd。
[click] bind()：綁上位址。Unix socket 的檔案就是這一步建立的。
[click] listen()：開門營業，連線會先在佇列排隊，長度叫 backlog。
[click] accept()：卡住等客人。
[click] client socket() + connect() 敲門；accept() 回傳一個「新的」fd 專門服務這位，原本的 listening socket 繼續等下一位。
[click] 之後雙方用 read/write（或 send/recv）互傳資料。
[click] close() 掛電話，對方 read() 會拿到 0，也就是 EOF。
-->

---

# 實作：最小的 server / client（Python）

<div class="grid grid-cols-2 gap-6 code-sm">
<div>

### server.py

```python {all|7|8|9|10|all}
import os, socket

PATH = "/tmp/demo.sock"
if os.path.exists(PATH):
    os.unlink(PATH)              # 清掉上次留下的檔案

srv = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
srv.bind(PATH)                   # 檔案在這一步出現
srv.listen()
conn, _ = srv.accept()           # 新的 socket，專門服務這位
print("got:", conn.recv(1024))
conn.sendall(b"hello\n")
conn.close(); srv.close()
```

</div>
<div>

### client.py

```python
import socket

cli = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
cli.connect("/tmp/demo.sock")  # 沒人聽 → 被拒絕
cli.sendall(b"hi\n")
print("reply:", cli.recv(1024))
cli.close()
```

```console
$ python3 server.py &  python3 client.py
got: b'hi\n'
reply: b'hello\n'
```

</div>
</div>

<div class="callout mt-4" v-click>

**換成 TCP 只改兩行：** `AF_UNIX` → `AF_INET`，路徑 → `("127.0.0.1", 9000)`。流程完全一樣。

</div>

---
layout: section
---

<div class="eyebrow">Part 3</div>

# 動手玩

用 `ls`、`ss`、`nc` 親手摸 socket

---

# 找到 socket：`ls -l` 與 `ss`

<div class="grid grid-cols-2 gap-6 code-sm">
<div>

### 檔案類型是 `s`

```console
$ ls -l /tmp/demo.sock
srwxrwxr-x 1 tim tim 0 Nov 20 11:46 /tmp/demo.sock
```

### 不能 `cat` 它

```console
$ cat /tmp/demo.sock
cat: /tmp/demo.sock: No such device or address
```

</div>
<div>

### 誰在 listen？

```console
$ ss -lx | grep demo.sock     # -l listening, -x unix
u_str LISTEN 0  5  /tmp/demo.sock 11071631  * 0

$ ss -lnt                      # -t tcp, -n 不解析名稱
State  Local Address:Port  Peer Address:Port
LISTEN 0.0.0.0:22          0.0.0.0:*
LISTEN 127.0.0.1:11434     0.0.0.0:*
```

</div>
</div>

<div class="callout mt-6" v-click>

**socket 檔只是「門牌」。** 大小永遠是 0，資料不存在檔案裡；要用 `connect()` 進門，`open()` 會得到 `ENXIO`。

</div>

---

# 用 `nc` 對話：Unix socket 與 TCP

<div class="grid grid-cols-2 gap-6 code-sm">
<div>

### Unix socket

```console
# 終端 A：server
$ nc -lU /tmp/demo.sock

# 終端 B：client
$ nc -U /tmp/demo.sock
hi            ← 打字，A 那邊就看得到
```

</div>
<div>

### TCP

```console
# 終端 A：server
$ nc -l 9000

# 終端 B：client
$ nc localhost 9000
hi
```

</div>
</div>

<div class="mt-4" v-click>

| netcat 版本 | listen | Unix socket |
|---|---|---|
| OpenBSD（Ubuntu / Debian 預設） | `nc -l 9000` | `nc -U` / `nc -lU` |
| traditional | `nc -l -p 9000` | 不支援（改用 `socat`） |
| Nmap `ncat` | `ncat -l 9000` | `ncat -U` |

</div>

---
layout: section
---

<div class="eyebrow">Part 4</div>

# Socket 上跑 HTTP

socket 搬 bytes，協定決定 bytes 長怎樣

---
clicks: 3
---

# HTTP over Unix socket

<HttpScene />

<!--
socket 這條線本身不懂 HTTP。
[click] curl 把 request 寫成一段純文字送進 socket。
[click] dockerd 讀到後回一段 HTTP response，內容是 JSON。
[click] 分層：HTTP 是內容格式，socket 是搬運工。同一份 HTTP 走 TCP 或 Unix socket 都可以。
-->

---

# 案例：`curl` 直接跟 Docker 說話

<div class="grid grid-cols-2 gap-6 code-sm">
<div>

### 指令

```console
$ curl --unix-socket /var/run/docker.sock \
    http://localhost/version
```

`docker version` 背後做的事一樣：CLI 是 client，把指令翻成 HTTP 送到 `docker.sock`，dockerd 回 JSON。

</div>
<div>

### curl 實際送出的 bytes

```http
GET /version HTTP/1.1
Host: localhost
User-Agent: curl/8.19.0
Accept: */*
```

（用 `nc -lU` 假裝 server 錄下來的）

</div>
</div>

<div class="callout mt-6" v-click>

**`localhost` 只是填空。** 有 `--unix-socket` 時 curl 不查 DNS、不連網路，URL 的 host 只拿來填 HTTP/1.1 必填的 `Host:` header；寫 `http://anything/version` 也會送到同一個 socket。

</div>

---
layout: section
---

<div class="eyebrow">Part 5</div>

# 權限與安全

Unix socket 的門禁就是檔案權限

---
clicks: 3
---

# 誰能連 `docker.sock`？

<PermScene />

<div class="scene-caption">Docker 官方文件：「The docker group grants root-level privileges to the user.」</div>

<!--
Linux 上 connect Unix socket 需要對 socket 檔有 write 權限（unix(7)）。
[click] owner 是 root，可以連。
[click] docker 群組成員有 rw，可以連；其他人沒權限，得到 EACCES。
[click] 但 dockerd 是 root 在跑，能叫它掛載 / 進容器，等於拿到 root。所以加人進 docker 群組要非常小心。
-->

---

# 殘留的 socket 檔：`EADDRINUSE`

<div class="grid grid-cols-2 gap-6 code-sm">
<div>

### 程式掛掉後，檔案還在

```console
$ ls -l /tmp/demo.sock     # 上次沒清掉
srwxrwxr-x 1 tim tim 0 ... /tmp/demo.sock

$ python3 server.py        # 沒先 unlink 的版本
OSError: [Errno 98] Address already in use

$ nc -U /tmp/demo.sock     # 沒人在聽
nc: /tmp/demo.sock: Connection refused
```

</div>
<div>

### 正確作法

```python
if os.path.exists(PATH):
    os.unlink(PATH)       # bind 前先清掉
srv.bind(PATH)
```

- `bind()` 遇到已存在的路徑就失敗，不會自動覆蓋
- `/run` 是 tmpfs，重開機 socket 檔全消失，服務啟動時再建

</div>
</div>

<div class="callout mt-6" v-click>

**工具行為不一：** Debian 版 `nc -lU` 會先偷偷 `unlink()`；`socat UNIX-LISTEN` 則直接報錯 `"/tmp/demo.sock" exists`。

</div>

---

# Windows 呢？

<div class="grid grid-cols-2 gap-6 mt-4">
<div class="callout blue">

**Named pipe**

Windows 傳統的本機 IPC，名稱格式 `\\.\pipe\<名稱>`。

Docker 在 Windows 的預設位址是 `npipe:////./pipe/docker_engine`，對應 Linux 的 `docker.sock`。

</div>
<div class="callout">

**AF_UNIX 也有了**

Windows 10（Insider Build 17063）起支援 `AF_UNIX`，路徑一樣是檔案。

初版只支援 `SOCK_STREAM`，不能傳 fd、沒有 `socketpair()`。

</div>
</div>

<div class="mt-8 text-lg" v-click>

概念都一樣：**一個大家都知道的名字 + 一端等、一端連 + 權限控管誰能進門**。

</div>

---

# 常見錯誤對照

| errno | 你會看到 | 原因 | 先查什麼 |
|---|---|---|---|
| `ECONNREFUSED` | Connection refused | 那個位址沒人在 listen（服務沒起、port 錯、殘留 socket 檔） | `ss -lnt` / `ss -lx` |
| `ENOENT` | No such file or directory | Unix socket 路徑不存在 | 服務有沒有啟動、路徑拼對沒 |
| `EACCES` | Permission denied | 對 socket 檔沒有 `w` 權限 | `ls -l` 看 owner / group |
| `EADDRINUSE` | Address already in use | port 被佔用，或 socket 檔已存在 | `ss -lnp`；Unix socket 先 `unlink` |

<div class="callout mt-6" v-click>

**判斷順序：** 路徑在不在（ENOENT）→ 進不進得了門（EACCES）→ 裡面有沒有人（ECONNREFUSED）。

</div>

---
layout: section
---

<div class="eyebrow">Takeaways</div>

# Socket 就是程式之間的電話線

<div class="text-left max-w-2xl mx-auto mt-8 text-lg leading-relaxed">

1. **socket = 端點 + fd：** 拿到之後就能 `read` / `write` / `close`
2. **兩大家族：** IP + port 可跨機器；Unix socket 用檔案路徑，只限本機、靠權限把關
3. **一生：** server `socket → bind → listen → accept`，client `socket → connect`
4. **協定騎在上面：** HTTP 走 Unix socket 也行；能連 `docker.sock` 就約等於 root

</div>

---

# 參考資料

<div class="text-sm">

- Linux man pages：[socket(7)](https://man7.org/linux/man-pages/man7/socket.7.html)、[unix(7)](https://man7.org/linux/man-pages/man7/unix.7.html)、[ip(7)](https://man7.org/linux/man-pages/man7/ip.7.html)、[tcp(7)](https://man7.org/linux/man-pages/man7/tcp.7.html)
- 系統呼叫：[socket(2)](https://man7.org/linux/man-pages/man2/socket.2.html)、[bind(2)](https://man7.org/linux/man-pages/man2/bind.2.html)、[listen(2)](https://man7.org/linux/man-pages/man2/listen.2.html)、[accept(2)](https://man7.org/linux/man-pages/man2/accept.2.html)、[connect(2)](https://man7.org/linux/man-pages/man2/connect.2.html)
- curl `--unix-socket`：[curl.se/docs/manpage.html](https://curl.se/docs/manpage.html#--unix-socket)
- Docker：[Linux post-install（docker group）](https://docs.docker.com/engine/install/linux-postinstall/)、[dockerd reference](https://docs.docker.com/reference/cli/dockerd/)、[Engine security](https://docs.docker.com/engine/security/)
- docker/cli 預設位址：[opts/hosts.go](https://github.com/docker/cli/blob/master/opts/hosts.go)
- Microsoft：[Pipe Names](https://learn.microsoft.com/en-us/windows/win32/ipc/pipe-names)、[AF_UNIX comes to Windows](https://devblogs.microsoft.com/commandline/af_unix-comes-to-windows/)

</div>
