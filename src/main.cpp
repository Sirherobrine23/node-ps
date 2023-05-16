#include <napi.h>
#include "ps.hh"

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set("List", Napi::Function::New(env, processList));
  return exports;
}

NODE_API_MODULE(addon, Init);