# COMP|v1.0.18|20-03-24
[NEXT:3]|[PREV:1]

<!-- [ATOMS] -->
BTN:✅
```ts
{variant:'primary'|'secondary'|'outline'|'danger',size:'sm'|'md'|'lg',loading?:bool,disabled?:bool,onClick:()=>void}
```

CARD:✅
```ts
{variant:'default'|'elevated'|'outlined',onClick?:()=>void}
```

BADGE:✅
```ts
{variant:'primary'|'success'|'warning'|'danger',size:'sm'|'md'}
```

<!-- [MOLECULES] -->
INVITE:
```ts
{code:str}
```
FEAT:pulse,copy,feedback

PLAYER:
```ts
{id:str,name:str,avatar?:str,host?:bool,ready?:bool}
```
FEAT:empty,status,anim

<!-- [ORGANISMS] -->
THEMES:
```ts
{themes:Theme[],selected:str[],toggle:(id:str)=>void,min?:num}
```
FEAT:multi,valid,anim

PLAYERS:
```ts
{players:Player[],max:num,kick?:(id:str)=>void}
```
FEAT:slots,host,anim

<!-- [RULES] -->
|Rule|Value|
|-|-|
|Lines|250|
|Docs|JSDoc|
|Tests|Unit|
|Logic|Hooks|

<!-- [STATUS] -->
DONE:✅
- Button
- Card
- Badge
- Logo

WIP:🔄
- Input
- Select
- TextArea

NEXT:⏳
- Dropdown
- Modal 