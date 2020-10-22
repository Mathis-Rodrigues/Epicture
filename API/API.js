const buildHeader = token => {
  const h = new Headers()
  h.append("Authorization", `Bearer ${token}`)
  return h
}

export function start(token) {
  const requestOptions = {
    method: 'GET',
    headers: buildHeader(token),
    redirect: 'follow'
  };

  return (
    fetch("https://api.imgur.com/3/gallery/top/viral", requestOptions)
      .then((res) => res.json())
  )
}

export function searchGallery(token, string, sort) {
  const requestOptions = {
    method: 'GET',
    headers: buildHeader(token),
    redirect: 'follow'
  };

  return (
    fetch("https://api.imgur.com/3/gallery/search/" + sort + "?q=" + string, requestOptions)
      .then((res) => res.json())
  )
}

export function sortGallery(token, section, sort) {
  const requestOptions = {
    method: 'GET',
    headers: buildHeader(token),
    redirect: 'follow'
  };

  return (
    fetch("https://api.imgur.com/3/gallery/" + section + "/" + sort, requestOptions)
      .then((res) => res.json())
  )
}

export function uploadImage(token, param) {
  // const formdata = new FormData();
  // formdata.append("image", param.image);
  // formdata.append("type", param.type);
  // formdata.append("title", param.title);
  // formdata.append("description", param.description);

  // const requestOptions = {
  //   method: 'POST',
  //   headers: buildHeader(token),
  //   body: formdata,
  //   redirect: 'follow'
  // };

  // return fetch("https://api.imgur.com/3/upload", requestOptions)
  //   .then(res => res.text())
}

export function addToFavorite(token, ID) {

  const formdata = new FormData();

  const requestOptions = {
    method: 'POST',
    headers: buildHeader(token),
    redirect: 'follow'
  };

  return (
    fetch("https://api.imgur.com/3/image/"+ID+"/favorite", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error))
  )
}

// export function IdImage(token) {
//   const requestOptions = {
//     method: 'GET',
//     headers: buildHeader(token),
//     redirect: 'follow'
//   };

//   return (
//     fetch("https://api.imgur.com/https://api.imgur.com/3/account/Rushplaying/images/ids/1/gallery/top/viral", requestOptions)
//       .then((res) => res.json())
//   )
// }