const formLogin = document.getElementById('login')

formLogin?.addEventListener('submit', async (event) => {
  event.preventDefault()

  // @ts-ignore
  const formDataEncoded = new URLSearchParams(new FormData(formLogin))

  try {
    const res = await fetch('/api/sesiones/login', {
      method: 'POST',
      body: formDataEncoded,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })

    // Verificar si la solicitud fue exitosa (código de respuesta 2xx)
    if (res.ok) {
      // Redirigir a la nueva página
      window.location.href = '/productos'
    } else {
      // Manejar otros casos si es necesario
      const data = await res.json(); // Leer el cuerpo de la respuesta como JSON
      if (data.status === 'error') {
        if (data.message === 'Invalid email or password') {
          // Manejar el error de inicio de sesión 
          Swal.fire({
            title: "Fallo de inicio",
            icon: "error",
            color: "write",
            text: "Ingresar usuario y contraseña!"
          });
        } else if (data.message === 'Internal server error') {
          // Manejar otros errores internos del servidor
          alert('Internal server error. Please try again later.');
          // O recargar la página
          // window.location.reload();
        } else {
          console.log('Error desconocido:', data.message);
        }
      } else {
        console.log('La solicitud no fue exitosa. Código de respuesta:', res.status);
      }
    }
  } catch (err) {
    console.error('Error de red u otros errores inesperados:', err.message);
  }
});

