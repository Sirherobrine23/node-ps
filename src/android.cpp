#include <napi.h>
#include "ps.hh"

Napi::Value processList(const Napi::CallbackInfo& info) {
  const Napi::Env env = info.Env();
  const Napi::Array processList = Napi::Array::New(env);

  return processList;
}