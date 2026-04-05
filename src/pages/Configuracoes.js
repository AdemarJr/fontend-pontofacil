// src/pages/Configuracoes.js
import { useState, useEffect } from 'react';
import Layout from '../components/dashboard/Layout';
import { tenantService } from '../services/api';

export default function Configuracoes() {
  const [config, setConfig] = useState(null);
  const [form, setForm] = useState({});
  const [salvando, setSalvando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    tenantService.meu().then(({ data }) => {
      setConfig(data);
      setForm({
        geofenceLat: data.geofenceLat || '',
        geofenceLng: data.geofenceLng || '',
        geofenceRaio: data.geofenceRaio || 200,
        geofenceAtivo: data.geofenceAtivo,
        fotoObrigatoria: data.fotoObrigatoria,
        toleranciaMinutos: data.toleranciaMinutos || 5,
      });
    });
  }, []);

  async function salvar() {
    setSalvando(true);
    try {
      await tenantService.atualizar(form);
      setSucesso(true);
      setTimeout(() => setSucesso(false), 3000);
    } finally { setSalvando(false); }
  }

  if (!config) return <Layout><div style={{ display:'flex', justifyContent:'center', padding:'80px' }}><div className="spinner" /></div></Layout>;

  const tenantId = config.id;

  return (
    <Layout>
      <div style={{ marginBottom:'28px' }}>
        <h1 style={{ fontSize:'24px', fontWeight:'700' }}>Configurações</h1>
        <p style={{ color:'var(--cinza-400)', fontSize:'14px' }}>{config.nomeFantasia} · {config.cnpj}</p>
      </div>

      <div style={{ display:'grid', gap:'20px', maxWidth:'640px' }}>
        {/* ID do Totem */}
        <div className="card">
          <h2 style={{ fontSize:'15px', fontWeight:'600', marginBottom:'16px' }}>🖥 ID do Totem</h2>
          <p style={{ fontSize:'13px', color:'var(--cinza-400)', marginBottom:'10px' }}>Cole este ID na configuração do tablet/celular fixo</p>
          <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
            <code style={{ flex:1, background:'var(--cinza-100)', padding:'10px 14px', borderRadius:'8px', fontSize:'13px', fontFamily:'monospace', wordBreak:'break-all' }}>{tenantId}</code>
            <button className="btn btn-secondary" style={{ flexShrink:0 }} onClick={() => navigator.clipboard.writeText(tenantId)}>Copiar</button>
          </div>
        </div>

        {/* Geofencing */}
        <div className="card">
          <h2 style={{ fontSize:'15px', fontWeight:'600', marginBottom:'16px' }}>📍 Geofencing</h2>

          <label style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'16px', cursor:'pointer' }}>
            <input type="checkbox" checked={form.geofenceAtivo} onChange={e => setForm(p => ({...p, geofenceAtivo: e.target.checked}))} style={{ width:'18px', height:'18px', accentColor:'var(--verde)' }} />
            <span style={{ fontSize:'14px', fontWeight:'500' }}>Ativar restrição por localização</span>
          </label>

          {form.geofenceAtivo && (
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
              <div>
                <label style={{ display:'block', fontSize:'12px', color:'var(--cinza-400)', marginBottom:'6px' }}>Latitude</label>
                <input className="input" type="number" step="0.000001" placeholder="-23.5505" value={form.geofenceLat} onChange={e => setForm(p => ({...p, geofenceLat: e.target.value}))} />
              </div>
              <div>
                <label style={{ display:'block', fontSize:'12px', color:'var(--cinza-400)', marginBottom:'6px' }}>Longitude</label>
                <input className="input" type="number" step="0.000001" placeholder="-46.6333" value={form.geofenceLng} onChange={e => setForm(p => ({...p, geofenceLng: e.target.value}))} />
              </div>
              <div style={{ gridColumn:'1/-1' }}>
                <label style={{ display:'block', fontSize:'12px', color:'var(--cinza-400)', marginBottom:'6px' }}>Raio permitido: <strong>{form.geofenceRaio}m</strong></label>
                <input type="range" min="50" max="1000" step="10" value={form.geofenceRaio} onChange={e => setForm(p => ({...p, geofenceRaio: Number(e.target.value)}))} style={{ width:'100%', accentColor:'var(--verde)' }} />
              </div>
            </div>
          )}
        </div>

        {/* Registro */}
        <div className="card">
          <h2 style={{ fontSize:'15px', fontWeight:'600', marginBottom:'16px' }}>📸 Registro de Ponto</h2>

          <label style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'16px', cursor:'pointer' }}>
            <input type="checkbox" checked={form.fotoObrigatoria} onChange={e => setForm(p => ({...p, fotoObrigatoria: e.target.checked}))} style={{ width:'18px', height:'18px', accentColor:'var(--verde)' }} />
            <span style={{ fontSize:'14px', fontWeight:'500' }}>Foto obrigatória no registro</span>
          </label>

          <div>
            <label style={{ display:'block', fontSize:'12px', color:'var(--cinza-400)', marginBottom:'6px' }}>Tolerância de atraso (minutos)</label>
            <input className="input" type="number" min="0" max="60" value={form.toleranciaMinutos} onChange={e => setForm(p => ({...p, toleranciaMinutos: Number(e.target.value)}))} style={{ maxWidth:'120px' }} />
          </div>
        </div>

        {sucesso && (
          <div style={{ background:'var(--verde-claro)', color:'var(--verde-escuro)', padding:'12px 16px', borderRadius:'8px', fontSize:'14px', fontWeight:'500' }}>
            ✓ Configurações salvas com sucesso!
          </div>
        )}

        <button className="btn btn-primary btn-lg" onClick={salvar} disabled={salvando}>
          {salvando ? 'Salvando...' : 'Salvar Configurações'}
        </button>
      </div>
    </Layout>
  );
}
