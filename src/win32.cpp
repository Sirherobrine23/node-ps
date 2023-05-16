#include <napi.h>
#include <windows.h>
#include <tlhelp32.h>
#include "ps.hh"

Napi::Value processList(const Napi::CallbackInfo& info) {
  const Napi::Env env = info.Env();
  const Napi::Array processList = Napi::Array::New(env);
  HANDLE hProcess, hProcessSnap;
  PROCESSENTRY32 pe32;
  DWORD dwPriorityClass;

  hProcessSnap = CreateToolhelp32Snapshot( TH32CS_SNAPPROCESS, 0 );
  if(hProcessSnap == INVALID_HANDLE_VALUE) {
    Napi::Error::New(env, "Failed to create process snapshot").ThrowAsJavaScriptException();
    return env.Undefined();
  }

  // Set the size of the structure before using it.
  pe32.dwSize = sizeof( PROCESSENTRY32 );

  // Retrieve information about the first process,
  // and exit if unsuccessful
  if(!Process32First( hProcessSnap, &pe32)) {
    CloseHandle(hProcessSnap);
    Napi::Error::New(env, "Failed to retrieve first process").ThrowAsJavaScriptException();
    return env.Undefined();
  }

  do {
    // Retrieve the priority class.
    dwPriorityClass = 0;
    hProcess = OpenProcess( PROCESS_ALL_ACCESS, FALSE, pe32.th32ProcessID );
    if(hProcess != NULL) {
      dwPriorityClass = GetPriorityClass(hProcess);
      CloseHandle(hProcess);
      if(!dwPriorityClass) {
        Napi::Error::New(env, "Failed to retrieve priority class").ThrowAsJavaScriptException();
        return env.Undefined();
      }
    }

    const Napi::Object ObjectInfo = Napi::Object::New(env);
    ObjectInfo.Set("name", Napi::String::New(env, pe32.szExeFile));
    ObjectInfo.Set("cpu", Napi::Number::New(env, pe32.cntThreads));
    ObjectInfo.Set("rss", Napi::Number::New(env, pe32.pcPriClassBase));
    ObjectInfo.Set("vsz", Napi::Number::New(env, pe32.pcPriClassBase));
    ObjectInfo.Set("user", Napi::Number::New(env, pe32.pcPriClassBase));
    ObjectInfo.Set("sys", Napi::Number::New(env, pe32.pcPriClassBase));
    ObjectInfo.Set("pid", Napi::Number::New(env, pe32.th32ProcessID));
    ObjectInfo.Set("ppid", Napi::Number::New(env, pe32.th32ParentProcessID));

    processList.Set(processList.Length(), ObjectInfo);
  } while (Process32Next(hProcessSnap, &pe32));
  CloseHandle(hProcessSnap);
  return processList;
}