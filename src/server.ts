const server = Bun.serve({
  port: 3001,

  fetch(request) {

    const startTime = Date.now();

    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    console.log(`[${new Date().toLocaleTimeString()}] ${method} ${path}`);
    
    // fungsi untuk menghitung waktu request
    function finish(response: Response) {
      const endTime = Date.now();
      console.log(`Request selesai dalam ${endTime - startTime} ms`);
      return response;
    }

    // GET /
    if (path === '/' && method === 'GET') {

      return finish(new Response(
        '<h1> Halaman Utama (Bun)</h1><p>Selamat datang di server Bun + TypeScript!</p>',
        {
          headers: { 'Content-Type': 'text/html' }
        }
      ));
    }

    // GET /about
    else if (path === '/about' && method === 'GET') {

      return finish(new Response(
        '<h1> Tentang Kami (Bun)</h1><p>Routing manual dengan Bun sangat mudah!</p>',
        {
          headers: { 'Content-Type': 'text/html' }
        }
      ));
    }

    // GET /api/users
    else if (path === '/api/users' && method === 'GET') {

      return finish(new Response(JSON.stringify([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ]),
      {
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    // POST /api/users
    else if (path === '/api/users' && method === 'POST') {

      return finish(new Response(
        JSON.stringify({ message: 'User berhasil dibuat (Bun)' }),
        {
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        }
      ));
    }

    // =========================
    // LATIHAN 1
    // GET /products
    // =========================

    else if (path === '/products' && method === 'GET') {

      return finish(new Response(JSON.stringify([
        { id: 1, name: "Laptop" },
        { id: 2, name: "Mouse" }
      ]),
      {
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    // POST /products
    else if (path === '/products' && method === 'POST') {

      return finish(new Response(
        JSON.stringify({ message: "Produk berhasil ditambahkan (Bun)" }),
        {
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        }
      ));
    }

    // =========================
    // LATIHAN 2
    // /users/:id
    // =========================

    else if (path.startsWith('/users/') && method === 'GET') {

      const id = path.split('/')[2];

      return finish(new Response(
        JSON.stringify({
          id: id,
          name: `User dengan ID ${id}`
        }),
        {
          headers: { 'Content-Type': 'application/json' }
        }
      ));
    }

    else {
      return finish(new Response(
        '<h1> 404 - Halaman Tidak Ditemukan (Bun)</h1>',
        {
          status: 404,
          headers: { 'Content-Type': 'text/html' }
        }
      ));
    }

  }

});

console.log(`🚀 Server Bun berjalan di http://localhost:${server.port}`);