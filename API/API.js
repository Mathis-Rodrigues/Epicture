
export function start() {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Client-ID 72512453ac30480");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  // const rep = await fetch("https://api.imgur.com/3/gallery/hot", requestOptions)
  // // console.log("lol");
  // const data = await rep.json();
  // console.log(JSON.stringify(data));
  // // return rep;
  // return (data);

  return (
    fetch("https://api.imgur.com/3/gallery/hot/viral", requestOptions)
      .then((res) => res.json())
      .catch((err) => console.error(err))
  )

}

export function searchGallery(string, sort) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Client-ID 72512453ac30480");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return (
  fetch("https://api.imgur.com/3/gallery/search/"+ sort + "?q=" + string, requestOptions)
  .then((res) => res.json())
  .catch((err) => console.error(err))
  )
}

export function sortGallery(section, sort) {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Client-ID 72512453ac30480");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return (
    fetch("https://api.imgur.com/3/gallery/"+ section+ "/" + sort, requestOptions)
      .then((res) => res.json())
      .catch((err) => console.error(err))
  )

}
