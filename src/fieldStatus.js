(() => {
  const FIELD_CLOSED = 34; // field is closed if this runway is active.

  /**
   * Get data from API
   * @returns {Promise<Response>}
   */
  const getData = async () => {
    try {
      return await fetch('datis.php?iata=kvny')
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
  const showNotification = (text, color, bgColor) => {
    const wrapper = document.createElement('div')

    wrapper.style.padding = '10px'
    wrapper.style.margin = '0 10px'
    wrapper.style.fontSize = 'inherit'
    wrapper.style.color = color || '#000'
    wrapper.style.border = `1px solid ${color || '#000'}`
    wrapper.style.backgroundColor = bgColor || '#fff'
    wrapper.style.display = 'inline-block'

    const node = document.scripts[document.scripts.length - 1]
    wrapper.appendChild(document.createTextNode(text))
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
        showNotification('CLOSED - DO NOT FLY', '#b20000', '#f79e9e')
      } else {
        showNotification('OPEN - Fly all you like (below 250ft)', '#00b20b', '#9ef7ca')
      }
    }
  })
})()

