# ARCH|v1.0.21|21-03-24
[NEXT:2,3,4]|[PREV:none]
<!-- [CORE] -->
MODE:dark|LINES:250|TESTS:req|STYLE:tw
THEME:{primary:#1E3A8A,secondary:#3B82F6,accent:#FACC15,bg:#0F172A}
EFFECTS:blur:12px|surface:30%|border:0.08

<!-- [ARCH] -->
SERVICES:
|Factory|init,auth,game,profile|✅|
|Auth|login,register,logout|✅|
|Game|state,score,match|🔄|
|Profile|stats,history,badges|🔄|

MOCK:
|Socket|events,latency,bots|
|State|storage,scores|

CONTEXT:
|Socket|conn|
|Auth|user|
|Game|state|

<!-- [DOCS] -->
REFERENCE:
|DEV_REFERENCE|guide dev frontend|✅|
|DOC_1|architecture|✅|
|DOC_2|composants|✅|
|DOC_3|historique|✅|
|DOC_4|api|✅|

<!-- [CONFIG] -->
ENV:
```ts
{api:str,mock:bool,socket:str,debug:bool}
```

SEC:
- JWT+refresh
- 401 handle
- CSRF guard

<!-- [PERF] -->
- Virtual lists
- Lazy load
- Memo data
- Opt renders

<!-- [A11Y] -->
- ARIA
- Keyboard
- WCAG AA
- Error msg

<!-- [QUALITY] -->
|Load|<3s|
|Light|>90|
|WCAG|AA|
|TS|0err|
|Test|>80%|

<!-- [NEXT] -->
1. Config env
2. Real APIs
3. Int tests
4. Deploy 