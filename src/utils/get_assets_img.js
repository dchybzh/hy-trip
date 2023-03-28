export const getAssetsURL = (image) => {
  // new URL(参数一是相对路径，参数二是当前文件的路径)，意思是根据参数二(当前路径)拿到参数一的相对路径
  return new URL(`../assets/img/${image}`, import.meta.url).href
}
