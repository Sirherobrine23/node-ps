{
  "target_defaults": {
    "include_dirs" : [
      "<!(node -p \"require('node-addon-api').include_dir\")"
    ],
    "defines": [
      "NAPI_DISABLE_CPP_EXCEPTIONS"
    ],
    "cflags": [],
    "cflags_cc": [],
    "conditions": [
      ["OS=='linux'", {
        "sources": [
          "src/linux.cpp"
        ]
      }],
      ["OS=='android'", {
        "sources": [
          "src/android.cpp"
        ]
      }],
      ["OS=='win'", {
        "sources": [
          "src/win32.cpp"
        ]
      }],
    ]
  },
  "targets": [
    {
      "target_name": "ps",
      "sources": [
        "src/main.cpp"
      ]
    }
  ],
}