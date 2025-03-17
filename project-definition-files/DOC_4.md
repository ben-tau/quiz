# API|v1.0.0|17-03-24
[NEXT:none]|[PREV:1,2,3]

<!-- [AUTH] -->
POST /auth/login:{email:str,pwd:str}
RES:{token:str,refresh:str,user:{id,name,email,avatar}}

POST /auth/register:{name:str,email:str,pwd:str}
RES:=login

POST /auth/refresh:{refresh:str}
RES:{token:str,refresh:str}

<!-- [GAME] -->
POST /games
REQ:{mode:'classic'|'time'|'survival',themes:str[],maxP:num,timeQ:num,priv:bool}
RES:{id:str,code:str,host:{id,name},settings:{mode,themes,maxP,timeQ},status:'wait'|'start'|'run'|'end'}

GET /games/{code}
RES:{id,code,players:[{id,name,avatar,status,score}],settings,status,curQ:{id,text,type,opts,time,pts}}

POST /games/{code}/join
POST /games/{code}/start
POST /games/{code}/answer:{qId:str,ans:str|num|str[],time:num}
RES:{correct:bool,pts:num,corrAns:any,exp:str}

<!-- [PROFILE] -->
GET /profile
RES:{id,name,email,avatar,stats:{games,wins,score,avg,themes:[{id,name,games,avg}]},badges:[{id,name,desc,date}]}

GET /profile/history?page&limit
RES:{total:num,pages:num,games:[{id,date,mode,themes,pos,score,players}]}

<!-- [WS] -->
EMIT:
- game:playerJoin:{player:{id,name,avatar}}
- game:playerLeft:{pid}
- game:qStart:{q:{id,text,type,opts,time,pts},start}
- game:ansRes:{pid,correct,pts,score}

RECV:
- game:ready:{ready:bool}
- game:answer:{qId,ans,time}

<!-- [ERRORS] -->
FMT:{error:{code:str,msg:str,details:obj}}
CODES:400,401,403,404,409,422,429,500

<!-- [SEC] -->
AUTH:JWT+refresh
RATE:|pub:100/min|auth:1000/min|
CORS:origins,creds,methods:GPRD
VALID:input,escape,xss+csrf 