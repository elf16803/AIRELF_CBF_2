import Vue from 'vue'

Vue.directive('focus', {
  inserted: function (el) {
    const inputEl = el.querySelector('input')
    if (inputEl) inputEl.focus()
  }
})

// 處理再 form 表單 input 案 enter 跳到下一個 input, 最後一個 input 案 enter 則 submit form (submit button 需要添加 id="submit-button")
Vue.directive('enter-focus', {
  bind: el => {
    el.addEventListener('keyup', (event) => {
      if (event.key !== 'Enter') return

      const currentInput = event.target
      const inputs = el.querySelectorAll('.ivu-input')

      if (currentInput.tagName === 'TEXTAREA') event.preventDefault() // 如果是 textarea 阻止 enter 換行的行為

      for (let i = 0; i < inputs.length; i++) {
        if (currentInput === inputs[inputs.length - 1]) {
          // 當前 input 為最後一個 input 時
          const submitButton = el.querySelector('button[enter-focus="submit"]')
          if (submitButton) {
            submitButton.click()
            submitButton.blur()
          }

          break
        } else if (currentInput === inputs[i]) {
          // 如果下一個 input 為 disabled 則繼續往下一個找到沒有 disabled 的 input
          for (let nextIndex = i + 1; nextIndex < inputs.length; nextIndex++) {
            if (!inputs[nextIndex].getAttribute('disabled')) {
              inputs[nextIndex].focus()
              break
            }
          }
          break
        }
      }
    })
  }
})
