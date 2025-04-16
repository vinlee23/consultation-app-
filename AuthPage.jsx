import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const supabase = createClient('https://your-project-id.supabase.co', 'your-public-anon-key');

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMessage('Gagal mengirim link login. Coba lagi.');
    } else {
      setMessage('Cek email kamu untuk link login.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Masuk ke Konsultasi</h1>
        <Input type="email" placeholder="Email kamu" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Button onClick={handleLogin} className="w-full">Kirim Link Masuk</Button>
        {message && <p className="text-center text-sm text-muted-foreground">{message}</p>}
      </div>
    </div>
  );
};

export default AuthPage;
