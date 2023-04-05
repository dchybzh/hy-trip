import { onMounted, onUnmounted, ref } from 'vue'
import { throttle } from 'underscore'
// console.log(throttle)
// 方法一 传回调函数
// export default function useScroll(reachBottomCB) {
//   // 监听 window 创建的滚动,reachBottomCB 是一个回调函数
//   // 1.当我们离开页面时，我们移除监听
//   // 2.如果别的页面也进行类似的监听，会编写重复的代码
//   const scrollListenerHandler = () => {
//     const clientHeight = document.documentElement.clientHeight // 客户端的高度
//     const scrollTop = document.documentElement.scrollTop // 滚动的距离
//     const scrollHeight = document.documentElement.scrollHeight // 所有可滚动的高度
//     // console.log(clientHeight, scrollTop, scrollHeight)
//     console.log('------------')
//     if (clientHeight + scrollTop >= scrollHeight) {
//       console.log('滚动到底部了')
//       if (reachBottomCB) reachBottomCB()
//     }
//   }
//   onMounted(() => {
//     window.addEventListener('scroll', scrollListenerHandler)
//   })

//   // 移除监听
//   onUnmounted(() => {
//     window.removeEventListener('scroll', scrollListenerHandler)
//   })
// }

// 方法二 定义变量
export default function useScroll(elRef) {
  // el 默认是 window
  let el = window

  const isReachBottom = ref(false)

  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)
  // 节流
  const scrollListenerHandler = throttle(() => {
    if (el === window) {
      clientHeight.value = document.documentElement.clientHeight // 客户端的高度
      scrollTop.value = document.documentElement.scrollTop // 滚动的距离
      scrollHeight.value = document.documentElement.scrollHeight // 所有可滚动的高度
      // console.log(clientHeight, scrollTop, scrollHeight)
      // console.log('----- 监听到滚动 ------')
    } else {
      clientHeight.value = el.clientHeight
      scrollTop.value = el.scrollTop
      scrollHeight.value = el.scrollHeight
      // console.log('----- 监听到滚动 ------')
      // console.log(clientHeight.value, scrollTop.value, scrollHeight.value)
    }
    if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
      // console.log('滚动到底部了')
      isReachBottom.value = true
    }
  }, 100)
  onMounted(() => {
    // 判断，是否有传入的 ref
    if (elRef) {
      // 拿到 ref 的 value 并赋值给 el，就可以监听某个元素的滚动了
      el = elRef.value
    }
    el.addEventListener('scroll', scrollListenerHandler)
  })

  // 移除监听
  onUnmounted(() => {
    el.removeEventListener('scroll', scrollListenerHandler)
  })

  return { isReachBottom, clientHeight, scrollTop, scrollHeight }
}
