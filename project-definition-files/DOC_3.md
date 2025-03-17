# HIST|v1.0.14|16-03-24
[NEXT:none]|[PREV:1,2]

<!-- [VERSIONS] -->
1.0.14|16-03|✨theme+🎨ctx+🔧cfg
1.0.13|15-03|🔐auth+📱pages+🛡️routes
1.0.12|14-03|🧱atoms+🏗️struct+⚙️cfg

<!-- [AUTH] -->
USERS:
```ts
[{id:"user1",name:"thomas",pwd:"123",role:"user"},{id:"admin1",name:"admin",pwd:"admin",role:"admin"}]
```

FLOW:
|Action|Effect|
|-|-|
|login|store+redir|
|register|create+auth|
|logout|clear+home|

<!-- [DEV] -->
SETUP:
1. clone
2. npm i
3. env
4. dev

TEST:
|Cmd|Use|
|-|-|
|test|unit|
|test:comp|comp|
|test:int|integ|

<!-- [STATUS] -->
DONE:✅
- Struct
- Atoms
- Auth
- Pages
- Routes
- Docs
- Theme

WIP:🔄
- Game
- Score
- WS
- Tests

<!-- [NOTES] -->
SEC:
- No test pwd
- HTTPS
- CSRF
- Sessions

PERF:
- Opt imports
- Lazy
- Min render
- Cache

A11Y:
- WCAG
- Screen
- Keys
- Alt

<!-- [AGENTS] -->
CRITICAL:
- DOC files=vital
- Update v+date
- JSDoc code
- Test cover 