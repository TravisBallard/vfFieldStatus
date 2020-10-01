import '../sass/style.sass'

(() => {
  const FIELD_CLOSED = 34; // field is closed if this runway is active.
  const FLYMSG = 'OPEN - Fly all you like (below 250ft)'
  const NOFLYMSG = 'CLOSED - DO NOT FLY'


  /**
   * Get data from API
   * @returns {Promise<Response>}
   */
  const getData = async () => {
    const d = new Date()
    try {
      return await fetch('http://travisballard.com/datis.php?iata=kvny&c=' + d.toISOString())
        .then(response => response.ok ? response.json() : {})
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * Ouput a message to the page.
   * @param text
   * @param color
   * @param bgColor
   */
  const showNotification = (text, className) => {
    const wrapper = document.createElement('div')
    wrapper.classList.add('vfFieldStatus')

    if (typeof className !== 'undefined'){
      wrapper.classList.add(className)
    }

    wrapper.appendChild(document.createTextNode(text))

    const node = document.getElementById('vfFieldStatus')
    node.insertAdjacentElement('afterend', wrapper)
  }

  /**
   * Magic
   */
  getData().then(data => {
    if (data.length > 0) {
      const {datis} = data[0]
      const [full, runway] = datis.match(/LNDG AND DEPG RWY (\d+)/)
      if (parseInt(runway) === FIELD_CLOSED) {
        showNotification(NOFLYMSG, 'closed')
      } else {
        showNotification(FLYMSG, 'open')
      }
    }
  })
})()

