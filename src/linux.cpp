#include <napi.h>
#include <iostream>
#include <filesystem>
#include <fstream>
#include <stdlib.h>
#include <limits.h>
#include "ps.hh"
namespace fs = std::filesystem;

bool isNumber(const char* inp) {
  for (; *inp; inp++) if (*inp < '0' || *inp > '9') return false;
  return true;
}

Napi::Value processList(const Napi::CallbackInfo& info) {
  const Napi::Env env = info.Env();
  const Napi::Array processList = Napi::Array::New(env);
  for (const auto & entry : fs::directory_iterator("/proc")) {
    if (!(isNumber(entry.path().filename().c_str()))) continue;
    const Napi::Object pid = Napi::Object::New(env);
    pid.Set("pid", entry.path().filename().c_str());
    std::string path = entry.path().c_str();

    /* Cmdline read */
    std::string c, cmdFile = "";
    std::ifstream cmdlineRead(path + "/cmdline");
    while(getline(cmdlineRead, c)) cmdFile = cmdFile.append(c);
    cmdlineRead.close();
    pid.Set("cmdline", cmdFile.c_str());

    // Get real exec
    char realPath[PATH_MAX];
    char *loc = realpath(fs::absolute(path + "/exe").c_str(), realPath);
    if (loc) pid.Set("exe", realPath); else continue;

    processList.Set(processList.Length(), pid);
  }
  return processList;
}