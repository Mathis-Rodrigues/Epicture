
export async function test () {
var myHeaders = new Headers();
myHeaders.append("Authorization", "Client-ID 72512453ac30480");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

const rep = await fetch("https://api.imgur.com/3/gallery/hot", requestOptions)
// console.log("lol");
const data = await rep.json();
console.log(JSON.stringify(data));
// return rep;
}

