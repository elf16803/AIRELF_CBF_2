import { encode, decode } from 'js-base64'

export default {
  install (Vue, options) {
    Vue.prototype.$base64 = {
      fileToBase64 (file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => {
            const base64String = reader.result.split(',')[1]
            resolve(base64String)
          }
          reader.onerror = error => reject(error)
        })
      },
      download ({ fileName, base64 }) {
        const split = base64.split(',')
        const fileBase64 = split[0]
        const extension = split[1]

        const linkSource = `data:application/${extension};base64,${fileBase64}`
        const downloadLink = document.createElement('a')

        downloadLink.href = linkSource
        downloadLink.download = `${fileName}${extension}`
        downloadLink.click()
      },
      encode (string) {
        return encode(string)
      },
      decode (base64) {
        return decode(base64)
      }
    }
  }
}
