// functions/_middleware.js
//
// Protege todo el sitio con una contraseña compartida (HTTP Basic Auth).
// El navegador mostrará su cuadro nativo de login.
//
// Requiere una variable de entorno en el dashboard de Cloudflare Pages:
//   Settings -> Environment variables -> SITE_PASSWORD = "tu_contraseña"
//
// El usuario que se introduzca en el login puede ser cualquier cosa,
// lo único que se valida es la contraseña.

export async function onRequest(context) {
  const { request, env } = context;

  if (!env.SITE_PASSWORD) {
    // Si no se ha configurado la variable de entorno, no se bloquea el sitio
    // pero se avisa en los logs para que no quede desprotegido sin darse cuenta.
    console.warn('SITE_PASSWORD no está configurada: el sitio NO está protegido.');
    return context.next();
  }

  const auth = request.headers.get('Authorization');
  const expected = 'Basic ' + btoa(`stro:${env.SITE_PASSWORD}`);

  if (auth === expected) {
    return context.next();
  }

  return new Response('Acceso restringido', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="STRO"',
    },
  });
}
