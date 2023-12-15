const formLogin = document.getElementById('login')

formLogin?.addEventListener('submit', async event => {
  event.preventDefault()

  // @ts-ignore
  const formDataEncoded = new URLSearchParams(new FormData(formLogin))

  try {
    const res = await fetch(
      '/api/sesiones/login',
      {
        method: 'POST',
        body: formDataEncoded,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      },
    )

    // Verificar si la solicitud fue exitosa (código de respuesta 2xx)
    if (res.ok) {
      // Redirigir a la nueva página
      window.location.href = '/productos'
    } else {
      // Manejar otros casos si es necesario
      console.log('La solicitud no fue exitosa. Código de respuesta:', res.status)
    }

  } catch (err) {
    console.log(err.message)
  }
})