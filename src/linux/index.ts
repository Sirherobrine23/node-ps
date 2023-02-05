import path from "node:path";
import { promises as fs } from "node:fs";
import { execSync } from "node:child_process";

export const CLK_TCK = Number((execSync("getconf CLK_TCK")).toString().trim());

function bufferFindSpaces(data: Buffer) {
  let fist: number;
  for (let i = 0; i < data.length; i++) {
    if (typeof fist === "number" && data[i] !== 0x20) return {
      fist,
      last: i
    };
    if (data[i] === 0x20) {
      if (!fist) fist = i;
    }
  }
  return null;
}

export default async function main() {
  const pids = (await fs.readdir("/proc")).filter(n => !isNaN(Number(n))).sort((a, b) => Number(a) - Number(b));
  const info = [];
  for (const pid of pids) {
    const main = path.join("/proc", pid);
    const origin: string = await fs.realpath(path.join(main, "exe")).catch(() => null);
    if (origin === null) continue;
    const stat = await fs.readFile(path.join(main, "stat")).then(data => {
      const data2 = {};
      data2["data"] = data.toString("utf8");
      while (data.length > 0) {
        const findSpace = bufferFindSpaces(data);
        if (!findSpace) return data2;
        if (!data2["pid"]) {
          data2["pid"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["comm"]) {
          for (let i = 0; i < data.length; i++) {
            if (data[i-1] === 0x29) {
              data2["comm"] = data.subarray(0, i).toString();
              data = data.subarray(i);
              break;
            }
          }
        } else if (!data2["state"]) {
          data2["state"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["ppid"]) {
          data2["ppid"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["pgrp"]) {
          data2["pgrp"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["session"]) {
          data2["session"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["tty_nr"]) {
          data2["tty_nr"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["tpgid"]) {
          data2["tpgid"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["flags"]) {
          data2["flags"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["minflt"]) {
          data2["minflt"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["cminflt"]) {
          data2["cminflt"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["majflt"]) {
          data2["majflt"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["cmajflt"]) {
          data2["cmajflt"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["utime"]) {
          data2["utime"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["stime"]) {
          data2["stime"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["cutime"]) {
          data2["cutime"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["cstime"]) {
          data2["cstime"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["priority"]) {
          data2["priority"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["nice"]) {
          data2["nice"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["num_threads"]) {
          data2["num_threads"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["itrealvalue"]) {
          data2["itrealvalue"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["starttime"]) {
          data2["starttime"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["vsize"]) {
          data2["vsize"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["rss"]) {
          data2["rss"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["rsslim"]) {
          data2["rsslim"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["startcode"]) {
          data2["startcode"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["endcode"]) {
          data2["endcode"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["startstack"]) {
          data2["startstack"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["kstkesp"]) {
          data2["kstkesp"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["kstkeip"]) {
          data2["kstkeip"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["signal"]) {
          data2["signal"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["blocked"]) {
          data2["blocked"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["sigignore"]) {
          data2["sigignore"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["sigcatch"]) {
          data2["sigcatch"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["wchan"]) {
          data2["wchan"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["nswap"]) {
          data2["nswap"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["cnswap"]) {
          data2["cnswap"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["exit_signal"]) {
          data2["exit_signal"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["processor"]) {
          data2["processor"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["rt_priority"]) {
          data2["rt_priority"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["policy"]) {
          data2["policy"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["delayacct_blkio_ticks"]) {
          data2["delayacct_blkio_ticks"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["guest_time"]) {
          data2["guest_time"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["cguest_time"]) {
          data2["cguest_time"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["start_data"]) {
          data2["start_data"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["end_data"]) {
          data2["end_data"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["start_brk"]) {
          data2["start_brk"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["arg_start"]) {
          data2["arg_start"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["arg_end"]) {
          data2["arg_end"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["env_start"]) {
          data2["env_start"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["env_end"]) {
          data2["env_end"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else if (!data2["exit_code"]) {
          data2["exit_code"] = data.subarray(0, findSpace.fist).toString();
          data = data.subarray(findSpace.last);
        } else return data2;
      }
      return data2;
    }).catch(() => ({}));

    info.push({
      pid: Number(pid),
      exe: origin,
      cwd: await fs.realpath(path.join(main, "cwd")).catch(() => "/"),
      cmdLine: (await fs.readFile(path.join(main, "cmdline"), "utf8").catch(() => "")).split(/\x00/).filter(c => Boolean(c?.trim())),
      cpu: Math.max(Math.min(Math.floor((((stat["utime"] / CLK_TCK) + (stat["stime"] / CLK_TCK) * 100) / (process.uptime() - (stat["starttime"] / CLK_TCK)))), 100), 0),
      mem: (await fs.readFile(path.join(main, "statm"), "utf8").catch(() => "")).split(/\s+/).reduce((main, data, index) => {
        data = data.trim();
        if (index === 1) main["size"] = Number(data);
        else if (index === 2) main["resident"] = Number(data);
        else if (index === 3) main["shared"] = Number(data);
        else if (index === 4) main["text"] = Number(data);
        else if (index === 5) main["lib"] = Number(data);
        else if (index === 6) main["data"] = Number(data);
        else if (index === 7) main["dt"] = Number(data);
        return main;
      }, {}),
    });
  }
  return info;
}