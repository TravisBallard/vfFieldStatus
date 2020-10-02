import '../sass/style.sass'

(() => {
  const FIELD_CLOSED = 34; // field is closed if this runway is active.
  const FLYMSG = 'OPEN - Fly all you like (below 250ft)'
  const NOFLYMSG = 'CLOSED - DO NOT FLY'
  const NORWYMSG = 'Unable to determine active runway at VNY. Fly with caution.'


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
   * @param className
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
      const matches = datis.match(/LNDG AND DEPG RWY (\d+)/)

      if (matches) {
        const [full, runway] = matches
        if (runway) {
          if (parseInt(runway) === FIELD_CLOSED) {
            showNotification(NOFLYMSG, 'closed')
          } else {
            showNotification(FLYMSG, 'open')
          }
        }
      } else {
        showNotification(datis, 'datis')
        showNotification(NORWYMSG, 'no-runway-data')
      }
    }
  })
})()

