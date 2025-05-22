const fetch = require('node-fetch');

(async () => {
  try {
    const baseURL = 'http://44.202.7.190/api/todos';

    // Test GET
    const res = await fetch(baseURL);
    if (!res.ok) throw new Error('GET failed');

    const todos = await res.json();
    console.log('GET passed:', todos);

    // Test POST
    const post = await fetch(baseURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: 'Smoke test item' }),
    });

    if (!post.ok) throw new Error('POST failed');
    console.log('POST passed');

    process.exit(0);
  } catch (err) {
    console.error('Smoke test failed:', err);
    process.exit(1); 
  }
})();
