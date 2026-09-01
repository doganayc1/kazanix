type Bucket = { count:number; resetAt:number };
const buckets = new Map<string,Bucket>();
export function getClientIp(request:Request){const f=request.headers.get("x-forwarded-for");return (f?f.split(",")[0].trim():request.headers.get("x-real-ip")||"unknown").slice(0,128)}
export function rateLimit(key:string,limit=10,windowMs=60000){const now=Date.now();const c=buckets.get(key);if(!c||c.resetAt<=now){buckets.set(key,{count:1,resetAt:now+windowMs});return{allowed:true,remaining:limit-1}}if(c.count>=limit)return{allowed:false,remaining:0};c.count++;return{allowed:true,remaining:Math.max(0,limit-c.count)}}
export function safeString(value:unknown,max:number){return typeof value==="string"?value.trim().slice(0,max):""}
export function isValidHttpUrl(value:unknown){if(typeof value!=="string")return false;try{const u=new URL(value);return u.protocol==="http:"||u.protocol==="https:"}catch{return false}}