const formLogin = document.querySelector('form')

formLogin?.addEventListener('submit', async event => {
  event.preventDefault()

  // @ts-ignore
  const formDataEncoded = new URLSearchParams(new FormData(formLogin))

  try {
    const res = await fetch(
      '/api/sesiones/login',
      {
        method:'POST',
        body: formDataEncoded,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      },
    )

  } catch (err) {
    console.log(err.message)
  }
})