let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJOaWNrTmFtZSI6ImRrc3BkbGRoMTIzIiwiaWF0IjoxNjQ5ODExNzg2LCJleHAiOjE2NDk4MTg5ODYsImlzcyI6IuuouOuouOumrOqwnOuwnOyekCJ9.r_wN5y0zWXLeFjBZzj9xFKhjPwYkIjCSdf6ajVSWe00";
let base64Payload = token.split(".")[1]; //value 0 -> header, 1 -> payload, 2 -> VERIFY SIGNATURE
let payload = Buffer.from(base64Payload, "base64");
let result = JSON.parse(payload.toString());
console.log(result);
