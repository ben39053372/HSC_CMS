const auth = () => {
  let token = localStorage.getItem('CmsJWT')
  console.log(token)
  if (localStorage.getItem('CmsJWT') !== null){
    return true
  } else {
    return false
  }
}

export default auth