export const LoaderMixin = {
  data: () => ({
    loaderSwitch: false,
    btnDisabled: false,
    loaderSwitch2: false
  }),
  methods: {
    timeOut () {
      setTimeout(() => {
        this.btnDisabled = false
        this.loaderSwitch = false
      }, 1500)
    },
    timeOut2 () {
      setTimeout(() => {
        this.btnDisabled = false
        this.loaderSwitch2 = false
      }, 1500)
    }
  }
}
