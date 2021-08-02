export default {
  getLastRelease(){ //TODO use latest when not pre-release
    return fetch("https://api.github.com/repos/angrykoala/gaucho/releases?per_page=1", {
      headers:{
        Accept: "application/vnd.github.v3+json",
        Authorization: "Basic YW5ncnlrb2FsYTpnaHBfTVNsRGIyV1FSazdkc1FuUTdvd3FPbURsNjFzZXltM2trT1Ru"
      }
    })
  }
}
