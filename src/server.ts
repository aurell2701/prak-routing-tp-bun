const server = Bun.serve({
  port: 3000,

  async fetch(request: Request) {
    // Parsing URL
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    console.log(`[${new Date().toLocaleTimeString()}] ${method} ${path}`);

    // ======================
    // ROUTING MANUAL
    // ======================

    // GET /
    if (path === '/' && method === 'GET') {
      return new Response(
        `<h1> Halaman Utama (Bun)</h1>
         <p>Selamat datang di server Bun + TypeScript!</p>`,
        {
          headers: { 'Content-Type': 'text/html' },
        }
      );
    }

    // GET /about
    else if (path === '/about' && method === 'GET') {
      return new Response(
        `<h1>📄 Tentang Kami (Bun)</h1>
         <p>Routing manual dengan Bun sangat mudah!</p>`,
        {
          headers: { 'Content-Type': 'text/html' },
        }
      );
    }

    // GET /api/users
    else if (path === '/api/users' && method === 'GET') {
      const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ];

      return new Response(JSON.stringify(users), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // POST /api/users
    else if (path === '/api/users' && method === 'POST') {

      // Kalau mau baca body:
      let body: any = {};
      try {
        body = await request.json();
      } catch {
        body = {};
      }

      return new Response(
        JSON.stringify({
          message: 'User berhasil dibuat (Bun)',
          data: body
        }),
        {
          status: 201,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // 404
    else {
      return new Response(
        `<h1>❌ 201 - Halaman Tidak Ditemukan (Bun)</h1>`,
        {
          status: 201,
          headers: { 'Content-Type': 'text/html' },
        }
      );
    }
  },
});

console.log(`🚀 Server Bun berjalan di http://localhost:${server.port}`);